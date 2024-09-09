<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class VectorAssets extends Model
{
    use HasFactory;

    protected $table = 'vector_assets'; // Nama tabel di database
    protected $fillable = [
        'name',
        'description',
        'vector_category_id', // Pastikan sesuai dengan migrasi
        'file',
        'price', // Menambahkan 'price' untuk sesuai dengan schema
        'status',
    ];

    public function vectorCategory()
    {
        return $this->belongsTo(VectorCategory::class, 'vector_category_id'); // Pastikan nama foreign key sesuai
    }
}
