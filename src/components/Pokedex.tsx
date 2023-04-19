import { useEffect, useState } from 'react';
import { ActivityIndicator, Button, FlatList, ScrollView, StyleSheet,Image, Text, View, TouchableOpacity } from 'react-native';
import api from '../service/api';
import { PokemonRow } from './PokemonRow';
import Ultraball from '../assets/ultraball-img.png';
import FireIcon from '../assets/icons/fogo.svg';
import BugIcon from '../assets/icons/bug.svg';
import WaterIcon from '../assets/icons/agua.svg';
import IceIcon from '../assets/icons/ice.svg';
import DarkIcon from '../assets/icons/dark.svg';
import DragonIcon from '../assets/icons/dragon.svg';
import EletricoIcon from '../assets/icons/eletrico.svg';
import FadaIcon from '../assets/icons/fada.svg';
import GhostIcon from '../assets/icons/ghost.svg';
import GrassIcon from '../assets/icons/grass.svg';
import LutadorIcon from '../assets/icons/lutador.svg';
import MetalIcon from '../assets/icons/metal.svg';
import NormalIcon from '../assets/icons/normal.svg';
import PedraIcon from '../assets/icons/pedra.svg';
import TerraIcon from '../assets/icons/terra.svg';
import PSYIcon from '../assets/icons/psyc.svg';
import FlyIcon from '../assets/icons/fly.svg';
import VenenoIcon from '../assets/icons/veneno.svg';
import { LerFile } from '../functions/FIleEitor';

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

export function Pokedex(){
  const [pokemons, setpokemons] = useState<Pokemon[]>([])
  const [offset , setoffset] = useState<number>(0)
  const [loading, setLoading] = useState(true)
  const [showFilter, setShowFilter]= useState(false);
  const [typeSearch, setTypeSearch] = useState(-1);
  const [typePokemons, setTypePokemons] = useState<Pokemon[]>([])
  const[idsFavoritos, setIdsFavoritos] = useState([])
  
  const list_icons =[
    { 'nome':'água',
      'valor':11,
      'icon': <WaterIcon/>
    },

    { 'nome':'dragão',
      'valor':16,
      'icon': <DragonIcon/>
    },
    { 'nome':'elétrico',
      'valor':13,
      'icon': <EletricoIcon/>
    },
    { 'nome':'fada',
      'valor':18,
      'icon': <FadaIcon/>
    },
    { 'nome':'fantasma',
      'valor':8,
      'icon': <GhostIcon/>
    },
    { 'nome':'fogo',
      'valor':10,
      'icon': <FireIcon/>
    },
    { 'nome':'gelo',
      'valor':15,
      'icon': <IceIcon/>
    },
    { 'nome':'grama',
      'valor':12,
      'icon': <GrassIcon/>
    },
    { 'nome':'inseto',
      'valor':7,
      'icon': <BugIcon/>
    },
    { 'nome':'lutador',
      'valor':2,
      'icon': <LutadorIcon/>
    },
    { 'nome':'metal',
      'valor':9,
      'icon': <MetalIcon/>
    },
    { 'nome':'normal',
      'valor':1,
      'icon': <NormalIcon/>
    },
    { 'nome':'pedra',
      'valor':6,
      'icon': <PedraIcon/>
    },
    { 'nome':'psíquico',
      'valor':14,
      'icon': <PSYIcon/>
    },
    
    { 'nome':'sombrio',
      'valor':17,
      'icon': <DarkIcon/>
    },
    { 'nome':'terra',
      'valor':5,
      'icon': <TerraIcon/>
    },
    { 'nome':'veneno',
      'valor':4,
      'icon': <VenenoIcon/>
    },
    { 'nome':'voador',
      'valor':3,
      'icon': <FlyIcon/>
    },

   
  ]

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
      fetchData()
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
    fetchData()
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
      }, 800);
    }else{
      setTypeSearch(type);
      getTypes(type, [])
    }
  }

 const atualizaLista = async (newList)=>{
    setIdsFavoritos(Object.keys(newList))
  }
  const fetchData = async () =>{
    const favoritos = await LerFile()
    setIdsFavoritos(Object.keys(favoritos))
  }

  useEffect(()=>{
    getAllPokemon(0)
  },[])

  return (
    <View className='flex-1 mb-4'>
      
      <View className='mb-2 flex-row px-4 justify-between z-20'>
        <Text className='text-pokeName pl-2 text-white'>Pokedex</Text>
        <TouchableOpacity
          onPress={() => setShowFilter(!showFilter) }
        >
          <Image className='w-[50px] h-[50px]' source={require('../assets/ultraball-img.png')}/>
        </TouchableOpacity>
      </View>

      <View 
        style={{ display:showFilter? 'flex': 'none' }}
        className='w-[100%] h-[90%] z-10 absolute mt-8  justify-center items-center'
      >
        <View className='items-center justify-center w-[95%]  bg-gray-500 rounded-lg'> 
          <ScrollView
            contentContainerStyle={{paddingHorizontal:4}}
          >
            <View className='mt-2 flex-wrap w-[100%] flex-row'>
              {
                list_icons.map((key, i) =>{
                  return (
                    <View key={key.valor}>
                      <TouchableOpacity 
                        style={{borderWidth: key.valor==typeSearch? 2 :0, borderColor: 'red' , borderRadius: 25 }}
                        className='mx-2 my-4 items-center justify-center w-[100]'
                        onPress={() =>searchType(key.valor)}
                        >
                        <View>{key.icon}</View>
                        <Text className='capitalize text-m pb-1 text-white'>{key.nome}</Text> 
                      </TouchableOpacity>
                    </View>
                  )
                })
              }
            </View>
          </ScrollView>
        </View>
      </View>
      
      <FlatList  
      style={{display: typeSearch==-1 ? 'flex': 'none'}}
      className='relative'
      data={pokemons}
      keyExtractor={poke => `${poke.id}-${offset}`}
      renderItem={ (item) =>( <PokemonRow key={ `${item.item.id}-${item.item.name}`} poke={item.item} 
         favorito={idsFavoritos.indexOf(`${item.item.id}`)!=-1}
         atualiza={atualizaLista}
        />)}
      // contentContainerStyle={{marginHorizontal: 20}}
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
        favorito={idsFavoritos.indexOf(`${item.item.id}`)!=-1}
        atualiza={atualizaLista}/>)}
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