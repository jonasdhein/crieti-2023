import { 
    SafeAreaView, 
    Text, 
    View 
} from "react-native"
import { theme } from "../themes/Theme"

export const TasksScreen = () => {
    return(
        <SafeAreaView>
            <Text style={theme.title}>Minha Lista de Tarefas</Text>
        </SafeAreaView>
    )
}