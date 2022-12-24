import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SettingsProvider } from './SettingsContext';

import HomeScreen from './Pages/Home';
import Settings from './Pages/Settings';
import Location from './Pages/Location';
import Navigation from './Navigation';
import Reader from './Pages/Reader';
import Player from './Pages/Player';
import Counter from './Pages/Counter';

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <SettingsProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home" screenOptions={{headerShown: false}}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Settings" component={Settings} />
          <Stack.Screen name="Reader" component={Reader} />
          <Stack.Screen name="Location" component={Location} />
          <Stack.Screen name="Player" component={Player} />
          <Stack.Screen name="Counter" component={Counter} />
        </Stack.Navigator>
        <Navigation />
      </NavigationContainer>
    </SettingsProvider>
  );
}