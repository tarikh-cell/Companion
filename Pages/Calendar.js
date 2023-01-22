import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import SettingsContext from '../SettingsContext';
import { colorScheme } from '../components/Color';
import { StatusBar } from 'expo-status-bar';
import { useState, useContext, useEffect, memo } from 'react';
import { Feather } from '@expo/vector-icons';

function Calendar({ navigation }) {
    let theme = colorScheme();
    const [loading, setLoading] = useState(true)
    const [selected, setSelected] = useState((new Date).getDay())
    const [month, setMonth] = useState((new Date).getMonth() + 1)
    const [year, setYear] = useState((new Date).getFullYear())
    const [day, setDay] = useState(null)
    const [timings, setTimings] = useState(null)
    const [monthData, setMonthData] = useState(null)
    const { settings } = useContext(SettingsContext);

    useEffect(() => {
        if (loading) { fetchData() }
        if (!loading) { fetchDailyData() }
    }, [selected])

    const fetchData = () => {
        fetch('http://api.aladhan.com/v1/gToHCalendar/'+ month +'/' + year, {
          method: 'GET',
        })
          .then(response => response.json())
          .then(json => {
            setMonthData(json.data),
            setLoading(false),
            setDay(json.data[selected].hijri.day + ' '+ json.data[selected].hijri.month.en+' '+ json.data[selected].hijri.year)
        })
          .catch(error => {
            console.log(error)
        });
    }

    const fetchDailyData = () => {
        fetch('http://api.aladhan.com/v1/timingsByCity/' + monthData[selected].gregorian.date + '?city='+settings[0]+'&country='+settings[1]+'&method='+settings[5]+'&school='+settings[4]+'&latitudeAdjustmentMethod='+settings[3], {
          method: 'GET',
        })
          .then(response => response.json())
          .then(json => {
            setTimings(json.data.timings);
        })
        .catch(error => {
            console.log(error)
        });
    }

    const displaySlot = (arr, gregorianDate, x) => {
        let col = {backgroundColor: theme.primary, padding:15}
        if (selected == x){
            col = {backgroundColor: '#e3f6fd', borderRadius: 50, padding: 15}
        }
        return(
            <TouchableOpacity style={col} key={x} onPress={() => {setSelected(x); setDay(arr[x])}}>
                <Text style={{color: theme.secondary, fontFamily: 'Raleway'}}>{gregorianDate[x]}</Text>
                <Text style={{fontSize: 10, color: '#308695', alignSelf: 'center', fontFamily: 'Raleway'}}>{parseInt(arr[x])}</Text>
            </TouchableOpacity>
        )
    }

    const displayGrid = (arr, gregorianDate, holiArr, start, end) => {
        let t = [];
        let length = gregorianDate.length
        if (length < end){
            return null
        }
        for (let x = start; x < end; x++){
            t.push(
                displaySlot(arr, gregorianDate, x)
            );
        }
        return t;
    }

    const Icon = ({ name, icon, time, colour, bgColor }) => {
        return(
            <View style={{flexDirection: 'row', alignItems: 'center', width: '100%', padding: 5}}>
                <Text style={[styles.icon, {backgroundColor: bgColor}]}><Feather name={icon} size={24} color={colour} /></Text>
                <Text style={{color: theme.secondary, fontFamily: 'Raleway'}}>{name}</Text>
                <Text style={{color: theme.secondary, fontFamily: 'Raleway', marginLeft: 'auto', paddingRight: 20}}>{time}</Text>
            </View>
        )
    }

    const displayPrayers = (holiArr) => {
        return(
            <View style={{justifyContent: 'space-between'}}>
                <Text style={{alignSelf: 'center', fontFamily: 'Raleway', color: '#308695'}}>{day} {holiArr[selected]}</Text>  
                <Icon name="Fajr" icon="sunrise" time={timings?.Fajr} colour="#000" bgColor="#308695" />
                <Icon name="Dhuhr" icon="sun"  time={timings?.Dhuhr} colour="#000" bgColor="#308695" />
                <Icon name="Asr" icon="cloud" time={timings?.Asr} colour="#000" bgColor="#308695" />
                <Icon name="Maghrib" icon="sunset" time={timings?.Maghrib} colour="#000" bgColor="#308695" />
                <Icon name="Isha" icon="moon" time={timings?.Isha} colour="#000" bgColor="#308695" />
            </View>
        );
    }

    if (loading) {
        return(<ActivityIndicator />)
    } else {
        let arr = monthData.map((number) => number.hijri.day + ' '+number.hijri.month.en+' '+number.hijri.year);
        let engArr = monthData.map((number) => number.gregorian.day); 
        let holiArr = monthData.map((number) => number.hijri.holidays); 
        return(
            <View style={[styles.container, {backgroundColor: theme.primary, alignItems: 'stretch'}]}>
                <StatusBar style="auto" />
                <Text style={{alignSelf: 'center', margin: 10, fontSize: 20, fontFamily: 'Raleway', color: theme.secondary}}>{selected+1} {monthData[month].gregorian.month.en} {monthData[selected].gregorian.year}</Text>
                <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
                    {displayGrid(arr, engArr, holiArr, 0, 7)}
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
                    {displayGrid(arr, engArr, holiArr, 7, 14)}
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
                    {displayGrid(arr, engArr, holiArr, 14, 21)}
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
                    {displayGrid(arr, engArr, holiArr, 21, 28)}
                </View>
                <View style={{flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-evenly'}}>
                    {displayGrid(arr, engArr, holiArr, 28, arr.length)}
                </View>
                {displayPrayers(holiArr)}   
            </View>
        )}
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
    },
    icon: {
        padding: 10,
        borderRadius: 12,
        margin: 10
    }
});

export default memo(Calendar);