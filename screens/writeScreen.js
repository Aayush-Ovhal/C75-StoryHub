import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView} from 'react-native';
import {Header} from 'react-native-elements';

import * as firebase from 'firebase';
import db from '../config';

export default class WriteScreen extends React.Component{
    constructor(){
        super();
        this.state = {
            TitleText: "",
            AuthorText: "",
            StoryText: ""
        }
    }

    submitStory = ()=>{
     db.collection('story').add({
         title: this.state.TitleText,
         author: this.state.AuthorText,
         story: this.state.StoryText
     })

     this.setState({
      TitleText: "",
      AuthorText: "",
      StoryText: ""
     })

     alert("Story Submitted!")
    }
    
    render(){
        return(
            <KeyboardAvoidingView>
                <Header
                 backgroundColor = {"#144BF6"}
                 centerComponent = {{
                     text: "Write Screen",
                     style: {color: 'black', fontSize: 20, fontWeight: 'bold'}
                 }}
                />

                <TextInput
                style={style.inputStyle}
                placeholder = "Story Title"
                 onChangeText={(text)=>{
                     this.setState({
                         TitleText: text
                    })
                  }}
                  value={this.state.TitleText}/>

                  <TextInput
                      style={style.inputStyle}
                      placeholder = "Author's Name"
                      onChangeText={(text)=>{
                          this.setState({
                              AuthorText: text
                          })
                      }}
                      value={this.state.AuthorText}/>   

                  <TextInput
                      style={{width:'80%', marginTop: 20, alignSelf: 'center', height: 300, borderWidth: 2, borderRadius:5}}
                      placeholder = "Your Story Here"
                      onChangeText={(text)=>{
                          this.setState({
                              StoryText: text
                          })
                      }}
                      multiline={true}
                      value={this.state.StoryText}/>

                      <TouchableOpacity
                      style={style.submitButtonStyle}
                      onPress={
                          ()=>{
                              this.submitStory()
                          }
                        }
                      >
                          <Text
                          style={style.submitTextStyle}
                          >
                              SUBMIT
                          </Text>
                      </TouchableOpacity>
            </KeyboardAvoidingView>
        )
     }
  }

  const style = StyleSheet.create({
    inputStyle: {
        marginTop: 20,
        width: '80%',
        alignSelf: 'center',
        height: 40,
        borderWidth: 2,
        borderRadius: 5,
      },
      submitButtonStyle: {
          marginTop: 20,
          marginLeft: 650,
          width: 80, 
          height: 40,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#EB1923',
          borderWidth: 2,
          borderRadius: 5
      },
      submitTextStyle: {
          fontSize: 20,
          textAlign: 'center'
      }
  })