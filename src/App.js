/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */


import React, { useEffect, useState } from 'react';
import { Button, SafeAreaView, StatusBar, StyleSheet, View } from 'react-native';
import AuthForm from './components/AuthForm/AuthForm';
import Spinner from './components/commons/Spinner';
import Header from './components/Header/Header';
import firebase from './data/firebase';


const App = () => {
    const [isAuth, setIsAuth] = useState(null);
    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) setIsAuth(true)
            else setIsAuth(false)
        })
        return () => {

        };
    }, []);
    return (
        <>
            <StatusBar />
            <SafeAreaView>
                <Header headerTitle='Auth App' />
                {isAuth === null
                    ? <View style={styles.loadingBar}><Spinner size="large" /></View>
                    : (isAuth
                        ? <Button onPress={() => { setIsAuth(null); firebase.auth().signOut() }} title="Log out" />
                        : <AuthForm />)}
            </SafeAreaView>
        </>
    )
}


const styles = StyleSheet.create({
    loadingBar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default App