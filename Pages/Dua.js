import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';
import { colorScheme } from '../components/Color';
import { StatusBar } from 'expo-status-bar';
import allDuas from '../data/dua';
import { useState } from 'react';

export default function Dua({ navigation }) {
    let theme = colorScheme();

    const Card = ({ list }) => {
        let t = []
        for (let i = 0; i < list.length; i = i + 3){
            t.push(
                <View key={i} style={[styles.card, {backgroundColor: theme.primary, shadowColor: theme.secondary}]}>
                    <Text style={{textAlign: 'center', color: '#4dc591', fontFamily: 'Raleway'}}>{list[i]}</Text>
                    <Text style={{textAlign: 'center', color: theme.secondary, fontSize: 15}}>{list[i+1]}</Text>
                    <Text style={{textAlign: 'center', color: '#308695', fontFamily: 'Raleway'}}>{list[i+2]}</Text>
                </View>
            )
        }
        return t;
    }

    const ReturnDua = ({value, id}) => {
        const [open, setOpen] = useState(false);
        return (
            <View style={styles.list} key={id}>
                <TouchableOpacity onPress={() => setOpen(!open)}>
                    <Text style={{textAlign: 'center', color: theme.secondary, fontFamily: 'Raleway'}}>{value.title}</Text>
                </TouchableOpacity>
                {open ? 
                <Card list={value.dua} /> : null }
            </View>
        );
    }

    const renderItem = ({ item, index }) => (
        <ReturnDua value={item} id={index} />
    );

    return(
        <View style={[styles.container, {backgroundColor: theme.primary}]}>
            <StatusBar style="auto" />
            <TouchableOpacity style={{alignSelf: 'flex-start', padding: 15}} onPress={() => navigation.goBack()}>
                <Text style={{color: '#308695', fontFamily: 'Raleway'}}>Back</Text>
            </TouchableOpacity>
            <Text style={{fontFamily: 'Raleway', fontSize: 20, color: theme.secondary}}>Dua</Text>
            <FlatList
                data={allDuas}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                style={{width: '100%'}}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center',
        paddingTop: '10%'
    },
    list: {
        borderRadius: 12,
        borderColor: '#e3f6fd',
        borderWidth: 1,
        padding: 10,
        margin: 10,
        fontSize: 15,
    },
    card: {
        elevation: 3,
        borderRadius: 12,
        padding: 5,
        margin: 5,
    }
});