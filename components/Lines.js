import { StyleSheet, View, Animated } from 'react-native';
import React, { useEffect, useRef } from "react";

export default function Line() {
    const fadeAnim = useRef(new Animated.Value(0)).current;

    const fadeIn = () => {
        Animated.loop(Animated.timing(fadeAnim, {
          toValue: 20,
          duration: 5000,
          useNativeDriver: true
        })).start();
      };

      const animatedStyles = {
        move: {
          transform: [
            {
              translateX: fadeAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 4]
              })
            }
          ]
        }
      }

    const TopLine = ({ length }) => {
        return <View style={[styles.topline, {height: length} ]}></View>
    }

    const BottomLine = ({ length }) => {
        return <View style={[styles.bottomline, {height: length} ]}></View>
    }

    useEffect(() => {
        fadeIn()
    }, [])

    

    return(
        <Animated.View style={[animatedStyles.move, {flexDirection: 'row', height: '50%', alignItems: 'center', paddingBottom: 50}]}>
            <TopLine length={'50%'} />
            <BottomLine length={'50%'} />
            <TopLine length={'30%'} />
            <BottomLine length={'40%'} />
            <TopLine length={'60%'} />
            <BottomLine length={'30%'} />
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    topline: {
        alignSelf: 'flex-end',
        left: 1,
        padding: 1,          
        width: '5%',
        borderWidth: 1,
        borderTopWidth: 0,
        borderBottomStartRadius: 12,
        borderBottomEndRadius: 12,
    },
    bottomline: {
        padding: 1,  
        width: '5%',
        borderWidth: 1,
        borderBottomWidth: 0,
        borderTopStartRadius: 12,
        borderTopEndRadius: 12,
    },
});