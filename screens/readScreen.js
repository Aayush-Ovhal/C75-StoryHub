import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, FlatList} from 'react-native';
import {Header, ListItem} from 'react-native-elements';

import * as firebase from 'firebase';
import db from '../config';

export default class ReadScreen extends React.Component{
    constructor(){
        super();
        this.state = {
            allStories: [],
            search: ""
        }
    }

    searchStory = async(text)=>{
     var Text = text.toUpperCase()

     const searchStory = await db.collection("story").where("author", "==", Text).get()
     searchStory.docs.map((doc)=>{
         this.setState({
             allStories: [...this.state.allStories, doc.data()]
         })
     })
    }

    renderStories = ()=>{
      db.collection("story").onSnapshot((snapshot)=>{
          var stories = snapshot.docs.map(doc => doc.data());
          this.setState({
              allStories: stories
          })
      })
    }

    componentDidMount(){
        this.renderStories();
    }

    keyExtractor = (item, index)=> index.toString()

    renderItem=({item,i})=>{
     return(
         <ListItem
          key = {i}
          title = {"Title: "+item.title}
          subtitle = {"Author: "+item.author}
          titleStyle={{ color: 'black', fontWeight: 'bold' }}
          bottomDivider
         />
     )
    }

    render(){
        return(
            <View style = {{flex: 1}}>
                <Header
                 backgroundColor = {"#144BF6"}
                 centerComponent = {{
                     text: "Read Screen",
                     style: {color: 'black', fontSize: 20, fontWeight: "bold"}
                 }}
                />
                <View style = {styles.container}>
                 <View style = {styles.searchBar}>
                  <TextInput
                   style = {styles.bar}
                   placeholder = {"Enter Book Name"}
                   onChangeText ={
                       (text)=>{this.setState({search: text})}}
                  />
                  <TouchableOpacity
                   style = {styles.searchButton}
                   onPress = {
                       ()=>{
                           this.searchStory(this.state.search)
                       }
                   }
                  >
                      <Text>Search</Text>
                  </TouchableOpacity>
                 </View>    
                </View>

                <View>
                 {
                     this.state.allStories.length == 0 ?(
                     <View style = {styles.subContainer}>
                      <Text style = {{fontSize: 20}}>
                          No Stories Available.
                      </Text>
                     </View>
                     )
                     :(
                      <FlatList
                        keyExtractor = {this.keyExtractor}
                        data = {this.state.allStories}
                        renderItem = {this.renderItem}
                      />
                     )
                   }
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    subContainer:{
      flex:1,
      fontSize: 20,
      justifyContent:'center',
      alignItems:'center'
    },
    searchBar: {
        flexDirection: 'row',
        height: 40,
        width: 'auto',
        borderWidth: 0.5,
        alignItems: 'center'
    },
    bar: {
        borderWidth: 2,
        height: 30,
        width: 300,
        paddingLeft: 10
    },
    searchButton: {
        borderWidth: 1,
        height: 30,
        width: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'green'
    }
  })