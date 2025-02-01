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
        Schema::table('testimonial', function (Blueprint $table) {
            $table->string('name')->after('id'); // Add the columns after 'id' column
            $table->string('lastname')->after('name');
            $table->string('title')->after('lastname');
            $table->string('description')->after('title');
            $table->string('image')->after('description');
            $table->decimal('rating', 3, 2)->default(0)->after('image');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('testimonial', function (Blueprint $table) {
            $table->dropColumn(['name', 'lastname', 'title', 'description', 'image', 'rating']);
        });
    }
};
