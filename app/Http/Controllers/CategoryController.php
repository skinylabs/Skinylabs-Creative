<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProductCategoryRequest;
use App\Http\Requests\UpdateProductCategoryRequest;
use App\Http\Resources\ProjectCategoryResource;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Ambil semua data kategori
        $categories = Category::all();

        // Kirim data kategori ke view menggunakan Inertia
        return Inertia::render('Backend/Product/Category/Index', [
            'Categories' => $categories, // Mengirimkan array asosiatif 'Categories'
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('Backend/Product/Category/Create', [
            'categories' => Category::all()
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

        Category::create($data);
    }

    /**
     * Display the specified resource.
     */
    public function show(Category $category)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Category $category)
    {
        return inertia('Backend/Product/Category/Edit', [
            'category' => new ProjectCategoryResource($category),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProductCategoryRequest $request, Category $category)
    {
        $data = $request->validated();

        $data['updated_by'] = Auth::id();

        $category->update($data);

        return to_route('categories.index')
            ->with('success', "Product Category \"$category->name\" was updated");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Category $category)
    {
        $name = $category->name;
        $category->delete();
        // if ($category->image_path) {
        //     Storage::disk('public')->deleteDirectory(dirname($category->image_path));
        // }
        // return to_route('categories.index')
        //     ->with('success', "Project Category \"$name\" was deleted");
    }
}
