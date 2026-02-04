<?php

use App\Models\SiteContent;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;

return new class extends Migration
{
    /**
     * Run the migrations.
     * Move officials and barangays data into site_contents (JSON), then drop the tables.
     */
    public function up(): void
    {
        $this->migrateOfficials();
        $this->migrateBarangays();

        Schema::dropIfExists('officials');
        Schema::dropIfExists('barangays');
    }

    private function migrateOfficials(): void
    {
        if (! Schema::hasTable('officials')) {
            return;
        }

        $rows = DB::table('officials')->orderBy('display_order')->orderBy('id')->get();
        $list = $rows->map(fn ($row, $index) => [
            'id' => Str::random(8),
            'image_path' => $row->image_path,
            'display_order' => $row->display_order ?? $index + 1,
        ])->values()->all();

        $siteContent = SiteContent::firstOrCreate(
            ['key' => SiteContent::KEY_OFFICIALS],
            ['content' => '']
        );
        $siteContent->content = json_encode($list);
        $siteContent->save();
    }

    private function migrateBarangays(): void
    {
        if (! Schema::hasTable('barangays')) {
            return;
        }

        $rows = DB::table('barangays')->orderBy('display_order')->orderBy('id')->get();
        $list = $rows->map(fn ($row, $index) => [
            'id' => Str::random(8),
            'image_path' => $row->image_path,
            'display_order' => $row->display_order ?? $index + 1,
        ])->values()->all();

        $siteContent = SiteContent::firstOrCreate(
            ['key' => SiteContent::KEY_BARANGAYS],
            ['content' => '']
        );
        $siteContent->content = json_encode($list);
        $siteContent->save();
    }

    /**
     * Reverse the migrations.
     * Recreate officials and barangays tables and move data back (best-effort).
     */
    public function down(): void
    {
        Schema::create('officials', function (Blueprint $table) {
            $table->id();
            $table->string('image_path');
            $table->unsignedInteger('display_order')->default(0);
            $table->timestamps();
        });

        Schema::create('barangays', function (Blueprint $table) {
            $table->id();
            $table->string('image_path');
            $table->unsignedInteger('display_order')->default(0);
            $table->timestamps();
        });

        $officialsRow = SiteContent::where('key', SiteContent::KEY_OFFICIALS)->first();
        if ($officialsRow && $officialsRow->content) {
            $list = json_decode($officialsRow->content, true);
            if (is_array($list)) {
                $order = 1;
                foreach ($list as $item) {
                    DB::table('officials')->insert([
                        'image_path' => $item['image_path'] ?? '',
                        'display_order' => $item['display_order'] ?? $order++,
                        'created_at' => now(),
                        'updated_at' => now(),
                    ]);
                }
            }
        }

        $barangaysRow = SiteContent::where('key', SiteContent::KEY_BARANGAYS)->first();
        if ($barangaysRow && $barangaysRow->content) {
            $list = json_decode($barangaysRow->content, true);
            if (is_array($list)) {
                $order = 1;
                foreach ($list as $item) {
                    DB::table('barangays')->insert([
                        'image_path' => $item['image_path'] ?? '',
                        'display_order' => $item['display_order'] ?? $order++,
                        'created_at' => now(),
                        'updated_at' => now(),
                    ]);
                }
            }
        }
    }
};
