import React, { Component } from "react";
import { Text, View } from "react-native";
import styled from "styled-components";
import { Ionicons } from "@expo/vector-icons";
import { StackActions, NavigationActions } from "react-navigation";

import { getFoods, deleteMeal } from "../services";
import Button from "../components/Button.android";

const MealCard = styled.View`
    padding: 12px;
    display: flex;
    background-color: #2d345e;
    flex: 0;
    margin-top: 16px;
    border-radius: 16;
    box-shadow: 0 2px 2px rgba(255, 255, 255, 1);
`;

const Row = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    height: auto;
    margin: 4px;
`;

class Meal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: "",
            foods: []
        };
    }

    componentDidMount() {
        const mealId = this.props.meal.id;
        const token = this.props.token;
        this.setState({
            token: token
        });
        this.loadFoods(token, mealId);
    }

    loadFoods = async (token, mealId) => {
        try {
            let res = await getFoods(token, mealId);
            console.log(res);

            this.setState({
                foods: res.foods
            });
        } catch (e) {
            console.log(e);
            this.setState({
                error: e
            });
        }
    };

    handleAddFood = mealId => {
        console.log("token from meal", this.state.token);
        this.props.navigation.navigate("AddFood", {
            mealId: mealId,
            token: this.state.token
        });
    };

    handleEdit = id => {
        this.props.navigation.navigate("AddMeal", {
            mealId: id,
            edit: true,
            token: this.state.token
        });
    };

    handleDelete = async id => {
        console.log("deleting meal");
        try {
            let res = await deleteMeal(this.state.token, id);
            console.log(res);

            const resetAction = StackActions.reset({
                index: 1,
                actions: [
                    NavigationActions.navigate({ routeName: "Dashboard" }),
                    NavigationActions.navigate({ routeName: "MealOverview" })
                ]
            });
            this.props.navigation.dispatch(resetAction);
        } catch (e) {
            console.log(e);
            this.setState({
                error: e
            });
        }
    };

    render() {
        const { meal } = this.props;
        const { foods } = this.state;
        return (
            <MealCard>
                <Row>
                    <Text
                        style={{
                            color: "#d9d6da",
                            fontSize: 24,
                            fontWeight: "bold"
                        }}
                    >
                        {meal.name.toUpperCase()}
                    </Text>
                    <View
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "flex-end",
                            alignSelf: "baseline"
                        }}
                    >
                        <Button
                            onPress={() => this.handleDelete(meal.id)}
                            buttonStyle={{
                                marginRight: 12
                            }}
                            text={
                                <Ionicons
                                    name="md-trash"
                                    size={24}
                                    color="#D9D6DA"
                                />
                            }
                        />
                        <Button
                            onPress={() => this.handleEdit(meal.id)}
                            text={
                                <Ionicons
                                    name="md-create"
                                    size={24}
                                    color="#D9D6DA"
                                />
                            }
                        />
                    </View>
                </Row>
                {foods.map(food => {
                    return (
                        <Row key={food.id}>
                            <Text
                                style={{
                                    color: "#d9d6da",
                                    fontSize: 16
                                }}
                            >
                                {food.name}
                            </Text>
                            <View
                                style={{
                                    flexDirection: "row"
                                }}
                            >
                                <Text
                                    style={{
                                        color: "#d9d6da",
                                        fontSize: 16
                                    }}
                                >
                                    Cals: {food.calories}kcals{"  "}
                                </Text>
                                <Text
                                    style={{
                                        color: "#d9d6da",
                                        fontSize: 16
                                    }}
                                >
                                    P: {food.protein}g{"  "}
                                </Text>
                                <Text
                                    style={{
                                        color: "#d9d6da",
                                        fontSize: 16
                                    }}
                                >
                                    C: {food.carbohydrates}g{"  "}
                                </Text>
                                <Text
                                    style={{
                                        color: "#d9d6da",
                                        fontSize: 16
                                    }}
                                >
                                    F: {food.fat}g
                                </Text>
                            </View>
                        </Row>
                    );
                })}
                <Button
                    onPress={() => this.handleAddFood(meal.id)}
                    buttonStyle={{
                        backgroundColor: "#D81159",
                        marginTop: 20,
                        paddingLeft: 20,
                        paddingTop: 5,
                        paddingRight: 20,
                        paddingBottom: 5,
                        borderRadius: 10,
                        display: "flex",
                        flex: 0
                    }}
                    textStyle={{
                        color: "white",
                        fontSize: 16,
                        textAlign: "center"
                    }}
                    text="Add food"
                />
            </MealCard>
        );
    }
}

export default Meal;
