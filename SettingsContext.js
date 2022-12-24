import { createContext, useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

const SettingsContext = createContext();

export function SettingsProvider({children}) {
    const [settings, setSettings] = useState(["United Kingdom", "London", "false", "0", "0", "0"]);

    useEffect(() => {
        AsyncStorage.getItem('@storage_Key')
        .then((value) => {
            if (value) {
                setSettings(value.split(","));
            }
        });
    }, [])

    const updateSettings = (value, index) => {
        const newSettings = settings.map((val, id) => {
            if (id === index) {
                return value;
            } else {
                return val;
            }
        })
        setSettings(newSettings);
    }

    return(
        <SettingsContext.Provider value={{settings, setSettings, updateSettings}}>
            {children}
        </SettingsContext.Provider>
    )
}

export default SettingsContext;