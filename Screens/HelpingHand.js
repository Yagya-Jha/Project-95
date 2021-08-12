import AppLoading from 'expo-app-loading';
import * as React from 'react';
import {Text, TouchableOpacity, KeyboardAvoidingView, Image, View,Platform,Dimensions, StatusBar, TextInput, Alert, StyleSheet, ScrollView, FlatList, Touchable} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Font from 'expo-font';
import firebase from 'firebase'
import db from '../Config';
import {ListItem} from 'react-native-elements'

let custom_font = {'customfont':require('../assets/customFont/WhaleITriedRegular.ttf')}

export default class HelpingHand extends React.Component{
    constructor(){
        super();
        this.state = {fontLoaded: false, doubts: []};
    }

    async loadFonts(){
        await Font.loadAsync(custom_font);
        this.setState({fontLoaded: true});
    }

    getDoubtData = ()=>{
        let doubtref = db.collection("Doubts").onSnapshot((snapshot)=>{
            let doubtlist = snapshot.docs.map(document => document.data())
            this.setState({doubts: doubtlist});
        });
    }

    componentDidMount(){
        this.loadFonts();
        this.getDoubtData();
    }

    keyextractor = (item, index)=> index.toString();
    renderItem({item, i}){
        return(
            <ListItem 
            key = {i}
            title = {item.doubt}
            writeelement = {<TouchableOpacity><Text>+answer</Text></TouchableOpacity>}
            />
        );
    }
    render(){
        if(! this.state.fontLoaded){
            return <AppLoading />
        }else{
          return(
            <View style = {styles.container}>
                <View style = {styles.topcontainer}>
                    <SafeAreaView style = {styles.safeview}/>
                    <Text style = {styles.appTitleText}>App Name</Text>
                    <Text style = {styles.title}>Helping Hand</Text>
                    <TouchableOpacity style = {styles.aad} onPress = {()=> this.props.navigation.navigate('PostDoubtScreen')}>
                        <Text style = {{fontSize: RFValue(18),color: '#03006b', fontFamily: 'customfont'}}>Ask a doubt</Text>
                    </TouchableOpacity>
                </View>
                <View style = {styles.discussion}>
                    <FlatList 
                    keyExtractor = {this.keyextractor}
                    data = {this.state.doubts}
                    renderItem = {this.renderitem}
                    />
                </View>
            </View>
    );
}
}
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        alignSelf: 'center'
    },
    topcontainer: {
        backgroundColor: 'skyblue',
        justifyContent: "center",
        alignItems:"center",
        width: '100%',
        height: '40%'
    },
    safeview: {
        marginTop: Platform.OS === "android" ? StatusBar.currentHeight : RFValue(35)
    },
    appTitleText: {
        fontSize: RFValue(30),
        fontFamily: 'customfont'
    },
    title: {
        marginTop: 15,
        fontSize: RFValue(35),
        fontFamily: 'customfont',
    },
    aad: {
        backgroundColor: 'white',
        marginTop: 50,
        bottom: 30,
        alignItems: 'center',
        width: '85%',
        borderRadius: 30,
        height: RFValue(30)
    },
});