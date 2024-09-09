<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProductCategoryRequest;
use App\Http\Requests\UpdateProductCategoryRequest;
use App\Http\Resources\ProductCategoryResource;
use App\Models\ProductCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ProductCategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $productCategories = ProductCategory::paginate(10); // Tambahkan paginasi jika perlu

        return Inertia::render('Backend/Product/ProductCategory/Index', [
            'ProductCategories' => $productCategories,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $productCategories = ProductCategory::all();
        return Inertia::render('Backend/Product/Category/Create', [
            'productCategories' => $productCategories
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProductCategoryRequest $request)
    {
        $data = $request->validated();
        $data['created_by'] = Auth::id();
        $data['updated_by'] = Auth::id();

        ProductCategory::create($data);

        return redirect()->route('product-categories.index')
            ->with('success', 'Category created successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(ProductCategory $productCategory)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ProductCategory $productCategory)
    {
        return Inertia::render('Backend/Product/Category/Edit', [
            'category' => new ProductCategoryResource($productCategory),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProductCategoryRequest $request, ProductCategory $productCategory)
    {
        $data = $request->validated();
        $data['updated_by'] = Auth::id();

        $productCategory->update($data);

        return redirect()->route('product-categories.index')
            ->with('success', "Category \"$productCategory->name\" updated successfully");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ProductCategory $productCategory)
    {
        $name = $productCategory->name;
        $productCategory->delete();

        return redirect()->route('product-categories.index')
            ->with('success', "Category \"$name\" deleted successfully");
    }
}
