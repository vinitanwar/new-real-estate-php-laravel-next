<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     * 
     */
    protected $table = 'trending_properties';

    
    public function up(): void
    {
        Schema::create('trending_properties', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('images_paths')->nullable();
            $table->text('propertyvalue')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('trending_properties');
    }
};
