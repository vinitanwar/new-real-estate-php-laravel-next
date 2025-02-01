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
        Schema::create('properties', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->string('property_id')->unique();
            $table->decimal('price',); // Adjust precision and scale as needed
            $table->decimal('rate_per_square_feet')->nullable();
            $table->json('images_paths')->nullable();
            $table->unsignedBigInteger('agent_post_id')->nullable();
            $table->string('type');
            $table->integer('bedrooms')->nullable();
            $table->integer('bathrooms')->nullable();
            $table->text('property_description_1')->nullable();
            $table->text('property_description_2')->nullable();
            $table->json('multiple_features')->nullable();
            $table->text('address')->nullable();
            $table->string('google_map_lat')->nullable();
            $table->string('google_map_long')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('properties');
    }
};
