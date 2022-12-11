import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './Pages/Home';
import Settings from './Pages/Settings';
import Location from './Pages/Location';
import Navigation from './Navigation';
import Reader from './Pages/Reader';

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen name="Reader" component={Reader} />
        <Stack.Screen name="Location" component={Location} />
      </Stack.Navigator>
      <Navigation />
    </NavigationContainer>
  );
}