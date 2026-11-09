import { Stop } from "@/src/domain/enities/Stop";
// import { GeoBoundlingBox } from '@/src/domain/value-objects/GeoBundlingBox';

export interface IStopRepository {
    initDatabase(): Promise<void>;
    getAllStops(): Promise<Stop[]>;
    saveStops(stops: Stop[]): Promise<void>;
    // getStopsInBoundingBox(box: GeoBoundingBox): Promise<Stop[]>;
    getFavorites(userId: string): Promise<Stop[]>;
    saveFavorite(userId: string, stop: Stop): Promise<void>;
    removeFavorite(userId: string, stopId: number): Promise<void>;
    updateFavoriteNote(userId: string, stopId: number, note: string): Promise<void>;
}