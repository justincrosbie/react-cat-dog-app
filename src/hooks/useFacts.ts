import { useEffect, useRef, useCallback } from 'react';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { fetchFacts, setSelectedType } from '../store/factsSlice';

const FACTS_PER_LOAD = 10;

export const useFacts = () => {
  const dispatch = useAppDispatch();
  const { selectedType, facts, loading, error } = useAppSelector(state => state.facts);

  const observer = useRef<IntersectionObserver | null>(null);

  const loadMoreFacts = useCallback(() => {
    if (!loading) {
      console.log('Loading more facts...');
      dispatch(fetchFacts({ type: selectedType, count: FACTS_PER_LOAD }));
    }
  }, [dispatch, loading, selectedType]);

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

  const changeSelectedType = useCallback((newType: typeof selectedType) => {
    console.log('Changing selected type to:', newType);
    dispatch(setSelectedType(newType));
  }, [dispatch]);

  useEffect(() => {
    console.log('Selected type changed, fetching initial facts...');
    dispatch(fetchFacts({ type: selectedType, count: FACTS_PER_LOAD }));
  }, [selectedType, dispatch]);

  useEffect(() => {
    console.log('Current facts:', facts);
    console.log('Loading state:', loading);
    console.log('Error state:', error);
  }, [facts, loading, error]);

  return { facts, loading, error, lastFactElementRef, loadMoreFacts, changeSelectedType };
};