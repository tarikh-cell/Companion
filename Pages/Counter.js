import { StyleSheet, Text, View, TouchableOpacity, Pressable } from 'react-native';
import { colorScheme } from '../components/Color';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';

export default function Counter({ navigation }) {
    let theme = colorScheme();
    const [count, setCount] = useState(0);

    return(
        <View style={[styles.container, {backgroundColor: theme.primary}]}>
            <StatusBar style="auto" />
            <View style={{flexDirection: 'row', width: '100%', justifyContent: 'space-between'}}>
            <TouchableOpacity style={{alignSelf: 'flex-start', padding: 15}} onPress={() => navigation.goBack()}>
                <Text style={{color: '#308695', fontFamily: 'Raleway'}}>Back</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{alignSelf: 'flex-end', padding: 15}} onPress={() => setCount(0)}>
                <Text style={{color: '#308695'}}>Reset</Text>
            </TouchableOpacity></View>
            <Pressable style={{height: '80%', width: '100%', marginTop: '10%'}} onPress={() => setCount(count + 1)}>
                <Text style={[styles.text, {color: theme.secondary}]}>{count}</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center'
    },
    text: {
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize: 70,
        fontWeight: '500',
        height: '100%'
    }
});