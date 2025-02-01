<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;


class PropertyAddedNotification extends Notification
{
    use Queueable;

    private $property;

    public function __construct($property)
    {
        $this->property = $property;
    }

    public function via($notifiable)
    {
        return ['mail', 'database']; // Send via email and store in the database
    }

    public function toMail($notifiable)
    {
        return (new MailMessage)
            ->line('A new property has been added by a builder.')
            ->line('Property Name: ' . $this->property->name)
            ->line('Location: ' . $this->property->location)
            ->action('View Property', url('/admin/properties/' . $this->property->id))
            ->line('Thank you for using our platform!');
    }

    public function toArray($notifiable)
    {
        return [
            'message' => 'A new property has been added.',
            'property_name' => $this->property->name,
            'location' => $this->property->location,
            'property_id' => $this->property->id,
        ];
    }
}
