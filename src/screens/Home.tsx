import { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { Pokedex } from '../components/Pokedex';
import { PokemonOfDay } from '../components/PokemonOfDay';
import { PokeFavoritos } from '../components/PokeFavoritos';
import { LerFile } from '../functions/FIleEitor';

export function Home(){
  // const {pokemons, setpokemons} = useState(['Hello There ⚔️'])
  const[loading, setLoading] = useState(true)
  const[listaFavo, setListaFavo] = useState({})
  const[idsFavoritos, setIdsFavoritos] = useState([])

  const atualizaListas = async () =>{
    const favoritos = await LerFile()
    setListaFavo(favoritos)
    setIdsFavoritos(Object.keys(favoritos))
    setLoading(false)
    }
   
  useEffect( ()=>  {
    atualizaListas()
  },[])

  return (
    <>
  
    
    <View className=' flex-1 '>

        <View>
          <ScrollView
          className='flex-row'
          horizontal> 
            <PokemonOfDay
               atualizaFavo={atualizaListas}
               firstLoad={loading}
              idsFavo={idsFavoritos}
            />
            <PokeFavoritos
              atualizaFavo={atualizaListas}
              firstLoad={loading}
              listaFavo={listaFavo}
            />
          </ScrollView>
        </View>

      <Pokedex
        atualizaFavo={atualizaListas}
        firstLoad={loading}
        idsFavo={idsFavoritos}
      />
    </View>
  </>  
  );
}