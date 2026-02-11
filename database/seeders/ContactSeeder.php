<?php

namespace Database\Seeders;

use App\Models\SiteContent;
use Illuminate\Database\Seeder;

class ContactSeeder extends Seeder
{
    /**
     * Seed default contact information (only when not already set).
     */
    public function run(): void
    {
        $contact = SiteContent::getContact();
        $hasAny = trim($contact['address'] ?? '') !== ''
            || trim($contact['phone'] ?? '') !== ''
            || trim($contact['email'] ?? '') !== '';

        if ($hasAny) {
            return;
        }

        SiteContent::setContact([
            'address' => 'Municipal Hall, Hinobaan, Negros Occidental 6114 Philippines',
            'phone' => ' (+63) 921-851-1649',
            'email' => 'info@hinobaan.gov.ph',
            'map_embed_url' => 'https://maps.app.goo.gl/Pfu2PwqJduGb2vp68',
        ]);
    }
}
