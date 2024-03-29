import { StyleSheet, Text, View, TouchableOpacity, Modal, VirtualizedList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import { colorScheme } from '../components/Color';
import surahNames from '../data/surahNames';
import audioy from '../data/sheikhyasser';
import { Audio } from 'expo-av';

export default function Player() {
    let theme = colorScheme();
    const [audio, setAudio] = useState(new Audio.Sound());
    const [index, setIndex] = useState(1);
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
    }, [])

    const playSound = async () => {
        if (!loaded) {
            const { sound } = await audio.loadAsync(audioy[index]);
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

    const skipTrack = async () => {
        await audio.unloadAsync();
        setPlaying(false);
        setLoaded(false);
        setPosition(0);
    }

    const unloadTrack = async () => {
        await audio.unloadAsync();
        setPlaying(false);
        setLoaded(false);
        setPosition(0);
        setModalVisible(!modalVisible);
    }

    const setNextIndex = (number) => {
        if (number == 0) { setIndex(1) }
        else if (number == 115) { setIndex(114) }
        else { setIndex(number) }
    }

    const Select = ({id, name, translation}) => {
        return(
            <TouchableOpacity style={{width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderBottomWidth: 1, padding: 5, borderColor: '#e3f6fd'}} onPress={() => {setIndex(Number(id));setModalVisible(!modalVisible)}} >
                <View style={{flexDirection: 'row'}}>
                <Text style={{marginHorizontal: 20, textAlignVertical: 'center', color: '#4dc591'}}>{id}</Text>
                <View style={{flexDirection: 'row'}}>
                    <Text style={{textAlignVertical: 'center', color: theme.secondary}}>{name}{"\n"}
                    <Text style={{color: 'lightgrey', fontSize: 12}}>{translation}</Text></Text>
                </View></View>
                <MaterialCommunityIcons name='play-speed' size={20} color={theme.secondary} style={{alignSelf: 'center', marginHorizontal: 10}} />
            </TouchableOpacity>
        );
    }

    const renderItem = ({ item }) => (
        <Select id={item.id} name={item.name} translation={item.translation} />
    );

    const getItemCount = _data => 114;
    const getItem = (_data, index) => ({
        id: _data[index].id,
        name: _data[index].name,   
        translation: _data[index].translation,
      });

    const SurahSelect = () => {
        return(
            <>
                <VirtualizedList
                    data={surahNames}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    initialNumToRender={20}
                    getItemCount={getItemCount}
                    getItem={getItem}
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
        <View style={[styles.container, {backgroundColor: theme.primary}]}>
            <StatusBar style='transparent' />
            <SurahSelect />
            {/* <Player /> */}
            <Modal animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {setModalVisible(!modalVisible); unloadTrack()}}>
                <View style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.5)'}}>
                    <View style={{alignItems: 'center', padding: 10, backgroundColor: theme.primary, borderBottomEndRadius: 30, borderBottomStartRadius: 30, paddingBottom: 30}}>
                        <TouchableOpacity style={{ backgroundColor: theme.primary, borderColor: theme.primary, shadowColor: theme.secondary, alignSelf: 'flex-end', marginRight: 20}} onPress={() => unloadTrack()}>
                            <MaterialCommunityIcons name="close" size={30} color={theme.secondary} />
                        </TouchableOpacity>   
                        <Text style={{fontFamily: 'Raleway', color: theme.secondary}}>Surah {surahNames[index-1].name}</Text>
                        <Text style={{fontFamily: 'Raleway', color: theme.secondary, marginBottom: 10}}>Sheikh Yasser Al Dosari</Text>
                        <Slider 
                            style={{width: '90%', marginTop: 30}}
                            value={position}
                            onSlidingComplete={(value) => audio.setPositionAsync(value)}
                            minimumValue={0}
                            maximumValue={duration}
                            thumbTintColor={theme.secondary}
                            minimumTrackTintColor="grey"
                            maximumTrackTintColor="silver"
                        />
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '80%'}}>
                            <Text style={{color: theme.secondary}}>{convertToMinutes(position)}</Text>
                            <Text style={{color: theme.secondary}}>{convertToMinutes(duration)}</Text>
                        </View>
                        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '50%'}}>
                            <TouchableOpacity style={{ backgroundColor: theme.primary, borderColor: theme.primary, shadowColor: theme.secondary }} onPress={() => {skipTrack(); setNextIndex(index+1)}}>
                                <Ionicons name="play-skip-back" size={30} color={theme.secondary} />
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.button, { backgroundColor: theme.primary, borderColor: theme.primary, shadowColor: theme.secondary }]}>
                                { playing ? <Ionicons name="pause" size={30} color={theme.secondary} onPress={pauseSound} /> : <Ionicons name="play" size={30} color={theme.secondary} onPress={playSound} /> }
                            </TouchableOpacity>
                            <TouchableOpacity style={{ backgroundColor: theme.primary, borderColor: theme.primary, shadowColor: theme.secondary }} onPress={() => {skipTrack(); setNextIndex(index+1)}}>
                                <Ionicons name="play-skip-forward" size={30} color={theme.secondary} />
                            </TouchableOpacity>
                        </View>
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
        width: '100%',
        height: '100%',
        borderRadius: 250,
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
    },
    button: {
        borderRadius: 40, 
        elevation: 5, 
        borderWidth: 1, 
        padding: 10, 
    }
});