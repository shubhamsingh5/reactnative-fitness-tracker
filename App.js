import React from "react";
import { View, Platform, StatusBar } from "react-native";
import AppContainer from "./app/navigation";

class App extends React.Component {
    render() {
        return (
            // <View
            //     style={{
            //         paddingTop:
            //             Platform.OS === "ios" ? StatusBar.currentHeight : 0
            //     }}
            // >
                <AppContainer />
            // </View>
        );
    }
}

export default App;
