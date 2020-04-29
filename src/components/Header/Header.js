import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Header = ({ headerTitle }) => {
    const { textHeader, viewHeader } = styles
    return (
        <View style={viewHeader}>
            <Text style={textHeader}>{headerTitle}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    textHeader: {
        fontSize: 20
    },
    viewHeader: {
        backgroundColor: '#f8f8f8',
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.5,
        elevation: 1
    }
})

export default Header
