import React, { Component } from "react";
import { Text, View, FlatList } from "react-native";
import Activity from "../components/Activity";

export default class ActivitiesOverview extends Component {
    static navigationOptions = {
        header: null
    };
    componentDidMount() {
        const activities = this.props.navigation.getParam("activities", []);
        const token = this.props.navigation.getParam("token", "no token");
        this.setState({
            activities: activities,
            token: token
        });
    }
    constructor(props) {
        super(props);
        this.state = {
            activities: []
        };
    }
    render() {
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
                    Today's Activities
                </Text>
                {this.state.activities.length === 0 && (
                    <View
                        style={{
                            marginTop: 24,
                            flex: 0.5,
                            alignItems: "center",
                            justifyContent: "center"
                        }}
                    >
                        <Text
                            style={{
                                color: "#646464",
                                fontSize: 18,
                                textAlign: "center"
                            }}
                        >
                            No activites. Add some activities to see details.
                        </Text>
                    </View>
                )}
                <FlatList
                    data={this.state.activities}
                    renderItem={({ item: rowData }) => {
                        return (
                            <Activity
                                activity={rowData}
                                token={this.state.token}
                                navigation={this.props.navigation}
                            />
                        );
                    }}
                    keyExtractor={(item, index) => item.id.toString()}
                />
            </View>
        );
    }
}
