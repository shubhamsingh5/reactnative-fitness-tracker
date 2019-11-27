import React, { Component } from "react";
import { Text, View, FlatList } from "react-native";
import styled from "styled-components";
import Meal from "../components/Meal";

export default class MealOverview extends Component {
    static navigationOptions = {
        header: null
    };
    componentDidMount() {
        const meals = this.props.navigation.getParam("meals", []);
        const token = this.props.navigation.getParam("token", "no token");
        this.setState({
            meals: meals,
            token: token
        });
    }
    constructor(props) {
        super(props);
        this.state = {
            meals: []
        };
    }
    render() {
        return (
            <View
                style={{
                    marginTop: 24,
                    padding: 24,
                    display: "flex",
                    flex: 1,
                    backgroundColor: "#090F17"
                }}
            >
                <Text
                    style={{
                        fontSize: 36,
                        color: "#D9D6DA",
                        fontWeight: "bold"
                    }}
                >
                    Today's Meals
                </Text>
                {this.state.meals.length === 0 && (
                    <View
                        style={{
                            marginTop: 24,
                            flex: 0.5,
                            alignItems: "center",
                            justifyContent: "center"
                        }}
                    >
                        <Text
                            style={{
                                color: "#646464",
                                fontSize: 18,
                                textAlign: "center"
                            }}
                        >
                            No meals. Add some meals to see details.
                        </Text>
                    </View>
                )}
                <FlatList
                    data={this.state.meals}
                    renderItem={({ item: rowData }) => {
                        return (
                            <Meal
                                meal={rowData}
                                token={this.state.token}
                                navigation={this.props.navigation}
                            />
                        );
                    }}
                    keyExtractor={(item, index) => item.id.toString()}
                />
            </View>
        );
    }
}
