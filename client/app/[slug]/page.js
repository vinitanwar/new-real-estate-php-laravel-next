// app/singleproperties/[slug]/page.tsx

import React from 'react';
import SlugComponent from './comp/Comp';
import axios from 'axios';
import { apiLink } from '../constants';

export async function generateStaticParams() {
    try {
        const response = await axios.get(`${apiLink}/property`, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        // Assuming the data is in response.data and is an array
        const data = response.data;

        if (Array.isArray(data)) {
            // Map over the data and return the slug for each item
            return data.map((item) => {
                console.log('Slug:', item.slug); // Log for debugging
                return {
                    slug: item.slug, // Ensure this matches the property in your data
                };
            });
        } else {
            console.error('Expected an array of data but got:', data);
            return [];
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
}

export default function Page({ params: { slug } }) {
    return (
        <div>
            <SlugComponent slug={slug} />
        </div>
    );
}
