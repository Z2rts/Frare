import { useState, useEffect } from 'react';
import { Platform } from 'react-native';
import * as Device from 'expo-device';
import * as Location from 'expo-location';

export default function Posicio() {
  const [location, setLocation] = useState(null)
  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    (async () => {
      if (Platform.OS === 'android' && !Device.isDevice) {
        setErrorMsg(
          'This will not work on Snack in an Android Emulator. Try it on your device!'
        );
        return;
      }
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  let latitude = null
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    latitude = location.coords.latitude.toFixed(1);
  }

  let longitude = null
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    longitude = location.coords.longitude.toFixed(1);
  }

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  return ({latitude, longitude})
}
