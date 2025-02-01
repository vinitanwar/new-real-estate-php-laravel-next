<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use DB;

class StatesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $states = [
            ['id' => 1, 'name' => 'ANDHRA PRADESH'],
            ['id' => 2, 'name' => 'ASSAM'],
            ['id' => 3, 'name' => 'ARUNACHAL PRADESH'],
            ['id' => 4, 'name' => 'BIHAR'],
            ['id' => 5, 'name' => 'GUJRAT'],
            ['id' => 6, 'name' => 'HARYANA'],
            ['id' => 7, 'name' => 'HIMACHAL PRADESH'],
            ['id' => 8, 'name' => 'JAMMU & KASHMIR'],
            ['id' => 9, 'name' => 'KARNATAKA'],
            ['id' => 10, 'name' => 'KERALA'],
            ['id' => 11, 'name' => 'MADHYA PRADESH'],
            ['id' => 12, 'name' => 'MAHARASHTRA'],
            ['id' => 13, 'name' => 'MANIPUR'],
            ['id' => 14, 'name' => 'MEGHALAYA'],
            ['id' => 15, 'name' => 'MIZORAM'],
            ['id' => 16, 'name' => 'NAGALAND'],
            ['id' => 17, 'name' => 'ORISSA'],
            ['id' => 18, 'name' => 'PUNJAB'],
            ['id' => 19, 'name' => 'RAJASTHAN'],
            ['id' => 20, 'name' => 'SIKKIM'],
            ['id' => 21, 'name' => 'TAMIL NADU'],
            ['id' => 22, 'name' => 'TRIPURA'],
            ['id' => 23, 'name' => 'UTTAR PRADESH'],
            ['id' => 24, 'name' => 'WEST BENGAL'],
            ['id' => 25, 'name' => 'DELHI'],
            ['id' => 26, 'name' => 'GOA'],
            ['id' => 27, 'name' => 'PONDICHERY'],
            ['id' => 28, 'name' => 'LAKSHDWEEP'],
            ['id' => 29, 'name' => 'DAMAN & DIU'],
            ['id' => 30, 'name' => 'DADRA & NAGAR'],
            ['id' => 31, 'name' => 'CHANDIGARH'],
            ['id' => 32, 'name' => 'ANDAMAN & NICOBAR'],
            ['id' => 33, 'name' => 'UTTARANCHAL'],
            ['id' => 34, 'name' => 'JHARKHAND'],
            ['id' => 35, 'name' => 'CHATTISGARH']
        ];

        DB::table('states')->insert($states);
    
    }
}
