<?php

namespace App\Filament\Resources\SiteUserResource\Pages;

use App\Filament\Resources\SiteUserResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;
use Filament\Resources\Pages\ListRecords\Tab;

use Illuminate\Database\Eloquent\Builder;
class ListSiteUsers extends ListRecords
{
    protected static string $resource = SiteUserResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }

    public  function getTabs(): array
    {
        return [
            'All' => Tab::make(),
            'This Week' => Tab::make()
                ->modifyQueryUsing(fn (Builder $query)=> $query->where('created_at', '>=' , now()->subWeek())),
            'This Month' => Tab::make()
                ->modifyQueryUsing(fn (Builder $query)=> $query->where('created_at', '>=' , now()->subMonth())),
            'This Year' => Tab::make()
                ->modifyQueryUsing(fn (Builder $query)=> $query->where('created_at', '>=' , now()->subYear())),
        ];
    }
}
