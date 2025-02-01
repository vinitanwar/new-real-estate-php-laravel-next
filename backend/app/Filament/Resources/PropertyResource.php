<?php

namespace App\Filament\Resources;

use App\Filament\Resources\PropertyResource\Pages;
use App\Filament\Resources\PropertyResource\RelationManagers;
use App\Models\property;
use Filament\Forms;
use Filament\Forms\Form;
use App\Models\Category;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Actions\BulkActionGroup;
use Filament\Tables\Actions\DeleteAction;
use Filament\Tables\Actions\DeleteBulkAction;

use Filament\Forms\Components\TagsInput;
use Filament\Tables\Columns\NumberColumn;
use Filament\Tables\Columns\JsonColumn;

use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\MarkdownEditor;

use Filament\Forms\Components\JsonInput;
use Filament\Forms\Components\Select;
use Filament\Tables\Actions\ViewAction;

use Illuminate\Support\Str;

class PropertyResource extends Resource
{
    protected static ?string $model = Property::class;

    protected static ?string $navigationIcon = 'heroicon-o-building-library';
    protected static ?string $navigationGroup = 'Property Management';

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
                forms\Components\Section::make('Add Property')->description('Add Content')->collapsible()->schema([
                    TextInput::make('name')->required()->live()
                        ->required()->minLength(1)->maxLength(300)
                        ->afterStateUpdated(function (string $operation, $state, Forms\Set $set) {
                            if ($operation === 'edit') {
                                return;
                            }

                            $set('slug', Str::slug($state));
                        }),
                    TextInput::make('slug')->required()->minLength(1)->unique(ignoreRecord: true)->maxLength(150)->unique(),
                    TextInput::make('property_id')->required()->unique(),

                    TextInput::make('price')
                        ->tel()
                        ->telRegex('/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\.\/0-9]*$/'),
                    TextInput::make('rate_per_square_feet')->nullable()->step(0.01),
                    TagsInput::make('multiple_features')->required()->columnSpanFull(),
                    MarkdownEditor::make('property_description_1')->nullable()->columnSpanFull(),
                    MarkdownEditor::make('property_description_2')->nullable()->columnSpanFull(),
                ])->columnSpan(1)->columns(2),

                forms\Components\Section::make('Add Property')->description('Add Content')->collapsible()->schema([
                    TextInput::make('agent_post_id')->nullable(),
                    Select::make('category_id')
                        ->options(\App\Models\Category::all()->pluck('title', 'id'))
                        ->required(),
                    Select::make('type')
                        ->options(\App\Models\Category::all()->pluck('title', 'id'))
                        ->required(),
                    TextInput::make('bedrooms')->nullable(),
                    TextInput::make('bathrooms')->nullable()->columnSpanFull(),

                    // JsonInput::make('multiple_features')->nullable(),
                    Textarea::make('address')->nullable()->columnSpanFull(),
                    TextInput::make('google_map_lat')->nullable(),
                    TextInput::make('google_map_long')->nullable(),
                ])->columns(2)->columnSpan(1),

                forms\Components\Section::make('Gallery')->collapsible()->schema([
                    FileUpload::make('cover_image')->label('Cover Image')->image() // Restrict to image files
                    ->directory('blog') // S3 directory (e.g., 'users/abcd123.jpg')
                    ->disk('s3') // Use the S3 disk from config/filesystems.php
                    ->visibility(visibility: 'private') // Optional: Set file visibility
                    ->required(),
                    FileUpload::make('images_paths')->label('Gallery Images')->multiple()->image() // Restrict to image files
                    ->directory('blog') // S3 directory (e.g., 'users/abcd123.jpg')
                    ->disk('s3') // Use the S3 disk from config/filesystems.php
                    ->visibility(visibility: 'private') // Optional: Set file visibility
                    ->required(),
                ])->columnSpan(0),

              

            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('id'),
                ImageColumn::make('images_paths')->square(),
                TextColumn::make('name'),
                TextColumn::make('slug'),
                TextColumn::make('property_id'),
                TextColumn::make('price'),
                TextColumn::make('rate_per_square_feet'),

                TextColumn::make('agent_post_id'),
                TextColumn::make('type'),
                TextColumn::make('bedrooms'),
                TextColumn::make('bathrooms'),
                TextColumn::make('property_description_1')->limit(50)
                    ->tooltip(function (Tables\columns\TextColumn $column): ?string {
                        $state = $column->getState();

                        if (strlen($state) <= $column->getCharacterLimit()) {
                            return null;
                        }


                        return $state;
                    }),
                TextColumn::make('property_description_2')->limit(50)
                    ->tooltip(function (Tables\columns\TextColumn $column): ?string {
                        $state = $column->getState();

                        if (strlen($state) <= $column->getCharacterLimit()) {
                            return null;
                        }


                        return $state;
                    }),

                TextColumn::make('address'),
                TextColumn::make('google_map_lat'),
                TextColumn::make('google_map_long'),
            ])
            ->filters([
                //
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                DeleteAction::make(),
                ViewAction::make()
                ->form([
                    TextInput::make('name')
                        ->required()
                        ->maxLength(255),
                   
                ]),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([

                    DeleteBulkAction::make(),
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
            'index' => Pages\ListProperties::route('/'),
            'create' => Pages\CreateProperty::route('/create'),
            'edit' => Pages\EditProperty::route('/{record}/edit'),
        ];
    }
}
