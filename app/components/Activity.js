import React, { Component } from "react";
import { Text, View } from "react-native";
import styled from "styled-components";
import { Ionicons } from "@expo/vector-icons";
import { StackActions, NavigationActions } from "react-navigation";

import { deleteActivity } from "../services";
import Button from "../components/Button.android";

const ActivityCard = styled.View`
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
            token: ""
        };
    }

    componentDidMount() {
        const activityId = this.props.activity.id;
        const token = this.props.token;
        this.setState({
            token: token
        });
    }

    handleEdit = id => {
        console.log("handleedit");
        this.props.navigation.navigate("AddActivity", {
            activityId: id,
            edit: true,
            token: this.state.token
        });
    };

    handleDelete = async id => {
        console.log("deleting activity");
        try {
            let res = await deleteActivity(this.state.token, id);
            console.log(res);

            const resetAction = StackActions.reset({
                index: 1,
                actions: [
                    NavigationActions.navigate({ routeName: "Dashboard" }),
                    NavigationActions.navigate({
                        routeName: "ActivitiesOverview"
                    })
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
        const { activity } = this.props;
        return (
            <ActivityCard>
                <Row>
                    <Text
                        style={{
                            color: "#d9d6da",
                            fontSize: 24,
                            fontWeight: "bold"
                        }}
                    >
                        {activity.name.toUpperCase()}
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
                            onPress={() => this.handleDelete(activity.id)}
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
                            onPress={() => this.handleEdit(activity.id)}
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
                <Text
                    style={{
                        color: "#d9d6da",
                        fontSize: 16
                    }}
                >
                    {activity.calories} cals
                </Text>
                <Text
                    style={{
                        color: "#d9d6da",
                        fontSize: 16
                    }}
                >
                    {activity.duration} mins
                </Text>
            </ActivityCard>
        );
    }
}

export default Meal;
