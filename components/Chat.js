import React from 'react';
import { View, Button, Platform, KeyboardAvoidingView } from 'react-native';
import { GiftedChat, Bubble, MessageText, Time, InputToolbar } from 'react-native-gifted-chat';
import CustomActions from './CustomActions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as firebase from 'firebase';
import firestore from 'firebase';
import "firebase/firestore";
import NetInfo from '@react-native-community/netinfo';
import MapView from 'react-native-maps';

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
                image: null,
                location: null,
            },
            isConnected: false,
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

    /**
  * displays the communication features
  * @function renderCustomActions
  */
    renderCustomActions = (props) => <CustomActions {...props} />;

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

    //Delete messages form AsynStorage
    async deleteMessages() {
        try {
            await AsyncStorage.removeItem('messages');
            this.setState({
                messages: []
            })
        } catch (error) {
            console.log(error.message);
        }
    }

    //Save messages into AsychStorage
    async saveMessages() {
        try {
            await AsyncStorage.setItem('messages', JSON.stringify(this.state.messages));
        } catch (error) {
            console.log(error.message);
        }
    }

    //when a message is sent, calls saveMessage
    onSend(messages = []) {
        this.setState((previousState) => ({
            messages: GiftedChat.append(previousState.messages, messages),
        }), () => {
            this.addMessage();
            this.saveMessages();//<-----------new for asynch, should it go here?
        });
    }


    componentDidMount() {

        //when component mounts, display user name in the title
        const name = this.props.route.params.name;
        this.props.navigation.setOptions({ title: name });

        //take snapshot of messages collection in the Firestone Database
        this.referenceChatMessages = firebase.firestore().collection('messages');
        this.unsubscribe = this.referenceChatMessages.onSnapshot(this.onCollectionUpdate)

        //Check if user is connected
        NetInfo.fetch().then(connection => {
            if (connection.isConnected) {
                this.setState({ isConnected: true });
                console.log('online');
            } else {
                console.log('offline');
            }


            //User Authentication on Firebase
            this.authUnsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
                if (!user) {
                    await firebase.auth().signInAnonymously();
                }
                this.setState({
                    uid: user.uid,
                    messages: [],
                    user: {
                        _id: user.uid,
                        name: name,
                        avatar: "https://placeimg.com/140/140/any",
                    },
                });
                this.unsubscribe = this.referenceChatMessages
                    .orderBy("createdAt", "desc")
                    .onSnapshot(this.onCollectionUpdate);
            });
        });
    }

    //Get Messages from AsyncStorage if user is offline
    async getMessages() {
        let messages = '';
        try {
            messages = await AsyncStorage.getItem('messages') || [];
            this.setState({
                messages: JSON.parse(messages)
            });
        } catch (error) {
            console.log(error.message);
        }
    };

    componentWillUnmount() {
        // close connections when user is connected 
        if (this.state.isConnected) {
            this.unsubscribe();
            this.authUnsubscribe();
        }
    }


    // When user is offline disable sending new messages 
    renderInputToolbar(props) {
        if (this.state.isConnected == false) {
        } else {
            return (
                <InputToolbar
                    {...props}
                />
            );
        }
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


    //Custom Map View
    renderCustomView(props) {
        const { currentMessage } = props;
        if (currentMessage.location) {
            return (
                <MapView
                    style={{
                        width: 150,
                        height: 100,
                        borderRadius: 13,
                        margin: 3
                    }}
                    region={{
                        latitude: currentMessage.location.latitude,
                        longitude: currentMessage.location.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                />
            );
        }
        return null;
    }

    render() {
        let bgColor = this.props.route.params.bgColor;
        return (
            <View style={{ flex: 1, backgroundColor: bgColor }}>
                <GiftedChat
                    renderCustomView={this.renderCustomView}
                    renderActions={this.renderCustomActions}
                    renderBubble={this.renderBubble.bind(this)}
                    renderUsernameOnMessage={true}
                    renderInputToolbar={this.renderInputToolbar.bind(this)}
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
