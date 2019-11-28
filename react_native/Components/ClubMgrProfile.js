import React from "react";
import {
    StyleSheet,
    Alert,
    TouchableOpacity,
    Text,
    View,
    Button,
    ScrollView,
    Image,
    ImageBackground,
    TouchableHighlight
} from "react-native";
import { NavigationEvents, StackNavigator } from "react-navigation";
import { Card } from "react-native-elements";
import { symbol } from "prop-types";

export default class AthleteProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            mgr_id: this.props.navigation.getParam("mgr_id"),
            club_id: this.props.navigation.getParam("club_id"),
            mgr_email: "",
            mgr_phone: "",
            profile_photo_url: ""
        };
        this.registerVar = this.registerVar.bind(this);
    }


    static navigationOptions= ({ navigation }) => {
        const {params = {}} = navigation.state;
        return{
        gesturesEnabled: false,
        headerTitle: (
            <TouchableOpacity style={{alignSelf: "center", marginLeft: "auto", marginRight: "auto"}}
                onPress={() => {
                    navigation.navigate("CardForMgr", {mgr_id:  params.mgr_id, club_id: params.club_id})
                    console.log(params.mgr_id, "card params.mgr_id in manager profile");;
                }}
            >
                <View>
                    <Image
                        style={{
                            justifyContent: "center",
                            height: 40,
                            width: 40,
                            resizeMode: "contain"
                        }}
                        source={require("../Icons/heart_inactive.png")}
                    />
                </View>
            </TouchableOpacity>
        ),
        headerRight: (
            <TouchableOpacity>
                <View>
                    <Image
                        style={{
                            justifyContent: "center",
                            height: 30,
                            width: 30
                        }}
                        source={require("../Icons/profile_active.png")}
                    />
                </View>
            </TouchableOpacity>
        ),
        headerLeft: (
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate("ClubMatches", {mgr_id:  params.mgr_id, club_id: params.club_id});
                    console.log(params.mgr_id, "header left params.mgr_id in club matches")
                }}
            >
                <View>
                    <Image
                        style={{
                            justifyContent: "center",
                            height: 30,
                            width: 30
                        }}
                        source={require("../Icons/list_inactive.png")}
                    />
                </View>
            </TouchableOpacity>
        )
    }
}


    registerVar() {
        const { navigation } = this.props
        const new_id = navigation.getParam('mgr_id', 'none')
        console.log(new_id);
    
        this.setState({
          mgr_id: new_id
        })
        console.log('Account set to ' + this.state.mgr_account);
      }

    getData(){
        return fetch("http://54.191.100.200:8080/api/clubmgrs/" + this.state.mgr_id)
        .then(response => response.json())
        .then(responseJson => {
            this.setState({ data: responseJson });
        })
        .catch(error => {
            console.error(error);
        });

    }

    componentDidMount() {
        this.getData();
        console.log(this.state.mgr_id, "--------------inside componentdidmount using getData")
        console.log('data loaded');

        this.props.navigation.setParams({
            mgr_id: this.state.mgr_id,
            club_id: this.state.club_id
        })

        console.log(this.state.mgr_id, "-----------------in clubmgrprofile")
            }

    onPressEvent() {
        Alert.alert(
            "Sign Out ",
            "Are you sure you want to sign out?",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                {
                    text: "OK",
                    onPress: () => this.props.navigation.navigate("MainApp")
                }
            ],
            { cancelable: false }
        );
    }

    // onPressEvent1() {
    //     Alert.alert(
    //         "Edit",
    //         "Editing Contact Information",
    //         [
    //             {
    //                 text: "OK",
    //                 onPress: () => console.log("Okay Pressed")
    //             }
    //         ],
    //         { cancelable: false }
    //     );
    // }

//   onPressEvent2() {
//     Alert.alert(
//       "Edit",
//       "Editing Personal Information",
//       [
//         {
//           onPress: () => this.props.navigation("ClubMgrPersonalDetails")
//         }
//     ])}

    render() {
        if (this.state.data.length == 0) {
            return <View></View>;
        }
        return (
            <ScrollView style={styles.container}>
                {/* <ImageBackground
                    source={require("../assets/backgroundImageProfiles2.png")}
                    style={styles.backgroundImage}
                > */}
                {/* <TouchableHighlight
                    style={styles.BackButton}
                    onPress={() => this.props.navigation.navigate("FirstPage")}
                >
                    <Text style={styles.BackBtnText}>Menu</Text>
                </TouchableHighlight> */}
                <View>
                    <Card containerStyle={styles.playerphotoCard}>
                        <Image
                            source={require("../assets/stockMgr.jpg")}
                            style={styles.playerphoto}
                        />
                    </Card>
                    <Card containerStyle={styles.cardStyle1}>
                        <View style={{ marginTop: 70 }}>
                            <Text
                                style={{
                                    fontSize: 20,
                                    fontWeight: "bold",
                                    textAlign: "center",
                                    color: "black"
                                }}
                            >
                                Welcome
                            </Text>
                            <Text
                                style={{
                                    textAlign: "center",
                                    color: "black",
                                    fontSize: 20,
                                    fontWeight: "bold"
                                }}
                            >
                                {this.state.data[0].mgr_fname}{" "}
                                {this.state.data[0].mgr_lname}
                            </Text>
                        </View>
                    </Card>
                </View>
                <View>
                    <Card containerStyle={styles.cardStyle2}>
                        <View style={styles.row}>
                            <Text
                                style={{
                                    fontSize: 15,
                                    fontWeight: "bold",
                                    bottom: 5
                                }}
                            >
                                Contact Information
                            </Text>
                            <TouchableOpacity
                                onPress={() => this.props.navigation.navigate("ClubMgrContactDetails", {
                                    mgr_id : this.state.data[0].mgr_id,
                                    mgr_email: this.state.data[0].mgr_email,
                                    mgr_phone: this.state.data[0].mgr_phone
                                    })}>
                                <Image
                                    style={styles.editIconStyle}
                                    source={require("../assets/editIcon.png")}
                                />
                            </TouchableOpacity>
                        </View>
                        <View>
                            <Text
                                style={{
                                    fontSize: 12,
                                    fontWeight: "bold",
                                    paddingTop: 5
                                }}
                            >
                                Email
                            </Text>
                            <Text style={{ fontSize: 12, color: "grey" }}>
                                {this.state.data[0].mgr_email}
                            </Text>
                            <Text
                                style={{
                                    fontSize: 12,
                                    fontWeight: "bold",
                                    paddingTop: 5
                                }}
                            >
                                Phone Number
                            </Text>
                            <Text style={{ fontSize: 12, color: "grey" }}>
                                {this.state.data[0].mgr_phone}
                            </Text>
                        </View>
                    </Card>
                </View>
                <View>
                        <Card containerStyle={styles.cardStyle3}>
                            <View style={styles.row}>
                                <Text style= {{fontSize: 15, fontWeight: "bold", bottom: 5}}>Personal Information</Text>
                                <TouchableOpacity onPress={() =>  this.props.navigation.navigate("ClubMgrPersonalDetails", {
                                mgr_id : this.state.data[0].mgr_id,
                                mgr_fname : this.state.data[0].mgr_fname,
                                mgr_lname : this.state.data[0].mgr_lname,
                                mgr_account : this.state.data[0].mgr_account,
                                mgr_password : this.state.data[0].mgr_password
                                })}>
                                <Image style={styles.editIconStyle} source={require("../assets/editIcon.png")}/>
                                </TouchableOpacity>
                            </View>
                            <View>
                                <Text style={{fontSize: 12, fontWeight: "bold", paddingTop: 10}}>First Name</Text>
                                <Text style={{fontSize: 12, color: "grey"}}>{this.state.data[0].mgr_fname}</Text>
                                <Text style={{fontSize: 12, fontWeight: "bold", paddingTop: 10}}>Last Name</Text>
                                <Text style={{fontSize: 12, color: "grey"}}>{this.state.data[0].mgr_lname}</Text>
                                <Text style={{fontSize: 12, fontWeight: "bold", paddingTop: 10}}>Account Name</Text>
                                <Text style={{fontSize: 12, color: "grey"}}>{this.state.data[0].mgr_account}</Text>
                                <Text style={{fontSize: 12, fontWeight: "bold", paddingTop: 10}}>Password</Text>
                                <Text style={{fontSize: 12, color: "grey"}}>{this.state.data[0].mgr_password}</Text>
                            </View>
                        </Card>
                </View>
                {/* <View style={styles.buttonRow}>
                    <TouchableOpacity style={styles.signOutButton}>
                        <Button
                            title="Sign Out"
                            onPress={() => this.onPressEvent()}
                        />
                    </TouchableOpacity>
                </View> */}
                <TouchableHighlight
                    style={styles.signOutButton}
                    onPress={() => this.onPressEvent()}
                >
                    <Text style={styles.btnText}> Sign Out </Text>
                </TouchableHighlight>
                {/* </ImageBackground> */}
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column"
    },
    playerphotoCard: {
        borderRadius: 150 / 2,
        width: 150,
        height: 150,
        marginTop: 10,
        position: "absolute",
        zIndex: 1,
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        shadowOffset: { width: 0, height: 12 },
        shadowColor: "black",
        shadowOpacity: 1.0,
        shadowRadius: 11,
        elevation: 3,
        backgroundColor: "#3AD289"
    },
    playerphoto: {
        borderWidth: 5,
        borderColor: "black",
        borderRadius: 150 / 2,
        width: 150,
        height: 150,
        zIndex: 2,
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center"
    },

    cardStyle1: {
        backgroundColor: "white",
        borderRadius: 9,
        marginTop: 75,
        width: 400,
        height: 175,
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        shadowOffset: { width: 0, height: 12 },
        shadowColor: "black",
        shadowOpacity: 1.0,
        shadowRadius: 11,
        elevation: 3
    },
    cardStyle2: {
        backgroundColor: "white",
        borderRadius: 9,
        marginTop: 20,
        width: 400,
        height: 150,
        alignSelf: "center",
        shadowOffset: { width: 0, height: 12 },
        shadowColor: "black",
        shadowOpacity: 1.0,
        shadowRadius: 11,
        elevation: 3
    },
    cardStyle3: {
        backgroundColor: "white",
        borderRadius: 9,
        marginTop: 20,
        width: 400,
        height: 250,
        alignSelf: "center",
        shadowOffset: { width: 0, height: 12 },
        shadowColor: "black",
        shadowOpacity: 1.0,
        shadowRadius: 11,
        elevation: 3,
        marginBottom: 20
    },
    editIconStyle: {
        width: 15,
        height: 15,
        bottom: 5,
        top: 2
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        borderBottomWidth: 0.5,
        borderBottomColor: "lightgrey",
        bottom: 10
    },
    // signOutButton: {
    //     bottom: 10,
    //     right: 32
    // },
    // buttonRow: {
    //     flexDirection: "row",
    //     justifyContent: "flex-end",
    //     alignItems: "flex-end",
    //     alignSelf: "flex-end"
    // },
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
    backgroundImage: {
        flex: 1,
        width: "100%",
        height: "100%",
        resizeMode: "contain",
        alignItems: "center"
    }
    // BackButton: {
    //     opacity: 0.7,
    //     backgroundColor: "#3AD289",
    //     width: "16%",
    //     height: "4%",
    //     alignItems: "center",
    //     // top: "2%",
    //     // right: "2%",
    //     borderRadius: 2
    // },
    // BackBtnText: {
    //     fontSize: 20,
    //     opacity: 1,
    //     color: "#fff"
    // }
});
