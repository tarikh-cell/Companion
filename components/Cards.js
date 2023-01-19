import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import husna from '../data/names';
import { useFonts } from 'expo-font';
import duas from '../data/duas.json'
import hadith from '../data/hadith.json';
import { useNavigation } from '@react-navigation/native';
import { colorScheme } from '../components/Color';

export default function Cards() {
    let [fontsLoaded] = useFonts({'Husna': require('../assets/fonts/Husna.ttf')});
    let theme = colorScheme();
    const navigation = useNavigation();
    const names = ['2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '"', '#', '$', '%', '&', "'", '(', ')', '*', '+', ',', '-', '.', '/', '0', ':', ';', '<', '=', '>', '?', '@', '(', '\\', ']', '^', '_', '`', '{', '|', '}', '~', '¡', '¢', '£', '¥', '¦', '!']
    const d = new Date();
    let day = d.getDay();
    let month = d.getMonth();
    let random = day+month*30 % 99;
    let rand = random % 23;
    let ran = random % 14;

    const Name = () => {
        return(
            <View style={[styles.card, {backgroundColor: theme.primary, shadowColor: theme.secondary, flexDirection: 'row'}]}>
                <Text style={styles.text}>{names[random]}</Text>
                <Text><Text style={{color: theme.secondary}}>{husna[random].translation}</Text>{"\n"}<Text style={{fontSize: 12, color: '#308695'}}>{husna[random].transliteration}</Text></Text>
            </View>
        );
    }

    const Dua = () => {
        return(
            <View style={[styles.card, {backgroundColor: theme.primary, shadowColor: theme.secondary, width: '80%'}]}>
                <Text style={{color: theme.secondary}}>Dua</Text>
                <Text style={{fontSize: 15, color: '#308695', textAlign: 'center', padding: 5}}>{duas[rand].zekr}</Text>
                <Text style={{fontSize: 12, color: '#308695', textAlign: 'center', padding: 2}}>{duas[rand].translation}</Text>
            </View>
        );
    }

    const DuaLink = () => {
        return(
            <>
            <TouchableOpacity style={[styles.card, {backgroundColor: theme.primary, shadowColor: theme.secondary, width: '17%'}]} onPress={() => navigation.navigate("Dua")}>
                <MaterialCommunityIcons name="hands-pray" size={24} color="#4dc591" />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.card, {backgroundColor: theme.primary, shadowColor: theme.secondary, width: '17%'}]} onPress={() => navigation.navigate("Counter")}>
                <MaterialCommunityIcons name="abacus" size={24} color="#308695" />
            </TouchableOpacity>
            </>
        )
    }

    const Hadith = () => {
        return(
            <View style={[styles.card, {backgroundColor: theme.primary, shadowColor: theme.secondary, width: '80%'}]}>
                <Text style={{fontSize: 15, color: '#308695', textAlign: 'center', padding: 5}}>Hadith</Text>
                <Text style={{fontSize: 12, textAlign: 'center', padding: 5, color: theme.secondary}}>{hadith[ran].narration}</Text>
                <Text style={{fontSize: 15, color: '#308695', textAlign: 'center', padding: 5}}>{hadith[ran].hadith}</Text>
                <Text style={{fontSize: 12, color: '#308695', textAlign: 'center', padding: 2}}>{hadith[ran].book}</Text>
            </View>
        )
    }

    const NamesLink = () => {
        return(
            <>
                <TouchableOpacity style={[styles.card, {backgroundColor: theme.primary, shadowColor: theme.secondary, width: '17%', padding: 17}]} onPress={() => navigation.navigate("Names")}>
                    <Text style={{color: "#4dc591", fontSize: 24}}>99</Text>
                </TouchableOpacity>
            </>
        )
    }

    const MorningLink = () => {
        return(
            <>
                <TouchableOpacity style={[styles.card, {backgroundColor: theme.primary, shadowColor: theme.secondary, width: '17%', padding: 19}]} onPress={() => navigation.navigate("Daily", {type: 'Morning'})}>
                    <MaterialCommunityIcons name="white-balance-sunny" size={24} color={theme.secondary} />
                </TouchableOpacity>
            </>
        )
    }   
    
    const EveningLink = () => {
        return(
            <>
                <TouchableOpacity style={[styles.card, {backgroundColor: theme.primary, shadowColor: theme.secondary, width: '17%'}]} onPress={() => navigation.navigate("Daily", {type: 'Evening'})}>
                    <MaterialCommunityIcons name="moon-waning-crescent" size={24} color="#e3f6fd" />
                </TouchableOpacity>
            </>
        )
    } 

    if (!fontsLoaded) {
        return(<></>);
    } else {
    return(
        <View style={{alignItems: 'center'}}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Name />
                <NamesLink />               
            </View>
            <Dua />
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <DuaLink />
                <MorningLink />
                <EveningLink />
            </View>
            <Hadith />
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