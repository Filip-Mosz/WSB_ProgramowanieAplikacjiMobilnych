import React, { useState } from "react";
import{
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StatusBar,
} from 'react-native';
import {useStore} from "@/src/store/useStore";
import {container} from "@/src/di/container";
import {router} from "expo-router";

export default function LoginScreen(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');

    const login = useStore((state) => state.login);
    const handleLogin = async () => {
        setError('');

        if (!username.trim() || !password) {
            Alert.alert('Błąd', 'Wypełnij wszystkie pola.');
            return;
        }
        try{
            setLoading(true);
            const user = await container.loginUserUseCase.execute(
                username, password
            );
            login(user.username);//zapisanie uzytkownika w globalnym stanie aplikacji

            router.replace('/(tabs)');//przejście do ekranu głównego
        } catch (error){
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError('Wystąpił nieoczekiwany błąd.');
            }
        } finally {
            setLoading(false);
        }

    };

    return (

        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >

            <StatusBar
                barStyle="dark-content"
            />

            <ScrollView
                contentContainerStyle={styles.scrollContent}
                keyboardShouldPersistTaps="handled"
            >

                <View style={styles.card}>

                    {/* LOGO */}

                    <View style={styles.logoContainer}>

                        <Text style={styles.logoIcon}>🚌</Text>

                        <Text style={styles.logoText}>
                            Stop Scout
                        </Text>

                    </View>

                    {/* NAGŁÓWEK */}

                    <Text style={styles.title}>
                        Witaj ponownie!
                    </Text>

                    <Text style={styles.subtitle}>
                        Zaloguj się, aby korzystać z aplikacji.
                    </Text>

                    {/* LOGIN */}

                    <Text style={styles.label}>
                        Login
                    </Text>

                    <TextInput
                        style={styles.input}
                        placeholder="Wprowadź login"
                        placeholderTextColor="#9CA3AF"
                        value={username}
                        onChangeText={(text) => {
                            setUsername(text);
                            setError('');
                        }}
                        autoCapitalize="none"
                        autoCorrect={false}
                        editable={!loading}
                        returnKeyType="next"
                    />

                    {/* HASŁO */}

                    <Text style={styles.label}>
                        Hasło
                    </Text>

                    <View style={styles.passwordContainer}>

                        <TextInput
                            style={styles.passwordInput}
                            placeholder="Wprowadź hasło"
                            placeholderTextColor="#9CA3AF"
                            value={password}
                            onChangeText={(text) => {
                                setPassword(text);
                                setError('');
                            }}
                            secureTextEntry={!showPassword}
                            autoCapitalize="none"
                            editable={!loading}
                            returnKeyType="done"
                            onSubmitEditing={handleLogin}
                        />

                        <TouchableOpacity
                            onPress={() => setShowPassword(!showPassword)}
                            disabled={loading}
                        >

                            <Text style={styles.showPassword}>
                                {showPassword ? 'Ukryj' : 'Pokaż'}
                            </Text>

                        </TouchableOpacity>

                    </View>

                    {/* KOMUNIKAT O BŁĘDZIE */}

                    {Boolean(error) && (

                        <View style={styles.errorContainer}>

                            <Text style={styles.errorText}>
                                {error}
                            </Text>

                        </View>

                    )}

                    {/* PRZYCISK LOGOWANIA */}

                    <TouchableOpacity
                        style={[
                            styles.loginButton,
                            loading && styles.disabledButton,
                        ]}
                        onPress={handleLogin}
                        disabled={loading}
                        activeOpacity={0.8}
                    >

                        {loading ? (

                            <ActivityIndicator color="#FFFFFF" />

                        ) : (

                            <Text style={styles.loginButtonText}>
                                Zaloguj się
                            </Text>

                        )}

                    </TouchableOpacity>

                    {/* REJESTRACJA */}

                    <View style={styles.registerContainer}>

                        <Text style={styles.registerInfo}>
                            Nie masz jeszcze konta?
                        </Text>

                        <TouchableOpacity
                            onPress={() => router.push('/register')}
                            disabled={loading}
                        >

                            <Text style={styles.registerLink}>
                                Zarejestruj się
                            </Text>

                        </TouchableOpacity>

                    </View>

                </View>

            </ScrollView>

        </KeyboardAvoidingView>

    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#F3F6FA',
    },

    scrollContent: {
        flexGrow: 1,
        justifyContent: 'center',
        padding: 24,
    },

    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 22,
        padding: 25,

        elevation: 5,

        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.08,
        shadowRadius: 10,
    },

    logoContainer: {
        alignItems: 'center',
        marginBottom: 35,
    },

    logoIcon: {
        fontSize: 48,
        marginBottom: 8,
    },

    logoText: {
        fontSize: 27,
        fontWeight: 'bold',
        color: '#2563EB',
    },

    title: {
        fontSize: 27,
        fontWeight: 'bold',
        color: '#1F2937',
        textAlign: 'center',
    },

    subtitle: {
        fontSize: 14,
        color: '#6B7280',
        textAlign: 'center',
        marginTop: 10,
        marginBottom: 30,
    },

    label: {
        fontSize: 14,
        fontWeight: '600',
        color: '#374151',
        marginBottom: 8,
    },

    input: {
        height: 52,
        backgroundColor: '#F9FAFB',
        borderWidth: 1,
        borderColor: '#D1D5DB',
        borderRadius: 11,
        paddingHorizontal: 15,
        fontSize: 15,
        marginBottom: 20,
        color: '#111827',
    },

    passwordContainer: {
        height: 52,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F9FAFB',
        borderWidth: 1,
        borderColor: '#D1D5DB',
        borderRadius: 11,
        paddingHorizontal: 15,
        marginBottom: 15,
    },

    passwordInput: {
        flex: 1,
        fontSize: 15,
        color: '#111827',
    },

    showPassword: {
        color: '#2563EB',
        fontWeight: '600',
        fontSize: 13,
    },

    errorContainer: {
        backgroundColor: '#FEE2E2',
        padding: 12,
        borderRadius: 9,
        marginBottom: 15,
    },

    errorText: {
        color: '#B91C1C',
        fontSize: 13,
        textAlign: 'center',
    },

    loginButton: {
        height: 54,
        backgroundColor: '#2563EB',
        borderRadius: 11,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },

    disabledButton: {
        opacity: 0.6,
    },

    loginButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },

    registerContainer: {
        marginTop: 27,
        alignItems: 'center',
    },

    registerInfo: {
        fontSize: 13,
        color: '#6B7280',
    },

    registerLink: {
        color: '#2563EB',
        fontWeight: 'bold',
        marginTop: 7,
        fontSize: 14,
    },

});