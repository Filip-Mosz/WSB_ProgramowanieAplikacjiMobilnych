import { create } from 'zustand';
import {Stop} from "@/src/domain/enities/Stop";
import {IStopRepository} from "@/src/domain/repositories/IStopRepository";

interface AppState {
    user: string | null;
    favoriteStops: Stop[];
    login: (username: string) => void;
    logout: () => void;
    setFavorites: (stops: Stop[]) => void;
    addStop: (stop: Stop) => void;
    removeStop: (stopId: number) => void;
    loadFavorites: (repo: IStopRepository) => Promise<void>;
    addFavoriteOptimistic: (stop: Stop, repo: IStopRepository) => Promise<void>;
    removeFavoriteOptimistic: (stopId: number, repo: IStopRepository) => Promise<void>;
}

export const useStore = create<AppState>((set, get) => ({
    user: null,
    favoriteStops: [],

    login: (username) => set({ user: username }),
    logout: () => set({ user: null, favoriteStops: [] }),

    setFavorites: (stops) => set({ favoriteStops: stops }),

    addStop: (stop) =>
        set((state) => ({
            favoriteStops: [...state.favoriteStops, stop],
        })),

    removeStop: (stopId) =>
        set((state) => ({
            favoriteStops: state.favoriteStops.filter((s) => s.stopId !== stopId),
        })),

    loadFavorites: async (repo) => {
        const { user } = get();
        if (!user) return;
        const stops = await repo.getFavorites(user);
        set({ favoriteStops: stops });
    },

    addFavoriteOptimistic: async (stop, repo) => {
        const { favoriteStops, user } = get();
        if (!user) return;
        const previousStops = favoriteStops;

        // 1. Natychmiastowa aktualizacja UI (0ms opóźnienia)
        set({
            favoriteStops: [
                ...favoriteStops.filter((s) => s.stopId !== stop.stopId),
                stop,
            ],
        });

        try {
            // 2. Asynchroniczny zapis do bazy SQLite w tle
            await repo.saveFavorite(user, stop);
        } catch (error) {
            // 3. Rollback stanu w przypadku awarii zapisu
            set({ favoriteStops: previousStops });
            console.error('Błąd zapisu do SQLite, cofnięto stan UI:', error);
        }
    },

    removeFavoriteOptimistic: async (stopId, repo) => {
        const { favoriteStops, user } = get();
        if (!user) return;
        const previousStops = favoriteStops;

        set({ favoriteStops: favoriteStops.filter((s) => s.stopId !== stopId) });

        try {
            await repo.removeFavorite(user, stopId);
        } catch (error) {
            set({ favoriteStops: previousStops });
            console.error('Błąd usuwania z SQLite, cofnięto stan UI:', error);
        }
    },
}));