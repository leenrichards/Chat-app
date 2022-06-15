# Chat-app Objective
To build a chat app for mobile devices using React Native. The app will provide users with a chat interface and options to share images and their location

# Technologies
- React Native
- Javascript
- Expo
- Gifted Chat
- Google Firebase

# User Stories 

- As a new user, I want to be able to easily enter a chat room so I can quickly start talking to my friends and family.
- As a user, I want to be able to send messages to my friends and family members to exchange the latest news.
- As a user, I want to send images to my friends to show them what I’m currently doing.
- As a user, I want to share my location with my friends to show them where I am.
- As a user, I want to be able to read my messages offline so I can reread conversations at any time.
- As a user with a visual impairment, I want to use a chat app that is compatible with a screen reader so that I can engage with a chat interface.

# Features

- A page where users can enter their name and choose a background color for the chat screen before joining the chat.
- A page displaying the conversation, as well as an input field and submit button.
- The chat must provide users with two additional communication features: sending images and location data.
- Data gets stored online and offline.

# Screenshot

![Screenshot](https://github.com/leenrichards/Chat-app/blob/main/img/screenshot.png)

# Development environment setup

- Make sure expo-cli is installed globally:
```npm install expo-cli --global```

- Initialize project:
```expo init "Chat-app"```

# Launch via emulator (Android Studio (Windows) or XCode (iOS)), or a mobile phone

- Launch:
```npm start``` or ```expo start```

# Database configuration
Chat-app makes use of Cloud Firestore, a real-time database which synchronizes data across multiple devices and stores it in Firebase's Cloud.

```npm install --save firebase (current version: "^9.8.1")```

# Necessary libraries to install

- React navigation and dependencies
```npm install --save react-navigation``` 

- Gifted Chat library
```npm install react-native-gifted-chat --save```

- React-Native async storage
```expo install @react-native-async-storage/async-storage```

- NetInfo package
```npm install --save @react-native-community/netinfo```

- Expo's ImagePicker API
```expo install expo-image-picker```

- Expo's Location API and react-native-maps
```expo install expo-location expo install react-native-maps```

# Installation Instructions

- Navigate to the project root folder
- Run "expo start" or "npm start"
Expo will build the project and display development options in a browser window.
- Scan the QR Code in the development options with the app 
OR
- Download the Expo Go App and view project on your device
Note that the app can also be run through an emulator on your desktop via Expo.



