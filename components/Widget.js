import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { useEffect, useState, useContext } from 'react';
import SettingsContext from '../SettingsContext';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { colorScheme } from '../components/Color';

export default function Widget() {
    let theme = colorScheme();
    const [date, setDate] = useState('');
    const [times, setTimes] = useState(''); 
    const [loading, setLoading] = useState(true); 
    const { settings } = useContext(SettingsContext);

    useEffect(() => {
        if (loading) { fetchData() }
        let intervalID = setInterval(
            () => tick(),
            1000
        );

        return () => {
            clearInterval(intervalID);
        }
    })

    const fetchData = () => {
        fetch('http://api.aladhan.com/v1/timingsByCity?city='+settings[0]+'&country='+settings[1]+'&method='+settings[5]+'&school='+settings[4]+'&latitudeAdjustmentMethod='+settings[3], {
          method: 'GET',
        })
          .then(response => response.json())
          .then(json => {
            setTimes(json.data.timings);
            setDate(json.data.date.hijri.day + " " + json.data.date.hijri.month.en + " " + json.data.date.hijri.year)
            setLoading(false);   
        })
          .catch(error => {
            console.log(error)
          });
    }

    const checkPrayer = (prayer) => {
        let hours = new Date().getHours();
        let minutes = new Date().getMinutes();
        let thisprayer = prayer.toLocaleString();
        let hrs = thisprayer.substring(0,2);
        let mins = thisprayer.substring(3,5);
        hrs = parseInt(hrs);
        if (hours > hrs){
            return true
        } else if (hours == hrs){
            if (minutes > mins){
                return true
            }
            return false
        }
        return false
    }

    const getSecs = () => {
        let s = 60 - (new Date().getSeconds());
        let t = '';
        if (s < 10){
          t = t + ':0' + s.toLocaleString();
        } else {
          t = t + ':' + s.toLocaleString();
        }
  
        return(
          t
      );
    }

    const [sec, setSec] = useState(getSecs());

    const tick = () => {
        setSec(getSecs());
    }

    const checkTimeLeft = () => {
        let prayer = getNextPrayerTime();
        let hours = new Date().getHours();
        let minutes = new Date().getMinutes();
        let thisprayer = prayer.toLocaleString();
        let hrs = thisprayer.substring(0,2);
        let mins = thisprayer.substring(3,5);
        
        let hrsLeft = (hrs-hours).toLocaleString()
        hrsLeft = hrsLeft.replace("-", "")

        let minsLeft = (mins-minutes).toLocaleString()
        if (minutes > mins){
            minsLeft = (60-minutes+parseInt(mins)).toLocaleString()
        } 
        if (minutes > mins){
            hrsLeft = parseInt(hrsLeft) - 1;
        }
        if (hrsLeft < 10){       
            hrsLeft = '0' + hrsLeft
        }
        if (minsLeft < 10){
            minsLeft = '0' + minsLeft
        }
        
        let timeLeft = hrsLeft + ':' + minsLeft
        return timeLeft
    }

    const getCurrentPrayer = () => {
        if (getNextPrayer() == 'Fajr'){
            return 'Isha ' + times.Isha
        } else if (getNextPrayer() == 'Dhuhr'){
            return 'Fajr ' + times.Fajr
        } else if (getNextPrayer() == 'Asr'){
            return 'Dhuhr ' + times.Dhuhr
        } else if (getNextPrayer() == 'Maghrib'){
            return 'Asr ' + times.Asr
        } else if (getNextPrayer() == 'Isha'){
            return 'Maghrib ' + times.Maghrib
        } else {
            return 'Isha ' + times.Isha
        }
    }

    const getNextPrayer = () => {
        if (!checkPrayer(times.Fajr)){
            return 'Fajr'
        } else if (!checkPrayer(times.Sunrise)){
            return 'Sunrise'
        } else if (!checkPrayer(times.Dhuhr)){
            return 'Dhuhr'
        } else if (!checkPrayer(times.Asr)){
            return 'Asr'    
        } else if (!checkPrayer(times.Maghrib)){
            return 'Maghrib'
        } else if (!checkPrayer(times.Isha)){
            return 'Isha'
        } else {
            return 'Fajr'
        }
    }

    const getNextPrayerTime = () => {
        if (!checkPrayer(times.Fajr)){
            return times.Fajr
        } else if (!checkPrayer(times.Sunrise)){
            return times.Sunrise
        } else if (!checkPrayer(times.Dhuhr)){
            return times.Dhuhr
        } else if (!checkPrayer(times.Asr)){
            return times.Asr   
        } else if (!checkPrayer(times.Maghrib)){
            return times.Maghrib
        } else if (!checkPrayer(times.Isha)){
            return times.Isha
        } else {
            return times.Fajr
        }
    }

    const PrayerTimes = () => {
        return(
            <View style={{flexDirection: 'row', padding: 10, justifyContent: 'space-evenly', margin: 5, borderRadius: 12}}>
                <Text style={[styles.text, {color: theme.secondary}]}>Fajr{'\n'}{times.Fajr}</Text>
                <Text style={[styles.text, {color: theme.secondary}]}>Dhuhr{'\n'}{times.Dhuhr}</Text>
                <Text style={[styles.text, {color: theme.secondary}]}>Asr{'\n'}{times.Asr}</Text>
                <Text style={[styles.text, {color: theme.secondary}]}>Maghrib{'\n'}{times.Maghrib}</Text>
                <Text style={[styles.text, {color: theme.secondary}]}>Isha{'\n'}{times.Isha}</Text>
            </View>
        );
    }

    if (loading) {
        return(
        <View style={{margin: 10, padding: 30, borderRadius: 25, backgroundColor: theme.primary, width: '80%', elevation: 5, marginBottom: 4, shadowColor: theme.secondary, alignItems: 'center'}}>
            <MaterialIcons name="wifi-off" size={40} color={theme.secondary} />
            <Text style={[styles.text, {color: theme.secondary}]}>Enable Wifi to view prayer times.</Text>
        </View>
        );
    } else {
      return(
        <View style={styles.card}>
            <ScrollView style={styles.container} contentContainerStyle={{alignItems: 'center'}}>
                <View style={{padding: 30, borderRadius: 25, backgroundColor: theme.primary, width: '80%', elevation: 5, marginBottom: 4, shadowColor: theme.secondary}}>
                    <Ionicons name="notifications" size={14} color="#e8def5" style={{alignSelf: 'flex-end'}} />
                    <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
                        <View>
                            <Text style={[styles.text, {fontSize: 17, color: theme.secondary}]}>{getNextPrayer()} </Text>
                            <Text style={[styles.text, {fontSize: 20, color: '#4dc591'}]}>{checkTimeLeft()}{getSecs()}</Text>
                            <Text style={[styles.text, {fontSize: 15, color: '#e8def5'}]}>at {getNextPrayerTime()}</Text>
                        </View>
                        <View>
                            <Text style={[styles.text, {fontSize: 17, color: theme.secondary}]}>Now:</Text>
                            <Text style={[styles.text, {fontSize: 20, color: '#4dc591'}]}>{getCurrentPrayer()}</Text>
                            <Text style={[styles.text, {fontSize: 15, color: '#e8def5'}]}></Text>
                        </View>
                    </View>
                    <Text style={[styles.text,{fontSize: 20, color: theme.secondary}]}>{date}</Text>
                    <Text style={[styles.text, {fontSize: 12, marginTop: 5, color: '#308695'}]}><Ionicons name="location" size={12} color="#308695" />{settings[0]}, {settings[1]}</Text> 
                </View>
            </ScrollView>
            <PrayerTimes />
        </View>
    )}
}

const styles = StyleSheet.create({
    container: {
        // height: '100%',
        
    },
    card: {
        width: '100%',
        paddingTop: '5%',
    },
    text: {
        fontFamily: 'Raleway',
        alignSelf: 'center',
        textAlign: 'center'
    }
});