<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Barangay extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'population',
        'history',
        'festival',
        'land_area',
        'officials',
        'image_path',
        'display_order',
    ];

    protected $casts = [
        'officials' => 'array', // Keep for backward compatibility or simple text list if needed
    ];

    public function officialsList(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(BarangayOfficial::class)->orderBy('display_order');
    }
}
