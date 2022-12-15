import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

export default function Navigation() {
    const [select, setSelect] = useState(0);
    const [hide, setHide] = useState(true);
    const open = { width: '95%' }
    const closed = { alignSelf: 'flex-end', right: 10 }
    return (
      <View style={[styles.container, hide ? open : closed ]}> 
        { hide ?
        <>
        <Item route="Reader" itemStyle={styles.item}  name="book-outline" index={1} num={select} setNum={setSelect} />
        <Item route="Reader" itemStyle={styles.item}  name="barcode-outline" index={2} num={select} setNum={setSelect} />
        <Item route="Home" itemStyle={styles.specialItem} itemBg={styles.specialBackground} name="home-outline" index={0} num={select} setNum={setSelect} />
        <Item route="Reader" itemStyle={styles.item} name="compass-outline" index={3} num={select} setNum={setSelect} />
        </>
         : null }
        <CloseItem itemStyle={styles.item} name="minimize" alt="maximize" hide={hide} setHide={setHide} />
      </View>
    );
}

function CloseItem({ itemStyle, itemBg, name, alt, hide, setHide }) {
  return(
    <View style={itemBg}>
      <TouchableOpacity style={itemStyle} onPress={() => setHide(!hide)}>
        <Feather name={hide ? name : alt} size={30} color={hide ? '#000' : '#fff'} />
      </TouchableOpacity>
    </View>
  );
}

function Item({ route, itemStyle, itemBg, name, index, num, setNum }) {
  const navigation = useNavigation();
  return(
    <View style={itemBg}>
      <TouchableOpacity style={itemStyle} onPress={() => {setNum(index); navigation.navigate(route);}}>
        <Ionicons name={name} size={30} color={num == index ? '#fff' : '#000'} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        alignSelf: 'center',
        position: 'absolute',
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
    specialItem: {
        backgroundColor: '#00FA9A',
        padding: 15,
        borderRadius: 50,
        height: 60
    },
    specialBackground: {
        backgroundColor: 'white',
        top: -15,
        padding: 4,
        borderRadius: 50,
    }
});