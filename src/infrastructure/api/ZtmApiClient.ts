export class ZtmApiClient {
    constructor(
        private readonly baseUrl: string
        //https://ckan2.multimediagdansk.pl
    ) {}

    async getDepartures(stopId: number): Promise<any>{
        const url = `${this.baseUrl}/departures?stopId=${encodeURIComponent(stopId)}`;
        const response = await fetch(url);

        if (!response.ok){
            throw new Error(`ZTM Api Error: HTTP ${response.status}`);
        }

        return response.json;
    }
}