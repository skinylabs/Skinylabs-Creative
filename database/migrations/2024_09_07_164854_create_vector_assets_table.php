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
        Schema::create('vector_assets', function (Blueprint $table) {
            $table->id();
            $table->string('name'); // Nama aset
            $table->text('description'); // Deskripsi aset

            $table->string('file'); // Path file vector
            $table->decimal('price', 10, 2); // Harga aset
            $table->boolean('status')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vector_assets');
    }
};
