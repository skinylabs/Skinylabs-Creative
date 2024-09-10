<?php

namespace Database\Seeders;

use App\Models\ProductCategory;
use App\Models\User;
use App\Models\VectorCategory;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'UseR',
            'email' => 'user@user.com',
            'password' => 'useruser',
        ]);

        // Buat beberapa kategori produk, lalu tambahkan subkategori vector
        ProductCategory::factory(20)->create()->each(function ($category) {
            // Untuk setiap kategori produk, buat 3 subkategori vector
            VectorCategory::factory(30)->create([
                'product_category_id' => $category->id, // Relasi ke kategori produk
            ]);
        });
    }
}
