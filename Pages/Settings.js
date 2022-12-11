import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';

export default function Settings({ route, navigation }) {
    const { value } = route.params;
    const [data, setData] = useState(value);

    const storeData = async () => {
        try {
            await AsyncStorage.setItem('@storage_Key', data)
        } catch (e) {/* saving error */ }
    }
    
    return(
      <View style={styles.container}>
        <StatusBar style='auto' />
        <Text>Settings</Text>
        <Text>{data}</Text>
        <Button title="Go back" onPress={() => navigation.navigate('Home', {update: data})} />
        <Button
          title="Save"
          onPress={() => storeData()}
        />
        <Button
          title="Fill"
          onPress={() => setData(data + '1')}
        />
        <Button
          title="Reset Data"
          onPress={() => {setData('0'); storeData();}}
        />
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});