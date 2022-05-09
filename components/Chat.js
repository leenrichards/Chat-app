import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';


export default class Chat extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const name = this.props.route.params.name;
        this.props.navigation.setOptions({ title: name });
    }

    render() {
        let bgColor = this.props.route.params.bgColor;
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: bgColor }}>
                <Button
                    title="Go to Start"
                    onPress={() => this.props.navigation.navigate("Start")}
                />
                <Text>Welcome to Chat!</Text>
            </View>
        );
    }
}