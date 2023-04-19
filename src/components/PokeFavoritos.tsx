import { useEffect, useState } from "react"
import { ActivityIndicator, FlatList, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native"
import { PokemonRow } from "./PokemonRow"
import { LerFile } from "../functions/FIleEitor"

type PokemonType= {
  type: {name:string},

}

type Pokemon = {
  name:string,
  url: string,
  id: number,
  types: PokemonType[]
}

export function PokeFavoritos(){
  const[listaFavo, setListaFavo] = useState({})
  const[idsFavoritosDay, setIdsFavoritosDay] = useState([])
  const[loading, setLoading] = useState(true)

  const atualizaListaFavorita=async (newList)=>{
    setListaFavo(newList)
    setLoading(false)
  }

  useEffect( ()=>  {
    const fetchData = async () =>{
    const favoritos = await LerFile()
    setListaFavo(favoritos)
    setLoading(false)
    }
    fetchData()
  },[])

  async function handleRefreshFavorites(){
    const favoritos = await LerFile()
    setListaFavo(favoritos)
    setLoading(false)
    
  }
  
  return (
    <View className="mb-2">
     <SafeAreaView className="mt-7">
      <TouchableOpacity
        onPress={() => {
          setLoading(true)
          handleRefreshFavorites() }
        }
      >
        <View className="flex-row my-2 mx-4 ">
          
          <Text
          className="border-1 w-[90vw] rounded-md pl-2 mr-1 h-[40px] 
          text-center items-center justify-center py-2 text-[#fff700] 
          text-[20px] font-bold
          "  
          >
            Pokemons Favoritos
          </Text>
        </View>
      </TouchableOpacity>
    <ScrollView
      horizontal
    >
      {loading?
        <ActivityIndicator size={'large'} color={"#0000ff"} className='my-4 '></ActivityIndicator> 
        : Object.keys(listaFavo).map( (id: String)=>{
          const pokemon = listaFavo[`${id}`]
          return (
            <View key={id}>
              {
                id.includes('_') == false ?
                <PokemonRow  
                            width="mx-4 mb-2 rounded-r-lg w-[92vw] " 
                            heigth="h-[160px]" poke={pokemon} 
                            favorito={true} 
                            atualiza={atualizaListaFavorita} />
                          :<></>
              }
            </View>
          
          )
          return <></>
        })
    }
    </ScrollView>
    </SafeAreaView>
    </View>
  );
}