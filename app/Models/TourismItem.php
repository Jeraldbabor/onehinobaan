<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class TourismItem extends Model
{
    public const TYPE_ATTRACTION = 'attraction';

    public const TYPE_RESORT = 'resort';

    public const TYPE_FESTIVAL = 'festival';

    protected $fillable = [
        'type',
        'title',
        'description',
        'address',
        'email',
        'contact_number',
        'social_media_url',
        'map_embed_url',
        'map_latitude',
        'map_longitude',
        'order_column',
    ];

    protected $casts = [
        'order_column' => 'integer',
        'map_latitude' => 'float',
        'map_longitude' => 'float',
    ];

    public function images(): HasMany
    {
        return $this->hasMany(TourismItemImage::class)->orderBy('order_column')->orderBy('id');
    }

    /**
     * First image URL (for backward compatibility / primary display).
     */
    public function getImageUrlAttribute(): ?string
    {
        $first = $this->images()->first();

        return $first ? $first->image_url : null;
    }

    public function scopeOfType($query, string $type)
    {
        return $query->where('type', $type)->orderBy('order_column')->orderBy('id');
    }

    /**
     * @return array<string, string>
     */
    public static function types(): array
    {
        return [
            self::TYPE_ATTRACTION => 'Attraction',
            self::TYPE_RESORT => 'Resort',
            self::TYPE_FESTIVAL => 'Festival',
        ];
    }
}
