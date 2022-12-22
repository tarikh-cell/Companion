import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TouchableOpacity, Image, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';
import cities from '../data/cities';
import { Ionicons } from '@expo/vector-icons';


export default function Location({ route, navigation }) {
    const { value } = route.params;
    const [data, setData] = useState(value);

    const storeData = async () => {
        try {console.log(value)
            await AsyncStorage.setItem('@storage_Key', data)    
        } catch (e) {/* saving error */ }
    }

    const City = ({ country }) => {
        const [open, setOpen] = useState(false);
        return(
            <>
                <TouchableOpacity style={styles.countrycontainer} onPress={() => setOpen(!open)}><Text style={styles.countryname}>{country.name}</Text></TouchableOpacity>
                {open && country.city.map((value, index) =>
                    <TouchableOpacity style={styles.citycontainer} key={index} onPress={() => setData(country.name + "," + value)}><Text style={styles.countryname}>{value}</Text></TouchableOpacity>
                )}
            </>
        );
    }
    
    return(
      <View style={styles.container}>
        <StatusBar style='auto' />
        <View style={styles.outergrid}>
            <Image source={require('../assets/gps.png')} style={styles.icon}  />
            <View>
                <Text style={styles.headertext}>Selected Location: </Text>
                <Text style={styles.headertext}>{data}</Text>
                <TouchableOpacity style={styles.save} onPress={() => {storeData(); navigation.navigate('Home', {update: data})}}>
                    <Ionicons name="save-outline" size={30} color="black" />
                </TouchableOpacity>
            </View>
        </View>
        <ScrollView style={{width: '100%', marginBottom: 10}} contentContainerStyle={{alignItems: 'center'}}>
            {cities.map((value, index) => 
                <City country={value} key={index} />
            )}
        </ScrollView>
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        // marginBottom: 20,
        marginVertical: '10%',
    },
    icon: {
        width: 100,
        height: 100,
        margin: 10
    },
    outergrid: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '90%',
        flexDirection: 'row',
        backgroundColor: '#0D98BA',
        padding: 10,
        borderRadius: 12,
    },
    headertext: {
        fontFamily: 'Raleway',
        fontSize: 18,
        textAlign: 'center',
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
    save: {
        alignSelf: 'center',
        paddingTop: 5,
    }
});