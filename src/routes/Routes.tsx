import { NavigationContainer } from "@react-navigation/native";
import { DrawerRoutes } from "./Drawer.routes";

export const Routes = () => {
    return(
        <NavigationContainer>
            <DrawerRoutes />
        </NavigationContainer>
    );
}