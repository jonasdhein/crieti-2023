import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TasksScreen } from '../screens/TasksScreen';
import { QuizScreen } from '../screens/QuizScreen';
import { Feather } from '@expo/vector-icons';
import { CepScreen } from '../screens/CepScreen';
import { PixScreen } from '../screens/PixScreen';

const Tab = createBottomTabNavigator();

export const TabRoutes = () => {
    return (
        <Tab.Navigator screenOptions={{ headerShown: false }}>
            <Tab.Screen
                name='Tarefas'
                component={TasksScreen}
                options={
                    {
                        tabBarIcon: ({ color }) => <Feather name='list' size={30} color={color} />
                    }
                }
            />
            <Tab.Screen
                name='Quiz'
                component={QuizScreen}
                options={
                    {
                        tabBarIcon: ({ color }) => <Feather name='codesandbox' size={30} color={color} />
                    }
                }
            />
            <Tab.Screen
                name='CEP'
                component={CepScreen}
                options={
                    {
                        tabBarIcon: ({ color }) => <Feather name='map' size={30} color={color} />
                    }
                }
            />
            <Tab.Screen
                name='PIX'
                component={PixScreen}
                options={
                    {
                        tabBarIcon: ({ color }) => <Feather name='dollar-sign' size={30} color={color} />
                    }
                }
            />
        </Tab.Navigator>
    );
}
