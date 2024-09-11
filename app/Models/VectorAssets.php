<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class VectorAssets extends Model
{
    use HasFactory;

    protected $table = 'vector_assets'; // Nama tabel di database

    protected $fillable = [
        'name',
        'description',
        'price',
        'file',
        'status',
    ];



    // Definisi relasi banyak ke banyak dengan VectorCategory
    /**
     * The categories that belong to the vector asset.
     */
    public function vectorCategory()
    {
        return $this->belongsToMany(VectorCategory::class, 'vector_assets_category', 'vector_assets_id', 'vector_category_id');
    }
}
