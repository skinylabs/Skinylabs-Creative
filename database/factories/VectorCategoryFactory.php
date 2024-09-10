<?php

namespace Database\Factories;

use App\Models\ProductCategory;
use App\Models\VectorCategory;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\VectorCategory>
 */
class VectorCategoryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */

    protected $model = VectorCategory::class;

    public function definition(): array
    {
        return [
            'name' => $this->faker->randomElement(['Illustrasi', 'Logo', 'Icon', 'Background']), // Subkategori acak
            'product_category_id' => ProductCategory::factory(), // Relasi dengan `ProductCategory`
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
