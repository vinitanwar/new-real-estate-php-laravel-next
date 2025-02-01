<?php

namespace App\Filament\Builder\Resources;

use App\Filament\Builder\Resources\PropertyResource\Pages;
use App\Filament\Builder\Resources\PropertyResource\RelationManagers;
use App\Models\Property;
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
use Filament\Forms\Components\MarkdownEditor;
use Filament\Forms\Components\TagsInput;
use Filament\Forms\Components\Hidden;

use Filament\Forms\Components\Select;

use Filament\Notifications\Actions\Action;
use Filament\Notifications\Notification;

use app\Module\User;
 


use Filament\Facades\Filament;


use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Actions\BulkActionGroup;
use Filament\Tables\Actions\DeleteAction;

use App\Notifications\PropertyAddedNotification;
use Illuminate\Support\Facades\Notification as LaravelNotification;

use Filament\Tables\Actions\DeleteBulkAction;

use Illuminate\Support\Str;

class PropertyResource extends Resource
{
    protected static ?string $model = Property::class;
    protected static string $resource = PropertyResource::class;

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
                    Hidden::make('agent_post_id')
                        ->default(fn() => auth()->id()),
                    Select::make('category_id')
                        ->options(\App\Models\Category::all()->pluck('title', 'id'))
                        ->required(),
                    Select::make('type')
                        ->options(\App\Models\Category::all()->pluck('title', 'id'))
                        ->required(),
                    TextInput::make('bedrooms')->nullable(),
                    TextInput::make('bathrooms')->nullable()->columnSpanFull(),
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
                    ->tooltip(fn(TextColumn $column): ?string => strlen($column->getState()) > $column->getCharacterLimit() ? $column->getState() : null),
                TextColumn::make('property_description_2')->limit(50)
                    ->tooltip(fn(TextColumn $column): ?string => strlen($column->getState()) > $column->getCharacterLimit() ? $column->getState() : null),
                TextColumn::make('address'),
                TextColumn::make('google_map_lat'),
                TextColumn::make('google_map_long'),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
            ])
            ->groupedBulkActions([
                Tables\Actions\DeleteBulkAction::make()
                    ->action(function () {
                        Notification::make()
                            ->title('Now, now, don\'t be cheeky, leave some records for others to play with!')
                            ->warning()
                            ->send();
                    }),
            ])
            ->bulkActions([
                Tables\Actions\DeleteBulkAction::make(),
            ]);
    }

    
public static function afterCreate($record): void
{
  
    Notification::make()
    ->title('New Brand Created')
    ->icon('heroicon-o-shopping-bag')
    ->body ("**New Brand created!**")
    ->sendToDatabase(auth()->user());
}


    public static function getEloquentQuery(): Builder
    {
        return parent::getEloquentQuery()
            ->where('agent_post_id', auth()->id());
    }

    protected function getTableQuery(): Builder
    {
        return parent::getTableQuery()->where('agent_post_id', fn() => Filament::auth()->id());
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
