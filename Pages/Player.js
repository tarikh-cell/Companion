import { StyleSheet, Text, View, ActivityIndicator, ScrollView, Image, TouchableOpacity, Modal, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import surahNames from '../data/surahNames';
import audioa from '../data/sheikhmaher';
import audioy from '../data/sheikhyasser';
import { Audio } from 'expo-av';

export default function Player() {
    const [audio, setAudio] = useState(new Audio.Sound());
    const [close, setClose] = useState(false);
    const [index, setIndex] = useState(1);
    const [choice, setChoice] = useState(0); 
    const [loaded, setLoaded] = useState(false);
    const [playing, setPlaying] = useState(false);
    const [duration, setDuration] = useState(null);
    const [position, setPosition] = useState(0);
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
        return () => {if (loaded) audio.unloadAsync()}
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
        audio.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate)
        setPlaying(true);
    }

    const onPlaybackStatusUpdate = status => {
        setDuration(status.durationMillis);
        setPosition(status.positionMillis);
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
            <TouchableOpacity style={{width: '100%', flexDirection: 'row'}} onPress={() => {setIndex(Number(id));setModalVisible(!modalVisible)}} >
                <Text style={[styles.listtext, {flex: 2}]}>{id}</Text><Text style={[styles.listtext, {flex: 3}]}>{value}</Text>
            </TouchableOpacity>
        );
    }

    const renderItem = ({ item }) => (
        <Select id={item.id} value={item.name} />
    );

    const Reciter = () => {
        return(
            <View>
                
            </View>
        );
    }

    const SurahSelect = () => {
        return(
            <>
                <FlatList
                    data={surahNames}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    contentContainerStyle={{}}
                    style={{width: '100%'}}
                />
            </>
        );
    }

    const addZero = (number) => {
        let digit = String(number)
        if (number < 10) {
          return "0" + digit;
        }
        return digit;
    }

    const convertToMinutes = (millis) => {
        let totalSeconds = millis / 1000;
        let seconds = Math.floor(totalSeconds % 60);
        let minutes = Math.floor(totalSeconds / 60);
        seconds = addZero(seconds);
        minutes = addZero(minutes);
        return minutes + ":" + seconds
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
                        <MaterialCommunityIcons name="close" size={40} color='silver' onPress={() => {setModalVisible(!modalVisible); setLoaded(false); audio.unloadAsync()}} />
                    </TouchableOpacity>
                    <Image source={require("../assets/op.jpg")} style={styles.img} />
                    <Slider 
                        style={{width: '90%', marginTop: 40}}
                        value={position}
                        onSlidingComplete={(value) => audio.setPositionAsync(value)}
                        minimumValue={0}
                        maximumValue={duration}
                        thumbTintColor="silver"
                        minimumTrackTintColor="grey"
                        maximumTrackTintColor="silver"
                    />
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '80%'}}>
                        <Text style={{color: 'silver'}}>{convertToMinutes(position)}</Text>
                        <Text style={{color: 'silver'}}>{convertToMinutes(duration)}</Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <TouchableOpacity onPress={() => {skipTrack(); setNextIndex(index+1)}}>
                            <MaterialCommunityIcons name="skip-backward" size={40} color='silver' />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            { playing ? <MaterialCommunityIcons name="pause" size={40} color='silver' onPress={pauseSound} /> : <MaterialCommunityIcons name="play" size={40} color='silver' onPress={playSound} /> }
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {skipTrack(); setNextIndex(index+1)}}>
                            <MaterialCommunityIcons name="skip-forward" size={40} color='silver' />
                        </TouchableOpacity>
                    </View>
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
    },
    title: {
        fontFamily: 'Raleway',
        fontSize: 20,
    },
    img: {
        width: 300,
        height: 300,
        elevation: 20,
        shadowColor: 'black',
        shadowOpacity: 1,
        shadowOffset: {width: 2, height: 2},
        shadowRadius: 10,
        // borderRadius: 150,
        // alignSelf: 'center',
    },
    surahlist: {
        fontFamily: 'Raleway',
        width: '100%', 
        padding: 5,
    },
    listtext: {
        flex: 1,
        textAlign: 'center',
        padding: 5,
        justifyContent: 'space-evenly',
    }
});