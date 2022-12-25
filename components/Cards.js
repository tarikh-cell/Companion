import { StyleSheet, Text, View } from 'react-native';
import husna from '../data/names';
import { useFonts } from 'expo-font';
import list from '../data/day.json';

export default function Cards() {
    let [fontsLoaded] = useFonts({'Husna': require('../assets/fonts/Husna.ttf')});
    const names = ['2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '"', '#', '$', '%', '&', "'", '(', ')', '*', '+', ',', '-', '.', '/', '0', ':', ';', '<', '=', '>', '?', '@', '(', '\\', ']', '^', '_', '`', '{', '|', '}', '~', '¡', '¢', '£', '¥', '¦', '!']
    const d = new Date();
    let day = d.getDay();
    let month = d.getMonth();
    let random = day+month*30 % 99;
    let rand = random % 30;

    const Name = () => {
        return(
            <View style={[styles.card, {backgroundColor: '#fff', flexDirection: 'row'}]}>
                <Text style={styles.text}>{names[random]}</Text>
                <Text><Text>{husna[random].translation}</Text>{"\n"}<Text style={{fontSize: 12, color: '#308695'}}>{husna[random].transliteration}</Text></Text>
            </View>
        );
    }

    const Dua = () => {
        return(
            <View style={[styles.card, {backgroundColor: '#fff', width: '70%'}]}>
                <Text>Dua</Text>
                <Text style={{fontSize: 15, color: '#308695', textAlign: 'center'}}>{list[rand].zekr}</Text>
            </View>
        );
    }

    if (!fontsLoaded) {
        return(<></>);
    } else {
    return(
        <View>
            <Name />
            <Dua />
        </View>
    )}
}

const styles = StyleSheet.create({
    card: {
        padding: 10,          
        margin: 5,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 1, 
        borderRadius: 12
    }, 
    text: {
        fontSize: 40,
        fontFamily: 'Husna',
        minWidth: 50,
        minHeight: 50,
    }
});