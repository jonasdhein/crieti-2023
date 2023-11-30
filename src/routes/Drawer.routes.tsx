import { createDrawerNavigator } from '@react-navigation/drawer';
import { TabRoutes } from './Tab.routes';
import { DemoScreen } from '../screens/DemoScreen';

const Drawer = createDrawerNavigator();

export const DrawerRoutes = () => {
    return (
        <Drawer.Navigator>
            <Drawer.Screen
                name='Início'
                component={TabRoutes}
            />
            <Drawer.Screen 
                name='Demo'
                component={DemoScreen}
            />
        </Drawer.Navigator>
    )
}