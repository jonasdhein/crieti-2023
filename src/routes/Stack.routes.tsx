import { createStackNavigator } from '@react-navigation/stack';
import { MapScreen } from '../screens/MapScreen';
import { DrawerRoutes } from './Drawer.routes';
import { SendPixScreen } from '../screens/SendPixScreen';

const Stack = createStackNavigator();

export const StackRoutes = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name='DrawerRoutes'
                component={DrawerRoutes}
                options={
                    {
                        headerShown: false
                    }
                } />
                <Stack.Screen
                    name='MapScreen'
                    component={MapScreen}
                    options={
                        {
                            headerShown: false
                        }
                    } />
                    <Stack.Screen
                        name='SendPixScreen'
                        component={SendPixScreen}
                        options={
                            {
                                headerShown: false
                            }
                        } />
        </Stack.Navigator>
    )
}