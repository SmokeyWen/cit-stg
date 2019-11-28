import React from "react";
import {
    StyleSheet,
    Text,
    View,
    Alert,
    TouchableHighlight
} from "react-native";
import { NavigationEvents } from "react-navigation";
// import { ScrollView } from 'react-native-gesture-handler';

export default class AccountType extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        role: 'ath'
        
    };
    this.checkType = this.checkType.bind(this);

}

checkType() {
  
  if(this.state.role == "ath"){
    this.props.navigation.navigate('PersonalInfo', {role: this.state.role});

  }else if (this.state.role == "mgr"){
    this.props.navigation.navigate('MgrInfo', {role: this.state.role});
  }
}

    render() {
        return (
            <View style={styles.container}>
                <TouchableHighlight
                    style={styles.BackButton}
                    onPress={() => this.props.navigation.navigate("MainApp")}
                >
                    <Text style={styles.BackBtnText}>Menu</Text>
                </TouchableHighlight>
                <Text style={styles.welText}>WHICH ARE YOU?</Text>
                <TouchableHighlight
                    style={styles.button}
                    onPress={() => {
                        this.props.navigation.navigate("PersonalInfo", {
                            role: "ath"
                        });
                    }}
                >
                    <Text style={styles.btnText}> ATHLETE </Text>
                </TouchableHighlight>
                <TouchableHighlight
                    style={styles.button2}
                    onPress={() => {
                        this.props.navigation.navigate("MgrInfo", {
                            role: "mgr"
                        });
                    }}
                >
                    <Text style={styles.btnText}> CLUB </Text>
                </TouchableHighlight>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center"
    },
    welText: {
        textAlign: "center",
        marginTop: "4%",
        fontSize: 32,
        color: "#3AD289"
    },
    textBox: {
        height: 40,
        width: 250,
        borderColor: "gray",
        borderWidth: 1,
        margin: 2
    },
    scrollView: {
        backgroundColor: "pink",
        marginHorizontal: 20
    },
    btnText: {
        fontSize: 24,
        opacity: 1,
        color: "#fff"
    },
    button: {
        opacity: 0.7,
        backgroundColor: "#3AD289",
        width: "57%",
        padding: 14,
        alignItems: "center",
        top: "10%",
        marginTop: 80,
        marginBottom: 28,
        borderRadius: 2
    },
    button2: {
        opacity: 0.7,
        backgroundColor: "#3AD289",
        width: "57%",
        padding: 14,
        alignItems: "center",
        top: "14%",
        marginBottom: 38,
        borderRadius: 2
    },
    btnText: {
        fontSize: 24,
        opacity: 1,
        color: "#fff"
    },
    signOutButton: {
        alignSelf: "center",
        opacity: 0.7,
        backgroundColor: "#3AD289",
        width: "45%",
        padding: 14,
        alignItems: "center",
        bottom: "10%",
        alignItems: "center",
        marginTop: 80,
        marginBottom: 28,
        borderRadius: 2
    },
    BackButton: {
        opacity: 0.7,
        backgroundColor: "#3AD289",
        width: "16%",
        // height: "6%",
        padding: 14,
        alignItems: "center",
        bottom: "24%",
        right: "40%",
        borderRadius: 2
    },
    BackBtnText: {
        fontSize: 14,
        opacity: 1,
        color: "#fff"
    }
});
