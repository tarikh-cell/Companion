import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, FlatList } from 'react-native';
import React, { useState } from 'react';
import { colorScheme } from '../components/Color';
import { StatusBar } from 'expo-status-bar';
import day from '../data/day.json';
import night from '../data/night.json';

export default function Counter() {
    let theme = colorScheme();
    const [open, setOpen] = useState(false);
    const [data, setData] = useState();

    const renderItem = ({ item }) => (
        <Card value={item} />
    );

    const Card = ({value}) => {
        return(
            <View style={[styles.item, {backgroundColor: theme.primary, shadowColor: theme.secondary} ]}>
                <Text style={[styles.itemtext, {color: theme.secondary} ]}>{value.category}</Text>
                <Text style={[styles.itemtext, {color: theme.secondary} ]}>{value.zekr}</Text>
                <Text style={[styles.itemtext, {color: theme.secondary} ]}>Repeat {value.count}</Text>
            </View>
        );
    } 

    return(
        <View style={[styles.container, {backgroundColor: theme.primary}]}>
            <StatusBar style='transparent' />
            { open ? 
                <>
                    <TouchableOpacity style={{alignSelf: 'flex-start', paddingLeft: 20}} onPress={() => setOpen(!open)}>
                        <Text>Back</Text>
                    </TouchableOpacity>
                    <FlatList
                        data={data}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                        style={{width: '100%'}}
                    />
                </>
            :
            <>
                <TouchableOpacity style={styles.card} onPress={() => {setOpen(!open); setData(day)}}>
                    <ImageBackground source={require('../assets/sunrise.png')} style={styles.img}>
                        <Text style={styles.title}>Morning Rememberance</Text>
                    </ImageBackground> 
                </TouchableOpacity>
                <TouchableOpacity style={styles.card} onPress={() => {setOpen(!open); setData(night)}}>
                    <ImageBackground source={require('../assets/evening.jpg')} style={styles.img}>
                        <Text style={styles.title}>Evening Rememberance</Text>    
                    </ImageBackground>
                </TouchableOpacity>
            </>}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        alignItems: 'center', 
        paddingTop: '10%',
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