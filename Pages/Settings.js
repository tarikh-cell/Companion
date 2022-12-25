import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TouchableOpacity, ScrollView, Switch } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useContext } from 'react';
import { Octicons } from '@expo/vector-icons';
import cities from '../data/cities';
import SettingsContext from '../SettingsContext';

export default function Settings({ navigation }) {
    const [open, setOpen] = useState(false);
    const [dark, setDark] = useState(false);
    const { settings, updateSettings, updateLocation } = useContext(SettingsContext);

    const storeData = async () => {
        try {
            await AsyncStorage.setItem('@storage_Key', settings[0]+","+settings[1]+","+settings[2]+","+settings[3]+","+settings[4]+","+settings[5])
        } catch (e) {/* saving error */ }
    }

    const City = ({ country }) => {
      const [open, setOpen] = useState(false);
      return(
          <>
              <TouchableOpacity style={styles.countrycontainer} onPress={() => setOpen(!open)}><Text style={styles.countryname}>{country.name}</Text></TouchableOpacity>
              {open && country.city.map((value, index) =>
                  <TouchableOpacity style={styles.citycontainer} key={index} onPress={() => {updateLocation(country.name, value); setOpen(!open);}}>
                    <Text style={styles.countryname}>{value}</Text></TouchableOpacity>
              )}
          </>
      );
  }

  const CalculationMethod = () => {
    return(
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity onPress={() => updateSettings("0", 3)}><Text>Angle Based</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => updateSettings("1", 3)}><Text>Angle Based</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => updateSettings("2", 3)}><Text>Angle Based</Text></TouchableOpacity>
      </View>
    );
  }

  const Topbar = () => {
    return(
      <View style={styles.topbar}>
        <TouchableOpacity style={styles.btnPress} onPress={() => navigation.navigate('Home')}>
          <Octicons name="arrow-left" size={24} color="black" />          
        </TouchableOpacity>
        <Text style={styles.title}>Settings</Text>
      </View>
    );
  }

    const getBoolVal = () => {
      if (settings[2] == "true") {
        return true
      } else {
        return false
      }
    }

    const getOpposite = () => {
      if (settings[2] == "true") {
        return "false"
      } else {
        return "true"
      }
    }
    
    return(
      <View style={[styles.container, {backgroundColor: settings[2] == "true" ? "#000" : "#fff"}]}>
        <StatusBar style='auto' />
        <View style={styles.background}></View>
        <Topbar />
        <ScrollView style={styles.card} contentContainerStyle={{justifyContent: 'center', alignItems: 'center'}}>
          <Button title="Save" onPress={() => storeData()} />
          
          <Text>{dark ? 'on':'off'}</Text>
          <Switch value={getBoolVal()} onValueChange={() => {updateSettings(getOpposite(),2)}}  />

          <CalculationMethod />

          <TouchableOpacity onPress={() => setOpen(!open)}><Text>Current City: </Text></TouchableOpacity>
          { open ? cities.map((value, index) => <City country={value} key={index} />) : null}
        </ScrollView>
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    topbar: {
      padding: '10%',
      width: '100%',
    },
    btnPress: {
        padding: 5,
        width: 35,
        height: 35,
        borderWidth: 1,
        borderColor: '#e8def5',
        borderRadius: 17.5,
        alignItems: 'center',
    },
    background: {
      position: 'absolute', 
      height: 300, 
      top: -100, 
      width: '100%', 
      backgroundColor: '#ecf0ff', 
      borderWidth: 1, 
      borderColor: '#ecf0ff',
      borderBottomStartRadius: 70, 
      borderLeftWidth: 100, 
      transform: [{rotate: "-25deg"}],
    },
    title: {
      fontFamily: 'Raleway',
      fontSize: 30,
      alignSelf: 'center'
    },
    card: {
      marginTop: '2%',
      marginBottom: '20%',
      width: '80%',
      elevation: 10,
      backgroundColor: '#fff',
      borderRadius: 12,
      padding: 10,
    },
    countrycontainer: {
      width: '85%',
      padding: 5,
      borderBottomWidth: 1,
      borderColor: 'grey'
    },
    citycontainer: {
        width: '75%',
        padding: 5,
        borderBottomWidth: 1,
        borderColor: 'lightgrey',
    },
    countryname: {
        fontFamily: 'Raleway',
        fontSize: 20,
    },
});