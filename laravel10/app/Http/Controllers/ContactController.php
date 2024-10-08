<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Notification;
use App\Notifications\ContactFormSubmitted;

class ContactController extends Controller
{
    public function sendContactForm(Request $request)
    {
        // Validate the incoming request data
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'sujet' => 'required|string|max:255',
            'message' => 'required|string',
        ]);

        // Get the validated data
        $name = $request->input('name');
        $email = $request->input('email');
        $sujet = $request->input('sujet');
        $messageContent = $request->input('message');

        // Send the notification
        Notification::route('mail', 'contact@agpc.ma')
            ->notify(new ContactFormSubmitted($name, $email, $sujet, $messageContent));

        // Return a response
        return response()->json(['message' => 'OK']);
    }
}
