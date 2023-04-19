import { useEffect, useState } from "react";
import { ActivityIndicator, View, Text, TextInput, Button,TouchableOpacity, SafeAreaView } from "react-native";
import api from '../service/api';
import { PokemonRow } from "./PokemonRow";
import PokeballBtn from '../assets/pokeball_btn.svg'
import { PokeLoading } from "./PokeLoading";
import { LerFile } from "../functions/FIleEitor";
type PokemonType= {
  type: {name:string},

}

type Pokemon = {
  name:string,
  url: string,
  id: number,
  types: PokemonType[]
}
type Request ={
  id:number;
  types: PokemonType[]
}

export function PokemonOfDay(){
  const[ pokemon, setPokemon] = useState<Pokemon>()
  const[loading, setLoading] = useState(true)
  const[searchText, setSearchText] = useState('')
  const[listaFavo, setListaFavo] = useState({})
  const[idsFavoritosDay, setIdsFavoritosDay] = useState([])
 
  async function getPokemon(search='') {
    const get_id = Math.floor(Math.random()*1008)+1
    console.log(get_id)
    const response = await api.get(`pokemon/${search ? search : get_id}`)  
    const {id,name, types} = response.data;
    const payloadPokemons={
            name,
            id,
            types
          }
    setPokemon(payloadPokemons)
    setSearchText('')
    setLoading(false);
  }

  const atualizaListaDay=async (newList)=>{
    setIdsFavoritosDay(Object.keys(newList))
  }
    const fetchData = async () =>{
      const favoritos = await LerFile()
      setListaFavo(favoritos)
      setIdsFavoritosDay(Object.keys(favoritos))
    }

  useEffect( ()=>  {
    getPokemon()
    fetchData()
  },[])

  function getSearch(){
    setLoading(true)
    getPokemon(searchText.toLowerCase())
    fetchData()
  }

  return (
    <View className="mb-2 w-[95vw]">
     <SafeAreaView className="mt-7">
      <View className="flex-row my-2 mx-4">
        <TextInput
          id="search-pokemon"
          placeholder="Busque Pokemon por nome ou id"
          className="border-1 w-[90%] bg-white rounded-md pl-2 mr-1" 
          onChangeText={(text)=>{setSearchText(text)}}
          value={searchText}
          >
        </TextInput>
        <TouchableOpacity
          className=" "
          onPress={getSearch}
        >
          <PokeballBtn ></PokeballBtn>
        </TouchableOpacity>
      </View> 
      </SafeAreaView>
      {
        loading ? 
          <ActivityIndicator size={'large'} color={"#0000ff"} className='my-4 '></ActivityIndicator> 
          :
          <PokemonRow width="mx-4 mb-2 rounded-r-lg" heigth="h-[160px]"
            poke={pokemon} favorito={idsFavoritosDay.indexOf(`${pokemon.id}`)!=-1} 
            atualiza={atualizaListaDay} />
      }
    </View>
  )
}