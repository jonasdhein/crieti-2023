import { createStackNavigator } from '@react-navigation/stack';
import { MapScreen } from '../screens/MapScreen';
import { DrawerRoutes } from './Drawer.routes';

const Stack = createStackNavigator();

export const StackRoutes = () => {
    return(
        <Stack.Navigator>
            <Stack.Screen name='DrawerRoutes' component={DrawerRoutes} />
            <Stack.Screen name='MapScreen' component={MapScreen} />
        </Stack.Navigator>
    )
}