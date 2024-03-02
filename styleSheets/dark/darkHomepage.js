import { StyleSheet } from 'react-native';

export const darkHomepage = StyleSheet.create({
    screenView: {
        flex: 2,
        backgroundColor: '#181823',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        overflow: 'hidden',
        alignItems: 'center',
        paddingBottom: 245,
    },
    line: {
        width: 200,
        height: 5,
        backgroundColor: 'white',
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
    reminderColumn: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'start',
        justifyContent: 'space-between',
    },
    swipe: {
        fontSize: 14,
        fontWeight: '600',
        color: '#EFF3F5',
    },
    remindersText: {
        fontSize: 16,
        color: '#EFF3F5',
        fontWeight: '700',
    },
    sortContainer: {
        flexDirection: 'row',
        width: 134,
        height: 40,
        padding: 10,
        justifyContent: 'space-between',
        backgroundColor: "#273B4A",
        borderWidth: 1,
        borderColor: '#BBBBC5',
        borderRadius: 8,
        zIndex: 20, 
    },
    dropdown: {
        position: 'absolute',
        top: 33, 
        left: -1, 
        width: 134,
        backgroundColor: "#273B4A",
        borderWidth: 1,
        borderColor: '#BBBBC5',
        borderBottomRightRadius: 8,
        borderBottomLeftRadius: 8,
        paddingTop: 20,
        paddingBottom: 20,
        zIndex: 30, 
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
        color: '#F5F5F5',
        padding: 10,
    },
    sortText: {
        fontSize: 16,
        color: '#F5F5F5',
    },
    reminderContainer: {
        marginTop: 10,
        width: 344,
        height: 475,
        backgroundColor: '#273B4A',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#BBBBC5',
        position: 'relative',
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
        height: 100,
        width: 310,
        backgroundColor: 'white',
        borderRadius: 10,
    },
    reminderSwipe:{
        width: '100%',
        marginTop: 10,
        height: 100,
    },
    reminderName: {
        color: '#537FE7',
        fontWeight: '600',
        fontSize: 20,
        paddingLeft: 5,
        paddingTop: 5,
    },
    dateContainer: {
        height: '20%',
        width:'40%',
        backgroundColor: '#A4D3D7',
        borderRadius: 4,
        marginRight: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 10,
    },
    date: {
        color: '#FFFFFF',
        fontSize: 15,
    },
    descriptionContainer: {
        height: 38,
        width: 260,
        paddingLeft: 5,
    },


    mapFlex: {
        flex: 1,
        flexDirection: 'row',
        justifyContent:'space-between',
        paddingTop: 15,
        paddingLeft: 15,
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
        backgroundColor: '#181823',
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
    dashboardText: {
        color: '#FFFFFF',
    }
});