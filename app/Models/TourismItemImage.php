<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Storage;

class TourismItemImage extends Model
{
    protected $fillable = [
        'tourism_item_id',
        'image_path',
        'order_column',
    ];

    protected $casts = [
        'order_column' => 'integer',
    ];

    protected static function booted(): void
    {
        static::deleting(function (TourismItemImage $image) {
            if ($image->image_path) {
                Storage::disk('public')->delete($image->image_path);
            }
        });
    }

    public function tourismItem(): BelongsTo
    {
        return $this->belongsTo(TourismItem::class);
    }

    public function getImageUrlAttribute(): string
    {
        return '/storage/'.ltrim($this->image_path, '/');
    }
}
