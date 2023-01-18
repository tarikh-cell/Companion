import { FlatList, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { colorScheme } from '../components/Color';
import husna from '../data/names';

export default function Names({ navigation }) {
    const names = ['2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '"', '#', '$', '%', '&', "'", '(', ')', '*', '+', ',', '-', '.', '/', '0', ':', ';', '<', '=', '>', '?', '@', '[', '\\', ']', '^', '_', '`', '{', '|', '}', '~', '¡', '¢', '£', '¤','¥', '¦', '!']
    let theme = colorScheme();

    const Name = ({id, name}) => {
        return(
            <View style={[styles.card, {width: '50%', padding: 5, paddingTop: 10}]}>
                <Text style={styles.text}>{name}</Text>
                <Text  style={{textAlign: 'center', color: theme.secondary}}>{husna[id].translation}</Text>
                <Text style={{fontSize: 12, color: '#308695', textAlign: 'center'}}>{husna[id].transliteration}</Text>
            </View>
        );
    }

    const renderItem = ({ item, index }) => (
        <Name key={index} id={index} name={item} />
    );

    return(
        <View style={[styles.container, {backgroundColor: theme.primary}]}>
            <TouchableOpacity style={{alignSelf: 'flex-start', padding: 15}} onPress={() => navigation.goBack()}>
                <Text style={{color: '#308695', fontFamily: 'Raleway'}}>Back</Text>
            </TouchableOpacity>
            <FlatList
                horizontal={false}
                numColumns={2}
                data={names}
                renderItem={renderItem}
                keyExtractor={item => item.toString()} 
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: '10%',
    },
    text: {
        fontSize: 40,
        fontFamily: 'Husna',
        minWidth: 50,
        minHeight: 50,
        textAlign: 'center',
        left: -15
    }
});