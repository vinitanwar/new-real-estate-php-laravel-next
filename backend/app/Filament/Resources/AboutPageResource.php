<?php

namespace App\Filament\Resources;

use App\Filament\Resources\AboutPageResource\Pages;
use App\Filament\Resources\AboutPageResource\RelationManagers;
use App\Models\AboutPage;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

use Filament\Tables\Columns\TextColumn;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Card;
use Filament\Forms\Components\Section;
use Filament\Forms\Components\RichEditor;

use Filament\Tables\Columns\HtmlColumn;
//RichEditor
class AboutPageResource extends Resource
{
    protected static ?string $model = AboutPage::class;

    protected static ?string $navigationIcon = 'heroicon-o-chat-bubble-bottom-center';
    protected static ?string $navigationGroup = 'Appearance';
    public static function form(Form $form): Form
    {
        return $form
        ->schema([
            Card::make([
                FileUpload::make('banner_img')
                    ->label('Banner Image')
                    ->image()
                    ->disk('public')
                    ->directory('about-page')
                    ->imagePreviewHeight('150') // Optional: Adjust preview height
                    ->required()
                    ->helperText('Upload a banner image for the About Page.'),
            ])->columns(1), // Use Card component for better styling

            Section::make('FAQ Section')->schema([
                Repeater::make('faq_section')
                    ->label('FAQs')
                    ->schema([
                        TextInput::make('question')
                            ->label('Question')
                            ->placeholder('Enter the question')
                            ->required()
                            ->helperText('Provide the question for the FAQ.'),
                        TextInput::make('answer')
                            ->label('Answer')
                            ->placeholder('Enter the answer')
                            ->required()
                            ->helperText('Provide the answer for the FAQ.'),
                    ])
                    ->collapsible()
                    ->defaultItems(1)
                    ->createItemButtonLabel('Add FAQ')
                    ->itemLabel('FAQ'),
            ]),

            Section::make('Blog Cards')->schema([
                Repeater::make('blog_card')
                    ->label('Blog Cards')
                    ->schema([
                        TextInput::make('title')
                            ->label('Title')
                            ->placeholder('Enter the blog card title')
                            ->required()
                            ->helperText('Title of the blog card.'),
                        TextInput::make('description')
                            ->label('Description')
                            ->placeholder('Enter the blog card description')
                            ->required()
                            ->helperText('Description for the blog card.'),
                        FileUpload::make('image')
                            ->label('Image')
                            ->image()
                            ->disk('public')
                            ->directory('about-page/blog-cards')
                            ->imagePreviewHeight('150') 
                            ->helperText('Upload an image for the blog card.'),
                    ])
                    ->collapsible()
                    ->defaultItems(1)
                    ->createItemButtonLabel('Add Blog Card')
                    ->itemLabel('Blog Card'),
            ]),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
        ->columns([
          

             
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
            'index' => Pages\ListAboutPages::route('/'),
            'create' => Pages\CreateAboutPage::route('/create'),
            'edit' => Pages\EditAboutPage::route('/{record}/edit'),
        ];
    }
}
