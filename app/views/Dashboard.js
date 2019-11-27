import React, { Component } from "react";
import { Text, View, FlatList } from "react-native";
import styled from "styled-components";
import { getUser, getActivities, getMeals, getFoods } from "../services";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import Button from "../components/Button.android";
import * as Progress from "react-native-progress";

const Row = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    height: auto;
    margin: 4px;
`;

const SummaryBox = styled.View`
    padding: 16px;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    background-color: #2d345e;
    flex: 1;
    height: 180;
    margin-top: 16px;
    margin: 8px;
    border-radius: 16;
    box-shadow: 0 2px 2px rgba(255, 255, 255, 1);
`;

export default class Dashboard extends Component {
    static navigationOptions = {
        header: null
    };

    componentDidMount() {
        //fetch user profile information
        const { token, username } = this.props.screenProps.state.params;
        this.setState({
            token,
            username
        });
        this.loadProfile(token, username);
        this.loadActitivies(token);
        this.loadMeals(token);
    }

    constructor(props) {
        super(props);
        this.state = {
            token: "",
            username: "",
            activities: [],
            meals: [],
            totalCalories: 0,
            totalCarbs: 0,
            totalFats: 0,
            totalProtein: 0,
            error: "",
            user: {},
            edit: false
        };
    }

    getAllFoods = token => {
        for (const meal of this.state.meals) {
            this.loadFoods(token, meal.id);
        }
    };

    loadProfile = async (token, username) => {
        try {
            let res = await getUser(token, username);

            this.setState({
                token,
                username,
                user: res
            });
        } catch (e) {
            console.log(e);
            this.setState({
                error: e
            });
        }
    };

    loadActitivies = async token => {
        try {
            let res = await getActivities(token);

            this.setState({
                activities: res.activities
            });
        } catch (e) {
            console.log(e);
            this.setState({
                error: e
            });
        }
    };

    loadMeals = async token => {
        try {
            let res = await getMeals(token);

            this.setState(
                {
                    meals: res.meals
                },
                () => {
                    this.getAllFoods(token);
                }
            );
        } catch (e) {
            console.log(e);
            this.setState({
                error: e
            });
        }
    };

    loadFoods = async (token, mealId) => {
        try {
            let res = await getFoods(token, mealId);

            for (const food of res.foods) {
                this.setState((prevState, props) => ({
                    totalCalories: prevState.totalCalories + food.calories,
                    totalCarbs: prevState.totalCarbs + food.carbohydrates,
                    totalFats: prevState.totalFats + food.fat,
                    totalProtein: prevState.totalProtein + food.protein
                }));
            }
        } catch (e) {
            console.log(e);
            this.setState({
                error: e
            });
        }
    };

    showMeals = () => {
        this.props.navigation.navigate("MealOverview", {
            meals: this.state.meals,
            token: this.state.token
        });
    };

    showActivities = () => {
        this.props.navigation.navigate("ActivitiesOverview", {
            activities: this.state.activities,
            token: this.state.token
        });
    };

    render() {
        const totalActivityTime = this.state.activities.reduce(
            (sum, activity) => sum + activity.duration,
            0
        );
        const activityCount = this.state.activities.length;
        const totalCaloriesBurned = this.state.activities.reduce(
            (sum, activity) => sum + activity.calories,
            0
        );

        const mealCount = this.state.meals.length;
        const {
            totalCalories,
            totalCarbs,
            totalFats,
            totalProtein,
            user
        } = this.state;

        const caloriesPercent =
            (totalCalories - totalCaloriesBurned) / user.goalDailyCalories;
        const carbsPercent = totalCarbs / user.goalDailyCarbohydrates;
        const fatsPercent = totalFats / user.goalDailyFat;
        const proteinPercent = totalProtein / user.goalDailyProtein;
        const activityPercent = totalActivityTime / user.goalDailyActivity;

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
                    Hi {this.state.username}{this.state.error === "Token is invalid!" ? ", please sign out and sign in again." : ""}
                </Text>
                <Row>
                    <SummaryBox>
                        <Row>
                            <Ionicons
                                name="ios-fitness"
                                size={36}
                                color="#D9D6DA"
                            />
                            <Button
                                onPress={this.showActivities}
                                buttonStyle={{
                                    marginLeft: 70,
                                    marginBottom: 20
                                }}
                                text={
                                    <Ionicons
                                        name="ios-arrow-forward"
                                        size={36}
                                        color="#D9D6DA"
                                    />
                                }
                            />
                        </Row>
                        <Text
                            style={{
                                fontSize: 18,
                                color: "#D9D6DA"
                            }}
                        >
                            {totalActivityTime} mins
                        </Text>
                        <Text
                            style={{
                                fontSize: 18,
                                color: "#D9D6DA"
                            }}
                        >
                            {activityCount} activities
                        </Text>
                        <Text
                            style={{
                                fontSize: 18,
                                color: "#D9D6DA"
                            }}
                        >
                            {totalCaloriesBurned} kcals burned
                        </Text>
                    </SummaryBox>
                    <SummaryBox>
                        <Row>
                            <MaterialCommunityIcons
                                name="food"
                                size={36}
                                color="#D9D6DA"
                            />
                            <Button
                                onPress={this.showMeals}
                                buttonStyle={{
                                    marginLeft: 70,
                                    marginBottom: 20
                                }}
                                text={
                                    <Ionicons
                                        name="ios-arrow-forward"
                                        size={36}
                                        color="#D9D6DA"
                                    />
                                }
                            />
                        </Row>
                        <Text
                            style={{
                                fontSize: 18,
                                color: "#D9D6DA"
                            }}
                        >
                            {mealCount} meals
                        </Text>
                        <Text
                            style={{
                                fontSize: 18,
                                color: "#D9D6DA"
                            }}
                        >
                            {this.state.totalCalories} kcals consumed
                        </Text>
                    </SummaryBox>
                </Row>

                <Text
                    style={{
                        fontSize: 24,
                        color: "#D9D6DA",
                        fontWeight: "bold",
                        marginTop: 24
                    }}
                >
                    Your stats for the day
                </Text>
                <Row>
                    <Text
                        style={{
                            fontSize: 18,
                            color: "#D9D6DA",
                            marginTop: 8
                        }}
                    >
                        Calories
                    </Text>
                    <Text
                        style={{
                            fontSize: 18,
                            color: "#D9D6DA",
                            marginTop: 8
                        }}
                    >
                        {totalCalories - totalCaloriesBurned} /{" "}
                        {user.goalDailyCalories}
                    </Text>
                </Row>
                <Progress.Bar
                    progress={caloriesPercent ? caloriesPercent : 0}
                    width={null}
                    color="#DF0813"
                />
                <Row>
                    <Text
                        style={{
                            fontSize: 18,
                            color: "#D9D6DA",
                            marginTop: 8
                        }}
                    >
                        Carbohydrates
                    </Text>
                    <Text
                        style={{
                            fontSize: 18,
                            color: "#D9D6DA",
                            marginTop: 8
                        }}
                    >
                        {totalCarbs} / {user.goalDailyCarbohydrates}
                    </Text>
                </Row>
                <Progress.Bar
                    progress={carbsPercent ? carbsPercent : 0}
                    width={null}
                    color="#DF0813"
                />
                <Row>
                    <Text
                        style={{
                            fontSize: 18,
                            color: "#D9D6DA",
                            marginTop: 8
                        }}
                    >
                        Protein
                    </Text>
                    <Text
                        style={{
                            fontSize: 18,
                            color: "#D9D6DA",
                            marginTop: 8
                        }}
                    >
                        {totalProtein} / {user.goalDailyProtein}
                    </Text>
                </Row>
                <Progress.Bar
                    progress={proteinPercent ? proteinPercent : 0}
                    width={null}
                    color="#DF0813"
                />
                <Row>
                    <Text
                        style={{
                            fontSize: 18,
                            color: "#D9D6DA",
                            marginTop: 8
                        }}
                    >
                        Fat
                    </Text>
                    <Text
                        style={{
                            fontSize: 18,
                            color: "#D9D6DA",
                            marginTop: 8
                        }}
                    >
                        {totalFats} / {user.goalDailyFat}
                    </Text>
                </Row>
                <Progress.Bar
                    progress={fatsPercent ? fatsPercent : 0}
                    width={null}
                    color="#DF0813"
                />
                <Row>
                    <Text
                        style={{
                            fontSize: 18,
                            color: "#D9D6DA",
                            marginTop: 8
                        }}
                    >
                        Activity
                    </Text>
                    <Text
                        style={{
                            fontSize: 18,
                            color: "#D9D6DA",
                            marginTop: 8
                        }}
                    >
                        {totalActivityTime} / {user.goalDailyActivity}
                    </Text>
                </Row>
                <Progress.Bar
                    progress={activityPercent ? activityPercent : 0}
                    width={null}
                    color="#DF0813"
                />
            </View>
        );
    }
}
