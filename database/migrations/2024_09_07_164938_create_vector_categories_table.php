<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('vector_categories', function (Blueprint $table) {
            $table->id();
            $table->string('name'); // Nama subkategori (e.g., Illustrasi, Logo)
            $table->foreignId('product_category_id')
                ->constrained('product_categories')
                ->onDelete('cascade');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vector_categories');
    }
};
