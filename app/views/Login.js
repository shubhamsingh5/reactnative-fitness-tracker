import React, { Component } from "react";
import { View, Text, TextInput } from "react-native";
import styled from "styled-components";
import Button from "../components/Button.android";
import { login } from "../services";

const AppTextInput = styled.TextInput.attrs(props => ({
    placeholder: props.placeholder,
    placeholderTextColor: "#D9D6DA"
}))`
    color: #d9d6da;
    height: 45;
    margin-bottom: 15;
    width: 100%;
    border-bottom-width: 1.5;
    font-size: 16;
    border-bottom-color: #d81159;
`;

export default class Login extends Component {
    static navigationOptions = {
        header: null
    };
    constructor(props) {
        super(props);
        this.state = {
            userText: "",
            pwdText: "",
            error: ""
        };
    }

    handleLogin = async () => {
        try {
            const res = await login(this.state.userText, this.state.pwdText);
            // console.log(res);
            this.props.navigation.navigate("AuthLoading");
        } catch (e) {
            this.setState({
                error: e
            });
        }
    };

    render() {
        return (
            <View
                style={{
                    padding: 40,
                    display: "flex",
                    flex: 1,
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
                    Already a user? Log in to view your profile.
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
                {this.state.error !== "" && (
                    <Text style={{ color: "red" }}>{this.state.error}</Text>
                )}
                <Button
                    onPress={this.handleLogin}
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
                    text="Log in!"
                />
            </View>
        );
    }
}
