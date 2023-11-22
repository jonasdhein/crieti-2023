import { useEffect, useState } from "react";
import {
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

    const saveTasks = () => {
        if (task.name.trim()) {

            const payload: TaskProps = {
                id: tasks.length + 1,
                name: task.name,
                checked: false
            }

            setTasks([...tasks, payload]);
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
    }

    const deleteTask = (task: TaskProps) => {
        const newTasks = tasks.filter((item) => item.id != task.id);

        setTasks(newTasks);
    }

    const ItemView = ({ item }) => (
        <View
            style={theme.itemCard}>

            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity
                    onPress={() => setChecked(item)}>
                    <Feather name={item.checked ? "check-square" : "square"}
                        size={24} color="#2C3E50" style={{ marginRight: 8 }} />
                </TouchableOpacity>

                <Text style={[theme.itemTask, item.checked ? theme.itemTaskChecked : null]}>{item.name}</Text>
            </View>

            <TouchableOpacity
                onPress={() => deleteTask(item)}>
                <Feather name="trash-2" size={24} color="#2C3E50" />
            </TouchableOpacity>
        </View>
    )

    return (
        <View style={theme.container}>

            <View style={theme.header}>
                <Text style={[theme.title, theme.margin]}>Olá </Text>
                <Text style={theme.subtitle}> Lista de Tarefas</Text>

                <View style={theme.card}>
                    <TextInput
                        value={task.name}
                        onChangeText={value => setTask({ ...task, name: value })}
                        style={[theme.textInput, { width: '75%' }]}
                    />

                    <TouchableOpacity
                        onPress={saveTasks}
                        style={theme.button}
                    >
                        <Feather name="save" size={36} color="#2C3E50" />
                    </TouchableOpacity>
                </View>
            </View>

            <FlatList 
             data={tasks}
             renderItem={({ item }) => <ItemView item={item} />}
             keyExtractor={item => item.id.toString()}
            />

            {/* <ScrollView style={theme.list}>
                {
                    tasks.map((item, index) => {
                        return (
                            <ItemView item={item} index={index} />
                        )
                    })
                }
            </ScrollView> */}

        </View>
    )
}