import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import { useState, useContext } from 'react';
import SettingsContext from '../SettingsContext';
import { useFonts } from 'expo-font';
import Widget from '../components/Widget';
import Cards from '../components/Cards';
import { Feather } from '@expo/vector-icons';
import { colorScheme } from '../components/Color';

export default function HomeScreen({ navigation }) {
    let [fontsLoaded] = useFonts({'Raleway': require('../assets/fonts/Raleway-Regular.ttf')});
    const { settings, setSettings } = useContext(SettingsContext);
    let theme = colorScheme();

    const TopBar = () => {
      return(
        <View style={styles.topbar}>
          <TouchableOpacity style={styles.btnPress} onPress={() => navigation.navigate('Settings')}><Feather name="bar-chart-2" size={24} color={theme.secondary} style={{transform: [{rotate: "90deg"}, {scaleX: -1}]}} /></TouchableOpacity>
        </View>
      );
    }
    
    if (!fontsLoaded) {
      return <ActivityIndicator />;
    } else {
      return (
        <View style={[styles.container, {backgroundColor: theme.primary}]}>
          <StatusBar style='auto' />
            <View style={styles.background}></View>
            <TopBar />
            <ScrollView showsVerticalScrollIndicator={false} style={{flex: 1, paddingBottom: 10}} contentContainerStyle={{alignItems: 'center'}}>
              <Widget />
              <Cards />
            </ScrollView>
        </View>
    )}
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
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