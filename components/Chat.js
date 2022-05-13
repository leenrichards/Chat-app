import React from 'react';
import { View, Text, Button, Platform, KeyboardAvoidingView, StyleSheet } from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat'

export default class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
        }
    }

    componentDidMount() {

        //when component mounts, display user name in the title
        const name = this.props.route.params.name;
        this.props.navigation.setOptions({ title: name });

        //set reply, and system messages
        this.setState({
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

        })
    }

    // Change the color of the user/right bubble 
    renderBubble(props) {
        return (
            <Bubble
                {...props}
                wrapperStyle={{
                    right: {
                        backgroundColor: 'black'
                    }
                }}
            />
        )
    }

    // When seinding, append old messages to new message
    onSend(messages = []) {
        this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, messages),
        }))
    }


    render() {
        let bgColor = this.props.route.params.bgColor;
        return (
            <View style={{ flex: 1, backgroundColor: bgColor }}>
                <GiftedChat
                    renderBubble={this.renderBubble.bind(this)}
                    messages={this.state.messages}
                    onSend={messages => this.onSend(messages)}
                    user={{
                        _id: 1,
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
