import { StatusBar } from 'expo-status-bar';
import { ImageBackground, StyleSheet, Text, View, Pressable, Image } from 'react-native';
import { useState } from 'react';
//components
import Simbols from './components/Simbols';
import PrediccioComponent from './components/Prediccio';

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
          {showPrediccio ? <PrediccioComponent /> : <Simbols />}
          <Pressable onPress={() => setShowPrediccio(!showPrediccio)}>
            <Image source={require('./assets/cristallBall.png')} style={{width: 60, height: 60}}></Image>
          </Pressable>
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
    justifyContent: 'center'
  },
  backgraund: {
    flex: 1,
    justifyContent: 'center'
  }
});
