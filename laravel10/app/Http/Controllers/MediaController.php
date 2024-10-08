<?php

namespace App\Http\Controllers;

use App\Models\Media;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class MediaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        // Number of records per page
        $perPage = $request->get('per_page', 10); // Default to 10 items per page

        // Paginate the media records, order by 'id' in descending order
        $media = Media::orderBy('id', 'desc')->paginate($perPage);

        return response()->json($media);
    }



    public function findByType(Request $request, $type)
    {
        // Number of records per page
        $perPage = $request->get('per_page', 10); // Default to 10 items per page

        // Get the date parameter from the request, if it exists
        $date = $request->get('date', null);

        // Initialize the query with the type filter
        $query = Media::where('type', $type);

        // Filter by date if the date is provided
        if ($date) {
            //  return $date;
            // Ensure the date is formatted correctly or use a specific format as needed
            $query->whereDate('date', $date);   // Assuming `date` is a date column in your table
        }

        // Paginate the media records, order by 'id' in descending order
        $media = $query->orderBy('id', 'desc')->paginate($perPage);

        return response()->json($media);
    }




    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'type' => 'required|string',
            'titre' => 'required|string',
            'description' => 'nullable|string',
            'date' => 'nullable|date',
            'video' => 'nullable|string',
            'poster' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'etat' => 'required|boolean',
            'ordre' => 'nullable|integer',
            'date_creation' => 'nullable|date',
            'lien' => 'nullable|string',
        ]);


        // Convert 'poster' from string "null" to actual null
      //  return $request->input('description');

        $description = $request->input('description');
        if ($description === '') {
            $request->merge(['description' => null]);
         }

        if ($request->hasFile('poster')) {
            $posterPath = $request->file('poster')->store('posters', 'public');
            $validatedData['poster'] = $posterPath;
        }

        $media = Media::create($validatedData);

        return response()->json([
            'message' => 'Media created successfully.',
            'data' => $media,
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Media  $media
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(Media $media)
    {
        return response()->json($media);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Media  $media
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, $id)
    {
        // Retrieve the media record by ID
        $media = Media::find($id);

        // Check if the media record exists
        if (!$media) {
            return response()->json(['error' => 'Media not found'], 404);
        }

        // Convert 'poster' from string "null" to actual null
        $poster = $request->input('poster');
        if ($poster === 'null') {
            $request->merge(['poster' => null]);
        }

        // Validate the request data
        $validatedData = $request->validate([
            'type' => 'required|string',
            'titre' => 'required|string',
            'description' => 'nullable|string',
            'date' => 'nullable|date',
             'poster' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
              'date_creation' => 'nullable|date',
            'lien' => 'nullable|string',
        ]);

        // Handle the poster file
        if ($request->hasFile('poster')) {
            // Delete the old poster if it exists
            if ($media->poster) {
                Storage::disk('public')->delete($media->poster);
            }

            // Store the new poster file
            $posterPath = $request->file('poster')->store('posters', 'public');
            $validatedData['poster'] = $posterPath;
        }
       else {
            // If no new poster file is uploaded, retain the old poster value
            $validatedData['poster'] = $media->poster;
        }

        // Update the media record with validated data
        $media->update($validatedData);

        // Return a successful response with the updated media data
        return response()->json([
            'message' => 'Media updated successfully.',
            'data' => $media,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Media  $media
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id)
    {
        // Retrieve the media item by its id
        $media = Media::find($id);

        // Check if the media item exists
        if (!$media) {
            return response()->json([
                'message' => 'Media not found.',
            ], 404);
        }

        // Check if the media item has a poster and delete it from storage
        if ($media->poster) {
            Storage::disk('public')->delete($media->poster);
        }

        // Delete the media item from the database
        $media->delete();

        return response()->json([
            'message' => 'Media deleted successfully.',
        ]);
    }

}
