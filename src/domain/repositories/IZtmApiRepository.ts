import {Departure} from "@/src/domain/enities/Departure";
import { Stop } from "@/src/domain/enities/Stop"

export interface IZtmApiRepository{
    fetchStopsFromApi(): Promise<Stop[]>;
    fetchDepartures(stopId: number): Promise<Departure[]>;
}