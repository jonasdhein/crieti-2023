import { useEffect, useState } from "react";
import {
    Alert,
    FlatList,
    SafeAreaView,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native"
import { theme } from "../themes/Theme"
import { Feather } from '@expo/vector-icons';
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LottieView from 'lottie-react-native';

export const TasksScreen = () => {

    interface TaskProps {
        id: number;
        name: string;
        checked: boolean;
    }

    const initialTask: TaskProps = {
        id: 0,
        name: '',
        checked: false
    }

    const [task, setTask] = useState<TaskProps>(initialTask);
    const [tasks, setTasks] = useState<TaskProps[]>([]);

    const storeData = async (value: TaskProps[]) => {

        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem('tasks', jsonValue);

    }

    const getData = async () => {
        const list = await AsyncStorage.getItem('tasks');

        const jsonValue = JSON.parse(list);
        setTasks(jsonValue ? jsonValue : []); //verificando se o conteúdo de jsonValue é diferente de nulo
    }

    const saveTasks = () => {

        if (task.name.trim()) {

            const payload: TaskProps = {
                id: tasks.length + 1,
                name: task.name,
                checked: false
            }

            const list = [...tasks, payload];

            setTasks(list);
            storeData(list);
        }

        setTask(initialTask);
    }

    const setChecked = (task: TaskProps) => {
        const newTasks = tasks.map((item) => {
            if (item.id === task.id) {
                return {
                    ...item, checked: !item.checked
                }
            }
            return item
        })

        setTasks(newTasks);
        storeData(newTasks);
    }

    const deleteTask = (task: TaskProps) => {

        Alert.alert(
            'Excluir Tarefa',
            'Tu tem certeza disso?',
            [
                {
                    text: 'SIM',
                    onPress: () => {
                        const newTasks = tasks.filter((item) => item.id != task.id);

                        setTasks(newTasks);
                        storeData(newTasks);

                        Alert.alert('Tarefa excluída', 'Tarefa excluída com sucesso!');
                    }
                },
                {
                    text: 'NÃO'
                }
            ]
        );
    }

    useEffect(() => {
        getData();
        console.log('buscou do banco de dados');
    }, []);

    const ItemView = ({ item }) => (
        <View
            style={theme.itemCard}>
            <View style={{ flex: 1, flexDirection: 'row' }}>
                <TouchableOpacity
                    onPress={() => setChecked(item)}>
                    <Feather name={item.checked ? "check-square" : "square"}
                        size={24} color="#2C3E50" style={{ marginRight: 8 }} />
                </TouchableOpacity>

                <Text style={[theme.itemTask, item.checked ? theme.itemTaskChecked : null]}>
                    {item.name}
                </Text>
            </View>

            <TouchableOpacity
                onPress={() => deleteTask(item)}>
                <Feather name="trash-2" size={24} color="#2C3E50" />
            </TouchableOpacity>
        </View>
    )

    return (
        <View style={{ height: '100%' }}>
            <View style={theme.header}>
                <Text style={[theme.title, theme.margin]}>Olá </Text>
                <Text style={theme.subtitle}> Lista de Tarefas</Text>

                <View style={theme.card}>
                    <TextInput
                        value={task.name}
                        onChangeText={value => setTask({ ...task, name: value })}
                        style={[theme.textInput, { width: '80%' }]}
                    />

                    <TouchableOpacity
                        onPress={saveTasks}
                        style={theme.button}
                    >
                        <Feather name="plus-square" size={36} color="#2C3E50" />
                    </TouchableOpacity>
                </View>
            </View>

            {tasks.length > 0 ?
                <FlatList
                    data={tasks}
                    renderItem={({ item }) => <ItemView item={item} />}
                    keyExtractor={(item) => item.id.toString()}
                />
                :

                <View style={theme.center}>
                    <LottieView
                        autoPlay
                        style={{
                            width: 200,
                            height: 200,
                        }}
                        source={require('../assets/animations/anim_empty.json')}
                    />
                </View>

            }

        </View>
    )
}