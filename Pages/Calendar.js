import { StyleSheet, Text, View, TouchableOpacity, Pressable } from 'react-native';
import SettingsContext from '../SettingsContext';
import { colorScheme } from '../components/Color';
import { StatusBar } from 'expo-status-bar';
import { useState, useContext, useEffect } from 'react';
import { MaterialIcons } from '@expo/vector-icons';

export default function Calendar() {
    let theme = colorScheme();
    const [loading, setLoading] = useState(true)
    const [loaded, setLoaded] = useState(true)
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
        fetch('http://api.aladhan.com/v1/timingsByCity/' + monthData[selected].gregorian.date + '?city='+settings[0]+'&country='+settings[1], {
          method: 'GET',
        })
          .then(response => response.json())
          .then(json => {
            setTimings(json.data.timings);
            setLoaded(false);   
        })
        .catch(error => {
            console.log(error)
        });
    }

    const displaySlot = (arr, gregorianDate, x) => {
        let col = 'black'
        if (selected == x){
            col = 'white'
        }
        return(
            <TouchableOpacity key={x} onPress={() => {setSelected(x); setDay(arr[x])}}>
                <Text style={{color: col}}>{gregorianDate[x]}</Text>
                <Text style={{fontSize: 10, color: col, alignSelf: 'center'}}>{parseInt(arr[x])}</Text>
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

    const displayPrayers = (holiArr) => {
        if (loaded){
            return (
                <Text style={{alignSelf: 'center'}}>Choose Date to view Prayer Times</Text>
            )
        } else {
            return(
                <View>
                    <Text style={{alignSelf: 'center'}}>{day} {holiArr[selected]}</Text>  
                    <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
                        <View><Text>Fajr</Text><Text>{timings.Fajr}</Text></View>
                        <View><Text>Dhuhr</Text><Text>{timings.Dhuhr}</Text></View>
                        <View><Text>Asr</Text><Text>{timings.Asr}</Text></View>
                        <View><Text>Maghrib</Text><Text>{timings.Maghrib}</Text></View>
                        <View><Text>Isha</Text><Text>{timings.Isha}</Text></View>
                    </View>
                </View>
            );
        }
    }

    const increaseMonth = () => {
        if (month == 12){
            setMonth(1)
        } else {
            setMonth(month + 1)
        }
        setLoaded(true)
    }

    const decreaseMonth = () => {
        if (month == 1){
            setMonth(12)
        } else {
            setMonth(month - 1)
        }
        setLoaded(true)
    }

    if (loading) {
        return(<></>)
    } else {
        let arr = monthData.map((number) => number.hijri.day + ' '+number.hijri.month.en+' '+number.hijri.year);
        let engArr = monthData.map((number) => number.gregorian.day); 
        let holiArr = monthData.map((number) => number.hijri.holidays); 
        return(
        <View style={[styles.container, {backgroundColor: theme.primary}]}>
            <StatusBar style="auto" />
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <TouchableOpacity onPress={() => decreaseMonth()}>
                    <MaterialIcons name="arrow-left" size={24} color="black" />
                </TouchableOpacity>
                <Text>{monthData[selected].gregorian.month.en} {monthData[selected].gregorian.year}</Text>
                <TouchableOpacity onPress={() => increaseMonth()}>
                    <MaterialIcons name="arrow-right" size={24} color="black" />
                </TouchableOpacity>
            </View>

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
    }
});