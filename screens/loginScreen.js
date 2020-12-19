import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView} from 'react-native';
import {Header} from 'react-native-elements';

import * as firebase from 'firebase';
import db from '../config';
import { TouchableOpacityComponent } from 'react-native';

export default class Login extends React.Component{

    constructor(){
        super();
        this.state = {
            emailId: "",
            password: ""
        }
    }

    authUser = (email, password)=>{
     firebase.auth().signInWithEmailAndPassword(email,password)
     .then(()=>{
         this.props.navigation.navigate("TabNavigator");
     })
     .catch((error)=>{
         var errorMessage = error.message;
         return alert(errorMessage);
     })
    }

    signUp = (email, password)=>{
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(()=>{
            db.collection('user').add({
                email_id: this.state.emailId
            })
            return alert("User Added Successfully")
        })
        .catch((error)=>{
            var errorMessage = error.message;
            return alert(errorMessage)
        })
    }

    render(){
        return(
            <View style = {{flex: 1}}>
                <Header
                 backgroundColor = {"#144BF6"}
                 centerComponent = {{
                     text: "Log In/ Sign Up Screen",
                     style: {color: 'black', fontSize: 20, fontWeight: "bold"}
                 }}
                />
                <TextInput
                style = {[styles.loginBox, {marginTop: 200}]}
                 placeholder = {"Enter EmailId"}
                 keyboardType = {"email-address"}
                 onChangeText = {
                     (text)=>{
                         this.setState({
                             emailId: text
                         })
                     }
                 }
                />

                <TextInput
                style = {styles.loginBox}
                 placeholder = {"Enter Password"}
                 secureTextEntry = {true}
                 onChangeText = {
                     (text)=>{
                         this.setState({
                             password: text
                         })
                     }
                 }
                />

                <TouchableOpacity
                style = {styles.logInButton}
                 onPress = {
                     ()=>{
                         this.authUser(this.state.emailId, this.state.password)
                     }
                 }
                >
                    <Text style = {styles.logInText}>
                        Log In
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                 style = {styles.logInButton}
                 onPress = {
                     ()=>{
                         this.signUp(this.state.emailId, this.state.password)
                     }
                 }
                >
                    <Text style = {styles.logInText}>
                     Sign Up
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    logInButton: {
        height: 40,
        width: 100,
        borderWidth: 1,
        marginTop: 20,
        paddingTop: 5,
        borderRadius: 7,
        alignItems: 'center',
        marginLeft: 700,
        backgroundColor: '#2874F7' 
    },
    logInText: {
        textAlign: 'center',
        fontSize: 20
    },
    loginBox: {
        width: 300,
        height: 40,
        borderWidth: 1.5,
        fontSize: 20,
        margin: 10,
        paddingLeft: 10,
        borderRadius: 7,
        marginLeft: 650
    }
})