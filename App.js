import { StatusBar } from 'expo-status-bar';
import { ImageBackground, StyleSheet, Text, View, Pressable } from 'react-native';
import { useState } from 'react';
//components
import Simbols from './components/Simbols';
import PrediccioComponent from './components/Prediccio';
import Posicio from './components/Posicio';

//to test
//import * as SystemUI from 'expo-system-ui';
//const color = await SystemUI.getBackgroundColorAsync();

export default function App() {
  const [showPrediccio, setShowPrediccio] = useState(false);

  return (
    <View style={styles.container}>
      <ImageBackground 
        source={require(('./assets/wallPaper.jpg'))}  
        style={styles.backgraund}
      >
        <View style={styles.container}>
          <Text style={{fontSize: 25, color: '#0d1b2a'}}>El Frare Z2rts</Text>
          <Pressable onPress={() => setShowPrediccio(!showPrediccio)}>
            {showPrediccio ? <PrediccioComponent /> : <Simbols />}
            <Text style={styles.buttonBox}>Predicció</Text>
          </Pressable>
          <Posicio />
          {/* <Text>{color}</Text> */}
          <StatusBar style="auto" />
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgraund: {
    flex: 1,
    justifyContent: 'center'
  },
  buttonBox: {
    backgroundColor: 'gray',
    textAlign: 'center'
  }
});
