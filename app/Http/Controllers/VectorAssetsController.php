<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreVectorAssetsRequest;
use App\Http\Requests\UpdateVectorAssetsRequest;
use App\Http\Resources\VectorAssetsResource;
use App\Models\VectorAssets;
use App\Models\VectorCategory;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Illuminate\Support\Str;

class VectorAssetsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Ambil data vector assets dengan relasi vectorCategories
        $vectorAssets = VectorAssets::with('vectorCategory')->paginate(10);
        // Ambil data product categories
        $vectorCategories = VectorCategory::all();

        return Inertia::render('Backend/Product/Vector/Assets/Index', [
            'vectorAssets' => $vectorAssets,
            'vectorCategories' => $vectorCategories,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {

        $vectorAssets = VectorAssets::all();
        $vectorCategories = VectorCategory::all();
        return Inertia::render('Backend/Product/Vector/Assets/Partials/Create', [
            'vectorAssets' => $vectorAssets,
            'vectorCategories' => $vectorCategories
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreVectorAssetsRequest $request)
    {
        $data = $request->validated();
        $data['created_by'] = Auth::id();
        $data['updated_by'] = Auth::id();

        if ($request->hasFile('file')) {
            $data['file'] = $request->file('file')->store('vector_assets', 'public');
        }

        $vectorAsset = VectorAssets::create($data);

        $vectorAsset->vectorCategory()->attach($request->input('vector_category_id'));

        return redirect()->route('vector-assets.index')
            ->with('success', 'Vector asset created successfully.');
    }

    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(VectorAssets $vectorAssets)
    {
        $vectorCategories = VectorCategory::all();
        return Inertia::render('Backend/Product/Vector/Assets/Partials/Edit', [
            'vectorCategories' => $vectorCategories,
            'currentCategory' => $vectorAssets,
        ]);
        return Inertia::render('Backend/Product/Category/Edit', [
            'vectorCategories' => $vectorCategories,
            'currentCategory' => $vectorAssets,
            'category' => new VectorAssetsResource($vectorAssets),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateVectorAssetsRequest $request, VectorAssets $vectorAssets)
    {
        $data = $request->validated();

        // Simpan file jika ada
        if ($request->hasFile('file')) {
            $data['file'] = $request->file('file')->store('vector_assets', 'public');
        }
        $file = $data['file'] ?? null;
        $data['updated_by'] = Auth::id();
        if ($file) {
            if ($vectorAssets->file) {
                Storage::disk('public')->deleteDirectory(dirname($vectorAssets->file));
            }
            $data['file'] = $file->store('vector_assets/' . Str::random(), 'public');
        }

        // Update data vector asset
        $vectorAssets->update($data);

        // Sinkronisasi kategori
        $vectorAssets->vectorCategory()->sync($request->input('vector_category_id'));

        return redirect()->route('vector-assets.index')
            ->with('success', "Vector asset \"$vectorAssets->name\" berhasil diperbarui!");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(VectorAssets $vectorAsset)
    {
        $name = $vectorAsset->name;
        $vectorAsset->delete();

        return redirect()->route('vectorAssets.index')
            ->with('success', "Vector Asset \"$name\" deleted successfully");
    }
}
