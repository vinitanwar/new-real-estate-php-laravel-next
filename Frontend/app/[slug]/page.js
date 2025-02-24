import React from 'react';
import SlugComponent from './SlugComponent';
import { apiLink } from '../constants';
import axios from 'axios';

export default async function Page({ params }) {
  const { slug } = params;

  try {
    const response = await axios.get(`${apiLink}/property/${slug}`);
    
    // Check if the response is valid
    if (!response.data) {
      throw new Error('Property not found');
    }

    return <SlugComponent slug={slug} data={response.data} />;
  } catch (error) {
    console.error('Error fetching property data:', error.message);
   
  }
}

