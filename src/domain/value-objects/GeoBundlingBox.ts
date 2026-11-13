import {Coordinates} from "@/src/domain/value-objects/Coordinates";

export class GeoBundlingBox{
    public static readonly MIN_ZOOM_FOR_MARKERS = 15;

    constructor(
        public readonly minLat: number,
        public readonly maxLat: number,
        public readonly minLon: number,
        public readonly maxLon: number,
        public readonly zoomLevel: number
    ) {
        if (minLat > maxLat){
            throw new Error('Wartość minLat nie może być większa niż maxLat.');
        }
        if(minLon > maxLon){
            throw new Error('Wartość minLon nie może być wieksza niż maxLon.');
        }
    }

    public shouldRenderMarkers(): boolean{
        return this.zoomLevel >= GeoBundlingBox.MIN_ZOOM_FOR_MARKERS;
    }

    public contains(coords: Coordinates): boolean{
        return(
            coords.latitude >= this.minLat &&
            coords.latitude <= this.maxLat &&
            coords.longitude >= this.minLon &&
            coords.longitude <= this.maxLon
        );
    }
}