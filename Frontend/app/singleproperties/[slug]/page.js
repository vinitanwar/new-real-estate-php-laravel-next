import React from 'react'
import SlugCompo from './SlugCompo'


import axios from 'axios';
import { apiLink } from '@/app/constants';

export async function generateStaticParams() {
    try {
        const response = await fetch(`${apiLink}/property`, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            console.error('Failed to fetch properties:', response.status);
            return [];
        }

        const data = await response.json();

        if (!Array.isArray(data)) {
            console.error('Expected an array but got:', data);
            return [];
        }

        return data.map((item) => ({
            slug: item.slug.toString(), // ✅ Ensure slug is a string
        }));
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
}

export default function Page({ params: { slug } }) {
  return (
   <SlugCompo slug={slug} />
  )
}
