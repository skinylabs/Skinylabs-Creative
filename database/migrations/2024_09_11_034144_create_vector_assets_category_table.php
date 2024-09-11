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
        Schema::create('vector_assets_category', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('vector_assets_id');
            $table->unsignedBigInteger('vector_category_id');
            $table->foreign('vector_assets_id')->references('id')->on('vector_assets')->onDelete('cascade');
            $table->foreign('vector_category_id')->references('id')->on('vector_categories')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vector_assets_category');
    }
};
