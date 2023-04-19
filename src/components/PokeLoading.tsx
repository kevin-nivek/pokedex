import { useEffect, useState } from 'react';
import { Animated, View, Easing, Image } from 'react-native'
import Ultraball from '../assets/ultraball-img.png'

interface Props{
  loading: boolean
}

export function  PokeLoading({loading} :Props){
  
  
  let rotateValueHolder = new Animated.Value(0);
  
  const startAnimation =  () =>{
    rotateValueHolder.setValue(0);
    Animated.timing(rotateValueHolder, {
     useNativeDriver: false,
     toValue: 7,
     duration:750,
     easing: Easing.ease
    }).start(() =>{startAnimation()})
  }
  let min = 0;
  let max = 1;
  const RotateData = rotateValueHolder.interpolate({
    inputRange: [0, 1, 2, 3, 4, 5 ,6, 7],
        outputRange: ['0deg', '45deg', '-45deg', '30deg', '-30deg','15deg', '-15deg', '0deg']
  });


   useEffect(() =>{
    
     console.log(loading)
    loading ?
    startAnimation()
   
    : setTimeout(()=>{
      Animated.timing(rotateValueHolder, {
        useNativeDriver: false,
        toValue: 7,
        duration: 250,
        easing: Easing.linear
       }).stop()
    }, 500)
   },[loading])

  return ( 
    <View className='items-center justify-center my-2' style={{display: loading? 'flex': 'none'}}>
      <Animated.Image 
        source={require('../assets/ultraball-img.png')}
       style={{transform: [{rotate: RotateData}]}} 
      className={' w-[80px] h-[80px]'}
      />
    </View>
  )
}