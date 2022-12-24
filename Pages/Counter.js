import { StyleSheet, Text, View, ActivityIndicator, ScrollView, ImageBackground, TouchableOpacity, Modal } from 'react-native';
import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';

export default function Counter() {

    return(
        <View style={styles.container}>
            <StatusBar style='transparent' />
            <TouchableOpacity style={styles.card}>
                <ImageBackground source={require('../assets/sunrise.png')} style={styles.img}>
                    <Text style={styles.title}>Morning Rememberance</Text>
                </ImageBackground> 
            </TouchableOpacity>
            <TouchableOpacity style={styles.card}>
                <ImageBackground source={require('../assets/evening.jpg')} style={styles.img}>
                    <Text style={styles.title}>Evening Rememberance</Text>    
                </ImageBackground>
            </TouchableOpacity>
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
    }
});