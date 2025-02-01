<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

use App\Providers\Filament\AdminPanelProvider;
use App\Providers\Filament\AppPanelProvider;
use TomatoPHP\FilamentInvoices\Facades\FilamentInvoices;
use TomatoPHP\FilamentInvoices\Services\Contracts\InvoiceFor;
use TomatoPHP\FilamentInvoices\Services\Contracts\InvoiceFrom;
use App\Models\Account;
use App\Models\Company;
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
        FilamentInvoices::registerFor([
            InvoiceFor::make(Account::class)
                ->label('Account')
        ]);
        FilamentInvoices::registerFrom([
            InvoiceFrom::make(Company::class)
                ->label('Company')
        ]);
    }
}
