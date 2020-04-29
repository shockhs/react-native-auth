import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';


const Spinner = ({ size = 'medium' }) => {
    return (
        <View style={styles.spinnerStyle}>
            <ActivityIndicator site={size} />
        </View>
    );
}

const styles = StyleSheet.create({
    spinnerStyle: {
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default Spinner;