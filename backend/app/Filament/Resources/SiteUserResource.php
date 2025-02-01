<?php

namespace App\Filament\Resources;

use App\Filament\Resources\SiteUserResource\Pages;
use App\Filament\Resources\SiteUserResource\RelationManagers;
use App\Models\SiteUser;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\NumberInput;

use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Filament\Tables\Columns\TextInputColumn;
use Filament\Tables\Columns\TextColumn;

use Illuminate\Database\Eloquent\SoftDeletingScope;

class SiteUserResource extends Resource
{
    protected static ?string $model = SiteUser::class;

    protected static ?string $navigationIcon = 'heroicon-o-user-group';
    protected static ?string $navigationGroup = 'Builder Management';

    protected static ?string $recordTitleAttribute = 'name';

    public static function  getNavigationBadge(): ?string 
    {
     return  static::getModel()::count();
    }

    public static function  getNavigationBadgeColor(): string|array|null
    {
     return  static::getModel()::count() > 10 ? 'sueccss' : 'warning';
    }

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                TextInput::make('name'),
                TextInput::make('email'),
                TextInput::make('phone')
    ->tel()
    ->telRegex('/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\.\/0-9]*$/')->label('Phone Number'),
                TextInput::make('password'),


             
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                //
                TextColumn::make('id'),
                TextColumn::make('name'),
                TextColumn::make('phone'),
               

                TextColumn::make('email'),

            ])
            ->filters([
               SelectFilter::make('name')
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListSiteUsers::route('/'),
            'create' => Pages\CreateSiteUser::route('/create'),
            'edit' => Pages\EditSiteUser::route('/{record}/edit'),
        ];
    }
}
