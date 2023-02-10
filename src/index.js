import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import user from './screen/user';
import Login from './screen/login';
import Register from './screen/register';
import Home from './screen/Home/index';
import NewProduct from './screen/add_product';
//import App from './screen/home_page/index'
//import Home from './screen/home';
const Stack = createNativeStackNavigator();


function App() {
  const [isLogin, setIslogin] = React.useState();
  console.log('isLogin', isLogin)
  React.useEffect(() => {
    AsyncStorage.getItem("token")
      .then((val) => {
        if (val && val != null && val != 'null') {
          console.log('val', val)
          setIslogin(true)
        }
      })

  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        // headerShown: false
      }}>
        <Stack.Screen
          options={{ headerShown: false }}
          name="Home" component={Home} />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Login" component={Login} />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Register" component={Register} />
        <Stack.Screen
          //options={{ }}
          name="User" component={user} />
        <Stack.Screen
          //options={{ }}
          name="NewProduct" component={NewProduct} />
      </Stack.Navigator>
    </NavigationContainer>

  );
} 

export default App;
