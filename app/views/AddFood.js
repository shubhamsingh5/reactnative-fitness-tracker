import React, { Component } from "react";
import { Text, View } from "react-native";
import styled from "styled-components";
import { addFood } from "../services";
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
export default class AddFood extends Component {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        this.state = {
            token: "",
            mealId: 0,
            name: "",
            cals: 0,
            prot: 0,
            carbs: 0,
            fat: 0,
            error: ""
        };
    }

    componentDidMount() {
        const mealId = this.props.navigation.getParam("mealId", 0);
        const token = this.props.navigation.getParam("token", "no token");
        this.setState({
            mealId,
            token
        });
    }

    handleAddFood = async () => {
        console.log("adding food");
        try {
            const res = await addFood(
                this.state.token,
                this.state.mealId,
                this.state.name,
                this.state.cals,
                this.state.prot,
                this.state.carbs,
                this.state.fat
            );
            console.log(res);
            this.setState({
                name: "",
                cals: 0,
                prot: 0,
                carbs: 0,
                fat: 0
            });
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
                        marginBottom: 20,
                        color: "#D9D6DA"
                    }}
                >
                    {this.state.edit ? "Edit activity" : "Add a new activity"}
                </Text>
                <AppTextInput
                    placeholder="Food name (banana, awaffles,...)"
                    onChangeText={name => this.setState({ name })}
                />
                <AppTextInput
                    placeholder="Calories"
                    keyboardType={"phone-pad"}
                    onChangeText={cals => this.setState({ cals })}
                />
                <AppTextInput
                    placeholder="Protein (g)"
                    keyboardType={"phone-pad"}
                    onChangeText={prot => this.setState({ prot })}
                />
                <AppTextInput
                    placeholder="Carbohydrates (g)"
                    keyboardType={"phone-pad"}
                    onChangeText={carbs => this.setState({ carbs })}
                />
                <AppTextInput
                    placeholder="Fats (g)"
                    keyboardType={"phone-pad"}
                    onChangeText={fat => this.setState({ fat })}
                />
                <Button
                    onPress={this.handleAddFood}
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
                    text="Add food"
                />
            </View>
        );
    }
}
