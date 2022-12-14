import { StyleSheet, Text, View, ActivityIndicator, ScrollView, Image } from 'react-native';
import { useFonts } from 'expo-font';
import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';

export default function Reader() {
    let m = require('./index');
    let [fontsLoaded] = useFonts({'QM': require('../assets/fonts/Nabi.ttf')});
    const [choice, setChoice] = useState(9);
    const [verses, setVerses] = useState('');
    const [freeze, setFreeze] = useState(true);

    useEffect(() => {
        if (freeze){
            setVerses(Object.values(m.default[choice].verse))
            setFreeze(false)
        }
    }, [freeze])

    const returnSurah = () => {
        let ayat = '';
        let page = m.default[choice].start;
        for(let i = 1; i < m.default[choice].count; i++){
            const arabic  = " (" + convertInt(String(i+1)) + ") "; 
            ayat = ayat + verses[i] + arabic + "";  
            if (m.default[choice].pages[page] == i+1) {
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

    if (!fontsLoaded) {
        return <ActivityIndicator />;
      } else {
        return(
            <View style={styles.container}>
                <StatusBar style='transparent' />
                <ScrollView contentContainerStyle={{justifyContent: 'center'}}>
                    <Image source={require('../assets/bismillah0.png')} style={styles.img} />
                    <Text style={styles.text}>{returnSurah()}</Text>
                </ScrollView>
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
        paddingTop: '10%'
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
    }
});