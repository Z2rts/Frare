import { useState, useEffect } from 'react';
import { Platform, View, Text } from 'react-native';
import * as Device from 'expo-device';
import * as Location from 'expo-location';

export default function Posicio() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS === 'android' && !Device.isDevice) {
        setErrorMsg(
          'Oops, this will not work on Snack in an Android Emulator. Try it on your device!'
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
    longitude = location.coords.longitude.toFixed(1); // toFixedd nomes un decimal
  }

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  return(
    <View>
      <Text>{latitude}, {longitude}</Text>
    </View>
  )
}
