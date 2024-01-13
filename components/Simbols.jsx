import React, {useState, useEffect} from 'react';
import { StyleSheet, Image, Text } from 'react-native';

const Simbols = () => {
  const URL = 'https://static-m.meteo.cat/content/opendata/dadesobertes_pg.json'
  //const [simbol, setSimbol] = useState()
  const [imgSimbol, setImgSimbol] = useState(null)
  const [textSimbol, setTextSimbol] = useState(null)

  const simbolImgMap = {
    '1': require('../assets/img-simbols/frare-bo.png'), // sol
    '2': require('../assets/img-simbols/frare-bo.png'), // sol i nuvols alts
    '3': require('../assets/img-simbols/frare-bo.png'), // poc enuvolat
    '4': require('../assets/img-simbols/frare-revolt.png'), // cobert
    '5': require('../assets/img-simbols/frare-insegur.png'), // plujim
    '6': require('../assets/img-simbols/frare-pluja.png'), // pluja
    '7': require('../assets/img-simbols/frare-pluja.png'), // xàfec
    '8': require('../assets/img-simbols/frare-pluja.png'), // tempesta
    '9': require('../assets/img-simbols/frare-pluja.png'), // tempesta amb calamarsa
    '10': require('../assets/img-simbols/frare-pluja.png'), // neu
    '11': require('../assets/img-simbols/frare-humit.png'), // boira
    '12': require('../assets/img-simbols/frare-humit.png'), // boirina
    '13': require('../assets/img-simbols/frare-pluja.png'), // xàfec de neu
    '20': require('../assets/img-simbols/frare-revolt.png'), // ennuvolat
    '21': require('../assets/img-simbols/frare-insegur.png'), // cobert
    '22': require('../assets/img-simbols/frare-humit.png'), // calitja
    '23': require('../assets/img-simbols/frare-pluja.png'), // ruixats
    '24': require('../assets/img-simbols/frare-pluja.png'), // xàfec amb tempesta
    '25': require('../assets/img-simbols/frare-pluja.png'), // xàfec
    '26': require('../assets/img-simbols/frare-pluja.png'), // ruixat 
    '27': require('../assets/img-simbols/frare-pluja.png'), // neu feble
    '28': require('../assets/img-simbols/frare-pluja.png'), // temperatura neu
    '29': require('../assets/img-simbols/frare-pluja.png'), // xàfec
    '30': require('../assets/img-simbols/frare-pluja.png'), // aiguaneu
    '31': require('../assets/img-simbols/frare-pluja.png'), // ruixat
    '32': require('../assets/img-simbols/frare-pluja.png'), // plugim
  }

  const simbolsTextMap = {
    '1': ('sol'),'2': ('sol i nuvols alts'),'3': ('poc enuvolat'),
    '4': ('cobert'),'5': ('plujim'),'6': ('pluja'),'7': ('xàfec'),
    '8': ('tempesta'),'9': ('tempesta amb calamarsa'),'10': ('neu'),
    '11': ('boira'),'12': ('boirina'),'13': ('xàfec de neu'),'20': ('ennuvolat'),
    '21': ('cobert'),'22': ('calitja'),'23': ('ruixats'),'24': ('xàfec amb tempesta'),
    '25': ('xàfec'),'26': ('ruixat'),'27': ('neu feble'),'28': ('temperatura neu'),
    '29': ('xàfec'),'30': ('aiguaneu'),'31': ('ruixat'),'32': ('plugim')
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(URL, { method: 'GET' });
        const data = await response.json();
        const codi = data[1].versio.tarda.simbols.estatDelCel[8].codi
        // setSimbol(codi)

        setImgSimbol(simbolImgMap[codi])
        setTextSimbol(simbolsTextMap[codi])
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    };
    fetchData();
  }, [])

  //console.log('SIMBOL', simbol)
  //console.log('IMGSSIMBOL', imgSimbol)

  return (
    <>
      <Image
        source={imgSimbol} 
        style={styles.image}
      />
      <Text style={styles.text}>{`${textSimbol}`}</Text>
    </>
  );
};

export default Simbols;

const styles = StyleSheet.create({
  image: {
    width: 600,
    height: 600
  },
  text: {
    textAlign: 'center',
    color: 'black'
  }
});
