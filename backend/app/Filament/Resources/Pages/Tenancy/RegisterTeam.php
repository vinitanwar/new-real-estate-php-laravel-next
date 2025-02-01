<?php

namespace App\Filament\Pages\Tenancy;
 
use App\Models\Staff;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Form;
use Filament\Pages\Tenancy\RegisterTenant;
 
class RegisterTeam extends RegisterTenant
{
    public static function getLabel(): string
    {
        return 'Register team';
    }
 
    public function form(Form $form): Form
    {
        return $form
            ->schema([
                TextInput::make('name'),
                TextInput::make('email'),
                TextInput::make('email'), 
            ]);
    }
 
    protected function handleRegistration(array $data): Staff
    {
        $team = Staff::create($data);
 
        $team->members()->attach(auth()->user());
 
        return $team;
    }
}