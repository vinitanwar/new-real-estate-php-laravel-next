<?php

namespace App\Filament\Resources;

use App\Filament\Resources\SitelayoutResource\Pages;
use App\Filament\Resources\SitelayoutResource\RelationManagers;
use App\Models\Sitelayout;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Filament\Forms\Components\ColorPicker;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\RichEditor;
use Filament\Tables\Columns\ColorColumn;
use Filament\Tables\Columns\ImageColumn;

use Filament\Tables\Columns\TextColumn;




class SitelayoutResource extends Resource
{
    protected static ?string $model = Sitelayout::class;

    protected static ?string $navigationIcon = 'heroicon-o-window';
    protected static ?string $navigationGroup = 'System Management';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                ColorPicker::make('p_color')->label("Primary color"),
                ColorPicker::make('s_color')->label("Secondry color"),
                FileUpload::make('logo')->label("Site Logo"),
                TextInput::make('number1')->label("Number 1"),
                TextInput::make('number2')->label("Number 2"),
                TextInput::make('email')->label("Email"),
                RichEditor::make('address')->label("Address")









            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                ColorColumn::make('p_color')->label("Primary color"),
                ColorColumn::make('s_color')->label("Secondry color"),
                ImageColumn::make('logo')->label("Site Logo"),
                TextColumn::make('number1')->label("Number 1"),
                TextColumn::make('number2')->label("Number 2"),
                TextColumn::make('email')->label("Email"),
                TextColumn::make('address')->label("Address")

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
            'index' => Pages\ListSitelayouts::route('/'),
            'create' => Pages\CreateSitelayout::route('/create'),
            'edit' => Pages\EditSitelayout::route('/{record}/edit'),
        ];
    }
}
