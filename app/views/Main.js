import React, { Component } from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import Profile from "./Profile";
import Dashboard from "./Dashboard";
import Add from "./Add";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import AntDesign from "react-native-vector-icons/AntDesign";
import Ionicons from "react-native-vector-icons/Ionicons";
import MealOverview from "./MealOverview";
import ActivitiesOverview from "./ActivitiesOverview";
import { createStackNavigator } from "react-navigation-stack";
import AddFood from "./AddFood";
import AddActivity from "./AddActivity";
import AddMeal from "./AddMeal";

const DashboardStack = createStackNavigator(
    {
        Dashboard: {
            screen: Dashboard
        },
        MealOverview: {
            screen: MealOverview
        },
        AddFood: { screen: AddFood },
        AddActivity: {
            screen: AddActivity
        },
        AddMeal: {
            screen: AddMeal
        },
        ActivitiesOverview: {
            screen: ActivitiesOverview
        }
    },
    {
        initialRoute: "Dashboard",
        navigationOptions: {
            headershown: false
        }
    }
);

const TabNavigator = createBottomTabNavigator(
    {
        Dashboard: {
            screen: DashboardStack,
            navigationOptions: {
                tabBarIcon: ({ tintColor }) => (
                    <Ionicons name="md-home" color={tintColor} size={24} />
                ),
                headershown: false
            }
        },
        Add: {
            screen: Add,
            navigationOptions: {
                tabBarIcon: ({ tintColor }) => (
                    <AntDesign name="plus" color={tintColor} size={24} />
                )
            }
        },
        Profile: {
            screen: Profile,
            navigationOptions: {
                tabBarIcon: ({ tintColor }) => (
                    <FontAwesome name="user" color={tintColor} size={24} />
                )
            }
        }
    },
    {
        tabBarOptions: {
            activeTintColor: "#DF0813",
            inactiveTintColor: "#FFFFFF",
            showLabel: false,
            style: {
                backgroundColor: "#403F42"
            }
        },
        navigationOptions: {
            tabBarOnPress: ({ navigation, defaultHandler }) => {
                // to navigate to the top of stack whenever tab changes
                navigation.dispatch(StackActions.popToTop());
                defaultHandler();
            }
        },
        resetOnBlur: true
    }
);

const AppContainer = createAppContainer(TabNavigator);

class TabNavigatorWithProps extends Component {
    static navigationOptions = {
        header: null
    };
    constructor(props) {
        super(props);
    }
    render() {
        return <AppContainer screenProps={this.props.navigation} />;
    }
}

export default TabNavigatorWithProps;
