import React, { useRef, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { WebView, WebViewMessageEvent } from 'react-native-webview';
import {container} from "@/src/di/container";
import {useStore} from "@/src/store/useStore";
import {Coordinates} from "@/src/domain/value-objects/Coordinates";
import {Stop} from "@/src/domain/enities/Stop";

export default function MapTabScreen() {
    const webViewRef = useRef<WebView>(null);
    const [loadingLoc, setLoadingLoc] = useState(false);

    const handleCenterOnUser = async () => {
        try {
            setLoadingLoc(true);
            const coords = await container.locationService.getCurrentPosition();

            if (!coords) {
                Alert.alert(
                    'Wymagane uprawnienia',
                    'Aplikacja potrzebuje dostępu do lokalizacji, aby wskazać Twoją pozycję na mapie.'
                );
                return;
            }

            const jsCode = `
        if (typeof userMarker !== 'undefined') {
          map.removeLayer(userMarker);
        }
        var userMarker = L.circleMarker([${coords.latitude}, ${coords.longitude}], {
          radius: 9,
          fillColor: '#2563EB',
          color: '#FFFFFF',
          weight: 2,
          opacity: 1,
          fillOpacity: 0.9
        }).addTo(map);
        userMarker.bindPopup("<b>Twoja lokalizacja</b>").openPopup();
        map.setView([${coords.latitude}, ${coords.longitude}], 16);
        true;
      `;

            webViewRef.current?.injectJavaScript(jsCode);
        } catch (error) {
            Alert.alert('Błąd GPS', 'Nie udało się pobrać aktualnej pozycji urządzenia.');
            console.error(error);
        } finally {
            setLoadingLoc(false);
        }
    };

    const handleWebViewMessage = (event: WebViewMessageEvent) => {
        try {
            const data = JSON.parse(event.nativeEvent.data);
            if (data.type === 'ADD_FAVORITE') {
                const raw = data.stop;
                const stopEntity = new Stop(
                    Number(raw.stopId),
                    raw.name,
                    new Coordinates(Number(raw.lat), Number(raw.lon))
                );
                useStore.getState().addFavoriteOptimistic(stopEntity, container.stopRepository);
                Alert.alert('Dodano', `Przystanek ${stopEntity.stopName} został dodany do ulubionych.`);
            }
        } catch (err) {
            console.error('Błąd parsowania wiadomości z WebView:', err);
        }
    };

  const mapHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
        <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
        <style>
          body, html, #map { margin: 0; padding: 0; height: 100%; width: 100%; }
        </style>
      </head>
      <body>
        <div id="map"></div>
        <script>
          var map = L.map('map').setView([54.352, 18.646], 14);
          
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '© OpenStreetMap'
          }).addTo(map);

          var marker = L.marker([54.352, 18.646]).addTo(map);
          marker.bindPopup("<b>Dworzec Główny</b><br>Węzeł przesiadkowy").openPopup();
        </script>
      </body>
    </html>
  `;

  return (
      <View style={styles.container}>
        <WebView
            originWhitelist={['*']}
            source={{ html: mapHtml }}
            style={styles.map}
        />
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});