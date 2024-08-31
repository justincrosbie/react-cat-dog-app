import axios from 'axios';
import { Fact, FactType } from '../interfaces/Fact';

/**
 * The base URL for the API. 
 * It uses the REACT_APP_API_BASE_URL environment variable if set, 
 * otherwise falls back to the default URL.
 */
const BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://cat-fact.herokuapp.com/facts/random';

/**
 * Fetches facts from the API based on the specified type and count.
 * 
 * @async
 * @function fetchFacts
 * @param {FactType} type - The type of facts to fetch ('cat', 'dog', or 'both')
 * @param {number} [count=5] - The number of facts to fetch (default is 5)
 * @returns {Promise<Fact[]>} A promise that resolves to an array of Fact objects
 * @throws Will throw an error if the API request fails
 */
export const fetchFacts = async (type: FactType, count: number = 5): Promise<Fact[]> => {
  // Determine the animal type for the API request
  let animalType: string;
  switch (type) {
    case 'cat':
      animalType = 'cat';
      break;
    case 'dog':
      animalType = 'dog';
      break;
    case 'both':
      animalType = 'cat,dog';
      break;
  }

  try {
    // Make the API request
    const response = await axios.get<Fact[]>(BASE_URL, {
      params: {
        animal_type: animalType,
        amount: count
      }
    });
    
    // Return the data from the response
    return response.data;
  } catch (error) {
    // Log the error and re-throw it
    console.error('Error fetching facts:', error);
    throw error;
  }
};