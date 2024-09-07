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
        'category_id',
        'file',
        'status',
    ];

    public function vectorCategory()
    {
        return $this->belongsTo(VectorCategory::class, 'category_id');
    }
}
