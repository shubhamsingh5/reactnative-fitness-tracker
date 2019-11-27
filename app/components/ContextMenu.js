import * as React from "react";
import { View } from "react-native";
// import { Button, Paragraph, Menu, Divider, Provider } from "react-native-paper";
import { Entypo } from "@expo/vector-icons/Entypo";

export default class MyComponent extends React.Component {
    state = {
        visible: false
    };

    _openMenu = () => this.setState({ visible: true });

    _closeMenu = () => this.setState({ visible: false });

    render() {
        return (
            <Provider>
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "center",
                        position: "absolute",
                        top: 0,
                        zIndex: 10
                    }}
                >
                    <Menu
                        visible={this.state.visible}
                        onDismiss={this._closeMenu}
                        style={{ zIndex: 1000 }}
                        anchor={
                            <Button onPress={this._openMenu}>Show menu</Button>
                        }
                    >
                        {this.props.menuItems.map(item => {
                            return (
                                <Menu.Item
                                    key={item.id}
                                    onPress={() => item.handler}
                                    title={item.name}
                                />
                            );
                        })}
                        {/* <Menu.Item onPress={() => {}} title="Item 1" />
                        <Menu.Item onPress={() => {}} title="Item 2" />
                        <Divider />
                        <Menu.Item onPress={() => {}} title="Item 3" /> */}
                    </Menu>
                </View>
            </Provider>
        );
    }
}
