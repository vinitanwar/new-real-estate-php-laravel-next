<?php

namespace App\Filament\Resources;

use App\Filament\Resources\BlogResource\Pages;
use App\Filament\Resources\BlogResource\RelationManagers;
use App\Models\Blog;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\ImageColumn;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\DatePicker;
class BlogResource extends Resource
{
    protected static ?string $model = Blog::class;

    protected static ?string $navigationIcon = 'heroicon-o-document-text';
    protected static ?string $navigationGroup = 'System Management';


    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                TextInput::make('title')->nullable(),
                TextInput::make('subheading')->nullable(),
                DatePicker::make('date')->nullable(),
             

                FileUpload::make('image')->nullable()->image(),
                TextInput::make('userposted_name')->nullable(),
                TextInput::make('description1')->nullable(),
                TextInput::make('heading2')->nullable(),

        

            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('id'),
                ImageColumn::make('image')->square(),
                TextColumn::make('title'),
                TextColumn::make('date'),
                TextColumn::make('userposted_name'),
                TextColumn::make('description1')->limit(50)
                ->tooltip(function (Tables\columns\TextColumn $column): ?string {
                    $state = $column->getState();

                    if (strlen($state) <= $column->getCharacterLimit()) {
                        return null;
                    }


                    return $state;
                }),
                TextColumn::make('heading2'),
            ])
            ->filters([
                //
            ])
            ->actions([
              
          
                Tables\Actions\ViewAction::make()
                ->form([
                    TextInput::make('title')
                        ->required()
                        ->maxLength(255),
                    FileUpload::make('image')->image(),
                    TextInput::make('description1')->nullable(),
                    TextInput::make('heading2')->nullable(),
                    TextInput::make('subheading')->nullable(),
                    DatePicker::make('date')->nullable(),
                       
                   
                ]),

                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
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
            'index' => Pages\ListBlogs::route('/'),
            'create' => Pages\CreateBlog::route('/create'),
            'edit' => Pages\EditBlog::route('/{record}/edit'),
        ];
    }
}
