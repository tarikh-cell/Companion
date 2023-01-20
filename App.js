import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SettingsProvider } from './SettingsContext';

import HomeScreen from './pages/Home';
import Settings from './pages/Settings';
import Navigation from './Navigation';
import Reader from './pages/Reader';
import Player from './pages/Player';
import Daily from './pages/Daily';
import Counter from './pages/Counter';
import Names from './pages/Names';
import Calendar from './pages/Calendar';
import Dua from './pages/Dua';

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <SettingsProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home" screenOptions={{headerShown: false, presentation: 'transparentModal'}}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Settings" component={Settings} />
          <Stack.Screen name="Reader" component={Reader} />
          <Stack.Screen name="Player" component={Player} />
          <Stack.Screen name="Daily" component={Daily} />
          <Stack.Screen name="Counter" component={Counter} />
          <Stack.Screen name="Names" component={Names} />
          <Stack.Screen name="Calendar" component={Calendar} />
          <Stack.Screen name="Dua" component={Dua} />
        </Stack.Navigator>
        <Navigation />
      </NavigationContainer>
    </SettingsProvider>
  );
}