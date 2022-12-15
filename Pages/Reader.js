import { StyleSheet, Text, View, ActivityIndicator, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useFonts } from 'expo-font';
import { useEffect, useState, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Feather } from '@expo/vector-icons';
import surahList from '../info.json';

export default function Reader() {
    let m = require('./index');
    let [fontsLoaded] = useFonts({'QM': require('../assets/fonts/Nabi.ttf')});
    const scrollViewRef = useRef();
    const [choice, setChoice] = useState(1);
    const [verses, setVerses] = useState('');
    const [freeze, setFreeze] = useState(true);

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
                    <Feather name="menu" size={25} color='#fff' onPress={() => {setChoice(null); setFreeze(false)}} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.item} onPress={() => setChoices(choice + 1)}>
                    <Feather name="arrow-right" size={25} color='#fff' />
                </TouchableOpacity>
            </View>
        );
    }

    const Select = ({id}) => {
        return(
            <TouchableOpacity style={styles.surah}>
                <Text>{surahList[id].id}</Text>
                <Text style={{borderWidth: 1}}>{surahList[id].name}</Text>
                <Text>{surahList[id].translation}</Text>
                <Text>{surahList[id].transliteration}</Text>
                <Text>{surahList[id].type}</Text>
                <Text>{surahList[id].total_verses}</Text>
            </TouchableOpacity>
        );
    }

    if (!fontsLoaded || choice == null) {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Surah</Text>
                <Select id={1} />
            </View>
        );
      } else {
        return(
            <View style={styles.container}>
                <StatusBar style='transparent' />
                <ScrollView ref={scrollViewRef} showsVerticalScrollIndicator={true} contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}>
                    <Image source={require('../assets/bismillah.png')} style={styles.img} />
                    <Text style={styles.text}>{returnSurah()}</Text>
                </ScrollView>
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
        width: '60%',
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
        borderWidth: 1,
        borderRadius: 12,
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderColor: '#8899A6'
    },
    surahlist: {
        fontFamily: 'Raleway',
        fontSize: 20,
        textAlign: 'center'
    }
});