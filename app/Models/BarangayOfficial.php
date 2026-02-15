<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class BarangayOfficial extends Model
{
    use HasFactory;

    protected $fillable = [
        'barangay_id',
        'name',
        'position',
        'image_path',
        'display_order',
    ];

    public function barangay(): BelongsTo
    {
        return $this->belongsTo(Barangay::class);
    }
}
