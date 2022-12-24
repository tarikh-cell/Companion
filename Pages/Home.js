import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, ImageBackground, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState, useContext } from 'react';
import SettingsContext from '../SettingsContext';
import { Ionicons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import Widget from '../components/Widget';
import Cards from '../components/Cards';


export default function HomeScreen({ navigation }) {
    let [fontsLoaded] = useFonts({'Raleway': require('../assets/fonts/Raleway-Regular.ttf')});
    const [data, setData] = useState(null);
    const { settings, setSettings } = useContext(SettingsContext);

    const TopBar = () => {
      return(
        <View style={styles.topbar}>
          <TouchableOpacity style={styles.btnPress} onPress={() => navigation.navigate('Settings', {value: data})}><Image source={require('../assets/icons/menu.png')} style={{width: '100%', height: '100%'}} /></TouchableOpacity>
        </View>
      );
    }
    
    if (!fontsLoaded) {
      return <ActivityIndicator />;
    } else {
      return (
        <View style={[styles.container, {backgroundColor: settings[2] == "true" ? "#000" : "#fff"}]}>
          <StatusBar style='auto' />
            <View style={styles.background}></View>
            {console.log(settings)}
            <TopBar />
            {/* <Widget key={data} location={data} /> */}
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
        margin: 5,
        padding: 5,
        width: 35,
        height: 35,
        borderWidth: 1,
        borderColor: '#e8def5',
        borderRadius: 5,
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