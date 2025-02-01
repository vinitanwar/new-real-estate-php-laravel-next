<?php

namespace App\Http\Controllers;

use TomatoPHP\FilamentInvoices\Facades\FilamentInvoices;
use App\Models\Account;
use Illuminate\Http\Request;

class InvoiceController extends Controller
{
    /**
     * Create a new invoice.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function createInvoice()
    {
        try {
            // Retrieve accounts
            $recipientAccount = Account::find(1);
            $senderAccount = Account::find(4);
    
            // Check if accounts exist
            if (!$recipientAccount) {
                return response()->json(['message' => 'Recipient account not found!'], 404);
            }
            if (!$senderAccount) {
                return response()->json(['message' => 'Sender account not found!'], 404);
            }
    
            // Debugging: Log account details
            \Log::info('Recipient Account:', $recipientAccount->toArray());
            \Log::info('Sender Account:', $senderAccount->toArray());
    
            // Create an invoice
            $invoice = FilamentInvoices::create()
                ->for($recipientAccount) // The recipient account
                ->from($senderAccount) // The sender account
                ->dueDate(now()->addDays(7)) // Due date
                ->date(now()) // Issue date
                ->items([
                    \TomatoPHP\FilamentInvoices\Services\Contracts\InvoiceItem::make('Product A')
                        ->description('High-quality product A')
                        ->qty(2)
                        ->price(150),
                    \TomatoPHP\FilamentInvoices\Services\Contracts\InvoiceItem::make('Service B')
                        ->description('Premium service B')
                        ->qty(1)
                        ->discount(20) // Discount
                        ->vat(5) // VAT
                        ->price(300),
                ])
                ->save(); // Save the invoice
    
            return response()->json(['message' => 'Invoice created successfully!', 'invoice' => $invoice], 201);
        } catch (\Exception $e) {
            // Debugging: Log the exception message
            \Log::error('Invoice creation failed:', ['error' => $e->getMessage()]);
            return response()->json(['message' => 'Failed to create invoice!', 'error' => $e->getMessage()], 500);
        }
    }
    
    
}
