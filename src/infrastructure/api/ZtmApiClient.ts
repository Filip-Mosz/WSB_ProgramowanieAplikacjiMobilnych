export class ZtmApiClient {
    constructor(
        private readonly baseUrl: string
        //https://ckan2.multimediagdansk.pl
    ) {}

    async getDepartures(stopId: number): Promise<any>{
        const url = `${this.baseUrl}/departures?stopId=${encodeURIComponent(stopId)}`;
        let response;

        try {
            response = await fetch(url);
        } catch (err){
            console.error("Network error: ", err);
            throw new Error(`Connection attempt to ZTM API resulted in error: "${err}"`)
        }

        if (!response.ok){
            throw new Error(`ZTM Api Error: HTTP ${response.status}`);
        }

        try {
            return (response.json());
        } catch {
            throw new Error("Serwer ZTM zwrócił nieprawidłowy JSON.");
        }
    }
}