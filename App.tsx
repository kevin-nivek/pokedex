import { StatusBar } from 'expo-status-bar';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import { Home } from './src/screens/Home';

export default function App() {
  return (
    <>
      <ImageBackground source={require('./src/assets/background.jpg')} resizeMode="cover"style={{flex: 1,zIndex:-999}} >
        
      <StatusBar style='light' backgroundColor='transparent' translucent />
      <Home></Home>
      </ImageBackground>
    </>
  );
}

