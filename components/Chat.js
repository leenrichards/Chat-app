import React from 'react';
import { View, Text, Button, Platform, KeyboardAvoidingView, StyleSheet } from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import firebase from "firebase";
import "firebase/firestore";


export default class Chat extends React.Component {

    constructor() {
        super();
        this.state = {
            messages: [],
            uid: 0,
            user: {
                _id: "",
                name: "",
                avatar: "",
            },

            image: null,
            location: null
        };


        //Config parameters for the database
        const firebaseConfig = {
            apiKey: "AIzaSyAu2eGOTH-XfVh3eGqLXD25urOc5O4Ygnw",
            authDomain: "chatapp-f5e4d.firebaseapp.com",
            projectId: "chatapp-f5e4d",
            storageBucket: "chatapp-f5e4d.appspot.com",
            messagingSenderId: "194049408190",
            appId: "1:194049408190:web:c38e4c086017493a6ff2ef"
        };

        //initialize 
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }

        //references the messages collection in the database
        this.referenceChatMessages = firebase.firestore().collection("messages");
    }

    onCollectionUpdate = (querySnapshot) => {
        const messages = [];
        // goes through each document
        querySnapshot.forEach((doc) => {
            // gets the QueryDocumentSnapshot's data
            let data = doc.data();
            messages.push({
                _id: data._id,
                createdAt: data.createdAt.toDate(),
                text: data.text,
                user: {
                    _id: data.user._id,
                    name: data.user.name,
                    avatar: data.user.avatar
                },
                image: data.image || null,
                location: data.location || null
            });
        });
        this.setState({
            messages: messages
        });

    };

    //adding messages to the database
    addMessage() {
        const message = this.state.messages[0];

        this.referenceChatMessages.add({
            uid: this.state.uid,
            _id: message._id,
            text: message.text || "",
            createdAt: message.createdAt,
            user: this.state.user,
            image: message.image || "",
            location: message.location || null,
        });
    }

    //when a message is sent, calls saveMessage
    onSend(messages = []) {
        this.setState((previousState) => ({
            messages: GiftedChat.append(previousState.messages, messages),
        }), () => {
            this.addMessage();
        });
    }

    componentDidMount() {

        //when component mounts, display user name in the title
        const name = this.props.route.params.name;
        this.props.navigation.setOptions({ title: name });

        //take snapshot of messages collection
        this.referenceChatMessages = firebase.firestore().collection('messages');//do i need this here?/////////////////////
        this.unsubscribe = this.referenceChatMessages.onSnapshot(this.onCollectionUpdate)

        //User Authentication
        this.authUnsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
            if (!user) {
                await firebase.auth().signInAnonymously();
            }
            this.setState({
                uid: 0,
                messages: [],
                user: {
                    _id: 0,//user.uid,
                    name: name,
                    avatar: "https://placeimg.com/140/140/any",
                },
            });
            this.unsubscribe = this.referenceChatMessages
                .orderBy("createdAt", "desc")
                .onSnapshot(this.onCollectionUpdate);
        });

        //set reply, and system messageseded
        /*this.setState({
            messages: [
                {
                    _id: 1,
                    text: 'Hello developer',
                    createdAt: new Date(),
                    user: {
                        _id: 2,
                        name: 'React Native',
                        avatar: 'https://placeimg.com/140/140/any',
                    },
                },
                {
                    _id: 2,
                    text: 'Welcome to chat app ' + name + '!',
                    createdAt: new Date(),
                    system: true,
                },
            ]

        })*/
    }

    componentWillUnmount() {
        // close connections when app is closed
        this.unsubscribe();
        this.authUnsubscribe();
    }

    // Change the color of the user/right bubble 
    renderBubble(props) {
        return (
            <Bubble
                {...props}
                wrapperStyle={{
                    right: {
                        backgroundColor: 'blue'
                    },
                    left: {
                        backgroundColor: 'white'
                    }
                }}
            />
        )
    }




    render() {
        let bgColor = this.props.route.params.bgColor;
        return (
            <View style={{ flex: 1, backgroundColor: bgColor }}>
                <GiftedChat
                    renderBubble={this.renderBubble.bind(this)}
                    renderUsernameOnMessage={true}
                    messages={this.state.messages}
                    onSend={messages => this.onSend(messages)}
                    user={{
                        _id: this.state.user._id,
                        name: this.state.name,
                        avatar: this.state.user.avatar
                    }}
                />
                <Button
                    title="Go to Start"
                    onPress={() => this.props.navigation.navigate("Start")}
                />

                {Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null}
            </View>
        );
    }
}
