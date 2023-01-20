import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Octicons } from '@expo/vector-icons';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { colorScheme } from './components/Color';

export default function Navigation() {
    let theme = colorScheme();
    const [select, setSelect] = useState(0);
    const [hide, setHide] = useState(true);
    const open = { width: '100%' }
    const closed = { position: 'absolute', alignSelf: 'flex-end', right: 10 }
    const navigation = useNavigation();

    const Item = ({ route, name, index }) => {
      return(
        <TouchableOpacity style={[styles.item, {backgroundColor: index == select ? '#e3f6fd' : 'transparent', opacity: 0.7}]} onPress={() => {setSelect(index); navigation.navigate(route);}}>
          <Octicons name={name} size={20} color={theme.secondary} />
        </TouchableOpacity>
      );
    }

    const CloseItem = ({ name, alt }) => {
      return(
          <TouchableOpacity style={[styles.item, {backgroundColor: hide ? 'transparent' : '#e3f6fd', opacity: 0.7}]} onPress={() => setHide(!hide)}>
            <Octicons name={hide ? name : alt} size={20} color={theme.secondary} />  
          </TouchableOpacity>
      );
    }

    return (
      <View style={[styles.container, hide ? open : closed, { backgroundColor: theme.primary } ]}> 
        { hide ?
        <>
          <Item route="Reader" name="book" index={1} />
          <Item route="Player" name="meter" index={2} />
          <Item route="Home" name="home" index={0} />
          <Item route="Calendar" name="calendar" index={3}  />
        </>
         : null }
        <CloseItem name="stack" alt="grabber" />
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignSelf: 'center',
        bottom: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        paddingVertical: 10,
    },
    item: {
        padding: 11,
        position: 'relative',
        borderBottomEndRadius: 25,
        borderBottomStartRadius: 40,
        borderTopEndRadius: 50,
        borderTopStartRadius: 25,
    }
});