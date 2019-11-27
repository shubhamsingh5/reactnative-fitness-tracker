import React, { Component } from "react";
import { View, Text, AsyncStorage } from "react-native";

class AuthLoading extends Component {
    componentDidMount() {
        //check if signed in
        this.checkSignedIn();
    }

    checkSignedIn = async () => {
        const token = await AsyncStorage.getItem("token");
        if (token) {
            const username = await AsyncStorage.getItem("username");
            this.props.navigation.navigate("Main", {
                token,
                username
            });
        } else {
            this.props.navigation.navigate("Auth");
        }
    };

    render() {
        return (
            <View
                style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center"
                }}
            >
                <Text>Loading...</Text>
            </View>
        );
    }
}

export default AuthLoading;
