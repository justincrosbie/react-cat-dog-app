import { useEffect, useRef, useCallback } from 'react';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { fetchFacts, setSelectedType } from '../store/factsSlice';

const FACTS_PER_LOAD = 10;

/**
 * Custom hook for managing facts fetching and infinite scrolling
 * @returns {Object} An object containing facts data, loading state, error state, and utility functions
 */
export const useFacts = () => {
  const dispatch = useAppDispatch();
  // Select relevant state from the Redux store
  const { selectedType, facts, loading, error } = useAppSelector(state => state.facts);

  // Ref for the intersection observer
  const observer = useRef<IntersectionObserver | null>(null);

  /**
   * Function to load more facts
   */
  const loadMoreFacts = useCallback(() => {
    if (!loading) {
      console.log('Loading more facts...');
      dispatch(fetchFacts({ type: selectedType, count: FACTS_PER_LOAD }));
    }
  }, [dispatch, loading, selectedType]);

  /**
   * Callback ref for the last fact element
   * Used for infinite scrolling
   */
  const lastFactElementRef = useCallback((node: HTMLDivElement | null) => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        loadMoreFacts();
      }
    });
    if (node) observer.current.observe(node);
  }, [loading, loadMoreFacts]);

  /**
   * Function to change the selected fact type
   * @param {string} newType - The new fact type to select
   */
  const changeSelectedType = useCallback((newType: typeof selectedType) => {
    console.log('Changing selected type to:', newType);
    dispatch(setSelectedType(newType));
  }, [dispatch]);

  // Effect to fetch initial facts when selected type changes
  useEffect(() => {
    console.log('Selected type changed, fetching initial facts...');
    dispatch(fetchFacts({ type: selectedType, count: FACTS_PER_LOAD }));
  }, [selectedType, dispatch]);

  // Effect for logging state changes (useful for debugging)
  useEffect(() => {
    console.log('Current facts:', facts);
    console.log('Loading state:', loading);
    console.log('Error state:', error);
  }, [facts, loading, error]);

  // Return the necessary data and functions
  return { facts, loading, error, lastFactElementRef, loadMoreFacts, changeSelectedType };
};