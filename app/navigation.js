import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import AuthLoading from "./views/AuthLoading";
import Auth from "./views/Auth";
import Main from "./views/Main";

const AppStack = createStackNavigator({ Main: Main });
const AuthStack = createStackNavigator(
    { Auth: Auth },
    {
        headerMode: "none"
    }
);

const AppContainer = createAppContainer(
    createSwitchNavigator(
        {
            AuthLoading: AuthLoading,
            App: AppStack,
            Auth: AuthStack
        },
        {
            initialRouteName: "AuthLoading",
            navigationOptions: {
                headerMode: "screen"
            }
        }
    )
);

export default AppContainer;
