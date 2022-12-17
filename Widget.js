import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, ImageBackground, ScrollView, RefreshControl, Image } from 'react-native';
import { useEffect, useState, useCallback } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function Widget({ location, update }) {
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
            <ScrollView style={styles.container} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
                    {/* <Image source={require('./assets/0.jpg')} blurRadius={10} style={styles.card_img} /> */}
                    <LinearGradient colors={['rgba(0, 250, 154, 0.9)', 'rgba(0,250,154, 0.5)']} style={styles.bg}>   
                        <View style={{width: '100%', flexDirection: 'row', padding: 7, justifyContent: 'space-between'}}>
                            <Text style={[styles.text, {}]}>{getCurrentPrayer()}</Text>  
                            <Text style={styles.text}>{data[0]}, {data[1]}</Text>
                        </View>
                        <Text style={styles.text}>{}</Text>
                        <Text style={[styles.text, {fontSize: 40}]}>{checkTimeLeft()}{getSecs()}</Text>
                        <Text style={styles.text}>untill</Text>
                        <Text style={styles.text}>{getNextPrayer()} at {getNextPrayerTime()}</Text>
                    </LinearGradient>  
            </ScrollView>
        </View>
    )}
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        overflow: 'hidden',
    },
    bg: {
        height: '100%',
        width: '100%',
        borderRadius: 20,
    },
    card: {
        paddingTop: '5%',
        height: '25%',
        width: '90%',
    },
    card_img: {
        width: '100%', 
        height: '100%',
    },
    text: {
        fontFamily: 'Raleway',
        alignSelf: 'center'
    }
});