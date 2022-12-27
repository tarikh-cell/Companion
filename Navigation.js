import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { Ionicons, Feather, Octicons } from '@expo/vector-icons';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { colorScheme } from './components/Color';

export default function Navigation() {
    const [select, setSelect] = useState(0);
    const [hide, setHide] = useState(true);
    const open = { width: '95%' }
    const closed = { alignSelf: 'flex-end', right: 10 }
    let theme = colorScheme();

    return (
      <View style={[styles.container, hide ? open : closed ]}> 
        { hide ?
        <>
          <Item route="Reader" itemStyle={styles.item}  name="book" color={theme.secondary} index={1} num={select} setNum={setSelect} />
          <Item route="Player" itemStyle={styles.item}  name="meter" color={theme.secondary} index={2} num={select} setNum={setSelect} />
          <Item route="Home" itemStyle={styles.item} name="home" color={theme.secondary} index={0} num={select} setNum={setSelect} />
          <Item route="Counter" itemStyle={styles.item} name="project" color={theme.secondary} index={3} num={select} setNum={setSelect} />
        </>
         : null }
        <CloseItem itemStyle={styles.item} name="stack" alt="grabber" color={theme.secondary} hide={hide} setHide={setHide} />
      </View>
    );
}

function CloseItem({ itemStyle, itemBg, name, alt, color, hide, setHide }) {
  return(
    <View style={itemBg}>
      <TouchableOpacity style={itemStyle} onPress={() => setHide(!hide)}>
        <Octicons name={hide ? name : alt} size={20} color={color} />  
      </TouchableOpacity>
    </View>
  );
}

function Item({ route, itemStyle, itemBg, name, color, index, num, setNum }) {
  const navigation = useNavigation();
  return(
    <TouchableOpacity style={[itemStyle, {backgroundColor: index == num ? '#e3f6fd' : 'transparent', opacity: 0.7}]} onPress={() => {setNum(index); navigation.navigate(route);}}>
      <Octicons name={name} size={20} color={color} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
    container: {
        alignSelf: 'center',
        position: 'absolute',
        bottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        marginBottom: 10
    },
    item: {
        padding: 11,
        position: 'relative',
        borderBottomEndRadius: 25,
        borderBottomStartRadius: 40,
        borderTopEndRadius: 50,
        borderTopStartRadius: 25,
    },
    specialItem: {
        backgroundColor: '#00FA9A',
        padding: 15,
        borderRadius: 50,
        height: 55
    },
    specialBackground: {
        backgroundColor: 'white',
        // top: -15,
        padding: 4,
        borderRadius: 50,
    }
});