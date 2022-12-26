import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, FlatList } from 'react-native';
import { useFonts } from 'expo-font';
import React, { useEffect, useState, useRef, memo } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Feather } from '@expo/vector-icons';
import surahNames from '../data/surahNames';

export default function Reader() {
    let m = require('../data/index');
    let [fontsLoaded] = useFonts({'QM': require('../assets/fonts/Nabi.ttf'), 'Surah': require('../assets/fonts/karim.ttf')});
    const scrollViewRef = useRef();
    const [arr, setArr] = useState([]);
    const [choice, setChoice] = useState(1);
    const [verses, setVerses] = useState('');
    const [freeze, setFreeze] = useState(true);
    const [dark, setDark] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        if (freeze){
            setVerses(Object.values(m.default[choice].verse))
            CreateData()
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
        setArr([])
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
                    <Feather name="menu" size={25} color='#fff' onPress={() => {setModalVisible(!modalVisible); setArr([]); setFreeze(true)}} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.item} onPress={() => setChoices(choice + 1)}>
                    <Feather name="arrow-right" size={25} color='#fff' />
                </TouchableOpacity>
            </View>
        );
    }

    const Surahs = () => {
        return(
            <View style={{height: '100%'}}>
                <ScrollView ref={scrollViewRef} showsVerticalScrollIndicator={true} contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}>
                    { dark ? <Image source={require('../assets/bismillah-white.png')} style={styles.img} /> : <Image source={require('../assets/bismillah.png')} style={styles.img} />}
                    <Text style={[styles.text, {color: dark ? '#fff' : '#000'} ]}>{returnSurah()}</Text>
                </ScrollView>
                <ToolBar />
            </View>
        );
    }

    const CreateData = () => {   
        let whole = Object.values(m.default[choice].verse)
        let ayat = '';
        let page = m.default[choice].start;
        let array = []
        for(let i = 1; i <= m.default[choice].count; i++){
            const arabic  = " (" + convertInt(String(i)) + ") "; 
            ayat = ayat + whole[i] + arabic + "";  
            if (m.default[choice].pages[page] == i) {         
                // ayat += "⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀\r";
                ayat += "⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀\r";
                page = String(parseInt(page) + 1);
                array.push({page: ayat, pgNumber: page})
                ayat = ""
            }
        }
        setArr(array)
    }

    const ReturnSurahs = ({value, id}) => {
        return (
            <View key={id}>
                <Text style={styles.text}>{value.page}</Text>
                <Text style={{textAlign: 'center', top: -20}}>{value.pgNumber}</Text>
            </View>
        );
    }

    const renderIte = ({ item, index }) => (
        <ReturnSurahs value={item} id={index} />
    );

    const Surah = () => {
        return(
            <>
                { choice != 9 ? <Image source={require('../assets/bismillah.png')} style={styles.img} /> : null}
                <FlatList
                    data={arr}
                    renderItem={renderIte}
                    keyExtractor={item => item.id}
                />
                <ToolBar />
            </>
        );
    }

    const Select = ({id, value, arabic, translation}) => {
        return(
            <TouchableOpacity style={styles.surahlist} onPress={() => {setChoices(Number(id)); setModalVisible(!modalVisible)}}>
                <View style={{flexDirection: 'row'}}><Text style={styles.listtext}>{id}</Text>
                <Text style={{textAlignVertical: 'center'}}>{value}{"\n"}
                <Text style={{color: 'lightgrey', fontSize: 12}}>{translation}</Text></Text>
                </View>
                <Text style={{fontFamily: "Surah", fontSize: 60, color: '#4dc591'}}>{arabic}</Text>
            </TouchableOpacity>
        );
    }

    const renderItem = ({ item }) => (
        <Select id={item.id} value={item.name} arabic={item.arabic} translation={item.translation} />
    );

    if (!fontsLoaded || choice == null) {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Surah</Text>
            </View>
        );
      } else {
        return(
            <View style={[styles.container, {backgroundColor: '#fff'} ]}>
                <StatusBar style='transparent' />
                { modalVisible ?
                <Surah />
                : 
                <FlatList
                    data={surahNames}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
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
        paddingTop: '15%',
        paddingBottom: '10%',
    },
    title: {
        fontFamily: 'Raleway',
        fontSize: 20,
    },
    img: {
        width: 200,
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
        // bottom: ,
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