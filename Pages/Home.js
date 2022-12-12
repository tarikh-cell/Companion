import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import Widget from '../Widget';

export default function HomeScreen({ route, navigation }) {
    let [fontsLoaded] = useFonts({'Raleway': require('../assets/fonts/Raleway-Regular.ttf')});
    const { update } = route?.params || {};
    const [data, setData] = useState(null);

    const getData = async () => {
        try {
          const value = await AsyncStorage.getItem('@storage_Key')
          setData(value);
        } catch(e) {/* error reading value */ }
    }

    const TopBar = () => {
      return(
        <View style={styles.topbar}>
          <TouchableOpacity style={styles.btnPress} onPress={() => navigation.navigate('Settings', {value: data})}><Ionicons name="settings-outline" size={30} color="black" /></TouchableOpacity>
          <TouchableOpacity style={styles.btnPress} onPress={() => navigation.navigate('Location', {value: data})}><Ionicons name="location-outline" size={30} color="black" /></TouchableOpacity>
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
          <TopBar />
          <Widget key={data} location={data} update={update} />
          <Text style={styles.text}>Home Screens</Text>
          <Text style={styles.text}>{data}</Text>
        </View>
    )}
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        paddingTop: '10%',
    },
    topbar: {
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    btnPress: {
        padding: 5,
    },
    text: {
        fontFamily: 'Raleway',
    }
});