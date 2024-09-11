<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreVectorAssetsRequest;
use App\Http\Requests\UpdateVectorAssetsRequest;
use App\Models\VectorAssets;
use App\Models\VectorCategory;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

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
        // Cari asset berdasarkan ID
        $vectorAsset = VectorAssets::findOrFail($id);

        // Return view dengan data asset
        return view('vector-assets.show', compact('vectorAsset'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(VectorAssets $vectorAsset)
    {
        $vectorCategories = VectorCategory::all();
        return Inertia::render('Backend/Product/Vector/Assets/Partials/Edit', [
            'vectorAsset' => $vectorAsset,
            'vectorCategories' => $vectorCategories,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateVectorAssetsRequest $request, VectorAssets $vectorAsset)
    {
        $data = $request->validated();

        // Simpan file jika ada
        if ($request->hasFile('file')) {
            $data['file'] = $request->file('file')->store('vector_assets', 'public');
        }

        $data['updated_by'] = Auth::id();

        // Update data vector asset
        $vectorAsset->update($data);

        // Sinkronisasi kategori
        $vectorAsset->vectorCategory()->sync($request->input('vector_category_id'));

        return redirect()->route('vector-assets.index')
            ->with('success', "Vector asset \"$vectorAsset->name\" berhasil diperbarui!");
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
