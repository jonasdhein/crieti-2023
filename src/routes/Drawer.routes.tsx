import { createDrawerNavigator } from '@react-navigation/drawer';
import { TabRoutes } from './Tab.routes';
import { DemoScreen } from '../screens/DemoScreen';
import { Feather } from '@expo/vector-icons';

const Drawer = createDrawerNavigator();

export const DrawerRoutes = () => {
    return (
        <Drawer.Navigator screenOptions={{ headerShown: false }}>
            <Drawer.Screen
                name='Início'
                component={TabRoutes}
                options={
                    {
                        drawerIcon: ({ color }) => <Feather name='box' size={30} color={color} />
                    }
                }
            />
            <Drawer.Screen
                name='Demo'
                component={DemoScreen}
                options={
                    {
                        drawerIcon: ({ color }) => <Feather name='box' size={30} color={color} />
                    }
                }
            />
        </Drawer.Navigator>
    )
}