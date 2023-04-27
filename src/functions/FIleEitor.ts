import AsyncStorage from '@react-native-async-storage/async-storage';
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
export async function LerFile(){  
    try {
      const keys =  await AsyncStorage.getAllKeys()
      if( keys.includes('@Lista_favoritos')){
        const jsonValue = await AsyncStorage.getItem('@Lista_favoritos')
        return jsonValue != null ? JSON.parse(jsonValue) : null;
      }else return {}
    } catch(e) {
      // error reading value
    }
  }
 export async function EditFile(pokemon: Pokemon){
  const oldList =await LerFile()
  let list= oldList != null ? oldList : {}
  list[pokemon.id] = pokemon;
    try {
        AsyncStorage.setItem('@Lista_favoritos', JSON.stringify(list))
    } catch (e) {
      // saving error
    }
  return list
}



export async function DeleteFile(pokemon: Pokemon){
  const oldList = await LerFile()
  let list= oldList != null ? oldList : {}
  delete list[pokemon.id] 
    try {
      AsyncStorage.setItem('@Lista_favoritos', JSON.stringify(list))
    } catch (e) {
      // saving error
    }
  return list
}

