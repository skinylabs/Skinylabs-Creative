<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class VectorCategory extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'product_category_id',
    ];

    // Relasi Many to One dengan ProductCategory
    public function productCategory()
    {
        return $this->belongsTo(ProductCategory::class, 'product_category_id');
    }

    // Definisi relasi banyak ke banyak dengan VectorAssets
    public function vectorAssets()
    {
        return $this->belongsToMany(VectorAssets::class, 'vector_assets_category', 'vector_category_id', 'vector_assets_id');
    }
}
