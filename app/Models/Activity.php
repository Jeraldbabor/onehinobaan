<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Activity extends Model
{
    protected $fillable = [
        'title',
        'content',
        'link_url',
        'image_path',
        'other_images',
        'published_at',
    ];

    protected $casts = [
        'published_at' => 'datetime',
        'other_images' => 'array',
    ];

    public function scopePublished($query)
    {
        return $query->where(function ($q) {
            $q->whereNull('published_at')
                ->orWhere('published_at', '<=', now());
        });
    }
}
