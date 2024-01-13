import React, {useState, useEffect} from 'react'
import { View, StyleSheet, Text, FlatList } from 'react-native'
import moment from 'moment/moment'

const PrediccioComponent = () => {
  const URL = 'https://static-m.meteo.cat/content/opendata/dadesobertes_pg.json'

  const [data, setData] = useState([])

  useEffect( () => {
    fetch(URL, { method: 'GET' })
      .then(response => response.json())
      .then(data => {setData(data)})
			.catch(error => {console.log(error)})
  }, []);

  const renderItem = ({ item }) => {
    const dia = item.diaPredit;
    const data = moment(dia, 'YYYYMMDD[T]HHmmss[Z]');
    let diaSemana = data.format('dddd');
    if (diaSemana === 'Monday') {
      diaSemana = 'Dilluns'}
    if (diaSemana === 'Tuesday') {
      diaSemana = 'Dimarts'}
    if (diaSemana === 'Wednesday') {
      diaSemana = 'Dimecres'}
    if (diaSemana === 'Thursday') {
      diaSemana = 'Dijous'}
    if (diaSemana === 'Friday') {
      diaSemana = 'Divendres'}
    if (diaSemana === 'Saturday') {
      diaSemana = 'Dissabte'}
    if (diaSemana === 'Sunday') {
      diaSemana = 'Diumenge'}
    
    return(
      <>  
        <View style={{ marginBottom: 10, padding: 30}}>
          <Text style={styles.text}>El {diaSemana}:</Text>
          <Text style={styles.text}>Estat del Cel: </Text>
            <Text>{item.versio.variables.estatDelCel}</Text>
          {item.versio.variables.precipitacions !== "No s'espera precipitació." && (
            <>
            <Text style={styles.text}>Precipitacions: </Text> 
              <Text>{item.versio.variables.precipitacions}</Text>
            </>
          )}
          <Text style={styles.text}>Temperatures: </Text>
            <Text>{item.versio.variables.temperatures}</Text>
        </View>
      </>  
    );
  };

  return (
    <View>
      <FlatList
        data={data.length >= 2 ? [data[1]] : []}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        style={styles.text}
      />
      <FlatList
        data={data.length >= 2 ? [data[2]] : []}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        style={styles.text}
      />
      <Text style={[styles.textProveidor, { color: 'black' }]}>Dades proveïdes per: Departament d'Acció Climàtica, Alimentació i Agenda Rural</Text>
    </View>
  );
}

export default PrediccioComponent;

const styles = StyleSheet.create({
  containerBox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center'
  },
  text: {
    color: 'black',
    fontSize: 20,
    //fontWeight: 20
  },
  textProveidor: {
    padding: 30
  }
});
