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

    // Relasi Many to One dengan Category
    public function productCategory()
    {
        return $this->belongsTo(ProductCategory::class);
    }
    public function vectorAssets()
    {
        return $this->hasMany(VectorAssets::class);
    }
}
