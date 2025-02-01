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
        Schema::table('properties', function (Blueprint $table) {
            $table->string('state')->nullable();
            $table->string('city')->nullable();
            $table->string('neighbourhood')->nullable();
            $table->enum('furnishing', ['Furnished', 'Semi-Furnished', 'Unfurnished'])->nullable();
            $table->enum('project_status', ['New Launch', 'Ready to Move', 'Under Construction'])->nullable();
            $table->enum('listed_by', ['Builder', 'Dealer', 'Owner'])->nullable();
            $table->decimal('maintenance_monthly', 8, 2)->nullable(); // For monthly maintenance cost
            $table->integer('floor_no')->nullable(); // Floor number
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('properties', function (Blueprint $table) {
            //
        });
    }
};
