import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, ImageBackground, ScrollView, RefreshControl, Image } from 'react-native';
import { useEffect, useState, useCallback } from 'react';
import { Feather } from '@expo/vector-icons';
import husna from '../data/names';

export default function Cards({ location, update }) {
    const d = new Date();
    let day = d.getDay();
    let month = d.getMonth();
    let random = day+month*30 % 99
    
    return(
        <View style={styles.card}>
            <View style={{flexDirection: 'row'}}>
                <View style={{padding: 10, backgroundColor: 'rgba(245,245,245,0.9)', margin: 5, width: '45%', minHeight: '30%', borderRadius: 12, justifyContent: 'center'}}>
                    <Text style={styles.text}>{husna[random].replace(/`/g, "\n")}</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        overflow: 'hidden',
    },
    bg: {
        height: '100%',
        width: '100%',
    },
    card: {
        paddingTop: '5%',
        height: '50%',
        width: '95%',
    },
    card_img: {
        width: '100%', 
        height: '100%',
    },
    text: {
        fontFamily: 'Raleway',
        textAlign: 'center',
        textAlignVertical: 'center',
    }
});