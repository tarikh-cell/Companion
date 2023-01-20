import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Switch } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useContext } from 'react';
import { Octicons } from '@expo/vector-icons';
import cities from '../data/cities';
import SettingsContext from '../SettingsContext';
import { colorScheme } from '../components/Color';

export default function Settings({ navigation }) {
    let theme = colorScheme();
    const [open, setOpen] = useState(false);
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
              <TouchableOpacity style={styles.countrycontainer} onPress={() => setOpen(!open)}><Text style={[styles.countryname, {color: theme.secondary}]}>{country.name}</Text></TouchableOpacity>
              {open && country.city.map((value, index) =>
                  <TouchableOpacity style={styles.citycontainer} key={index} onPress={() => {updateLocation(country.name, value); setOpen(!open);}}>
                    <Text style={styles.countryname}>{value}</Text></TouchableOpacity>
              )}
          </>
      );
  }

  const AngleMethod = () => {
    const [opened, setOpened] = useState(false);
    return(
      <View style={[styles.section, {justifyContent: 'space-between', alignItems: 'center'}]}>
        <TouchableOpacity onPress={() => setOpened(!opened)}><Text style={[styles.sectiontitle, {color: theme.secondary}]}>Angle Method:</Text></TouchableOpacity>
        {opened ?
        <><TouchableOpacity onPress={() => {updateSettings("0", 3); setOpened(!opened)}}><Text style={styles.sectiontitle}>Middle of the Night</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => {updateSettings("1", 3); setOpened(!opened)}}><Text style={styles.sectiontitle}>One Seventh</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => {updateSettings("2", 3); setOpened(!opened)}}><Text style={styles.sectiontitle}>Angle Based</Text></TouchableOpacity></> : null }
      </View>
    );
  }

  const CalculationMethod = () => {
    const [opened, setOpened] = useState(false);
    return(
      <View style={[styles.section, {justifyContent: 'space-between', alignItems: 'center'}]}>
        <TouchableOpacity onPress={() => setOpened(!opened)}><Text style={[styles.sectiontitle, {color: theme.secondary}]}>Calculation Method:</Text></TouchableOpacity>
        {opened ?
        <><TouchableOpacity onPress={() => {updateSettings("0", 5); setOpened(!opened)}}><Text style={styles.sectiontitle}>Shia Ithna-Ansari</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => {updateSettings("1", 5); setOpened(!opened)}}><Text style={styles.sectiontitle}>University of Islamic Sciences, Karachi</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => {updateSettings("2", 5); setOpened(!opened)}}><Text style={styles.sectiontitle}>Islamic Society of North America</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => {updateSettings("3", 5); setOpened(!opened)}}><Text style={styles.sectiontitle}>Muslim World League</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => {updateSettings("8", 5); setOpened(!opened)}}><Text style={styles.sectiontitle}>Gulf Region</Text></TouchableOpacity></> : null }
      </View>
    );
  }

  const School = () => {
    const [opened, setOpened] = useState(false);
    return(
      <View style={[styles.section, {justifyContent: 'space-between', alignItems: 'center'}]}>
        <TouchableOpacity onPress={() => setOpened(!opened)}><Text style={[styles.sectiontitle, {color: theme.secondary}]}>School:</Text></TouchableOpacity>
        {opened ?
        <><TouchableOpacity onPress={() => {updateSettings("0", 4); setOpened(!opened)}}><Text style={styles.sectiontitle}>Shafi'i</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => {updateSettings("1", 4); setOpened(!opened)}}><Text style={styles.sectiontitle}>Hanafi</Text></TouchableOpacity></>: null }
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

    const ModeToggle = () => {
      return(
        <View style={[styles.section, {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}]}>
          <Text style={[styles.sectiontitle, {color: theme.secondary}]}>Dark Mode: </Text>
          <Switch value={getBoolVal()} onValueChange={() => {updateSettings(getOpposite(),2)}}  />
        </View>
      )
    }
    
    return(
      <View style={[styles.container, {backgroundColor: theme.primary}]}>
        <StatusBar style='auto' />
        <View style={styles.background}></View>
        <Topbar />
        <ScrollView style={[styles.card, {backgroundColor: theme.primary, shadowColor: theme.secondary}]} contentContainerStyle={{justifyContent: 'center', alignItems: 'center'}}>
          <TouchableOpacity style={styles.section} onPress={() => storeData()}><Text style={[styles.sectiontitle, {color: theme.secondary}]}>Save Changes</Text></TouchableOpacity>
          
          <ModeToggle />
          <AngleMethod />
          <CalculationMethod />
          <School />

          <TouchableOpacity style={styles.section} onPress={() => setOpen(!open)}><Text style={[styles.sectiontitle, {color: theme.secondary}]}>Current City: </Text></TouchableOpacity>
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
      elevation: 5,
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
        color: '#4dc591'
    },
    sectiontitle: {
      textAlign: 'center', 
      fontSize: 15, 
      fontFamily: 'Raleway',
      padding: 10,
      color: '#4dc591',
    },
    section: {
      borderRadius: 12,
      borderColor: '#308695',
      borderWidth: 1,      
      width: '100%',
      margin: 5
    }
});