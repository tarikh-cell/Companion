import { StyleSheet, Text, View, ActivityIndicator, ScrollView, RefreshControl } from 'react-native';
import { useEffect, useState, useCallback } from 'react';
import { Ionicons } from '@expo/vector-icons';

export default function Widget({ location }) {
    const [data, setData] = useState(location.split(","));
    const [times, setTimes] = useState(''); 
    const [loading, setLoading] = useState(true); 
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
        fetchData();
    }, [refreshing]);

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
        fetch('http://api.aladhan.com/v1/timingsByCity?city='+data[1]+'&country='+data[0], {
          method: 'GET',
        })
          .then(response => response.json())
          .then(json => {
            setTimes(json.data.timings);
            setLoading(false);   
        })
          .catch(error => {
            console.log(error)
          });
        setRefreshing(false);
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

    if (loading) {
        return <ActivityIndicator />;
    } else {
      return(
        <View style={styles.card}>
            <ScrollView style={styles.container} contentContainerStyle={{alignItems: 'center'}} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
                <View style={{padding: 30, borderRadius: 25, backgroundColor: '#fff', width: '80%', elevation: 5}}>
                    <Ionicons name="notifications" size={14} color="#e8def5" style={{alignSelf: 'flex-end'}} />
                    <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
                    <View>
                    <Text style={[styles.text, {fontSize: 17}]}>{getNextPrayer()} </Text>
                    <Text style={[styles.text, {fontSize: 20, color: '#4dc591'}]}>{checkTimeLeft()}{getSecs()}</Text>
                    <Text style={[styles.text, {fontSize: 15, color: '#e8def5'}]}>at {getNextPrayerTime()}</Text>
                    </View>
                    <View>
                    <Text style={[styles.text, {fontSize: 17}]}>Now:</Text>
                    <Text style={[styles.text, {fontSize: 20, color: '#4dc591'}]}>{getCurrentPrayer()}</Text>
                    <Text style={[styles.text, {fontSize: 15, color: '#e8def5'}]}>at {getNextPrayerTime()}</Text>
                    </View>
                    </View>
                    <Text style={[styles.text,{fontSize: 20}]}>Wednesday, 16th April 2</Text>
                    <Text style={[styles.text, {fontSize: 12, marginTop: 5, color: '#e8def5'}]}><Ionicons name="location" size={12} color="#e8def5" />{data[0]}, {data[1]}</Text> 
                </View>
                {/* <View style={{flexDirection: 'row', padding: 10, justifyContent: 'space-evenly', margin: 5, borderRadius: 12}}>
                    <Text style={styles.text}>Fajr{'\n'}{times.Fajr}</Text>
                    <Text style={styles.text}>Dhuhr{'\n'}{times.Dhuhr}</Text>
                    <Text style={styles.text}>Asr{'\n'}{times.Asr}</Text>
                    <Text style={styles.text}>Maghrib{'\n'}{times.Maghrib}</Text>
                    <Text style={styles.text}>Isha{'\n'}{times.Isha}</Text>
                </View> */}
            </ScrollView>
        </View>
    )}
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
    },
    bg: {
        height: '100%',
        width: '100%',
    },
    card: {
        height: '35%',
        width: '100%',
        paddingTop: '5%',
    },
    text: {
        fontFamily: 'Raleway',
        alignSelf: 'center',
        textAlign: 'center'
    }
});