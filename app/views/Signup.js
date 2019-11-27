import React, { Component } from "react";
import { View, ScrollView, Text, TextInput } from "react-native";
import styled from "styled-components";
import { createUser } from "../services";
import Button from "../components/Button.android";

const AppTextInput = styled.TextInput.attrs(props => ({
    placeholder: props.placeholder,
    placeholderTextColor: "#D9D6DA"
}))`
    color: #d9d6da;
    height: 45;
    width: 100%;
    margin-bottom: 15;
    border-bottom-width: 1.5;
    font-size: 16;
    border-bottom-color: #d81159;
`;

class Signup extends Component {
    static navigationOptions = {
        header: null
    };
    constructor(props) {
        super(props);
        this.state = {
            userText: "",
            pwdText: "",
            fname: "",
            lname: "",
            cals: 0,
            prot: 0,
            carbs: 0,
            fat: 0,
            activity: 0,
            error: ""
        };
    }

    handleSignup = async () => {
        console.log("signing up");
        try {
            const res = await createUser(
                this.state.userText,
                this.state.pwdText,
                this.state.fname,
                this.state.lname,
                this.state.cals,
                this.state.prot,
                this.state.carbs,
                this.state.fat,
                this.state.activity
            );
            console.log(res);
            this.props.navigation.navigate("AuthLoading");
        } catch (e) {
            console.log(e);
            this.setState({
                error: e
            });
        }
    };

    render() {
        return (
            <ScrollView
                contentContainerStyle={{
                    padding: 40,
                    paddingTop: 60,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
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
                    Hi, create a new account to get started.
                </Text>
                <AppTextInput
                    placeholder="Your username"
                    onChangeText={userText => this.setState({ userText })}
                />
                <AppTextInput
                    placeholder="Your password"
                    secureTextEntry={true}
                    onChangeText={pwdText => this.setState({ pwdText })}
                />
                <Text
                    style={{
                        fontSize: 30,
                        color: "#D9D6DA",
                        marginBottom: 20
                    }}
                >
                    What should we call you?
                </Text>
                <AppTextInput
                    placeholder="First name"
                    onChangeText={fname => this.setState({ fname })}
                />
                <AppTextInput
                    placeholder="Last name"
                    onChangeText={lname => this.setState({ lname })}
                />

                <Text
                    style={{
                        fontSize: 30,
                        color: "#D9D6DA",
                        marginBottom: 20
                    }}
                >
                    Tell us about your goals.
                </Text>
                <AppTextInput
                    placeholder="Daily calories"
                    keyboardType={"phone-pad"}
                    onChangeText={cals => this.setState({ cals })}
                />
                <AppTextInput
                    placeholder="Daily protein (g)"
                    keyboardType={"phone-pad"}
                    onChangeText={prot => this.setState({ prot })}
                />
                <AppTextInput
                    placeholder="Daily carbs (g)"
                    keyboardType={"phone-pad"}
                    onChangeText={carbs => this.setState({ carbs })}
                />
                <AppTextInput
                    placeholder="Daily fats (g)"
                    keyboardType={"phone-pad"}
                    onChangeText={fats => this.setState({ fats })}
                />
                <AppTextInput
                    placeholder="Daily activity (min)"
                    keyboardType={"phone-pad"}
                    onChangeText={activity => this.setState({ activity })}
                />

                {this.state.error !== "" && (
                    <Text style={{ color: "red" }}>{this.state.error}</Text>
                )}

                <Button
                    onPress={this.handleSignup}
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
                    text="Sign up!"
                />
            </ScrollView>
        );
    }
}

export default Signup;
