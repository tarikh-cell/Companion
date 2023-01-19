import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import SettingsContext from '../SettingsContext';
import { colorScheme } from '../components/Color';
import { StatusBar } from 'expo-status-bar';
import { useState, useContext, useEffect } from 'react';

export default function Calendar({ navigation }) {
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
        fetch('http://api.aladhan.com/v1/timingsByCity/' + monthData[selected].gregorian.date + '?city='+settings[0]+'&country='+settings[1]+'&method='+settings[5]+'&school='+settings[4]+'&latitudeAdjustmentMethod='+settings[3], {
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

    const displayPrayers = (holiArr) => {
        if (loaded){
            return (
                <Text style={{alignSelf: 'center', color: '#308695', fontFamily: 'Raleway'}}>Choose Date to view Prayer Times</Text>
            )
        } else {
            return(
                <View>
                    <Text style={{alignSelf: 'center', margin: 20, fontFamily: 'Raleway', color: '#308695'}}>{day} {holiArr[selected]}</Text>  
                    <View style={{flexDirection: 'row', justifyContent: 'space-evenly', color: theme.secondary}}>
                        <Text style={{color: theme.secondary, fontFamily: 'Raleway'}}>Fajr{"\n"}{timings.Fajr}</Text>
                        <Text style={{color: theme.secondary, fontFamily: 'Raleway'}}>Dhuhr{"\n"}{timings.Dhuhr}</Text>
                        <Text style={{color: theme.secondary, fontFamily: 'Raleway'}}>Asr{"\n"}{timings.Asr}</Text>
                        <Text style={{color: theme.secondary, fontFamily: 'Raleway'}}>Maghrib{"\n"}{timings.Maghrib}</Text>
                        <Text style={{color: theme.secondary, fontFamily: 'Raleway'}}>Isha{"\n"}{timings.Isha}</Text>
                    </View>
                </View>
            );
        }
    }

    if (loading) {
        return(<></>)
    } else {
        let arr = monthData.map((number) => number.hijri.day + ' '+number.hijri.month.en+' '+number.hijri.year);
        let engArr = monthData.map((number) => number.gregorian.day); 
        let holiArr = monthData.map((number) => number.hijri.holidays); 
        return(
            <View style={[styles.container, {backgroundColor: theme.primary, alignItems: 'stretch'}]}>
                <StatusBar style="auto" />
                <TouchableOpacity style={{alignSelf: 'flex-start', padding: 15}} onPress={() => navigation.goBack()}>
                    <Text style={{color: '#308695', fontFamily: 'Raleway'}}>Back</Text>
                </TouchableOpacity>
                <Text style={{alignSelf: 'center', margin: 20, fontSize: 20, fontFamily: 'Raleway', color: theme.secondary}}>{selected+1} {monthData[month].gregorian.month.en} {monthData[selected].gregorian.year}</Text>
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