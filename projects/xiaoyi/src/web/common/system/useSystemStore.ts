import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

type State = {
  lastRoute: string;
  setLastRoute: (e: string) => void;
  loading: boolean;
  setLoading: (val: boolean) => null;
  screenWidth: number;
  setScreenWidth: (val: number) => void;
  isPc?: boolean;
};

export const useSystemStore = create<State>()(
  devtools(
    persist(
      immer((set, get) => ({
        lastRoute: '/app/list',
        setLastRoute(e) {
          set((state) => {
            state.lastRoute = e;
          });
        },
        loading: false,
        setLoading: (val: boolean) => {
          set((state) => {
            state.loading = val;
          });
          return null;
        },
        screenWidth: 600,
        setScreenWidth(val: number) {
          set((state) => {
            state.screenWidth = val;
            state.isPc = val < 900 ? false : true;
          });
        },
        isPc: undefined
      })),
      {
        name: 'globalStore',
        partialize: (state) => ({})
      }
    )
  )
);
