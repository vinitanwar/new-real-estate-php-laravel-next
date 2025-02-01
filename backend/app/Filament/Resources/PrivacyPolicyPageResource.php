<?php

namespace App\Filament\Resources;

use App\Filament\Resources\PrivacyPolicyPageResource\Pages;
use App\Filament\Resources\PrivacyPolicyPageResource\RelationManagers;
use App\Models\PrivacyPolicyPage;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class PrivacyPolicyPageResource extends Resource
{
    protected static ?string $model = PrivacyPolicyPage::class;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\FileUpload::make('hero_img_1')
                ->label('Hero Image 1')
                ->required(),
            
            Forms\Components\Textarea::make('description1')
                ->label('Description 1')
                ->required(),

            Forms\Components\Textarea::make('description2')
                ->label('Description 2')
                ->required(),

            Forms\Components\Textarea::make('description3')
                ->label('Description 3')
                ->required(),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('hero_img_1')
                ->label('Hero Image 1'),

            Tables\Columns\TextColumn::make('description1')
                ->label('Description 1'),

            Tables\Columns\TextColumn::make('description2')
                ->label('Description 2'),

            Tables\Columns\TextColumn::make('description3')
                ->label('Description 3'),
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
            'index' => Pages\ListPrivacyPolicyPages::route('/'),
            'create' => Pages\CreatePrivacyPolicyPage::route('/create'),
            'edit' => Pages\EditPrivacyPolicyPage::route('/{record}/edit'),
        ];
    }
}
