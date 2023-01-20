import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, VirtualizedList } from 'react-native';
import { useFonts } from 'expo-font';
import React, { useEffect, useState, memo } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Feather } from '@expo/vector-icons';
import surahNames from '../data/surahNames';
import { colorScheme } from '../components/Color';

export default function Reader() {
    let m = require('../data/index');
    let [fontsLoaded] = useFonts({'QM': require('../assets/fonts/Nabi.ttf'), 'Surah': require('../assets/fonts/karim.ttf')});
    let theme = colorScheme();
    const [arr, setArr] = useState([]);
    const [choice, setChoice] = useState(1);
    const [freeze, setFreeze] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        if (freeze){
            CreateData()
            setFreeze(false)
        }
    }, [freeze])

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
            <View style={[styles.tool, { backgroundColor: theme.primary }]}>
                <TouchableOpacity style={styles.item} onPress={() => setChoices(choice - 1)}>
                    <Feather name="arrow-left" size={25} color={theme.secondary} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.item}>
                    <Feather name="menu" size={25} color={theme.secondary} onPress={() => {setModalVisible(!modalVisible); setArr([]); setFreeze(true)}} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.item} onPress={() => setChoices(choice + 1)}>
                    <Feather name="arrow-right" size={25} color={theme.secondary} />
                </TouchableOpacity>
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
            ayat = ayat + whole[i] + arabic;  
            if (m.default[choice].pages[page] == i) {         
                // ayat += "⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀\r";
                ayat += "⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀\r";
                page = String(parseInt(page) + 1);
                array.push({page: ayat, pgNumber: page-1})
                ayat = ""
            }
        }
        setArr(array)
    }

    const ReturnSurahs = ({value, id}) => {
        return (
            <View key={id}>
                <Text style={[styles.text, { color: theme.secondary }]}>{value.page}</Text>
                <Text style={{textAlign: 'center', top: -20, padding: 0, margin: 0, color: theme.secondary}}>{value.pgNumber}</Text>
            </View>
        );
    }

    const renderIte = ({ item, index }) => (
        <ReturnSurahs value={item} id={index} />
    );

    const Bismillah = () => {
        if (choice == 9) {
            return null
        } else if (theme.primary == "#fff") {
            return <Image source={require('../assets/bismillah.png')} style={styles.img} /> 
        } else {
            return <Image source={require('../assets/bismillah-white.png')} style={styles.img} /> 
        }
    }

    const Surah = () => {
        return(
            <>
                <Bismillah />
                <FlatList
                    data={arr}
                    renderItem={renderIte}
                    keyExtractor={(item, index) => index}
                />
                <ToolBar />
            </>
        );
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
                <Surah />
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
        paddingHorizontal: 10,
    },
    tool: {
        alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        borderRadius: 50,
        padding: 5,
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