import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import surahNames from '../data/surahNames';
import { Feather } from '@expo/vector-icons';
import { colorScheme } from '../components/Color';
import { surahFile } from '../data/index';

export default function ReaderSurah({ choice, setChoice, setModalVisible }) {
    // var m = require('../data/index');
    let theme = colorScheme();
    const [arr, setArr] = useState([]);
    const [freeze, setFreeze] = useState(true);

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
                <TouchableOpacity style={styles.item} onPress={() => setModalVisible(false)}>
                    <Text style={{fontSize: 20, color: '#4dc591'}}>{surahNames[choice-1].id}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.item} onPress={() => setChoices(choice + 1)}>
                    <Feather name="arrow-right" size={25} color={theme.secondary} />
                </TouchableOpacity>
            </View>
        );
    }

    const CreateData = () => {  
        let m = surahFile(choice) 
        let whole = Object.values(m.verse)
        let ayat = '';
        let page = m.start;
        let array = [];
        for(let i = 1; i <= m.count; i++){
            const arabic  = " (" + convertInt(String(i)) + ") "; 
            ayat = ayat + whole[i] + arabic;  
            if (m.pages[page] == i) {         
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

    const Header = () => {
        return (<Text style={{fontFamily: "Surah", fontSize: 100, color: '#4dc591'}}>{surahNames[choice-1].arabic}</Text>)
    }

    const Start = () => {
        if (choice !== 9) {
            return (<Text style={[styles.text, {alignSelf: 'center', color: theme.secondary}]}>﻿بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ</Text>)
        }
        return null
    }

    return(
        <>
            <Header />
            <FlatList
                data={arr}
                renderItem={renderIte}
                keyExtractor={(item, index) => index}
                ListHeaderComponent={<Start />}
            />
            <ToolBar />
        </>
    )
}

const styles = StyleSheet.create({
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
    }
});