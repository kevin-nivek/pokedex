import { useState } from 'react';
import { ActivityIndicator, Button, FlatList, ScrollView, StyleSheet,Image, Text, View, TouchableOpacity } from 'react-native';
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

interface Props{
  setFilter: any,
  typeSelected: number
}

export function Filtro({setFilter, typeSelected} :Props){
  const [showFilter, setShowFilter]= useState(false);

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
  
  return (
    <>
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
                        style={{borderWidth: key.valor==typeSelected? 2 :0, borderColor: 'red' , borderRadius: 25 }}
                        className='mx-2 my-4 items-center justify-center w-[100]'
                        onPress={() =>setFilter(key.valor)}
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
    </>
  )

}