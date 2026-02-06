<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::updateOrCreate(
            ['email' => 'admin@hinobaan.ph'],
            [
                'name' => 'Portal Admin',
                'password' => Hash::make('Admin@Hinobaan1'),
                'email_verified_at' => now(),
                'is_admin' => true,
            ]
        );

        $this->call([
            AnnouncementSeeder::class,
            ContactSeeder::class,
        ]);
    }
}
