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
        Schema::table('tourism_items', function (Blueprint $table) {
            $table->decimal('map_latitude', 10, 7)->nullable()->after('map_embed_url');
            $table->decimal('map_longitude', 10, 7)->nullable()->after('map_latitude');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('tourism_items', function (Blueprint $table) {
            $table->dropColumn(['map_latitude', 'map_longitude']);
        });
    }
};
