import {Departure} from "@/src/domain/enities/Departure";

export interface IZtmApiRepository{
    fetchDeparture(stopId: number): Promise<Departure[]>;
}