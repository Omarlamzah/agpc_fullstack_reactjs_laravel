<?php

namespace App\Http\Controllers;

use App\Models\Membre;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class MembreController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */



    public function index(Request $request)
    {
        // Number of records per page
        $perPage = $request->get('per_page', 20); // Default to 10 items per page

        // Paginate the media records, order by 'id' in descending order
        $membres = Membre::orderBy('id', 'desc')->paginate($perPage);

        return response()->json($membres);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        // List of nullable fields to check and convert to null
        $nullableFields = ['photo', 'prenom', 'telephone', 'adresse', 'ville', 'email'];

        foreach ($nullableFields as $field) {
            $value = $request->input($field);

            // Convert if the field is missing, undefined, null, or the string "null"
            if (!isset($value) || $value === null || $value === 'null' || $value === '') {
                $request->merge([$field => null]);
            }
        }

        // Validate the request data
        $validatedData = $request->validate([
            'photo' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'civilite' => 'required|string',
            'nom' => 'required|string',
            'prenom' => 'nullable|string',
            'telephone' => 'nullable|string',
            'adresse' => 'nullable|string',
            'ville' => 'nullable|string',
            'email' => 'nullable|string|email|unique:membres,email',
        ]);

        // Handle photo upload if a new one is provided
        if ($request->hasFile('photo')) {
            $photoPath = $request->file('photo')->store('photos', 'public');
             $validatedData['photo'] = $photoPath;

        }



        else{
            $validatedData['photo'] ="Male";

        }

        // Create a new Membre with the validated data
        $membre = Membre::create($validatedData);

        return response()->json([
            'message' => 'Membre created successfully.',
            'data' => $membre,
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Membre  $membre
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(Membre $membre)
    {
        return response()->json($membre);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Membre  $membre
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, Membre $membre)
    {
        // List of nullable fields to check and convert to null
        $nullableFields = ['photo', 'prenom', 'telephone', 'adresse', 'ville', 'email'];

        foreach ($nullableFields as $field) {
            $value = $request->input($field);

            // Convert if the field is missing, undefined, null, or the string "null"
            if (!isset($value) || $value === null || $value === 'null' || $value === '') {
                $request->merge([$field => null]);
            }
        }

        // Validate the request data
        $validatedData = $request->validate([
            'photo' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'civilite' => 'required|string',
            'nom' => 'required|string',
            'prenom' => 'nullable|string',
            'telephone' => 'nullable|string',
            'adresse' => 'nullable|string',
            'ville' => 'nullable|string',
            'email' => 'nullable|string|email|unique:membres,email,' . $membre->id,
        ]);

        // Handle photo upload if a new one is provided
        if ($request->hasFile('photo')) {
            if ($membre->photo) {
                Storage::disk('public')->delete($membre->photo);
            }

            $photoPath = $request->file('photo')->store('photos', 'public');
            $validatedData['photo'] = $photoPath;
        }
        else {
            $validatedData['photo'] ="Male";

        }

        // Update the member with the validated data
        $membre->update($validatedData);

        return response()->json([
            'message' => 'Membre updated successfully.',
            'data' => $membre,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Membre  $membre
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(Membre $membre)
    {
        if ($membre->photo) {
            Storage::disk('public')->delete($membre->photo);
        }

        $membre->delete();

        return response()->json([
            'message' => 'Membre deleted successfully.',
        ]);
    }
}
