import { ActivityIndicator, SafeAreaView,
   ScrollView, Text, View } from "react-native"
import { PokemonRow } from "./PokemonRow"
import Icon from '@expo/vector-icons/FontAwesome'

interface Props{
  atualizaFavo: any,
  firstLoad: boolean
  listaFavo: {}
}

export function PokeFavoritos({atualizaFavo, listaFavo, firstLoad } :Props){
  const empty =<Icon name='star-o' color='#000' size={28} />
  return (
    <View className="mb-2">
     <SafeAreaView className="mt-7">
      
      <View className="flex-row my-2 mx-4 ">
        <Text
        className="border-1 w-[90vw] rounded-md pl-2 mr-1 h-[40px] 
        text-center items-center justify-center py-2 text-[#fff700] 
        text-[20px] font-bold
        "  
        >
          {Object.keys(listaFavo).length  } Pokemons Favoritos  
        </Text>
      </View>
   
    <ScrollView
      horizontal
    >
      {firstLoad ?
        <ActivityIndicator size={'large'} color={"#0000ff"} className='my-4 '></ActivityIndicator> 
        : 
        Object.keys(listaFavo).length > 0 ?  Object.keys(listaFavo).map( (id: String)=>{
          const pokemon = listaFavo[`${id}`]
          return (
            <View key={id}>
              {
                id.includes('_') == false ?
                <PokemonRow  
                            width="mx-4 mb-2 rounded-r-lg w-[92vw] " 
                            heigth="h-[160px]" poke={pokemon} 
                            favorito={true} 
                            atualiza={atualizaFavo} />
                          :<></>
              }
            </View>
          
          )
          return <></>
        })
        : <View className="bg-white flex-row ml-5 mt-2 
          rounded-l-lg mx-4 mb-2 rounded-r-lg 
          w-[92vw] h-[160px] 
          text-center items-center justify-evenly
          flex-col
          ">
          <Text className="text-lg font-bold" > Clique na  </Text>
          <Text>{empty}</Text>
          <Text className="text-lg font-bold"> Para adiconar aos favoritos</Text>
        </View>
      
    }
    </ScrollView>
    </SafeAreaView>
    </View>
  );
}