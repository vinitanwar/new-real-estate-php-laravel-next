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
        Schema::create('property_applications', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');          
            $table->string('user_name');                    
            $table->unsignedBigInteger('property_id');      
            $table->string('property_name');                 
            $table->unsignedBigInteger('builder_id');      
            $table->string('builder_name');                 
            $table->string('builder_phone_number');        
            $table->string('user_phone_number');             
            $table->string('status')->default('pending');    
            $table->text('notes')->nullable();           
            $table->timestamps();                          

            // Define foreign key constraints
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('property_id')->references('id')->on('properties')->onDelete('cascade');
            $table->foreign('builder_id')->references('id')->on('site_users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('property_applications');
    }
};
