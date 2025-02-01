<?php

namespace App\Filament\Builder\Resources\BlogsResource\Pages;

use App\Filament\Builder\Resources\BlogsResource;
use Filament\Actions;
use Filament\Resources\Pages\CreateRecord;

class CreateBlogs extends CreateRecord
{
    protected static string $resource = BlogsResource::class;
}
