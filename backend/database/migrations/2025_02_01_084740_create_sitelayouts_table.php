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
        Schema::create('sitelayouts', function (Blueprint $table) {
            $table->id();
            $table->string("p_color")->nullable();
            $table->string("s_color")->nullable();
            $table->string("logo")->nullable();
            $table->string("number1")->nullable();
            $table->string("number2")->nullable();
            $table->string("email")->nullable();
            $table->text("address")->nullable();
           


            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sitelayouts');
    }
};
