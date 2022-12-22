import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, ImageBackground, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import Widget from '../components/Widget';
import Cards from '../components/Cards';


export default function HomeScreen({ route, navigation }) {
    let [fontsLoaded] = useFonts({'Raleway': require('../assets/fonts/Raleway-Regular.ttf')});
    const { update } = route?.params || {};
    const [data, setData] = useState("United Kingdom, London");

    const getData = async () => {
        try {
          const value = await AsyncStorage.getItem('@storage_Key')
          setData(value);
        } catch(e) {/* error reading value */ }
    }

    const TopBar = () => {
      return(
        <View style={styles.topbar}>
          <TouchableOpacity style={styles.btnPress} onPress={() => navigation.navigate('Settings', {value: data})}><Image source={require('../assets/icons/menu.png')} style={{width: '100%', height: '100%'}} /></TouchableOpacity>
          {/* <TouchableOpacity style={styles.btnPress} onPress={() => navigation.navigate('Location', {value: data})}><Ionicons name="location-outline" size={30} color="#000" /></TouchableOpacity> */}
        </View>
      );
    }

    useEffect(() => {
        if (data == null) {getData()}
        if (update) {setData(update)}
    }, [update])
    
    if (!fontsLoaded || (data == null)) {
      return <ActivityIndicator />;
    } else {
      return (
        <View style={styles.container}>
          <StatusBar style='auto' />
            <View style={styles.background}></View>
            <TopBar />
            <Widget key={data} location={data} />
            {/* <Cards /> */}
        </View>
    )}
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    topbar: {
        paddingTop: '10%',
        paddingHorizontal: '5%',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    btnPress: {
        padding: 5,
        width: 40,
        height: 40,
    },
    text: {
        fontFamily: 'Raleway',
    },
    background: {
        position: 'absolute', 
        height: 300, 
        top: -100, 
        width: '100%', 
        backgroundColor: '#e3f6fd', 
        borderWidth: 1, 
        borderColor: '#e3f6fd',
        borderBottomStartRadius: 70, 
        borderLeftWidth: 100, 
        transform: [{rotate: "-25deg"}],
    }
});