import React from "react";
import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import Login from "./Login";
import Signup from "./Signup";

const TabNavigator = createBottomTabNavigator(
    {
        Login: {
            screen: Login,
            headerMode: 'none',
            navigationOptions: {
                title: "Sign In",
                headershown: false,
            }
        },
        Signup: {
            screen: Signup,
            headerMode: 'none',
            navigationOptions: {
                title: "Sign Up",
                headershown: false,
            }
        }
    },
    {
        tabBarOptions: {
            activeTintColor: "#DF0813",
            inactiveTintColor: "#FFFFFF",
            style: {
                backgroundColor: "#403F42",
            },
            labelStyle: {
                fontSize: 24,
                paddingBottom: 4
            }
        }
    }
);

export default createAppContainer(TabNavigator);
