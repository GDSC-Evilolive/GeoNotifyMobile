import { StyleSheet } from 'react-native';

export const lightHomepage = StyleSheet.create({
    screenView: {
        flex: 2,
        backgroundColor: 'white',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        overflow: 'hidden',
        alignItems: 'center',
        paddingBottom: 245,
    },
    line: {
        width: 200,
        height: 5,
        backgroundColor: '#181823',
        alignSelf: 'center',
        marginVertical: 15,
        borderRadius: 5,
    },
    bar: {
        width: 300,
        height: 30,
        alignSelf: 'center',
    },
    name: {
        height: 110,
        backgroundColor: '#537FE7',
        paddingTop: 15,
        paddingLeft: 25,
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
    },
    nameText: {
        color: '#E9F8F9',
        fontSize: 30,
        fontWeight: '700',
        fontFamily: 'Jost',
        textTransform:'uppercase',
    },
    helloText: {
        color: '#E9F8F9',
        fontSize: 30,
        fontFamily: 'Jost',
    },
    reminderRow: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    swipe: {
        fontSize: 14,
        fontWeight: '600',
        color: '#6A6A73',
    },
    remindersText: {
        fontSize: 16,
        color: '#6A6A73',
        fontWeight: '700',
    },
    sortContainer: {
        flexDirection: 'row',
        width: 134,
        height: 40,
        padding: 10,
        justifyContent: 'space-between',
        backgroundColor: "#EFF3F5",
        borderWidth: 1,
        borderColor: '#BBBBC5',
        borderRadius: 8,
        zIndex: 20, // Ensure the sortContainer is above the reminderContainer
    },
    dropdown: {
        position: 'absolute',
        top: 33, // Adjust this value according to your design
        left: -1, // Adjust this value according to your design
        width: 134,
        backgroundColor: "#EFF3F5",
        borderWidth: 1,
        borderColor: '#BBBBC5',
        borderBottomRightRadius: 8,
        borderBottomLeftRadius: 8,
        paddingTop: 20,
        paddingBottom: 20,
        zIndex: 30, // Ensure the dropdown is above the reminderContainer
    },
    dropdownItem: {
        width: 133,
        height: 40,
    },
    highlight: {
        backgroundColor: '#537FE7',
        color: '#FFFFFF', 
        width: 133,
        height: 40,
    },
    dropdownText: {
        fontSize: 16,
        color: '#6A6A73',
        padding: 10,
    },
    sortText: {
        fontSize: 16,
        color: '#6A6A73',
    },
    reminderContainer: {
        marginTop: 10,
        width: 344,
        height: 475,
        backgroundColor: '#EFF3F5',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#BBBBC5',
        position: 'relative', // Ensure the reminderContainer doesn't obscure other elements
        zIndex: 10,
    },
    flexRow: {
        paddingTop: 15,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        zIndex: 40,
    },
    reminderSection: {
        height: 75,
        width: 310,
        backgroundColor: 'white',
        borderRadius: 10,
        marginTop: 10,
        marginLeft: 10,
    },
    reminderName: {
        color: '#537FE7',
        fontWeight: '600',
        fontSize: 20,
        paddingLeft: 5,
        paddingTop: 5,
    },
    dateContainer: {
        height: 30,
        width: 80,
        backgroundColor: '#A4D3D7',
        borderRadius: 4,
        marginRight: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
    },
    date: {
        color: '#FFFFFF',
        fontSize: 15,
    },
    descriptionContainer: {
        height: 38,
        width: 220,
        paddingLeft: 5,
    },


    mapFlex: {
        flex: 1,
        flexDirection: 'row',
        justifyContent:'space-between',
        padding: 15,
    },
    logoFlex:{
        flex: 1,
        flexDirection: 'column',
    },
    logoMap: {
        width: 96,
        height: 36,
        
    },
    reminderFlex: {
        flex: 1,
        flexDirection: 'column',
        gap: 14,
        height: 289,
    },
    dashboard:{
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        height: 87,
        width: 102,
        padding: 15,
        flex: 1,
        flexDirection: 'column',
    },
    dashboardFlex: {
        flex: 1,
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    dashboardIcon: {
        height: 32,
        width: 32,
    },
});