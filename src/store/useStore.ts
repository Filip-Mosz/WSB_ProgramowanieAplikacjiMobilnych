import { create } from 'zustand';

export interface SavedStop {
    stopId: number;
    name: string;
    subName?: string;
    lat: number;
    lon: number;
    notes?: string;
}

interface AppState {
    user: string | null;
    favoriteStops: SavedStop[];
    isLoading: boolean;
    error: string | null;
    login: (username: string) => void;
    logout: () => void;
    setFavorites: (stops: SavedStop[]) => void;
    addStop: (stop: SavedStop) => void;
    removeStop: (stopId: number) => void;
    updateStopNote: (stopId: number, note: string) => void;
}

export const useStore = create<AppState>((set, get) => ({
    user: null,
    favoriteStops: [],
    isLoading: false,
    error: null,

    login: (username) => set({ user: username }),

    logout: () =>
        set({
            user: null,
            favoriteStops: [],
            error: null,
        }),

    setFavorites: (stops) => set({ favoriteStops: stops }),

    // OPTIMISTIC UI - dodawanie przystanku
    addStop: async (stop) => {
        const previousStops = get().favoriteStops;

        // Natychmiastowa aktualizacja interfejsu
        set({
            favoriteStops: [...previousStops, stop],
            error: null,
        });

        try {
            // Przykładowe żądanie do backendu
            const response = await fetch('/api/favorites', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(stop),
            });

            if (!response.ok) {
                throw new Error('Nie udało się dodać przystanku.');
            }
        } catch (error) {
            // Rollback - przywrócenie poprzedniego stanu
            set({
                favoriteStops: previousStops,
                error: error instanceof Error
                    ? error.message
                    : 'Wystąpił błąd.',
            });
        }
    },

    // OPTIMISTIC UI - usuwanie przystanku
    removeStop: async (stopId) => {
        const previousStops = get().favoriteStops;

        // Natychmiastowe usunięcie z interfejsu
        set({
            favoriteStops: previousStops.filter(
                (s) => s.stopId !== stopId
            ),
            error: null,
        });

        try {
            const response = await fetch(`/api/favorites/${stopId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Nie udało się usunąć przystanku.');
            }
        } catch (error) {
            // Rollback
            set({
                favoriteStops: previousStops,
                error: error instanceof Error
                    ? error.message
                    : 'Wystąpił błąd.',
            });
        }
    },

    // OPTIMISTIC UI - aktualizacja notatki
    updateStopNote: async (stopId, note) => {
        const previousStops = get().favoriteStops;

        // Natychmiastowa zmiana notatki
        set({
            favoriteStops: previousStops.map((s) =>
                s.stopId === stopId
                    ? { ...s, notes: note }
                    : s
            ),
            error: null,
        });

        try {
            const response = await fetch(
                `/api/favorites/${stopId}/notes`,
                {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ notes: note }),
                }
            );

            if (!response.ok) {
                throw new Error('Nie udało się zaktualizować notatki.');
            }
        } catch (error) {
            // Rollback
            set({
                favoriteStops: previousStops,
                error: error instanceof Error
                    ? error.message
                    : 'Wystąpił błąd.',
            });
        }
    },
}));