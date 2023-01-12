import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Octicons } from '@expo/vector-icons';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { colorScheme } from './components/Color';

export default function Navigation() {
    const [select, setSelect] = useState(0);
    const [hide, setHide] = useState(true);
    const open = { width: '100%' }
    const closed = { alignSelf: 'flex-end', right: 10, position: 'absolute' }
    let theme = colorScheme();

    return (
      <View style={[styles.container, hide ? open : closed, { backgroundColor: theme.primary } ]}> 
        { hide ?
        <>
          <Item route="Reader" itemStyle={styles.item}  name="book" color={theme.secondary} index={1} num={select} setNum={setSelect} />
          <Item route="Player" itemStyle={styles.item}  name="meter" color={theme.secondary} index={2} num={select} setNum={setSelect} />
          <Item route="Home" itemStyle={styles.item} name="home" color={theme.secondary} index={0} num={select} setNum={setSelect} />
          <Item route="Daily" itemStyle={styles.item} name="project" color={theme.secondary} index={3} num={select} setNum={setSelect} />
        </>
         : null }
        <CloseItem itemStyle={styles.item} name="stack" alt="grabber" color={theme.secondary} hide={hide} setHide={setHide} />
      </View>
    );
}

function CloseItem({ itemStyle, name, alt, color, hide, setHide }) {
  return(
      <TouchableOpacity style={[itemStyle, {backgroundColor: hide ? 'transparent' : '#e3f6fd', opacity: 0.7}]} onPress={() => setHide(!hide)}>
        <Octicons name={hide ? name : alt} size={20} color={color} />  
      </TouchableOpacity>
  );
}

function Item({ route, itemStyle, name, color, index, num, setNum }) {
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
        bottom: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        paddingBottom: 10,
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
    }
});