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

  const atualizaListas = async (favoritos) =>{
    setListaFavo(favoritos)
    setIdsFavoritos(Object.keys(favoritos))
    }

    const getListaFavo = async () =>{
      const favoritos = await LerFile()
      atualizaListas(favoritos)
      setLoading(false)

      }
   
  useEffect( ()=>  {
    getListaFavo()
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