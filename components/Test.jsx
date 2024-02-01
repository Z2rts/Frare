import { useState, useEffect } from 'react';
import usePosicio from './usePosicio';

const Test = () => {
  const [coordsJson, setCoordsJson] = useState([]);
  const [idNearby, setIdNearby] = useState(1);//!!!!!!!!!!!!!

  const pos = usePosicio()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const URL = 'https://static-m.meteo.cat/content/opendata/dadesobertes_pg.json';
        const response = await fetch(URL, { method: 'GET' });
        const data = await response.json();
        const posicio = data[1].versio.tarda.simbols.estatDelCel.map(item => item.posicio);

        setCoordsJson(posicio);
      } catch (error) {
        console.error('Error to get data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (pos && coordsJson.length > 0) {
      const coordsReverse = coordsJson.map(coord => {
        try {
          const [longitude, latitude] = coord
            .replace(/[()]/g, '')
            .split(',')
            .map(coord => parseFloat(coord.trim()));

          return { latitude, longitude };
        } catch (error) {
          console.error('Error coords:', error);
        }
      });

      let distMin = Number.MAX_VALUE;
      let idNearby= null;

      coordsReverse.forEach((coord, index) => {
        const dist = Math.sqrt(
          Math.pow(pos.latitude - coord.latitude, 2) +
          Math.pow(pos.longitude - coord.longitude, 2)
        );
        if (dist < distMin) {
          distMin = dist;
          idNearby= index;
        }
      });

      setIdNearby(idNearby);
    }
  }, [coordsJson, pos]);

  return idNearby
};

export default Test
