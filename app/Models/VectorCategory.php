<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class VectorCategory extends Model
{
    use HasFactory;

    protected $table = 'vector_categories'; // Nama tabel di database
    protected $fillable = [
        'name',
        'category_id',
    ];

    public function category()
    {
        return $this->belongsTo(Category::class, 'category_id');
    }

    public function vectorAssets()
    {
        return $this->hasMany(VectorAssets::class, 'category_id');
    }
}
