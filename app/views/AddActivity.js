import React, { Component } from "react";
import { View, Text } from "react-native";
import styled from "styled-components";
import DatePicker from "react-native-datepicker";
import moment from "moment/moment.js";

import { addActivity, getActivity, updateActivity } from "../services";
import Button from "../components/Button.android";

const AppTextInput = styled.TextInput.attrs(props => ({
    placeholder: props.placeholder,
    placeholderTextColor: "#D9D6DA"
}))`
    color: #d9d6da;
    height: 45;
    width: 100%;
    margin-bottom: 15;
    margin-left: 20;
    border-bottom-width: 1.5;
    font-size: 16;
    border-bottom-color: #d81159;
`;

export default class AddActivity extends Component {
    static navigationOptions = {
        header: null
    };
    componentDidMount() {
        const edit = this.props.navigation.getParam("edit", false);
        let token = "";
        let activityId = 0;
        if (edit) {
            activityId = this.props.navigation.getParam("activityId", 0);
            token = this.props.navigation.getParam("token", "no token");
            this.loadActivity(token, activityId);
        } else {
            token = this.props.screenProps.state.params.token;
        }
        console.log(edit);
        this.setState({
            token: token,
            edit: edit,
            activityId: activityId
        });
    }
    constructor(props) {
        super(props);
        this.state = {
            token: "",
            name: "",
            duration: 0,
            date: moment().format(),
            calories: 0,
            error: "",
            edit: false,
            activityId: 0
        };
    }

    loadActivity = async (token, activityId) => {
        try {
            let res = await getActivity(token, activityId);
            console.log(res);

            this.setState({
                name: res.name,
                duration: res.duration,
                date: moment(res.date).format(),
                calories: res.calories
            });
        } catch (e) {
            console.log(e);
            this.setState({
                error: e
            });
        }
    };

    handleAddActivity = async () => {
        if (this.state.edit) {
            console.log("updating activity");
            try {
                const res = await updateActivity(
                    this.state.token,
                    this.state.activityId,
                    this.state.name,
                    this.state.duration,
                    this.state.date,
                    this.state.calories
                );
                console.log(res);
                this.setState({
                    name: "",
                    duration: 0,
                    date: "2019-11-15",
                    calories: 0,
                    edit: false,
                    activityId: 0
                });
                this.props.screenProps.navigate("AuthLoading");
            } catch (e) {
                console.log(e);
                this.setState({
                    error: e
                });
            }
        } else {
            console.log("adding activity");
            try {
                const res = await addActivity(
                    this.state.token,
                    this.state.name,
                    this.state.duration,
                    this.state.date,
                    this.state.calories
                );
                console.log(res);
                this.setState({
                    name: "",
                    duration: 0,
                    date: "2019-11-15",
                    calories: 0
                });
                this.props.screenProps.navigate("AuthLoading");
            } catch (e) {
                console.log(e);
                this.setState({
                    error: e
                });
            }
        }
    };

    clearFields = () => {
        this.setState({
            name: "",
            duration: 0,
            date: "2019-11-15",
            calories: 0,
            edit: false,
            activityId: 0
        });
    };

    render() {
        return (
            <View
                style={{
                    padding: 40,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flex: 1,
                    backgroundColor: "#090F17"
                }}
            >
                <Text
                    style={{
                        fontSize: 30,
                        color: "#D9D6DA",
                        marginBottom: 20
                    }}
                >
                    {this.state.edit ? "Edit activity" : "Add a new activity"}
                </Text>
                <AppTextInput
                    placeholder="Activity Name (running, strength training...)"
                    value={this.state.name}
                    onChangeText={name => this.setState({ name })}
                />
                <AppTextInput
                    placeholder="Duration (min)"
                    keyboardType={"phone-pad"}
                    value={
                        this.state.edit ? this.state.duration.toString() : null
                    }
                    onChangeText={duration => this.setState({ duration })}
                />
                <DatePicker
                    style={{
                        width: 300
                    }}
                    date={this.state.date}
                    mode="datetime"
                    placeholder="Activity date"
                    format="YYYY-MM-DDTHH:mm:ssZ"
                    minDate="2016-05-01"
                    maxDate="2020-11-15"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    onDateChange={date => {
                        this.setState({ date: date });
                    }}
                    customStyles={{
                        placeholderText: {
                            color: "#D9D6DA"
                        },
                        dateText: {
                            color: "#D9D6DA"
                        }
                    }}
                />
                <AppTextInput
                    placeholder="Calories burned (kcal)"
                    value={
                        this.state.edit ? this.state.calories.toString() : null
                    }
                    keyboardType={"phone-pad"}
                    onChangeText={calories => this.setState({ calories })}
                />
                <Button
                    onPress={this.handleAddActivity}
                    buttonStyle={{
                        backgroundColor: "#D81159",
                        marginTop: 20,
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
                    text="Add Activity"
                />
                <Button
                    onPress={this.clearFields}
                    buttonStyle={{
                        backgroundColor: "#D81159",
                        marginTop: 20,
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
                    text="Reset"
                />
            </View>
        );
    }
}
