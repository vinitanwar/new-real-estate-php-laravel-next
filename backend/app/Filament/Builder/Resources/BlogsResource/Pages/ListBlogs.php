<?php

namespace App\Filament\Builder\Resources\BlogsResource\Pages;

use App\Filament\Builder\Resources\BlogsResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListBlogs extends ListRecords
{
    protected static string $resource = BlogsResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
