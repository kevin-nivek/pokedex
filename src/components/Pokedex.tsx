import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList,
          View } from 'react-native';
import api from '../service/api';
import { PokemonRow } from './PokemonRow';
import { Filtro } from './Filtro';

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

interface Props{
  atualizaFavo: any,
  idsFavo: []
}

export function Pokedex({atualizaFavo, idsFavo } :Props){
  const [pokemons, setpokemons] = useState<Pokemon[]>([])
  const [offset , setoffset] = useState<number>(0)
  const [loading, setLoading] = useState(true)
  const [typeSearch, setTypeSearch] = useState(-1);
  const [typePokemons, setTypePokemons] = useState<Pokemon[]>([])

  async function getAllPokemon(offset: number) {
    const response = await api.get(`/pokemon?limit=25&offset=${offset}`)  
    const {results} = response.data;
    const payloadPokemons = pokemons; 
      payloadPokemons.push(...await Promise.all(
        results.map(async (pokemon: Pokemon) =>{
          const {id, types} = await getMoreInfo(pokemon.url)
          return {
            name: pokemon.name,
            id,
            types,
            url: pokemon.url
          }
        })
      )
      )
      setoffset((offset+25))
      setpokemons(payloadPokemons)
      setTimeout(() => {
        setLoading(false)
    }, 800);
   
  }

  async function getMoreInfo(url: string): Promise<Request>{
    const response = await api.get(url)
    const {id, types} = response.data
    return {id, types}
  }

  async function getTypes(type: number, listaAtual: Pokemon[]){
    const response = await api.get(`/type/${type}`)
   const results = response.data.pokemon
   
    const payloadPokemons = listaAtual;
    payloadPokemons.push(...await Promise.all(
      results.map(async (poke: Pokemon) =>{
        let {pokemon} = poke;
        
        const {id, types} = await getMoreInfo(pokemon.url)
        return {
          name: pokemon.name,
          id,
          types,
        }
      })
    ));
    setTypePokemons(payloadPokemons)
    setTimeout(() => {
      setLoading(false)
    }, 800);
      
  } 

  function searchType(type :number){
    setLoading(true)
    
    if (type == typeSearch){
      setTypeSearch(-1);
      setTimeout(() => {
        setLoading(false)
      }, 200);
    }else{
      setTypeSearch(type);
      getTypes(type, [])
    }
  }

  useEffect(()=>{
    getAllPokemon(0)
  },[])

  return (
    <View className='flex-1 mb-4'>
      <Filtro setFilter={searchType} typeSelected={typeSearch} />

      <FlatList  
      style={{display: typeSearch==-1 ? 'flex': 'none'}}
      className='relative'
      data={pokemons}
      keyExtractor={poke => `${poke.id}-${offset}`}
      renderItem={ (item) =>( <PokemonRow key={ `${item.item.id}-${item.item.name}`} poke={item.item} 
        favorito={idsFavo.indexOf(`${item.item.id}`)!=-1}
        atualiza={atualizaFavo}
        />)}
      onEndReached={loading ? null : () => { 
                      setLoading(true);
                      
                      setoffset((offset+25));
                          getAllPokemon(offset)
                        }}
      onEndReachedThreshold={0.2}
      
      showsHorizontalScrollIndicator={false}
      ListFooterComponent={
      loading? <ActivityIndicator size={'large'} color={"#0000ff"} className='my-4 '></ActivityIndicator> : <></>
      }
      
      />
      <FlatList  
      style={{display: typeSearch==-1 ? 'none': 'flex'}}
      className='relative'
      data={typePokemons}
      keyExtractor={poke => `${poke.id}-${offset}`}
      renderItem={ (item) =>( <PokemonRow key={ `${item.item.id}-${item.item.name}`} poke={item.item}
        favorito={idsFavo.indexOf(`${item.item.id}`)!=-1}
        atualiza={atualizaFavo}/>)}
      onEndReachedThreshold={0.2}  
      showsHorizontalScrollIndicator={false}
      ListFooterComponent={
        loading? <ActivityIndicator size={'large'} color={"#0000ff"} className='my-4 '></ActivityIndicator> 
          : <></>
      }
      
      />
    </View>
  );
}