import { View, Text, Image, TouchableOpacity,  } from "react-native";
import { Type } from "./type";
import clsx from "clsx";
import Pokeball from '../assets/pokeball.svg'
import Icon from '@expo/vector-icons/FontAwesome'
import {DeleteFile, EditFile, LerFile} from '../functions/FIleEitor'
import { useEffect, useState } from "react";
type PokemonType= {
  type: {
    name: string
  }

}

type Pokemon = {
  name:string,
  url: string,
  id: number,
  types: PokemonType[]
}
interface Props{
  poke: Pokemon
  width: string
  heigth: string
  favorito: boolean
  atualiza: any
}

export function PokemonRow({poke, width='', heigth='', favorito=false, atualiza } :Props){
  let poketype=`${poke.types[0].type.name}`
  const favorited = <Icon name='star' color='#fff700' size={28} />
  const empty =<Icon name='star-o' color='#fff' size={28} />
  
  async function alterFave(pokemon: Pokemon, func: number){
    if (func ==1){
      const edited =await EditFile(pokemon)
    atualiza(edited);

    }
    else if (func ==0){
      const edited =await DeleteFile(pokemon)
      atualiza(edited);
    }
    
  }

  return(
    <View className={clsx(` flex-row ml-5 mt-2  rounded-l-lg bg-bg_electric ${width} ${heigth} `,
    {
      ['bg-bg_bug']: poketype =="bug",
      ['bg-bg_dark']: poketype =="dark",
      ['bg-bg_dragon']: poketype =="dragon",
      ['bg-bg_electric']: poketype =="electric",
      ['bg-bg_fairy']: poketype =="fairy",
      ['bg-bg_fighting']: poketype =="fighting",
      ['bg-bg_fire']: poketype =="fire",
      ['bg-bg_flying']: poketype =="flying",
      ['bg-bg_ghost']: poketype =="ghost",
      ['bg-bg_grass']: poketype =="grass",
      ['bg-bg_ground']: poketype =="ground",
      ['bg-bg_ice']: poketype =="ice",
      ['bg-bg_normal']: poketype =="normal",
      ['bg-bg_poison']: poketype =="poison",
      ['bg-bg_psychic']: poketype =="psychic",
      ['bg-bg_rock']: poketype =="rock",
      ['bg-bg_steel']: poketype =="steel",
      ['bg-bg_water']: poketype =="water"

    },
    )}>
      <View className="w-1/2 h-full pt-2 pl-4">
      
          <TouchableOpacity
          
              onPress={()=>{
                 alterFave(poke, favorito ? 0 : 1)
              }}
            >
                <View className="w[100%] flex-row items-center">
                {favorito ? favorited : empty}
          
                <Text className='text-white text-idPoke text-xs pl-2'>#{poke.id}</Text>
              </View>
            </TouchableOpacity>
    
        

        <View className="  ">
          <Text className='text-white text-pokeName bold capitalize'>{poke.name}</Text>
          <View className="flex-row items-start my-2">
            {poke.types.map(type => <Type key={`${poke.name}-${type.type.name}`} type={type.type.name} ></Type >)}
          </View>
          
        </View>
      </View>  

      <View className="items-end w-6/12 items-center">
        <Image
        style={{resizeMode: 'contain', width: 150, height:150,}}
        source={{
              uri:`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${poke.id}.png`,
            }}>
          </Image>
        <Pokeball style={{zIndex:-1,position: 'absolute', left: 50, top:8}}></Pokeball>
        
      </View>
    </View>
  );
}