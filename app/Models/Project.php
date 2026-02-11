<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    protected $fillable = [
        'title',
        'description',
        'status',
        'image_path',
        'video_path',
        'other_images',
        'link_url',
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
