Necessary libraries to install.
React navigation and dependencies
npm install --save react-navigation npm install @react-navigation/native @react-navigation/stack expo install react-native-reanimated react-native-gesture-handler react-native-screens react-native-safe-area-context @react-native-community/masked-view

Svg Support
npm i react-native-svg

Keyboard aware scroll
npm i react-native-keyboard-aware-scroll-view --save

Gifted Chat library
npm install react-native-gifted-chat --save

React-Native async storage
expo install @react-native-async-storage/async-storage

NetInfo package
npm install --save @react-native-community/netinfo

Expo's ImagePicker API
expo install expo-image-picker

Expo's Location API and react-native-maps
expo install expo-location expo install react-native-maps

Personal reflections on the project
Working on this project I had to spend quite a lot of time troubleshooting and learning how to use the latest version of firestore for React-Native (as usual, it's one thing to read the Documentation of a Library or a tool or a framwork, but it's oftentimes a lot more work to actually understand how to implement the features and the commands correctly!). Tasks included creating two separate screens (a "start" screen and a "chat" screen); allowing users to "register" anonymously and chose whether to "logout" and "register" again, or remain on the current session; allowing users to pick a background color for their chat screen; allowing users to view their messages while offline and being able to send pictures/location data along with text messages. Something I would do differently if i were to re-do this project is the authentication process, as I'd much rather be able to save some kind of customised user data to keep track of my users (since currently they're anonymous, only an ID is saved). I would also like to integrate a voice note feature. Nonetheless, I've definitely learned a lot through this mini-project as is!