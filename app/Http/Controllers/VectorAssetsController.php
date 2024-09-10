<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreVectorAssetsRequest;
use App\Http\Requests\UpdateVectorAssetsRequest;
use App\Models\VectorAssets;
use App\Models\VectorCategory;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class VectorAssetsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Ambil data kategori vector dengan pagination
        $vectorAssets = VectorAssets::with('vectorCategory')->paginate(10);

        // Ambil data product categories jika diperlukan
        $vectorCategories = VectorCategory::all();
        return Inertia::render('Backend/Product/Vector/Assets/Index', [
            'vectorAssets' => $vectorAssets,
            'vectorCategories' => $vectorCategories, // Kirim ke frontend
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


        VectorAssets::create($data);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(VectorAssets $vectorAsset)
    {
        return Inertia::render('Backend/Vector/Assets/Edit', [
            'vectorAsset' => $vectorAsset,
            'vectorCategories' => VectorCategory::all()
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateVectorAssetsRequest $request, VectorAssets $vectorAsset)
    {
        $data = $request->validated();
        $data['updated_by'] = Auth::id();

        $vectorAsset->update($data);

        return redirect()->route('vectorAssets.index')
            ->with('success', "Vector Asset \"$vectorAsset->name\" updated successfully");
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
