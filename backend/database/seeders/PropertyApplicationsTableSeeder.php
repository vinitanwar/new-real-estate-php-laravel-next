<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class PropertyApplicationsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('property_applications')->insert([
            [
                'user_id' => 1,
                'user_name' => 'John Doe',
                'property_id' => 1,
                'property_name' => 'Luxury Apartment',
                'builder_id' => 1,
                'builder_name' => 'Builder Inc.',
                'builder_phone_number' => '123-456-7890',
                'user_phone_number' => '098-765-4321',
                'status' => 'pending',
                'notes' => 'First-time applicant.',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'user_id' => 2,
                'user_name' => 'Jane Smith',
                'property_id' => 2,
                'property_name' => 'Modern Villa',
                'builder_id' => 2,
                'builder_name' => 'Builders Group',
                'builder_phone_number' => '234-567-8901',
                'user_phone_number' => '876-543-2109',
                'status' => 'approved',
                'notes' => 'Approved for purchase.',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
        ]);
    }
}
