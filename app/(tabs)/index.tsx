import mqtt from 'mqtt';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import styles from '../styles';

const BROKER_URL = 'ws://broker.hivemq.com:8000/mqtt';
const TOPIC = 'project/esp32/sensors/data';

export default function App() {
  const [temperature, setTemperature] = useState(null);
  const [soilMoisture, setSoilMoisture] = useState(null);
  const [status, setStatus] = useState('Desconectado');
  const [lastUpdate, setLastUpdate] = useState<string | null>(null);

  useEffect(() => {
    setStatus('Conectando...');

    const client = mqtt.connect(BROKER_URL, {
      clientId: `app_expo_${Math.random().toString(16).slice(3)}`,
      clean: true,
      connectTimeout: 4000,
    });

    client.on('connect', () => {
      setStatus('Conectado');
      console.log('Conectado ao Broker MQTT!');
      
      client.subscribe(TOPIC, (err) => {
        if (!err) {
          console.log(`Inscrito no tópico: ${TOPIC}`);
        }
      });
    });

    client.on('message', (topic, message) => {
      const msgString = message.toString();
      console.log(`Mensagem recebida: ${msgString}`);

      try {
        const data = JSON.parse(msgString);
        
        if (data.temperature) setTemperature(data.temperature);
        if (data.soil_moisture) setSoilMoisture(data.soil_moisture);
        
        const now = new Date();
        setLastUpdate(`${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`);

      } catch (e) {
        console.error("Erro ao processar JSON:", e);
      }
    });

    client.on('error', (err) => {
      console.error('Erro de conexão:', err);
      setStatus('Erro de Conexão');
    });

    return () => {
      if (client) client.end();
    };
  }, []);

  const getMoistureColor = (val: number | null) => {
    if (!val) return '#333';
    if (val < 30) return '#e74c3c';
    if (val > 70) return '#3498db';
    return '#2ecc71';
  };

  return (
    <SafeAreaProvider style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Monitor IoT</Text>
        <Text style={styles.status}>Status: {status}</Text>
      </View>

      <View style={styles.cardContainer}>
        <View style={styles.card}>
          <Text style={styles.cardLabel}>Temperatura</Text>
          {temperature ? (
            <Text style={styles.cardValue}>{temperature}°C</Text>
          ) : (
            <ActivityIndicator size="small" color="#555" />
          )}
        </View>

        <View style={[styles.card, { borderLeftColor: getMoistureColor(soilMoisture), borderLeftWidth: 5 }]}>
          <Text style={styles.cardLabel}>Umidade do Solo</Text>
          {soilMoisture ? (
            <Text style={styles.cardValue}>{soilMoisture}%</Text>
          ) : (
            <ActivityIndicator size="small" color="#555" />
          )}
        </View>
      </View>

      {lastUpdate && (
        <Text style={styles.footer}>Última atualização: {lastUpdate}</Text>
      )}
    </SafeAreaProvider>
  );
}