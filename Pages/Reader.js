import { StyleSheet, Text, View, Button, ActivityIndicator, ScrollView, Image } from 'react-native';
import { useFonts } from 'expo-font';
import surah from '../surah/surah_2.json'
import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
export default function Reader() {
    const [verses, setVerses] = useState(Object.values(surah.verse));
    const [start, setStart] = useState('');
    const [freeze, setFreeze] = useState(true);
    const [text, setText] = useState('');
    let [fontsLoaded] = useFonts({'QM': require('../assets/fonts/Nabi.ttf')});

    useEffect(() => {
        if (surah.index != "009" && freeze){
            setStart(surah.verse.verse_0);
            setVerses(verses.splice(1));
            setFreeze(false)
        }
    }, [freeze])

    const fetchData = (num) => {
        fetch('http://api.alquran.cloud/v1/surah/' + num , {
          method: 'GET',
        })
          .then(response => response.json())
          .then(json => {
            setText(json.data)
            // console.log(json.data)
        })
          .catch(error => {
            console.error(error);
          });
    }

    const getInfo = () => {
        fetchData(2);
        let pagenum = text.ayahs[0].page;
        let start = text.ayahs[0].numberInSurah;
        let end = 0

        for (let i = 1; i < text.numberOfAyahs; i++){
            let newPageNum = text.ayahs[i].page;
            if (pagenum !== newPageNum){
                end = text.ayahs[i-1].numberInSurah
                console.log('"' + text.ayahs[i].page + '": ' + end + ",")
                start = text.ayahs[i].numberInSurah;
                pagenum = newPageNum;
            }
        }
        console.log('":"' + ",  " + text.numberOfAyahs)
    }
    
    const returnSurah = () => {
        let ayat = '';
        let page = surah.start;
        for(let i = 0; i < surah.count; i++){
            const arabic  = " (" + convertInt(String(i+1)) + ") "; 
            ayat = ayat + verses[i] + arabic + "";  
            if (surah.pages[page] == i+1) {
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
                <Button title="work" onPress={() => getInfo()} />
                
                <ScrollView contentContainerStyle={{justifyContent: 'center'}}>
                    {/* <Text style={styles.text}>{start}</Text> */}
                    <Image source={require('../assets/bismillah0.png')} style={styles.img} />
                    <Text style={styles.text}>{returnSurah()}</Text>
                    {/* {verses.map((value, key) => {
                        return(<Text key={key} style={styles.text}>{value}</Text>);
                    })} */}
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
        backgroundColor: 'rgba(0, 250, 154, 0.1)'
    },
    img: {
        width: '60%',
        height: 90,
        alignSelf: 'center',
    },
    text: {
        fontFamily: 'QM',
        fontSize: 21,
        textAlign: 'justify',
        padding: 10,
    }
});