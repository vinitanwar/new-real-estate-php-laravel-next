<?php

namespace App\Filament\Resources;

use App\Filament\Resources\PropertyResource\Pages;
use App\Filament\Resources\PropertyResource\RelationManagers;
use App\Models\property;
use Filament\Forms;
use Filament\Forms\Form;
use App\Models\category;
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
use Filament\Tables\Columns\ToggleColumn;
use Filament\Forms\Components\TagsInput;
use Filament\Tables\Columns\NumberColumn;
use Filament\Tables\Columns\JsonColumn;
use Filament\Forms\Components\Toggle;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\MarkdownEditor;

use Filament\Forms\Components\JsonInput;
use Filament\Forms\Components\Select;
use Filament\Tables\Actions\ViewAction;
use Illuminate\Support\Facades\Http;

use App\Models\City;
use App\Models\State;
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
        return  static::getModel()::count() > 10 ? 'sueccss' : 'sueccss';
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
                    TextInput::make('slug'),
                    TextInput::make('property_id')->required(),


                    TextInput::make('rate_per_square_feet')->nullable()->step(0.01),
                    TagsInput::make('multiple_features')->required()->columnSpanFull(),
                    MarkdownEditor::make('property_description_1')->nullable()->columnSpanFull(),
                    MarkdownEditor::make('property_description_2')->nullable()->columnSpanFull(),
                ])->columnSpan(1)->columns(2),

                Forms\Components\Section::make('Add Property')
                ->description('Add Content')
                ->collapsible()
                ->schema([
                   
                    TextInput::make('agent_post_id')
                        ->default(1)  // Set the default value to 1
                        ->hidden(),
            
                    // Hardcoded Category Options
                    Select::make('category_id')
                        ->options([
                            'sell' => 'Sell',
                            'rent' => 'Rent',
                        ])
                        ->required(),
            
                    Select::make('type')
                        ->options(\App\Models\Category::all()->pluck('title', 'id')) // Keep dynamic options for 'type'
                        ->required(),
            
                        Select::make('bedrooms')
                        ->options([
                            1 => '1',
                            2 => '2',
                            3 => '3',
                            4 => '4',
                            5 => '5',
                        ])
                        ->nullable(),
                    
                    Select::make('bathrooms')
                        ->options([
                            1 => '1',
                            2 => '2',
                            3 => '3',
                            4 => '4',
                            5 => '5',
                        ])
                        ->nullable(),
                    
            
                    // Select::make('furnishing')
                    //     ->options([
                    //         'Furnished' => 'Furnished',
                    //         'Semi-Furnished' => 'Semi-Furnished',
                    //         'Unfurnished' => 'Unfurnished',
                    //     ])
                    //     ->nullable(),
            
                    // Select::make('project_status')
                    //     ->options([
                    //         'New Launch' => 'New Launch',
                    //         'Ready to Move' => 'Ready to Move',
                    //         'Under Construction' => 'Under Construction',
                    //     ])
                    //     ->nullable(),
            
                    // Select::make('listed_by')
                    //     ->options([
                    //         'Builder' => 'Builder',
                    //         'Dealer' => 'Dealer',
                    //         'Owner' => 'Owner',
                    //     ])
                    //     ->nullable(),
            
                    TextInput::make('maintenance_monthly')
                        ->nullable()
                        ->numeric() // Ensures that only numeric values are entered
                        ->placeholder('Enter Monthly Maintenance Amount')
                        ->visible(fn($get) => $get('category_id') === 'rent'), // Only visible for rent
            
                    TextInput::make('floor_no')
                        ->nullable()
                        ->numeric() // Ensures that only numeric values are entered
                        ->placeholder('Enter Floor Number')
                        ->visible(fn($get) => $get('category_id') === 'rent'), // Only visible for rent
            
                    TextInput::make('price')
                        ->nullable()
                        ->numeric() // Ensures that only numeric values are entered
                        ->placeholder('Enter Price')
                        ->visible(fn($get) => $get('category_id') === 'sell'), // Only visible for sell
            
                    TextInput::make('monthly_rent')
                        ->nullable()
                        ->numeric() // Ensures that only numeric values are entered
                        ->placeholder('Enter Monthly Rent')
                        ->visible(fn($get) => $get('category_id') === 'rent'), // Only visible for rent
            
                  
                        
                     
            
                        Forms\Components\Select::make('state_id')
                        ->label('State')
                        ->options(State::all()->pluck('name', 'id'))  // Get all states
                        ->reactive()  // Make the state select field reactive
                        ->required()
                        ->searchable(),
                    
                    Forms\Components\Select::make('city_id')
                        ->label('City')
                        ->options(function (callable $get) {
                            $stateId = $get('state_id');  // Get the selected state ID
    
                            if ($stateId) {
                                return City::where('state_id', $stateId)->pluck('city', 'id');
                            }
    
                            return [];  // Return an empty array if no state is selected
                        })
                        ->required()
                        ->searchable(),
            
                TextInput::make('neighbourhood')
                        ->nullable(),

            
                    // Optionally, make some of these fields conditional
                    Select::make('furnishing')
                        ->options([
                            'Furnished' => 'Furnished',
                            'Semi-Furnished' => 'Semi-Furnished',
                            'Unfurnished' => 'Unfurnished',
                        ])
                        ->nullable(),
            
                    Select::make('project_status')
                        ->options([
                            'New Launch' => 'New Launch',
                            'Ready to Move' => 'Ready to Move',
                            'Under Construction' => 'Under Construction',
                        ])
                        ->nullable(),
            
                    Select::make('listed_by')
                        ->options([
                            'Builder' => 'Builder',
                            'Dealer' => 'Dealer',
                            'Owner' => 'Owner',
                        ])
                        ->nullable(),
            
                    // TextInput::make('maintenance_monthly')
                    //     ->nullable()
                    //     ->numeric() // Ensures that only numeric values are entered
                    //     ->placeholder('Enter Monthly Maintenance Amount')
                    //     ->visible(fn($get) => $get('category_id') === 'rent'), // Only visible for rent
            
                    // TextInput::make('floor_no')
                    //     ->nullable()
                    //     ->numeric() // Ensures that only numeric values are entered
                    //     ->placeholder('Enter Floor Number')
                    //     ->visible(fn($get) => $get('category_id') === 'rent'), // Only visible for rent
            
                    Textarea::make('address')->nullable()->columnSpanFull(),
                    TextInput::make('google_map_lat')->nullable(),
                    TextInput::make('google_map_long')->nullable(),
                ])
                ->columns(2) // Adjust the number of columns as needed
                ->columnSpan(1),
            

                

                forms\Components\Section::make('Gallery')->collapsible()->schema([
                    FileUpload::make('cover_image')
                        ->disk('public')
                        ->directory('storage')
                        ->image()
                        ->label('Cover Image'),
                    FileUpload::make('images_paths')
                        ->disk('public')
                        ->directory('storage')
                        ->image()
                        ->label('Gallery Images')
                        ->multiple(),
                ])->columnSpan(0),



            ]);
    }

    public static function fetchLocationDetails($pincode, $set)
    {
        if (!$pincode) return;
    
        // Make the GET request to the API
        $response = Http::get("https://api.postalpincode.in/pincode/{$pincode}");
    
        if ($response->successful()) {
            $data = $response->json();
            $location = $data[0]['PostOffice'][0] ?? null;
    
            if ($location) {
                $set('state', $location['State'] ?? null);
                $set('city', $location['District'] ?? null);
                $set('neighbourhood', $location['Name'] ?? null);
            }
        }
    }
    

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('id'),
                ToggleColumn::make('active'),
                TextColumn::make('agent.name')->label('Agent Name'),

                // agent_post_id
                ImageColumn::make('images_paths')->square(),
                TextColumn::make('name'),
                TextColumn::make('slug'),

                TextColumn::make('property_id'),

                TextColumn::make('price'),
                TextColumn::make('rate_per_square_feet'),


                TextColumn::make('agent.name')
                    ->label('Agent'),
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
                TextColumn::make('google_map_long')
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
