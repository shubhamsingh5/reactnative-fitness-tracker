import React, { Component } from "react";
import { View, Text, TextInput, AsyncStorage } from "react-native";
import styled from "styled-components";
import { getUser, deleteUser } from "../services";
import { Ionicons } from "@expo/vector-icons";
import Button from "../components/Button.android";
import { updateUser } from "../services";
// import ContextMenu from "../components/ContextMenu";

const Row = styled.View`
    display: flex;
    flex: 1;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

const AppTextInput = styled.TextInput.attrs(props => ({
    placeholder: props.placeholder,
    placeholderTextColor: "#D9D6DA"
}))`
    color: #d9d6da;
    flex: 0.6;
    height: 45;
    margin-bottom: 15;
    margin-left: 20;
    border-bottom-width: 1.5;
    font-size: 16;
    border-bottom-color: #d81159;
`;

class Profile extends Component {
    static navigationOptions = {
        title: 'Profile',
    };
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            token: "",
            firstName: "",
            lastName: "",
            goalDailyCalories: 0,
            goalDailyProtein: 0,
            goalDailyCarbohydrates: 0,
            goalDailyFat: 0,
            goalDailyActivity: 0,
            error: "",
            edit: false
        };
    }

    componentDidMount() {
        //fetch user profile information
        const { token, username } = this.props.screenProps.state.params;

        this.loadProfile(token, username);
    }

    loadProfile = async (token, username) => {
        try {
            let res = await getUser(token, username);
            console.log(res);

            this.setState({
                token,
                username,
                firstName: res.firstName,
                lastName: res.lastName,
                goalDailyCalories: res.goalDailyCalories,
                goalDailyProtein: res.goalDailyProtein,
                goalDailyCarbohydrates: res.goalDailyCarbohydrates,
                goalDailyFat: res.goalDailyFat,
                goalDailyActivity: res.goalDailyActivity
            });
        } catch (e) {
            console.log(e);
            this.setState({
                error: e
            });
        }
    };

    handleEdit = () => {
        console.log("editing");
        this.setState({
            edit: true
        });
    };

    handleSave = async () => {
        console.log("saving");
        try {
            const res = await updateUser(
                this.state.token,
                this.state.username,
                this.state.firstName,
                this.state.lastName,
                this.state.goalDailyCalories,
                this.state.goalDailyProtein,
                this.state.goalDailyCarbohydrates,
                this.state.goalDailyFat,
                this.state.goalDailyActivity
            );
            console.log(res);
            this.setState({
                edit: false
            });
        } catch (e) {
            console.log(e);
            this.setState({
                error: e,
                edit: false
            });
        }
    };

    handleSignOut = async () => {
        console.log("signing out");
        try {
            await AsyncStorage.removeItem("token");
            await AsyncStorage.removeItem("username");

            this.props.screenProps.navigate("AuthLoading");
        } catch (e) {
            console.log(e);
        }
    };

    handleDelete = async () => {
        console.log("deleting user");
        try {
            let res = await deleteUser(this.state.token, this.state.username);
            console.log(res);

            await AsyncStorage.removeItem("token");
            await AsyncStorage.removeItem("username");
            this.props.screenProps.navigate("AuthLoading");
        } catch (e) {
            console.log(e);
            this.setState({
                error: e
            });
        }
    };

    render() {
        return (
            <View
                style={{
                    padding: 60,
                    backgroundColor: "#090F17",

                    display: "flex",
                    flex: 1,
                    justifyContent: "flex-start"
                }}
            >
                <Row>
                    <Text
                        style={{
                            fontSize: 30,
                            marginBottom: 20,
                            color: "#D9D6DA"
                        }}
                    >
                        Profile
                    </Text>
                    {this.state.edit ? (
                        <Button
                            onPress={this.handleSave}
                            text={
                                <Ionicons
                                    name="md-save"
                                    size={32}
                                    color="#D9D6DA"
                                />
                            }
                        />
                    ) : (
                        <Button
                            onPress={this.handleEdit}
                            text={
                                <Ionicons
                                    name="md-create"
                                    size={32}
                                    color="#D9D6DA"
                                />
                            }
                        />
                    )}
                </Row>

                <Row>
                    <Text
                        style={{
                            flex: 0.4,
                            color: "#D9D6DA"
                        }}
                    >
                        First name
                    </Text>
                    <AppTextInput
                        placeholder="First name"
                        value={this.state.firstName}
                        editable={this.state.edit}
                        onChangeText={firstName => this.setState({ firstName })}
                    />
                </Row>
                <Row>
                    <Text
                        style={{
                            flex: 0.4,
                            color: "#D9D6DA"
                        }}
                    >
                        Last name
                    </Text>
                    <AppTextInput
                        placeholder="Last name"
                        value={this.state.lastName}
                        editable={this.state.edit}
                        onChangeText={lastName => this.setState({ lastName })}
                    />
                </Row>
                <Row>
                    <Text
                        style={{
                            flex: 0.4,
                            color: "#D9D6DA"
                        }}
                    >
                        Daily calories
                    </Text>
                    <AppTextInput
                        placeholder="Daily calories"
                        value={this.state.goalDailyCalories.toString()}
                        editable={this.state.edit}
                        keyboardType={"phone-pad"}
                        onChangeText={goalDailyCalories =>
                            this.setState({ goalDailyCalories })
                        }
                    />
                </Row>
                <Row>
                    <Text
                        style={{
                            flex: 0.4,
                            color: "#D9D6DA"
                        }}
                    >
                        Daily protein
                    </Text>
                    <AppTextInput
                        placeholder="Daily carbohydrates"
                        value={this.state.goalDailyCarbohydrates.toString()}
                        editable={this.state.edit}
                        keyboardType={"phone-pad"}
                        onChangeText={goalDailyCarbohydrates =>
                            this.setState({ goalDailyCarbohydrates })
                        }
                    />
                </Row>
                <Row>
                    <Text
                        style={{
                            flex: 0.4,
                            color: "#D9D6DA"
                        }}
                    >
                        Daily carbs
                    </Text>
                    <AppTextInput
                        placeholder="Daily protein"
                        value={this.state.goalDailyProtein.toString()}
                        editable={this.state.edit}
                        keyboardType={"phone-pad"}
                        onChangeText={goalDailyProtein =>
                            this.setState({ goalDailyProtein })
                        }
                    />
                </Row>
                <Row>
                    <Text
                        style={{
                            flex: 0.4,
                            color: "#D9D6DA"
                        }}
                    >
                        Daily fats
                    </Text>
                    <AppTextInput
                        placeholder="Daily fat"
                        value={this.state.goalDailyFat.toString()}
                        editable={this.state.edit}
                        keyboardType={"phone-pad"}
                        onChangeText={goalDailyFat =>
                            this.setState({ goalDailyFat })
                        }
                    />
                </Row>
                <Row>
                    <Text
                        style={{
                            flex: 0.4,
                            color: "#D9D6DA"
                        }}
                    >
                        Daily activity
                    </Text>
                    <AppTextInput
                        placeholder="Daily activity"
                        value={this.state.goalDailyActivity.toString()}
                        editable={this.state.edit}
                        keyboardType={"phone-pad"}
                        onChangeText={goalDailyActivity =>
                            this.setState({ goalDailyActivity })
                        }
                    />
                </Row>
                <Row>
                    <Button
                        onPress={this.handleSignOut}
                        buttonStyle={{
                            backgroundColor: "#D81159",
                            marginTop: 20,
                            marginRight: 5,
                            paddingLeft: 40,
                            paddingTop: 5,
                            paddingRight: 40,
                            paddingBottom: 5,
                            borderRadius: 10
                        }}
                        textStyle={{
                            color: "white",
                            fontSize: 20
                        }}
                        text="Sign out"
                    />
                    <Button
                        onPress={this.handleDelete}
                        buttonStyle={{
                            backgroundColor: "#D81159",
                            marginTop: 20,
                            marginLeft: 5,
                            paddingLeft: 40,
                            paddingTop: 5,
                            paddingRight: 40,
                            paddingBottom: 5,
                            borderRadius: 10
                        }}
                        textStyle={{
                            color: "white",
                            fontSize: 20
                        }}
                        text="Delete"
                    />
                </Row>
            </View>
        );
    }
}

export default Profile;
