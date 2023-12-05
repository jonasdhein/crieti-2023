import { NavigationContainer } from "@react-navigation/native";
import { StackRoutes } from "./Stack.routes";

export const Routes = () => {
    return(
        <NavigationContainer>
            <StackRoutes />
        </NavigationContainer>
    );
}