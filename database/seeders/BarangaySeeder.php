<?php

namespace Database\Seeders;

use App\Models\Barangay;
use Illuminate\Database\Seeder;

class BarangaySeeder extends Seeder
{
    /**
     * Seed the barangays table with official Hinoba-an barangays.
     *
     * Data can be updated later through the admin dashboard.
     */
    public function run(): void
    {
        $barangays = [
            ['name' => 'Alim', 'display_order' => 1],
            ['name' => 'Asia', 'display_order' => 2],
            ['name' => 'Bacuyangan', 'display_order' => 3],
            ['name' => 'Barangay I (Poblacion)', 'display_order' => 4],
            ['name' => 'Barangay II (Poblacion)', 'display_order' => 5],
            ['name' => 'Bulwangan', 'display_order' => 6],
            ['name' => 'Culipapa', 'display_order' => 7],
            ['name' => 'Damutan', 'display_order' => 8],
            ['name' => 'Daug', 'display_order' => 9],
            ['name' => 'Po-ok', 'display_order' => 10],
            ['name' => 'San Rafael', 'display_order' => 11],
            ['name' => 'Sangke', 'display_order' => 12],
            ['name' => 'Talacagay', 'display_order' => 13],
        ];

        foreach ($barangays as $data) {
            Barangay::updateOrCreate(
                ['name' => $data['name']],
                $data
            );
        }
    }
}
