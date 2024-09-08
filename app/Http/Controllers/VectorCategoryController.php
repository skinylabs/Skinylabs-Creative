<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreVectorCategoryRequest;
use App\Http\Requests\UpdateVectorCategoryRequest;
use App\Models\VectorCategory;
use App\Models\Category;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class VectorCategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $vectorCategories = VectorCategory::with('category')->paginate(10);

        return Inertia::render('Backend/Product/Vector/Category/Index', [
            'VectorCategories' => $vectorCategories,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Backend/Vector/Category/Create', [
            'categories' => Category::all()
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
