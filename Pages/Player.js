import { StyleSheet, Text, View, ActivityIndicator, ScrollView, Image, TouchableOpacity, Modal } from 'react-native';
import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Feather } from '@expo/vector-icons';
import surahList from '../surahList.json';
import audioa from '../sheikhmaher';
import audioy from '../sheikhyasser';
import { Audio } from 'expo-av';

export default function Player() {
    const [audio, setAudio] = useState(new Audio.Sound());
    const [close, setClose] = useState(false);
    const [index, setIndex] = useState(1);
    const [choice, setChoice] = useState(0); 
    const [loaded, setLoaded] = useState(false);
    const [playing, setPlaying] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        async function loadAudio() {
        try{     
            await Audio.setAudioModeAsync({
              interruptionModeAndroid: 2,
              shouldDuckAndroid: true,
              staysActiveInBackground: true
            })
        } catch(e){ console.log(e) }}
        loadAudio();
        return () => {audio.unloadAsync()}
    }, [close])

    const playSound = async () => {
        if (!loaded) {
            if (choice == 1) {
                const { sound } = await audio.loadAsync(audioa[index]);
            } else {
                const { sound } = await audio.loadAsync(audioy[index]);
            }  
            setLoaded(true);
        }      
        await audio.playAsync();
        setPlaying(true);
    }

    const pauseSound = async () => {
        await audio.pauseAsync();
        setPlaying(false);
    }

    const stopSound = async () => {
        await audio.stopAsync();
        setPlaying(false);
    }

    const skipTrack = async () => {
        await audio.unloadAsync();
        setPlaying(false);
        setLoaded(false);
        // playSound();
    }

    const setNextIndex = (number) => {
        if (number == 0) { setIndex(1) }
        else if (number == 115) { setIndex(114) }
        else { setIndex(number) }
    }

    const Select = ({id, value}) => {
        return(
            <TouchableOpacity style={{width: '100%', flexDirection: 'row'}} onPress={() => {setIndex(id+1);setModalVisible(!modalVisible)}} >
                <Text style={[styles.listtext, {flex: 2}]}>{value[0]}</Text><Text style={[styles.listtext, {flex: 3}]}>{value[1]}</Text>
            </TouchableOpacity>
        );
    }

    const SurahSelect = () => {
        return(
            <ScrollView style={styles.surahlist} contentContainerStyle={{justifyContent: 'center'}}>
                {Object.entries(surahList).map((value, index) => {
                    return <Select key={index} id={index} value={value} />
                })}
            </ScrollView>
        );
    }

    return(
        <View style={styles.container}>
            <StatusBar style='transparent' />
            <TouchableOpacity onPress={() => setChoice(0)}><Text>Sheikh Yasser Al Dosari</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => setChoice(1)}><Text>Sheikh Maher Al Muaqily</Text></TouchableOpacity>
            <SurahSelect />
            {/* <Player /> */}
            <Modal animationType="slide"
                    transparent={false}
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(!modalVisible)}>
                <View style={styles.container}>
                    <TouchableOpacity>
                        <Feather name="x-circle" size={25} color='#fff' onPress={() => {setModalVisible(!modalVisible);}} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        { playing ? <Feather name="pause" size={25} color='#fff' onPress={pauseSound} /> : <Feather name="play" size={25} color='#fff' onPress={playSound} /> }
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {skipTrack(); setNextIndex(index+1)}}>
                        <Feather name="skip-forward" size={25} color='#fff' />
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center',
        paddingTop: '10%',
        backgroundColor: '#2F4F4F', 
    },
    title: {
        fontFamily: 'Raleway',
        fontSize: 20,
    },
    img: {
        width: '80%',
        height: 90,
        alignSelf: 'center',
    },
    surahlist: {
        fontFamily: 'Raleway',
        width: '100%', 
        padding: 5,
    },
    listtext: {
        flex: 1,
        textAlign: 'center',
        color: '#fff',
        padding: 5,
        justifyContent: 'space-evenly',
    }
});