<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductCategory extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
    ];

    // Relasi One to Many dengan VectorCategory
    public function vectorCategories()
    {
        return $this->hasMany(VectorCategory::class, 'product_category_id');
    }
}
