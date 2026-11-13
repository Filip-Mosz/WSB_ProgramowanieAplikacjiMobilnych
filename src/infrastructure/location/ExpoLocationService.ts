import {ILocationService} from "@/src/domain/repositories/ILocationService";
import * as Location from 'expo-location';
import {Coordinates} from "@/src/domain/value-objects/Coordinates";

export class ExpoLocationService implements ILocationService{
    async requestPermissions(): Promise<boolean> {
        const {status} = await Location.requestForegroundPermissionsAsync();
        return status === Location.PermissionStatus.GRANTED;
    }

    async getCurrentPosition(): Promise<Coordinates | null>{
        const hasPermission = await this.requestPermissions();
        if (!hasPermission){
            console.warn('Brak uprawnień do odczytu lokalizacji urządzenia.');
            return null;
        }

        const location = await Location.getCurrentPositionAsync({
            accuracy: Location.Accuracy.Balanced,
        });

        return new Coordinates(
            location.coords.latitude,
            location.coords.longitude,
            location.coords.accuracy
        );
    }
}