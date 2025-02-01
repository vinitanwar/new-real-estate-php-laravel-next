<?php

namespace App\Filament\Resources\TrendingPropertyResource\Pages;

use App\Filament\Resources\TrendingPropertyResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditTrendingProperty extends EditRecord
{
    protected static string $resource = TrendingPropertyResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}
