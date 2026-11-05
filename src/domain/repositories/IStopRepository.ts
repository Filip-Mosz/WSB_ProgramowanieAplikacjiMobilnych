import { Stop } from "@/src/domain/enities/Stop";
import { GeoBoundlingBox } from '@/src/domain/value-objects/GeoBundlingBox';

export interface IStopRepository{
    initDatabase(): Promise<void>;
    getAllStops(): Promise<Stop[]>;
    saveStops(stops: Stop[]): Promise<Stop[]>;
    getStopsInBoundingBox(box: GeoBoundlingBox): Promise<Stop[]>;
    getFavorites(userId: string): Promise<Stop[]>;
    saveFavorites(userId: string, stopId: Stop): Promise<void>;
    removeFavorite(userId: string, stopId: number): Promise<void>;
    updateFavorite(userId: string, stopId: number, note: string): Promise<void>;
}