<?php

namespace Database\Seeders;

use App\Models\Announcement;
use Illuminate\Database\Seeder;

class AnnouncementSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $items = [
            [
                'title' => 'Welcome to the Municipality of Hinobaan',
                'content' => '<p>We are pleased to welcome you to our official portal. Stay updated with local news, tourism, and community announcements.</p>',
                'type' => Announcement::TYPE_ANNOUNCEMENT,
                'published_at' => now(),
            ],
            [
                'title' => 'Tourism sites now featured online',
                'content' => '<p>Explore our attractions, resorts, and festivals through this website. Plan your visit to Hinobaan.</p>',
                'type' => Announcement::TYPE_NEWS,
                'published_at' => now()->subDay(),
            ],
            [
                'title' => 'Website update',
                'content' => '<p>Our new website provides easier access to information about our municipality, officials, and barangays.</p>',
                'type' => Announcement::TYPE_UPDATE,
                'published_at' => now()->subDays(2),
            ],
        ];

        foreach ($items as $item) {
            Announcement::updateOrCreate(
                ['title' => $item['title']],
                $item
            );
        }
    }
}
