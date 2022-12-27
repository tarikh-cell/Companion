import { useState, useContext } from 'react';
import SettingsContext from '../SettingsContext';
export function colorScheme() {
    const { settings } = useContext(SettingsContext);
    const [ theme ] = useState({
            primary: '#fff',
            secondary: '#000',
        });
    const [ darktheme ] = useState({
            primary: '#000',
            secondary: '#fff',
        })
    if (settings[2] == "false") {
        return theme
    } else {
        return darktheme
    }
}