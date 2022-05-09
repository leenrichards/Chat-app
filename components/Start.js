import React from 'react';
import { View, Text, Button, TextInput, StyleSheet, ImageBackground, Pressable, TouchableOpacity } from 'react-native';

//------------Background colors--------------------


import backgroundImage from "../assets/BackgroundImage.png";

//--------------Start Component---------------------
export default class Start extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            bgColor: this.colors.pink
        };
    }

    //Color options for user to chose from
    colors = {
        /* black: "#090C08",
         purple: "#474056",
         grey: "#8A95A5",
         green: "#B9C6AE",
         */

        red: "#890000",
        green: "#1DA01B",
        gold: "#9D7F15",
        blue: "#1B70A0",
        pink: "#757083"
    };

    // Update the state with the new background color the user chose
    changeBgColor = (newColor) => {
        this.setState({ bgColor: newColor });
    };

    render() {
        return (
            <View style={styles.container}>

                <ImageBackground
                    source={backgroundImage}
                    resizeMode="cover"
                    t style={styles.backgroundImage}
                >

                    <View style={styles.titleBox}>
                        <Text style={styles.title}>Let's Chat!</Text>
                    </View>


                    <View style={styles.containerbox}>
                        <View style={styles.inputBox}>
                            <TextInput
                                style={styles.input}
                                onChangeText={(text) => this.setState({ name: text })}
                                value={this.state.name}
                                placeholder="Please enter your name"

                            />
                        </View>

                        {/* Allow user to choose a background color for the chat screen */}
                        <View style={styles.colorBox}>
                            <Text style={styles.colorText}>Choose your background color!</Text>
                        </View>

                        {/* All the colors to change the background are here! */}
                        <View style={styles.colorArray}>
                            <TouchableOpacity
                                style={styles.color1}
                                onPress={() => this.changeBgColor(this.colors.red)}
                            ></TouchableOpacity>
                            <TouchableOpacity
                                style={styles.color2}
                                onPress={() => this.changeBgColor(this.colors.green)}
                            ></TouchableOpacity>
                            <TouchableOpacity
                                style={styles.color3}
                                onPress={() => this.changeBgColor(this.colors.gold)}
                            ></TouchableOpacity>
                            <TouchableOpacity
                                style={styles.color4}
                                onPress={() => this.changeBgColor(this.colors.blue)}
                            ></TouchableOpacity>
                        </View>

                        <Pressable
                            style={styles.button}
                            onPress={() =>
                                this.props.navigation.navigate("Chat", {
                                    name: this.state.name,
                                    bgColor: this.state.bgColor

                                })
                            }
                        >
                            <Text style={styles.buttontext}>Start Chatting</Text>
                        </Pressable>


                    </View>
                </ImageBackground>
            </View>
        )
    }
}

// -----------Stylesheet-----------------
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    colorText: {
        color: '#757083',
        fontSize: 16,
        fontWeight: '300',

    },

    backgroundImage: {
        flex: 1,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
    },

    titleBox: {
        height: "50%",
        width: "88%",
        alignItems: "center",
        paddingTop: 100,
    },

    title: {
        fontSize: 45,
        fontWeight: "600",
        color: "#FFFFFF",
    },

    containerbox: {
        backgroundColor: "white",
        height: "46%",
        width: "88%",
        justifyContent: "space-around",
        alignItems: "center",
    },

    inputBox: {
        borderWidth: 2,
        borderRadius: 1,
        borderColor: "grey",
        width: "88%",
        height: 60,
        paddingLeft: 20,
        flexDirection: "row",
        alignItems: "center",
    },

    image: {
        width: 20,
        height: 20,
        marginRight: 10,
    },

    input: {
        fontSize: 16,
        fontWeight: "300",
        color: "#757083",
        opacity: 0.5,
    },

    colorBox: {
        marginRight: "auto",
        paddingLeft: 20,
        width: "88%",
    },

    chooseColor: {
        fontSize: 16,
        fontWeight: "300",
        color: "#757083",
        opacity: 1,
    },

    colorArray: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "80%",
    },

    color1: {
        backgroundColor: "#890000",
        width: 50,
        height: 50,
        borderRadius: 25,
    },

    color2: {
        backgroundColor: "#1DA01B",
        width: 50,
        height: 50,
        borderRadius: 25,
    },

    color3: {
        backgroundColor: "#9D7F15",
        width: 50,
        height: 50,
        borderRadius: 25,
    },

    color4: {
        backgroundColor: "#1B70A0",
        width: 50,
        height: 50,
        borderRadius: 25,
    },

    color5: {
        backgroundColor: "#1B70A0",
        width: 50,
        height: 50,
        borderRadius: 25,
    },

    button: {
        width: "88%",
        height: 70,
        borderRadius: 8,
        backgroundColor: "#757083",
        alignItems: "center",
        justifyContent: "center",
    },

    buttontext: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "600",
    },
});