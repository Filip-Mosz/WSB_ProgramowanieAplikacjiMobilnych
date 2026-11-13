import {Coordinates} from "@/src/domain/value-objects/Coordinates";

export interface ILocationService{
    requestPermissions(): Promise<boolean>;
    getCurrentPosition(): Promise<Coordinates | null>;
}