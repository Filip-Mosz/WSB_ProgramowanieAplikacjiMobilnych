import {Departure} from "@/src/domain/enities/Departure";

export interface IZtmApiRepository{
    fetchDepartures(stopId: number): Promise<Departure[]>;
}