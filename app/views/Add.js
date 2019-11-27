import { createMaterialTopTabNavigator } from "react-navigation-tabs";
import { createStackNavigator } from "react-navigation-stack";
import AddActivity from "./AddActivity";
import AddMeal from "./AddMeal";
import React, { Component } from "react";
import AddFood from "./AddFood";

const TopTabNavigator = createMaterialTopTabNavigator(
    {
        AddActivity: {
            screen: AddActivity
        },
        AddMeal: {
            screen: AddMeal,
            navigationOptions: {
                tabBarIcon: ({ tintColor }) => (
                    <AntDesign name="plus" color={tintColor} size={24} />
                ),

                title: "Meal"
            }
        }
    },
    {
        tabBarOptions: {
            activeTintColor: "#DF0813",
            inactiveTintColor: "#FFFFFF",
            style: {
                backgroundColor: "#403F42"
            }
        }
    }
);

export default TopTabNavigator;
