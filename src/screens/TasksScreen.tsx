import { useEffect, useState } from "react";
import { 
    SafeAreaView, 
    Text, 
    TextInput, 
    TouchableOpacity, 
    View 
} from "react-native"
import { theme } from "../themes/Theme"

export const TasksScreen = () => {
    
    const [task, setTask] = useState<string>('');
    const [tasks, setTasks] = useState<string[]>([]);

    const saveTasks = () => {
        setTasks([ ...tasks, task ]);
    }

    return(
        <SafeAreaView>
            <Text style={theme.title}>Minha Lista de Tarefas</Text>
        
            <TextInput
                value={task}
                onChangeText={setTask}
                style={theme.textInput}
            />

            <TouchableOpacity
                onPress={saveTasks}
                style={theme.button}
            >
                <Text style={theme.textButton}>Salvar</Text>
            </TouchableOpacity>

            {
                tasks.map((item, index) => {
                    return(
                        <Text key={index} style={theme.subtitle}>{item}</Text>
                    )
                })
            }

        </SafeAreaView>
    )
}