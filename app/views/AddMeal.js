import React, { Component } from "react";
import { View, Text } from "react-native";
import styled from "styled-components";
import DatePicker from "react-native-datepicker";
import moment from "moment/moment.js";
import { addMeal, getMeal, updateMeal } from "../services";
import Button from "../components/Button.android";

const AppTextInput = styled.TextInput.attrs(props => ({
    placeholder: props.placeholder,
    placeholderTextColor: "#D9D6DA"
}))`
    color: #d9d6da;
    height: 45;
    margin-bottom: 15;
    width: 100%;
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
        let mealId = 0;
        if (edit) {
            mealId = this.props.navigation.getParam("mealId", 0);
            token = this.props.navigation.getParam("token", "no token");
            this.loadMeal(token, mealId);
        } else {
            token = this.props.screenProps.state.params.token;
        }
        this.setState({
            token: token,
            edit: edit,
            mealId: mealId
        });
    }
    constructor(props) {
        super(props);
        this.state = {
            token: "",
            name: "",
            date: moment().format(),
            error: "",
            edit: false,
            mealId: 0
        };
    }

    loadMeal = async (token, mealId) => {
        try {
            let res = await getMeal(token, mealId);
            console.log(res);

            this.setState({
                name: res.name,
                date: moment(res.date).format()
            });
        } catch (e) {
            console.log(e);
            this.setState({
                error: e
            });
        }
    };

    handleAddMeal = async () => {
        if (this.state.edit) {
            console.log("updating meal");
            try {
                const res = await updateMeal(
                    this.state.token,
                    this.state.mealId,
                    this.state.name,
                    this.state.date
                );
                console.log(res);
                this.setState({
                    name: "",
                    date: moment().format(),
                    edit: false,
                    mealId: 0
                });
                this.props.screenProps.navigate("AuthLoading");
            } catch (e) {
                console.log(e);
                this.setState({
                    error: e
                });
            }
        } else {
            console.log("adding meal");
            try {
                const res = await addMeal(
                    this.state.token,
                    this.state.name,
                    this.state.date
                );
                console.log(res);
                this.setState({
                    name: "",
                    date: moment().format()
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
            date: moment().format(),
            edit: false,
            mealId: 0
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
                    {this.state.edit ? "Edit meal" : "Create a new meal"}
                </Text>
                <AppTextInput
                    placeholder="Meal Name (breakfast, lunch,...)"
                    value={this.state.name}
                    onChangeText={name => this.setState({ name })}
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
                <Button
                    onPress={this.handleAddMeal}
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
                    text="Add Meal"
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
