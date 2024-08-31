import { useState, useEffect, useRef, useCallback } from 'react';
import { fetchFacts } from '../services/api';
import { Fact, FactType } from '../interfaces/Fact';

/** Number of facts to load per request */
const FACTS_PER_LOAD = 10;

/**
 * Custom hook for managing fact fetching and infinite scrolling
 * @param {FactType} selectedType - The currently selected type of facts
 * @returns {Object} An object containing facts, loading state, error state, and utility functions
 */
export const useFacts = (selectedType: FactType) => {
  const [facts, setFacts] = useState<Fact[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Ref for the intersection observer
  const observer = useRef<IntersectionObserver | null>(null);

  /**
   * Fetches more facts and adds them to the existing list
   */
  const fetchMoreFacts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const newFacts = await fetchFacts(selectedType, FACTS_PER_LOAD);
      setFacts(prevFacts => [...prevFacts, ...newFacts]);
    } catch (error) {
      console.error('Error fetching facts:', error);
      setError('Failed to fetch facts. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, [selectedType]);

  /**
   * Callback ref for the last fact element to implement infinite scrolling
   * @param {HTMLDivElement | null} node - The last fact element in the list
   */
  const lastFactElementRef = useCallback((node: HTMLDivElement | null) => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && !error) {
        fetchMoreFacts();
      }
    });
    if (node) observer.current.observe(node);
  }, [loading, fetchMoreFacts, error]);

  // Reset facts and fetch new ones when selectedType changes
  useEffect(() => {
    setFacts([]);
    setError(null);
    fetchMoreFacts();
  }, [selectedType, fetchMoreFacts]);

  return { facts, loading, error, lastFactElementRef, fetchMoreFacts };
};