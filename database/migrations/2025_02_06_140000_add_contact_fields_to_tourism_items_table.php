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
            $table->text('address')->nullable()->after('description');
            $table->string('email')->nullable()->after('address');
            $table->string('contact_number')->nullable()->after('email');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('tourism_items', function (Blueprint $table) {
            $table->dropColumn(['address', 'email', 'contact_number']);
        });
    }
};
