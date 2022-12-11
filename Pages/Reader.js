import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useFonts } from 'expo-font';
import surah from '../surah_1.json'
export default function Reader() {
    let [fontsLoaded] = useFonts({'QM': require('../assets/fonts/PDMS.ttf')});
    if (!fontsLoaded) {
        return <ActivityIndicator />;
      } else {
        return(
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Text style={{fontFamily: 'QM'}}>{surah.verse.verse_1}</Text>
                <Text style={{fontFamily: 'QM', fontSize: 20}}>{surah.verse.verse_2}</Text>
                <Text style={{fontFamily: 'QM', fontSize: 20}}>{surah.verse.verse_3}</Text>
            </View>
    )}
}