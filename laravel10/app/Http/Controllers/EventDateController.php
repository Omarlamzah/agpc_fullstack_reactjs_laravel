<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\EventDate;

class EventDateController extends Controller
{
    // Method to get the target date
    public function getTargetDate()
    {
        $eventDate = EventDate::first(); // Fetch the first entry
        return response()->json(['targetDate' => $eventDate->targetDate]);
    }

    // Method to update the target date
    public function updateTargetDate(Request $request)
    {
        $request->validate([
            'targetDate' => 'required|date', // Validate the incoming date
        ]);

        $eventDate = EventDate::first(); // Fetch the first entry
        if ($eventDate) {
            $eventDate->targetDate = $request->input('targetDate');
            $eventDate->save(); // Save the updated date
            return response()->json(['message' => 'Target date updated successfully!']);
        }

        return response()->json(['message' => 'Target date not found!'], 404);
    }
}
