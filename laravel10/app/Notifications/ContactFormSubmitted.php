<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class ContactFormSubmitted extends Notification
{
    use Queueable;

    protected $nom;
    protected $email;
    protected $sujet;
    protected $messageContent;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct($nom, $email, $sujet, $messageContent)
    {
        $this->nom = $nom;
        $this->email = $email;
        $this->sujet = $sujet;
        $this->messageContent = $messageContent;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail($notifiable) : MailMessage
    {
        return (new MailMessage)
            ->subject('Formulaire de contact - ' . $this->sujet)
            ->greeting('Hello!')
            ->line('You have received a new contact form submission.')
            ->line('Nom & Prénom: ' . $this->nom)
            ->line('Email: ' . $this->email)
            ->line('Message: ' . $this->messageContent)
            ->salutation('Regards, ' . config('app.name'));
    }
}
