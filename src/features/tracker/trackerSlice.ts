
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface FoodExtra {
  name: string;
  kcal: number;
  pro: number;
  ch: number;
  fat: number;
}

export type RoutineMode = 'home-office' | 'oficina' | 'descanso';

interface TrackerState {
  checked: Record<string, boolean>;
  variants: Record<string, number | null>;
  extras: FoodExtra[];
  suppChecked: Record<string, boolean>;
  theme: 'light' | 'dark';
  routineMode: RoutineMode;
}

const initialState: TrackerState = {
  checked: {},
  variants: {},
  extras: [],
  suppChecked: {},
  theme: 'dark',
  routineMode: 'home-office',
};

const trackerSlice = createSlice({
  name: 'tracker',
  initialState,
  reducers: {
    toggleItem: (state, action: PayloadAction<{ key: string; checked: boolean }>) => {
      state.checked[action.payload.key] = action.payload.checked;
    },
    setVariant: (state, action: PayloadAction<{ mealId: string; variantIndex: number | null }>) => {
      state.variants[action.payload.mealId] = action.payload.variantIndex;
      Object.keys(state.checked).forEach(key => {
        if (key.startsWith(`${action.payload.mealId}_v`)) {
          delete state.checked[key];
        }
      });
    },
    addExtra: (state, action: PayloadAction<FoodExtra>) => {
      state.extras.push(action.payload);
    },
    removeExtra: (state, action: PayloadAction<number>) => {
      state.extras.splice(action.payload, 1);
    },
    toggleSupp: (state, action: PayloadAction<{ key: string; checked: boolean }>) => {
      state.suppChecked[action.payload.key] = action.payload.checked;
    },
    setRoutineMode: (state, action: PayloadAction<RoutineMode>) => {
      state.routineMode = action.payload;
    },
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    },
    resetDay: (state) => {
      state.checked = {};
      state.variants = {};
      state.extras = [];
      state.suppChecked = {};
    },
  },
});

export const { toggleItem, setVariant, addExtra, removeExtra, toggleSupp, setRoutineMode, toggleTheme, resetDay } = trackerSlice.actions;
export default trackerSlice.reducer;
