import { StyleSheet } from "react-native";
import {white,
        red,
        black,
        grey,
        coral,
        lightGrey,
        darkGrey,
        GreyUseForButton,
        ButtonBackground,
    } from '../../../utilities/colors';
import{buttonFont,
       NameFont,
       EmailFont,
    }from "../../../utilities/textfont";


export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
    ScrollView: {

    },
    headerWrapper: {
        flexDirection: "row",
        alignItems: 'center', 
        padding: 40,
    },
    profileImage: {
        width: 80,
        height: 80,
        borderRadius: 15,
        marginRight: 22,
        marginTop: 20,
    },
    userInfoContainer: {
        flexDirection: 'column',
    },
    userName: {
        fontSize: 20,
        fontWeight: "500",
        fontFamily: NameFont,
        color: darkGrey,
    },
    UserNewName: {
        fontSize: 20,
        fontWeight: "600",
        fontFamily: NameFont,
        color: darkGrey,
    },
    userEmail: {
        fontSize: 16,
        fontWeight: "700",
        fontFamily: EmailFont,
        color: lightGrey,
        marginTop: 5,
    },
    userLinksContainer: {
        flexDirection: "row", 
        marginTop: 5,
        justifyContent: 'center',  
        paddingHorizontal: 20, 
    },
    userLinks: {
        fontSize: 18,
        fontWeight: '700',
        fontFamily: buttonFont,
        color: GreyUseForButton,
    },
    goToLinkImage: {
        width: 30,
        height: 30,
        marginLeft: 10,
    },
    box: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: ButtonBackground,  
        borderRadius: 15,
        padding: 15,
        shadowColor: "#fff",
        width: '50%',  
        marginHorizontal: 1,
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.5,
        shadowRadius: 1.41,
        elevation: 2,
        marginTop: 10,
      },
      settingBarContainer: {
        flexDirection: "column",
        alignItems: 'center', 
        padding: 40,
        justifyContent: 'space-between',
      },
      longBarText: {
        fontSize: 18,
        fontWeight: '700',
        color: GreyUseForButton,
        textAlign: 'left',
        fontFamily: buttonFont,
      },
      UserNewNameText: {
        fontSize: 18,
        fontWeight: '700',
        color: GreyUseForButton,
        textAlign: 'left',
        fontFamily: buttonFont,
      },
      longBoxIcon: {
        textAlign: 'right',
        marginRight: 15,
      },
      longBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: ButtonBackground,
        borderRadius: 15,
        padding: 10,
        shadowColor: "#fff",
        width: '114%',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.5,
        shadowRadius: 1.41,
        elevation: 2,
        marginBottom: 5,
    },
    UserNewNameBox: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: ButtonBackground,
        borderRadius: 15,
        padding: 10,
        shadowColor: "#fff",
        width: '114%',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.5,
        shadowRadius: 1.41,
        elevation: 2,
        marginBottom: 5,
    },
    gobackBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: white,
        padding: 10,
        shadowColor: "#fff",
        width: '100%',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.5,
        shadowRadius: 1.41,
        elevation: 2,
        marginBottom: 5,
        
    },
    doneBox: {
        borderRadius: 20,
        width: 60,
        marginRight: 10,
        backgroundColor: black,
        padding: 10,
        shadowColor: "#fff",
    },
    doneText: {
        fontSize: 15,

        fontWeight: '700',
        color: white,
        textAlign: 'center',
        fontFamily: buttonFont,
    },

    signOutContainer: {

        bottom: 0,
        padding: 40,
        marginTop: 380,           
        flexDirection: 'row', 
        justifyContent: 'center', 
        alignItems: 'center',     
    },
    signOutBox: {
        flexDirection: 'row',     
        justifyContent: 'center', 
        alignItems: 'center',    
        backgroundColor: ButtonBackground,
        borderRadius: 15,
        padding: 10,
        shadowColor: "#fff",
        width: '114%',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.5,
        shadowRadius: 1.41,
        elevation: 2,
        marginBottom: 5,
       
    },
    signOutText: {
        fontSize: 18,
        fontWeight: '700',
        color: red,              
        fontFamily: buttonFont,
        textAlign: 'center',     
    },

    



});