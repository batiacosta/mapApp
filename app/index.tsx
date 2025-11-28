import { markers } from '@/assets/marker';
import { useNavigation } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MapView, { Callout, Marker, PROVIDER_GOOGLE, Region } from 'react-native-maps';

const INITIAL_REGION = {
    latitude: 35.2057,
    longitude: -97.4455,
    latitudeDelta: 0.03,
    longitudeDelta: 0.03
}

export default function App() {
    const mapRef = useRef<any>(null);
    const navigation = useNavigation();

    useEffect(
        () => {
            const handler = (e: any) => {
                    console.warn('Unhandled promise rejection:', e?.reason ?? e);
                };
                if (typeof window !== 'undefined' && window.addEventListener) {
                    window.addEventListener('unhandledrejection', handler);
                    return () => window.removeEventListener('unhandledrejection', handler);
                }
        
            navigation.setOptions({
                headerLeft: () => (
                    <TouchableOpacity onPress={focusMap}>
                        <View style={{ padding: 10 }}>
                            <Text>Focus</Text>
                        </View>
                    </TouchableOpacity>
                )
            });
        }, []
    );

    useEffect(() => {
  
}, []);

    const focusMap = () => {

        //mapRef.current?.animateToRegion(GreenBayStadium);
        mapRef.current?.animateCamera({ center: INITIAL_REGION, zoom: 10 }, { duration: 2000 });
    };

    const onMarketSelected = (marker: any) => {
        try {
            console.log('Marker pressed:', marker);
            // Marker can be an object passed from the array or an event payload depending on platform/version.
            const name =
                marker && typeof marker === 'object'
                    ? (marker.name ?? (marker.nativeEvent && marker.nativeEvent.name) ?? JSON.stringify(marker))
                    : String(marker ?? 'Unknown');

            Alert.alert(`${name}`, `You selected ${name}`);
        } catch (err) {
            console.error('Error showing alert for marker press', err);
        }
    };

    const calloutPressed = (ev: any) => {
        console.log(ev);
    }

    const onRegionChange = (region: Region) => {
        console.log('Region changed to:', region);
    }
    return (
        <View style={{ flex: 1 }}>
            <MapView 
            style={StyleSheet.absoluteFill}
            initialRegion={INITIAL_REGION}  
            showsUserLocation
            showsMyLocationButton
            provider={PROVIDER_GOOGLE}
            ref={mapRef}
            onRegionChangeComplete={onRegionChange}
            >
            {markers.map((marker, index) => (
                <Marker
                    key={index}
                    title={marker.name}
                    coordinate={marker}
                    onPress={() => onMarketSelected(marker)}
                >
                    <Callout onPress={calloutPressed}>
                        <View style={{ padding: 10 }}>
                            <Text style={{ fontSize: 24 }}>{marker.name}</Text>
                        </View>
                    </Callout>
                </Marker>
            ))}
            </MapView>
        </View>
    );
}
