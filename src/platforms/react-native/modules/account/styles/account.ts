import {Dimensions, StyleSheet} from "react-native";

const deviceHeight = Dimensions.get("window").height;
const deviceWidth  = Dimensions.get("window").width;

export default StyleSheet.create(
    {
        loginContainer: {
            flex: 1,
            backgroundColor: "transparent",
            justifyContent: "center",
            alignItems: "center"
        },
        formContent: {
            justifyContent: "center",
            alignItems: "center",
            width: deviceWidth / 2
        },
        socialLoginContent: {
            alignItems: "center"
        },
        socialButton: {
            minWidth: 250,
            maxWidth: 300,
            width: deviceWidth / 4,
            height: 50,
            justifyContent: "center",
            marginBottom: 15
        },
        socialTextSignin: {
            color: "#e2e2e2",
            fontSize: 20,
            marginTop: 10,
            marginBottom: 20,
            fontWeight: "500"
        },
        buttonIcon: {
            marginLeft: 10,
            position: "relative",
            opacity: .8,
            fontSize: 20,
            color: "white",
            backgroundColor: "transparent"
        },
        
        accountContent: {
            width: deviceWidth * 3 / 8
        },
        accountContentButtonContainer: {
            flexDirection: "row",
            marginTop: 10
        },
        accountContentButton: {
            width: "100%",
            justifyContent: "center",
            height: 35
        },
        accountContentTextButton: {
            color: "#1a1a1a"
        },
        textInputEmail: {
            backgroundColor: "white",
            height: 40,
            borderColor: "gray",
            borderBottomWidth: 1,
            paddingLeft: 10,
            borderTopLeftRadius: 7,
            borderTopRightRadius: 7
        },
        textInputPassword: {
            backgroundColor: "white",
            height: 40,
            borderColor: "gray",
            borderBottomWidth: 1,
            paddingLeft: 10,
            borderBottomRightRadius: 7,
            borderBottomLeftRadius: 7
        },
        forgotPassText: {
            alignItems: "center",
            marginTop: 10
        },
        forgotPassTextField: {
            color: "#516be4",
            textDecorationLine: "underline",
            fontSize: 16,
            fontWeight: "bold"
        },
        
        termText: {
            alignItems: "center",
            marginTop: 10
        },
        termTextField: {
            color: "#e7e7e7",
            fontSize: 15
        }
    }
);
