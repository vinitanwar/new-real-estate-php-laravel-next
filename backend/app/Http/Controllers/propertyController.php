<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\property;
use App\Models\category;

class propertyController extends Controller
{
    /**
     * Display a listing of the resource.
     */


    



    public function index(Request $request)
    {
        $query = Property::query();

        // Price Range Filter
        if ($request->has('min_price') && $request->has('max_price')) {
            $query->whereBetween('price', [$request->min_price, $request->max_price]);
        }
        
        // Type Filter
        if ($request->has('type') && $request->type !== 'All Type') {
            $query->where('type', $request->type);
        }
        
        // Bedrooms Filter
        if ($request->has('bedrooms') && $request->bedrooms !== 'All Bedrooms') {
            $bedrooms = str_replace('+', '', $request->bedrooms); // Removing '+' if present
            $query->where('bedrooms', $bedrooms);
        }
        
        // Bathrooms Filter
        if ($request->has('bathrooms') && $request->bathrooms !== 'All Bathrooms') {
            $bathrooms = str_replace('+', '', $request->bathrooms); // Removing '+' if present
            $query->where('bathrooms', $bathrooms);
        }
        
        // Sort Option
        if ($request->has('sort') && $request->sort !== 'Sort by') {
            switch ($request->sort) {
                case 'newest':
                    $query->orderBy('created_at', 'desc');
                    break;
                case 'oldest':
                    $query->orderBy('created_at', 'asc');
                    break;
                case 'best Seller':
                    $query->orderBy('sales', 'desc'); // Assuming 'sales' is a column indicating the number of sales
                    break;
                case 'price lower':
                    $query->orderBy('price', 'asc');
                    break;
                case 'price upper':
                    $query->orderBy('price', 'desc');
                    break;
                default:
                    // Default sorting can be set here if needed
                    break;
            }
        }
        
        // Limit Filter
        if ($request->has('limit')) {
            $query->limit($request->limit);
        }
        
        // Pagination
        $perPage = $request->get('per_page', 10);
        $properties = $query->paginate($perPage);
        
        return response()->json($properties);
        
    }
    

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        
        $request->validate([
            'name' => 'required|string',
            'slug' => 'required|string|unique:properties',
            'property_id' => 'nullable|string',
            'price' => 'required|numeric',
            'rate_per_square_feet' => 'required|numeric',
            'images_paths' => 'required|array',
            'images_paths.*' => 'required|string',
            'agent_post_id' => 'required|integer',
            'type' => 'required|string',
            'bedrooms' => 'required|integer',
            'bathrooms' => 'required|integer',
            'property_description_1' => 'nullable|string',
            'property_description_2' => 'nullable|string',
            'multiple_features' => 'nullable|array',
            'address' => 'required|string',
            'google_map_lat' => 'required|string',
            'google_map_long' => 'required|string',
        ]);

        $property = Property::create($request->all());

        return response()->json($property, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $slug)
    {
        //
        $property = Property::where('slug', $slug)->firstOrFail();
        return response()->json($property);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $property = Property::findOrFail($id);

        $request->validate([
            'name' => 'required|string',
            'slug' => 'required|string|unique:properties,slug,' . $id,
            'property_id' => 'nullable|string',
            'price' => 'required|numeric',
            'rate_per_square_feet' => 'required|numeric',
            'images_paths' => 'required|array',
            'images_paths.*' => 'required|string',
            'agent_post_id' => 'required|integer',
            'type' => 'required|string',
            'bedrooms' => 'required|integer',
            'bathrooms' => 'required|integer',
            'property_description_1' => 'nullable|string',
            'property_description_2' => 'nullable|string',
            'multiple_features' => 'nullable|array',
            'address' => 'required|string',
            'google_map_lat' => 'required|string',
            'google_map_long' => 'required|string',
        ]);
    
        $property->update($request->all());
    
        return response()->json($property, 200);
    
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $property = Property::findOrFail($id);
        $property->delete();

        return response()->json(null, 204);
    }
}
