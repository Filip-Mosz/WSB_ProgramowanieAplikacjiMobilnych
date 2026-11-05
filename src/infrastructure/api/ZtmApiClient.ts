import {IZtmApiRepository} from "@/src/domain/repositories/IZtmApiRepository";
import {Stop} from "@/src/domain/enities/Stop";
import {ZtmStopDto} from "@/src/infrastructure/api/ZtmStopDto";
import {ZtmApiMapper} from "@/src/infrastructure/api/mappers/ZtmApiMapper";
import {Departure} from "@/src/domain/enities/Departure";
import {ZtmDepartureDto} from "@/src/infrastructure/api/ZtmDepartureDto";

export class ZtmApiClient implements IZtmApiRepository{
    private readonly stopsUrl =
        'https://ckan.multimediagdansk.pl/dataset/c24aa637-3619-4dc2-a171-a23eec8f2172/resource/4c4025f0-01bf-41f7-a39f-d156d201b82b/download/stops.json';

    async fetchStopsFromApi(): Promise<Stop[]>{
        const response = await fetch(this.stopsUrl);
        if (!response.ok){
            throw new Error(`Błąd pobierania przystanków ZTM: ${response.status}`);
        }

        const json = await response.json();
        const dateKey = Object.keys(json)[0];
        const rawStops: ZtmStopDto[] = json[dateKey]?.stops ?? [];

        return rawStops
            .filter((s) => s.stopId && s.stopLat && s.stopLon)
            .map(ZtmApiMapper.toStopEntity);
    }

    async fetchDepartures(stopId: number): Promise<Departure[]>{
        const response = await fetch(
            `https://ckan2.multimediagdansk.pl/departures?stopId=${stopId}`
        );
        if (!response.ok){
            throw new Error(`Błąd pobierania odjazdów dla słupka ${stopId}`);
        }

        const json = await response.json();
        const rawDepartures : ZtmDepartureDto[] = json.departures || [];

        return rawDepartures.map(ZtmApiMapper.toDepartureEntity);
    }


}