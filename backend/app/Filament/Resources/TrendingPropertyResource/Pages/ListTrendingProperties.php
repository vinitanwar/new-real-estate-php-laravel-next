<?php

namespace App\Filament\Resources\TrendingPropertyResource\Pages;

use App\Filament\Resources\TrendingPropertyResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListTrendingProperties extends ListRecords
{
    protected static string $resource = TrendingPropertyResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
