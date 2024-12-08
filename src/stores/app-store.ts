import { create } from 'zustand';

type State = {
  count: number;
};

type Actions = {
  reset: () => void;
  increment: () => void;
  decrement: () => void;
};

const initialState: State = {
  count: 0,
};

export const useAppStore = create<State & Actions>((set) => ({
  ...initialState,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  reset: () => set(initialState),
}));
