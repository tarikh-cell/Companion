import { StyleSheet, Text, View, TouchableOpacity, VirtualizedList } from 'react-native';
import { useFonts } from 'expo-font';
import React, { useState, memo } from 'react';
import { StatusBar } from 'expo-status-bar';
import surahNames from '../data/surahNames';
import { colorScheme } from '../components/Color';
import ReaderSurah from './Readers';

export default function Reader() {
    let [fontsLoaded] = useFonts({'QM': require('../assets/fonts/Nabi.ttf'), 'Surah': require('../assets/fonts/karim.ttf')});
    let theme = colorScheme();
    const [choice, setChoice] = useState(1);
    const [modalVisible, setModalVisible] = useState(false);

    const setChoices = (num) => {
        if (num == 0) {
            num = 1
            return;
        } else if (num == 115) {
            num = 114
            return;
        }
        setChoice(num);
    }

    const Select = ({id, name, arabic, translation}) => {
        return(
            <TouchableOpacity style={styles.surahlist} onPress={() => {setChoices(Number(id)); setModalVisible(!modalVisible)}}>
                <View style={{flexDirection: 'row'}}><Text style={styles.listtext}>{id}</Text>
                <Text style={{textAlignVertical: 'center', color: theme.secondary}}>{name}{"\n"}
                <Text style={{color: 'lightgrey', fontSize: 12}}>{translation}</Text></Text>
                </View>
                <Text style={{fontFamily: "Surah", fontSize: 60, color: '#4dc591'}}>{arabic}</Text>
            </TouchableOpacity>
        );
    }

    const renderItem = ({ item }) => (
        <Select id={item.id} name={item.name} arabic={item.arabic} translation={item.translation} />
    );

    const getItemCount = _data => 114;
    const getItem = (_data, index) => ({
        id: _data[index].id,
        name: _data[index].name,   
        arabic: _data[index].arabic,
        translation: _data[index].translation,
      });

    if (!fontsLoaded || choice == null) {
        return (<></>);
      } else {
        return(
            <View style={[styles.container, {backgroundColor: theme.primary} ]}>
                <StatusBar style='transparent' />
                { modalVisible ?
                <ReaderSurah choice={choice} setChoice={setChoice} setModalVisible={setModalVisible} />
                : 
                <VirtualizedList
                    data={surahNames}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    initialNumToRender={10}
                    getItemCount={getItemCount}
                    getItem={getItem}
                    style={{width: '100%'}}
                />}
            </View>
    )}
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center',
        paddingTop: '5%',
    },
    surahlist: {
        alignSelf: 'center',
        width: '95%', 
        flexDirection: 'row', 
        borderWidth: 1, 
        borderColor: '#e3f6fd',
        borderRadius: 30,
        margin: 5,
        justifyContent: 'space-between',
        paddingHorizontal: 15
    },
    listtext: {
        color: '#fff', 
        borderRadius: 20, 
        width: 40, 
        height: 40, 
        backgroundColor: '#4dc591', 
        alignSelf: 'center',
        textAlignVertical: 'center',
        marginRight: 10,
        textAlign: 'center',
    }
});

memo(Reader)