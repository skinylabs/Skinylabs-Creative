<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreVectorCategoryRequest;
use App\Http\Requests\UpdateVectorCategoryRequest;
use App\Models\VectorCategory;
use App\Models\Category;
use App\Models\ProductCategory;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class VectorCategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Ambil data kategori vector dengan pagination
        $vectorCategories = VectorCategory::paginate(10);

        // Ambil data product categories jika diperlukan
        $productCategories = ProductCategory::all();

        return Inertia::render('Backend/Product/Vector/Category/Index', [
            'vectorCategories' => $vectorCategories,
            'productCategories' => $productCategories, // Kirim ke frontend
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(ProductCategory $productCategories)
    {
        $vectorCategories = VectorCategory::all();
        $productCategories = ProductCategory::all();
        return Inertia::render('Backend/Vector/Category/Create', [
            'vectorCategories' => $vectorCategories,
            'productCategories' => $productCategories
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreVectorCategoryRequest $request)
    {
        $data = $request->validated();
        $data['created_by'] = Auth::id();
        $data['updated_by'] = Auth::id();

        VectorCategory::create($data);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(VectorCategory $vectorCategory)
    {
        return Inertia::render('Backend/Vector/Category/Edit', [
            'vectorCategory' => $vectorCategory,
            'categories' => Category::all()
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateVectorCategoryRequest $request, VectorCategory $vectorCategory)
    {
        $data = $request->validated();
        $data['updated_by'] = Auth::id();

        $vectorCategory->update($data);

        return redirect()->route('vectorCategories.index')
            ->with('success', "Vector Category \"$vectorCategory->name\" updated successfully");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(VectorCategory $vectorCategory)
    {
        $name = $vectorCategory->name;
        $vectorCategory->delete();

        return redirect()->route('vectorCategories.index')
            ->with('success', "Vector Category \"$name\" deleted successfully");
    }
}
