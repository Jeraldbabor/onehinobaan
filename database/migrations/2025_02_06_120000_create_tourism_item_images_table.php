<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('tourism_item_images', function (Blueprint $table) {
            $table->id();
            $table->foreignId('tourism_item_id')->constrained('tourism_items')->cascadeOnDelete();
            $table->string('image_path');
            $table->unsignedInteger('order_column')->default(0);
            $table->timestamps();
        });

        // Move existing single image into the new table
        $items = DB::table('tourism_items')->whereNotNull('image_path')->get();
        foreach ($items as $item) {
            DB::table('tourism_item_images')->insert([
                'tourism_item_id' => $item->id,
                'image_path' => $item->image_path,
                'order_column' => 0,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        Schema::table('tourism_items', function (Blueprint $table) {
            $table->dropColumn('image_path');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('tourism_items', function (Blueprint $table) {
            $table->string('image_path')->nullable()->after('description');
        });

        $images = DB::table('tourism_item_images')->orderBy('tourism_item_id')->orderBy('order_column')->get();
        $firstByItem = [];
        foreach ($images as $img) {
            if (! isset($firstByItem[$img->tourism_item_id])) {
                $firstByItem[$img->tourism_item_id] = $img->image_path;
            }
        }
        foreach ($firstByItem as $itemId => $path) {
            DB::table('tourism_items')->where('id', $itemId)->update(['image_path' => $path]);
        }

        Schema::dropIfExists('tourism_item_images');
    }
};
