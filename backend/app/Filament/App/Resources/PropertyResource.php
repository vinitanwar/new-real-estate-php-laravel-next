<?php

namespace App\Filament\App\Resources;

use App\Filament\App\Resources\PropertyResource\Pages;
use App\Filament\App\Resources\PropertyResource\RelationManagers;
use App\Models\Property;
use Filament\Forms;
use Filament\Forms\Form;
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

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

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
                    FileUpload::make('cover_image')->disk('public')->directory('storage')->image()->label('Cover Image'),
                    FileUpload::make('images_paths')->disk('public')->directory('storage')->image()->label('Gallery Images')->multiple(),
                ])->columnSpan(0),

            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                //
            ])
            ->filters([
                //
            ])
            ->actions([
                Tables\Actions\ViewAction::make(),
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
            'index' => Pages\ListProperties::route('/'),
            'create' => Pages\CreateProperty::route('/create'),
            'view' => Pages\ViewProperty::route('/{record}'),
            'edit' => Pages\EditProperty::route('/{record}/edit'),
        ];
    }
}
