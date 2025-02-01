<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class UserApplicationNotification extends Notification
{
    use Queueable;

    private $applicationDetails;

    public function __construct($applicationDetails)
    {
        $this->applicationDetails = $applicationDetails;
    }

    public function via($notifiable)
    {
        // Send via email and save to the database
        return ['mail', 'database'];
    }

    public function toMail($notifiable)
    {
        return (new MailMessage)
            ->line('A new application has been submitted.')
            ->line('Details: ' . $this->applicationDetails)
            ->action('View Application', url('/admin/applications'))
            ->line('Thank you for using our platform!');
    }

    public function toArray($notifiable)
    {
        return [
            'message' => 'A new application has been submitted.',
            'details' => $this->applicationDetails,
        ];
    }

   


}
