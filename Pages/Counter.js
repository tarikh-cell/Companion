import { StyleSheet, Text, View, ActivityIndicator, ScrollView, ImageBackground, TouchableOpacity, Modal, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import day from '../data/day.json';

export default function Counter() {
    const [open, setOpen] = useState(false);

    const renderItem = ({ item }) => (
        <Card value={item} />
    );

    const Card = ({value}) => {
        return(
            <View style={[styles.item, {backgroundColor: '#fff'} ]}>
                <Text style={[styles.itemtext, {} ]}>Morning Athkar</Text>
                <Text style={styles.itemtext}>{value.zekr}</Text>
                <Text style={[styles.itemtext, styles.count]}>Repeat {value.count}</Text>
            </View>
        );
    } 

    return(
        <View style={styles.container}>
            <StatusBar style='transparent' />
            { open ? 
                <FlatList
                    data={day}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    style={{width: '100%'}}
                />
            :
            <TouchableOpacity style={styles.card} onPress={() => setOpen(!open)}>
                <ImageBackground source={require('../assets/sunrise.png')} style={styles.img}>
                    <Text style={styles.title}>Morning Rememberance</Text>
                </ImageBackground> 
            </TouchableOpacity>}

            {/* <TouchableOpacity style={styles.card}>
                <ImageBackground source={require('../assets/evening.jpg')} style={styles.img}>
                    <Text style={styles.title}>Evening Rememberance</Text>    
                </ImageBackground>
            </TouchableOpacity> */}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        alignItems: 'center', 
        paddingTop: '10%',
        backgroundColor: '#fff'
    },
    card: {     
        width: '90%',
        height: '30%',
        borderRadius: 12,
        overflow: 'hidden',
        margin: 10,
    },
    img: {
        width: '100%',
        height: '100%',   
    },
    title: {
        fontFamily: 'Raleway',
        fontSize: 20,
        alignSelf: 'flex-end',
        color: '#fff',
        padding: 10,
        textAlignVertical: 'bottom',
        height: '100%'
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
    },
    count: {
        bottom: -15, 
        backgroundColor: '#fff', 
        borderRadius: 12, 
        width: '30%', 
        alignSelf: 'center', 
        borderWidth: 1,
        paddingVertical: 5,
    }
});