<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DownloadableFile extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'office',
        'file_path',
        'file_name',
        'file_size',
        'file_type',
        'is_active',
        'view_count',
        'download_count',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }
}
