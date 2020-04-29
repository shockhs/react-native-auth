import React, { useCallback, useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import firebase from '../../data/firebase';
import Spinner from '../commons/Spinner';

const AuthForm = () => {
    const mount = useRef(false);
    const [isMounted, setIsMounted] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isFetching, setIsFetching] = useState(false);
    const [error, setError] = useState('');
    const [forceLogin, setForceLogin] = useState(false);
    useEffect(() => {
        if (isMounted) {
            setIsFetching(true);
            setError('');
            firebase.auth().signInWithEmailAndPassword(email, password)
                .then(() => { successfulRequest() })
                .catch(() => {
                    firebase.auth().createUserWithEmailAndPassword(email, password)
                        .then(() => { successfulRequest() })
                        .catch(() => {
                            setError('Authentication Failed');
                            setIsFetching(false)
                        })
                })
        }
    }, [forceLogin]);
    useEffect(() => {
        mount.current = true;
        setIsMounted(true);
        return () => {
            mount.current = false;
        };
    }, []);
    const successfulRequest = useCallback(() => {
        setIsFetching(false);
        setError('');
        setEmail('');
        setPassword('');
    }, [isMounted])
    return (
        <View style={styles.viewStyle}>
            <View style={styles.viewInputStyle}>
                <Text style={styles.labelStyle}>Email</Text>
                <TextInput
                    style={styles.textInput}
                    placeholder="example@mail.ru"
                    autoCorrect={false}
                    value={email}
                    onChangeText={(value) => setEmail(value)} />
            </View>
            <View style={styles.viewInputStyle}>
                <Text style={styles.labelStyle}>Password</Text>
                <TextInput
                    style={styles.textInput}
                    secureTextEntry={true}
                    placeholder="password"
                    autoCorrect={false}
                    value={password}
                    onChangeText={(value) => setPassword(value)} />
            </View>
            {error !== ''
                ? <View style={styles.viewInputStyle}>
                    <Text style={styles.errorStyle}>{error}</Text>
                </View>
                : null}
            {!isFetching
                ? <TouchableOpacity style={styles.buttonStyle} onPress={() => setForceLogin(!forceLogin)}>
                    <Text style={styles.buttonText}>Log in</Text>
                </TouchableOpacity>
                : <View style={{ marginVertical: 20 }}><Spinner size='large' /></View>}
        </View >
    );
}

const styles = StyleSheet.create({
    viewStyle: {
        marginHorizontal: 10,
        marginTop: 10
    },
    textInput: {
        flex: 2
    },
    labelStyle: {
        flex: 1,
        marginLeft: 15
    },
    errorStyle: {
        textAlign: 'center',
        color: 'red',
        marginVertical: 2,
        fontWeight: '700'
    },
    viewInputStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        borderColor: '#007aff',
        borderWidth: 1
    },
    buttonStyle: {
        alignSelf: 'stretch',
        backgroundColor: '#fff',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#007aff',
        marginVertical: 5
    },
    buttonText: {
        fontSize: 16,
        color: '#007aff',
        alignSelf: 'center',
        paddingVertical: 10,
        fontWeight: '700'
    }
})

export default AuthForm;