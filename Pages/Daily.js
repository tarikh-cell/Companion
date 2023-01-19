import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';
import React, { useState } from 'react';
import { colorScheme } from '../components/Color';
import { StatusBar } from 'expo-status-bar';
import day from '../data/day.json';
import night from '../data/night.json';

export default function Daily({ route, navigation }) {    
    let theme = colorScheme();
    const [data, setData] = useState(route.params.type == "Morning" ? day : night);

    const renderItem = ({ item, index }) => (
        <Card value={item} id={index} />
    );

    const Card = ({value, id}) => {
        return(
            <View style={[styles.item, {backgroundColor: theme.primary, shadowColor: theme.secondary} ]}>
                <Text style={[styles.itemtext, {color: '#308695'} ]}>{value.zekr}</Text>
                <Text style={[styles.itemtext, {color: '#e8def5'} ]}>x{value.count}</Text>
            </View>
        );
    } 

    return(
        <View style={[styles.container, {backgroundColor: theme.primary}]}>
            <StatusBar style='transparent' />
            <TouchableOpacity style={{alignSelf: 'flex-start', padding: 15}} onPress={() => navigation.goBack()}>
                <Text style={{color: '#308695', fontFamily: 'Raleway'}}>Back</Text>
            </TouchableOpacity>
            <Text style={{color: theme.secondary, fontFamily: 'Raleway', fontSize: 15}}>{route.params.type} Remeberance</Text>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item, index) => index}
                style={{width: '100%'}}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        alignItems: 'center', 
        paddingTop: '10%',
    },
    item: {
        borderRadius: 12,
        elevation: 2,
        margin: 5,
        padding: 10,
        width: '90%',
        alignSelf: 'center',
    },
    itemtext: {
        textAlign: 'center',
        fontSize: 15,
    }
});