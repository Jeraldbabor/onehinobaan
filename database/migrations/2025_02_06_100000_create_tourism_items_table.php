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
        Schema::create('tourism_items', function (Blueprint $table) {
            $table->id();
            $table->string('type', 32); // attraction, resort, festival
            $table->string('title');
            $table->text('description')->nullable();
            $table->string('image_path')->nullable();
            $table->unsignedInteger('order_column')->default(0);
            $table->timestamps();
        });

        Schema::table('tourism_items', function (Blueprint $table) {
            $table->index('type');
            $table->index(['type', 'order_column']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tourism_items');
    }
};
