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
        // Start with the base query for active properties
        $query = Property::where('active', 1)->with('agent'); // Eager load agent relationship

        // Apply Price Range Filter
        if ($request->filled(['min_price', 'max_price'])) {
            $query->whereBetween('price', [$request->min_price, $request->max_price]);
        }

        // Apply Type Filter
        if ($request->filled('type') && $request->type !== 'All Type') {
            $query->where('type', $request->type);
        }

        // Apply Bedrooms Filter
        if ($request->filled('bedrooms') && $request->bedrooms !== 'All Bedrooms') {
            $bedrooms = str_replace('+', '', $request->bedrooms); // Remove '+' if present
            $query->where('bedrooms', $bedrooms);
        }

        // Apply Bathrooms Filter
        if ($request->filled('bathrooms') && $request->bathrooms !== 'All Bathrooms') {
            $bathrooms = str_replace('+', '', $request->bathrooms); // Remove '+' if present
            $query->where('bathrooms', $bathrooms);
        }

        // Apply Sorting
        if ($request->filled('sort') && $request->sort !== 'Sort by') {
            switch ($request->sort) {
                case 'newest':
                    $query->orderBy('created_at', 'desc');
                    break;
                case 'oldest':
                    $query->orderBy('created_at', 'asc');
                    break;
                case 'best Seller':
                    $query->orderBy('sales', 'desc'); // Assuming 'sales' column exists
                    break;
                case 'price lower':
                    $query->orderBy('price', 'asc');
                    break;
                case 'price upper':
                    $query->orderBy('price', 'desc');
                    break;
                default:
                    break;
            }
        }

        // Apply Limit Filter (optional, not recommended with pagination)
        if ($request->filled('limit')) {
            $query->limit($request->limit);
        }

        // Pagination (default 10 items per page)
        $perPage = $request->get('per_page', 10);
        $properties = $query->paginate($perPage);

        // Customize the response with full data
        $properties->getCollection()->transform(function ($property) {
            return [
                'id' => $property->id,
                'name' => $property->name,
                'slug' => $property->slug,
                'property_id' => $property->property_id,
                'price' => $property->price,
                'rate_per_square_feet' => $property->rate_per_square_feet,
                'images_paths' => $property->images_paths ?? [],
                'agent_post_id' => $property->agent_post_id,
                'type' => $property->type,
                'bedrooms' => $property->bedrooms,
                'bathrooms' => $property->bathrooms,
                'property_description_1' => $property->property_description_1,
                'cover_image' => $property->cover_image,
                'posted_by' => $property->posted_by,
                'property_description_2' => $property->property_description_2,
                'multiple_features' => $property->multiple_features ?? [],
                'address' => $property->address,
                'google_map_lat' => $property->google_map_lat,
                'google_map_long' => $property->google_map_long,
                'created_at' => $property->created_at,
                'updated_at' => $property->updated_at,
                'status' => $property->status,
                'category_id' => $property->category_id,
                'active' => $property->active,
                'state' => $property->state,
                'city' => $property->city,
                'neighbourhood' => $property->neighbourhood,
                'furnishing' => $property->furnishing,
                'project_status' => $property->project_status,
                'listed_by' => $property->listed_by,
                'maintenance_monthly' => $property->maintenance_monthly,
                'floor_no' => $property->floor_no,
                'verified' => $property->agent->verified,
                'agent_name' => $property->agent->name,
                'agent_phone' => isset($property->agent->phone_number)
                    ? ($property->agent->verified
                        ? $property->agent->phone_number
                        : substr($property->agent->phone_number, 0, 4) . 'xxxxxxxx')
                    : null,


            ];
        });

        // Return the customized response
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
        // Fetch the property with the agent relationship
        $property = Property::with('agent')->where('slug', $slug)->firstOrFail();
    
        // Transform the property data
        $propertyData = [
            'id' => $property->id,
            'name' => $property->name,
            'slug' => $property->slug,
            'property_id' => $property->property_id,
            'price' => $property->price,
            'rate_per_square_feet' => $property->rate_per_square_feet,
            'images_paths' => $property->images_paths ?? [],
            'agent_post_id' => $property->agent_post_id,
            'type' => $property->type,
            'bedrooms' => $property->bedrooms,
            'bathrooms' => $property->bathrooms,
            'property_description_1' => $property->property_description_1,
            'cover_image' => $property->cover_image,
            'posted_by' => $property->posted_by,
            'property_description_2' => $property->property_description_2,
            'multiple_features' => $property->multiple_features ?? [],
            'address' => $property->address,
            'google_map_lat' => $property->google_map_lat,
            'google_map_long' => $property->google_map_long,
            'created_at' => $property->created_at,
            'updated_at' => $property->updated_at,
            'status' => $property->status,
            'category_id' => $property->category_id,
            'active' => $property->active,
            'state' => $property->state,
            'city' => $property->city,
            'neighbourhood' => $property->neighbourhood,
            'furnishing' => $property->furnishing,
            'project_status' => $property->project_status,
            'listed_by' => $property->listed_by,
            'maintenance_monthly' => $property->maintenance_monthly,
            'floor_no' => $property->floor_no,
            'verified' => $property->agent->verified ?? false,
            'agent_name' => $property->agent->name ?? null,
            'agent_phone' => isset($property->agent->phone_number)
                ? ($property->agent->verified
                    ? $property->agent->phone_number
                    : substr($property->agent->phone_number, 0, 4) . 'xxxxxxxx')
                : null,
        ];
    
        // Return the transformed data as JSON
        return response()->json($propertyData);
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
