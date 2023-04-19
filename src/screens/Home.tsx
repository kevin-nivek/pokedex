import { useEffect, useState } from 'react';
import { ImageBackground, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Pokedex } from '../components/Pokedex';
import { PokemonOfDay } from '../components/PokemonOfDay';
import api from '../service/api';
import { PokeFavoritos } from '../components/PokeFavoritos';

export function Home(){
  // const {pokemons, setpokemons} = useState(['Hello There ⚔️'])
  
  
  return (
    <>
  
    
    <View className=' flex-1 '>

        <View>
          <ScrollView
          className='flex-row'
          horizontal> 
            <PokemonOfDay/>
            <PokeFavoritos/>
          </ScrollView>
        </View>

      <Pokedex />
    </View>
  </>  
  );
}