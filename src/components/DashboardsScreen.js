import React from "react";
import { View, Text, StyleSheet } from "react-native";

import { AuthContext } from "../../App";

const DashboardsScreen = ({ navigation }) => {
    const { val, setVal } = React.useContext(AuthContext);

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Dashboards Screen</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    text: {
        fontSize: 30,
    },
});

export default DashboardsScreen;
