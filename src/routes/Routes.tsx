import { NavigationContainer } from "@react-navigation/native";
import { TabRoutes } from "./Tab.routes";

export const Routes = () => {
    return(
        <NavigationContainer>
            <TabRoutes />
        </NavigationContainer>
    );
}