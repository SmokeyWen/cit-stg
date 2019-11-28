import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, ScrollView, KeyboardAvoidingView, Picker, TouchableHighlight, Alert, alertMessage } from 'react-native';
import { NavigationEvents } from 'react-navigation';
// import { ScrollView } from 'react-native-gesture-handler';



export default class PersonalInfo extends React.Component {

  

  constructor(props) {
    super(props);
    this.state = {
        role: '',
        fname: 'testUser',
        lname: 'testUser',
        gender: 'M',
        dob: '1988-08-08',
        height: "188",
        weight: "80",
        valid: false,
        fvalid: false,
        lvalid: false,
        gvalid: false,
        dvalid: false,
        hvalid: false,
        wvalid: false
    };
    
}




async CheckPage(){
  const { navigation } = this.props
  const role = navigation.getParam('role','ath')

  while(this.state.valid == false){
    await this.checkEmptyFname()
    if(this.state.fvalid == false){
      break;
    }
   
    await this.checkEmptyLname()
    if(this.state.lvalid == false){
      break;
    }
    console.log(2 + this.state.valid)
    await this.checkEmptyGender()
    if(this.state.gvalid == false){
      break;
    }
    
    await this.checkEmptyDob()
    if(this.state.dvalid == false){
      break;
    }
   
    await this.checkEmptyHeight()
    if(this.state.hvalid == false){
      break;
    }
    await this.checkEmptyWeight()
    if(this.state.wvalid == false){
      break;
    }
    
    this.setState({valid: true})
    
    }

if(this.state.valid == true) {
  this.props.navigation.navigate('LocationInfo', {
    role: role,
    fname: this.state.fname,
    lname: this.state.lname,
    gender: this.state.gender,
    dob: this.state.dob,
    addr: this.state.addr,
    height: this.state.height,
    weight: this.state.weight});
}
}


checkEmptyFname(){
    if(this.state.fname == ''){
    
      Alert.alert('First name cannot be empty', alertMessage, [

        {text: 'OK', onPress: () => this.setState({fvalid: false})},
    ])
  }
  else{
    this.setState({fvalid: true})
  }
}

checkEmptyLname(){
  if(this.state.lname == ''){
  
    Alert.alert('Last name cannot be empty', alertMessage, [

      {text: 'OK', onPress: () => this.setState({lvalid: false})},
  ])
}
else{
  this.setState({lvalid: true})
}
}

checkEmptyGender(){
  if(this.state.gender == ''){
  
    Alert.alert('Gender cannot be empty', alertMessage, [

      {text: 'OK', onPress: () => this.setState({gvalid: false})},
  ])
}
else{
  this.setState({gvalid: true})
}
}


checkEmptyDob(){

  var regEx = /^\d{4}-\d{2}-\d{2}$/;
  if(this.state.dob == ''){
  
    Alert.alert('Must enter Date of birth cannot be empty', alertMessage, [

      {text: 'OK', onPress: () => this.setState({dvalid: false})},
  ])
} else if(!regEx.test(this.state.dob)){
  Alert.alert('Date must be in yyyy-mm-dd format', alertMessage, [

    {text: 'OK', onPress: () => this.setState({dvalid: false})},
])

} else{
  this.setState({dvalid: true})
}
}

checkEmptyHeight(){
  if(this.state.height == ''){
  
    Alert.alert('Height cannot be empty', alertMessage, [

      {text: 'OK', onPress: () => this.setState({hvalid: false})},
  ])
}
else{
  this.setState({hvalid: true})
}
}
checkEmptyWeight(){
  if(this.state.weight == ''){
  
    Alert.alert('Weight cannot be empty', alertMessage, [

      {text: 'OK', onPress: () => this.setState({hvalid: false})},
  ])
}
else{
  this.setState({wvalid: true})
}
}
  render() {

    const { navigation } = this.props
    const role = navigation.getParam('role','ath')
    
    return (
      
      
      <View style={styles.container}>
        <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
    >

        <Text style={styles.pageText}> PERSONAL INFO</Text>
        <Text>{this.state.alert}</Text>

        <TextInput
          style={styles.placeHolderText}
          placeholder="First Name"
          onChangeText={(fname) => this.setState({fname})}
          value={this.state.fname}
        />

        <TextInput
          style={styles.placeHolderText}
          placeholder="Last Name"
          onChangeText={(lname) => this.setState({lname})}
          value={this.state.lname}
        />
        <TextInput
          style={styles.placeHolderText}
          placeholder="Gender"          
          onChangeText={(gender) => this.setState({gender})}
          value={this.state.gender}
        />
        
        <TextInput
          style={styles.placeHolderText}
          placeholder="Date of Birth: yyyy-mm-dd"
          onChangeText={(dob) => this.setState({dob})}
          value={this.state.dob}
        />        
        
            
        <TextInput
          style={styles.placeHolderText}
          placeholder="Height"
          onChangeText={(height) => this.setState({height})}
          value={this.state.height}
        />
            
        <TextInput
          style={styles.placeHolderText}
          placeholder="Weight"
          onChangeText={(weight) => this.setState({weight})}
          value={this.state.weight}
        />
          
        <TouchableHighlight
                        style={styles.button}
                        onPress={() => this.CheckPage()}
                    >
                        <Text style={styles.btnText}> LOCATION INFO </Text>
        </TouchableHighlight>     
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  btnText: {
    fontSize: 24,
    opacity: 1,
    color: "#fff",
},
  button: {
    opacity: 0.7,
    backgroundColor: "#3AD289",
    width: "90%",
    padding: 14,
    top: "10%",
    borderRadius: 2
},
  pageText: {
    // position: "relative",
    // bottom: "25%",
    // backgroundColor: "#ffbf00",
    marginBottom: 70,
    color: "#3AD289",
    fontSize: 32,
    alignItems: "center",
    padding: 4,
    marginTop: 50,
},
  textBox: {
    height: 40,
    width: 250,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 2,
    },
    scrollView: {
      backgroundColor: 'pink',
      marginHorizontal: 20,
    },
    placeHolderText: {
      // position: "relative",
      // bottom: "25%",
      backgroundColor: "white",
      alignContent: "center",
      height: "4%",
      width: 300,
      fontSize: 18,
      borderBottomWidth: 1,
      marginBottom: 20,
      borderColor: "#C4C4C4",
      opacity: 1,
      color: "black"
  }
});