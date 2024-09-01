import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Fact, FactType } from '../interfaces/Fact';
import { fetchFacts as apiFetchFacts } from '../services/api';

interface FactsState {
  selectedType: FactType;
  facts: Fact[];
  loading: boolean;
  error: string | null;
}

const initialState: FactsState = {
  selectedType: 'both',
  facts: [],
  loading: false,
  error: null,
};

/**
 * Async thunk for fetching facts
 */
export const fetchFacts = createAsyncThunk(
  'facts/fetchFacts',
  async (params: { type: FactType; count: number }, { getState, rejectWithValue }) => {
    try {
      const newFacts = await apiFetchFacts(params.type, params.count);
      console.log('Fetched facts:', newFacts);
      return newFacts;
    } catch (error) {
      console.error('Error in fetchFacts thunk:', error);
      return rejectWithValue('Failed to fetch facts. Please try again later.');
    }
  }
);

/**
 * Slice for managing facts state
 */
const factsSlice = createSlice({
  name: 'facts',
  initialState,
  reducers: {
    // Action to set the selected fact type
    setSelectedType: (state, action: PayloadAction<FactType>) => {
      state.selectedType = action.payload;
      state.facts = []; // Clear facts when type changes
      console.log('Selected type changed:', action.payload);
      console.log('Facts cleared');
    },
    // Action to manually set facts
    setFacts: (state, action: PayloadAction<Fact[]>) => {
      state.facts = action.payload;
      console.log('Facts set manually:', state.facts);
    },
    // Action to set loading state
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
      console.log('Loading state changed:', state.loading);
    },
    // Action to set error state
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      console.log('Error state changed:', state.error);
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle pending state of fetchFacts
      .addCase(fetchFacts.pending, (state) => {
        state.loading = true;
        state.error = null;
        console.log('Fetching facts... (pending)');
      })
      // Handle successful fetchFacts
      .addCase(fetchFacts.fulfilled, (state, action) => {
        state.facts = [...state.facts, ...action.payload];
        state.loading = false;
        console.log('Facts updated in Redux state:', state.facts);
        console.log('Total facts count:', state.facts.length);
      })
      // Handle rejected fetchFacts
      .addCase(fetchFacts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        console.log('Error fetching facts:', action.payload);
      });
  },
});

// Export actions
export const { setSelectedType, setFacts, setLoading, setError } = factsSlice.actions;

// Export reducer
export default factsSlice.reducer;