import { StyleSheet, Text, View, ActivityIndicator, ScrollView, Image, TouchableOpacity, Modal } from 'react-native';
import { useFonts } from 'expo-font';
import React, { useEffect, useState, useRef, memo } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Feather } from '@expo/vector-icons';
import surahList from '../surahList.json';

export default function Reader() {
    let m = require('./index');
    let [fontsLoaded] = useFonts({'QM': require('../assets/fonts/Nabi.ttf')});
    const scrollViewRef = useRef();
    const [choice, setChoice] = useState(1);
    const [verses, setVerses] = useState('');
    const [freeze, setFreeze] = useState(true);
    const [dark, setDark] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        if (freeze){
            setVerses(Object.values(m.default[choice].verse))
            setFreeze(false)
            scrollViewRef.current?.scrollTo({x: 0, y: 0, animated: true})
        }
    }, [freeze])

    const returnSurah = () => {
        let ayat = '';
        let page = m.default[choice].start;
        for(let i = 1; i <= m.default[choice].count; i++){
            const arabic  = " (" + convertInt(String(i)) + ") "; 
            ayat = ayat + verses[i] + arabic + "";  
            if (m.default[choice].pages[page] == i) {
                ayat += "⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀\r";
                ayat += "⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀" + page + "\n\n";
                page = String(parseInt(page) + 1)
            }
        }
        return ayat;
    }

    const convertInt = (num) => {
        num = num.replace(/1/g, "١");
        num = num.replace(/2/g, "٢");
        num = num.replace(/3/g, "٣");
        num = num.replace(/4/g, "٤");
        num = num.replace(/5/g, "٥");
        num = num.replace(/6/g, "٦");
        num = num.replace(/7/g, "٧");
        num = num.replace(/8/g, "٨");
        num = num.replace(/9/g, "٩");
        num = num.replace(/0/g, "٠");
        return num;
    }

    const setChoices = (num) => {
        if (num == 0) {
            num = 1
            return;
        } else if (num == 115) {
            num = 114
            return;
        }
        setChoice(num);
        setFreeze(true);
    }

    const ToolBar = () => {
        return(
            <View style={styles.tool}>
                <TouchableOpacity style={styles.item} onPress={() => setChoices(choice - 1)}>
                    <Feather name="arrow-left" size={25} color='#fff' />
                </TouchableOpacity>
                <TouchableOpacity style={styles.item}>
                    <Feather name="moon" size={25} color={dark ? '#000' : '#fff'} onPress={() => setDark(!dark)} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.item}>
                    <Feather name="menu" size={25} color='#fff' onPress={() => setModalVisible(!modalVisible)} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.item} onPress={() => setChoices(choice + 1)}>
                    <Feather name="arrow-right" size={25} color='#fff' />
                </TouchableOpacity>
            </View>
        );
    }

    const Select = ({id, value}) => {
        return(
            <TouchableOpacity style={{width: '100%', flexDirection: 'row'}} onPress={() => {setChoices(id+1); setModalVisible(!modalVisible)}} >
                <Text style={[styles.listtext, {flex: 2}]}>{value[0]}</Text><Text style={[styles.listtext, {flex: 3}]}>{value[1]}</Text>
            </TouchableOpacity>
        );
    }

    const SurahSelect = () => {
        return(
            <Modal animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(!modalVisible)}>
                <View style={styles.surahlist}>
                    <ScrollView contentContainerStyle={{justifyContent: 'center'}}>
                        {Object.entries(surahList).map((value, index) => {
                            return <Select key={index} id={index} value={value} />
                        })}
                    </ScrollView>
                    <View style={{alignSelf: 'center'}}>
                        <TouchableOpacity style={styles.item}>
                            <Feather name="x-circle" size={25} color='#fff' onPress={() => setModalVisible(!modalVisible)} />
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        );
    }

    if (!fontsLoaded || choice == null) {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Surah</Text>
            </View>
        );
      } else {
        return(
            <View style={[styles.container, {backgroundColor: dark ? '#000' : 'rgba(0, 250, 154, 0.1)'} ]}>
                <StatusBar style='transparent' />
                <ScrollView ref={scrollViewRef} showsVerticalScrollIndicator={true} contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}>
                    { dark ? <Image source={require('../assets/bismillah-white.png')} style={styles.img} /> : <Image source={require('../assets/bismillah.png')} style={styles.img} />}
                    <Text style={[styles.text, {color: dark ? '#fff' : '#000'} ]}>{returnSurah()}</Text>
                </ScrollView>
                <SurahSelect />
                <ToolBar />
            </View>
    )}
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center',
        // backgroundColor: 'rgba(228, 247, 143, 0.3)'
        backgroundColor: 'rgba(0, 250, 154, 0.1)',
        // backgroundColor: '#15202B',
        paddingTop: '10%',

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
    text: {
        fontFamily: 'QM',
        fontSize: 20,
        textAlign: 'justify',
        padding: 10,
    },
    tool: {
        alignSelf: 'center',
        bottom: 10,
        flexDirection: 'row',
        backgroundColor: '#2F4F4F',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        borderRadius: 50,
    },
    item: {
        padding: 10,
        position: 'relative'
    },
    surah: {
        width: '40%',
        backgroundColor: 'rgba(0,0,0,0.2)',
        borderRadius: 8,
        margin: 10,
        borderColor: '#00FA9A'
    },
    surahlist: {
        fontFamily: 'Raleway',
        height: '50%', 
        width: '60%', 
        backgroundColor: '#2F4F4F', 
        alignSelf: 'center', 
        bottom: 10, 
        position: 'absolute', 
        padding: 5,
        borderRadius: 12,
    },
    listtext: {
        flex: 1,
        textAlign: 'center',
        color: '#fff',
        padding: 5,
        justifyContent: 'space-evenly',
    }
});

memo(Reader)