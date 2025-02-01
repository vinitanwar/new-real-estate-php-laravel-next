<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

use App\Providers\Filament\AdminPanelProvider;
use App\Providers\Filament\AppPanelProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
       
    // Register Admin Panel
    $this->app->register(AdminPanelProvider::class);

    // Register App Panel
    $this->app->register(AppPanelProvider::class);

    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
