<?php

namespace App\Models;

use Illuminate\Support\Collection;

class DummyModel
{
    public $order_date;
    public $builder_name;
    public $property_name;
    public $user_name;
    public $status;
    public $user_contact_number;
    public $builder_contact_number;

    public function __construct($order_date, $builder_name, $property_name, $user_name, $status, $user_contact_number, $builder_contact_number)
    {
        $this->order_date = $order_date;
        $this->builder_name = $builder_name;
        $this->property_name = $property_name;
        $this->user_name = $user_name;
        $this->status = $status;
        $this->user_contact_number = $user_contact_number;
        $this->builder_contact_number = $builder_contact_number;
    }

    public static function all()
    {
        return new Collection([
            new self('2024-07-20', 'Builder A', 'Property X', 'User 1', 'Pending', '123-456-7890', '098-765-4321'),
            new self('2024-07-19', 'Builder B', 'Property Y', 'User 2', 'Completed', '234-567-8901', '987-654-3210'),
            // Add more dummy data as needed
        ]);
    }
}
