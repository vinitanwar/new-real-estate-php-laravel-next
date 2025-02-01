<?php

namespace App\Filament\Resources;

use App\Filament\Resources\TrendingPropertyResource\Pages;
use App\Filament\Resources\TrendingPropertyResource\RelationManagers;
use App\Models\TrendingProperty;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\FileUpload;

use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\ImageColumn;

class TrendingPropertyResource extends Resource
{
    protected static ?string $model = TrendingProperty::class;

    protected static ?string $navigationIcon = 'heroicon-o-building-office-2';
    protected static ?string $navigationGroup = 'Property Management';


    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                //
                TextInput::make('title'),
                TextInput::make('propertyvalue'),
                FileUpload::make('images_paths')->disk('public')->directory('storage')->image(), 
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                //
                TextColumn::make('id'),
                ImageColumn::make('images_paths'),
                TextColumn::make('title'),
                TextColumn::make('propertyvalue'),

            ])
            ->filters([
                //
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
            'index' => Pages\ListTrendingProperties::route('/'),
            'create' => Pages\CreateTrendingProperty::route('/create'),
            'edit' => Pages\EditTrendingProperty::route('/{record}/edit'),
        ];
    }
}
