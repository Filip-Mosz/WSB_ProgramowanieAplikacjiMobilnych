import {StatusBar} from 'expo-status-bar';
import {Platform, StyleSheet, TouchableOpacity} from 'react-native';

import {Text, View} from '@/components/Themed';
import {useStore} from '@/src/store/useStore';
import {router} from "expo-router";

export default function ModalScreen() {

    const logout = useStore((state) => state.logout);

    const handleLogout = () => {
        logout();
        router.replace('/login');
    };

    return (<View style={styles.container}>

            <TouchableOpacity
                style={styles.logoutButton}
                onPress={handleLogout}
                activeOpacity={0.7}
            >
                <Text style={styles.logoutText}>Wyloguj się</Text>
            </TouchableOpacity>
            <View
                style={styles.separator}
                lightColor="#eee"
                darkColor="rgba(255,255,255,0.1)"
            />
                <Text>Autor:</Text>
                <Text> Filip Moszczyński</Text>
                <Text> WZ_ININ5(hybryda)_PR2 </Text>



            <StatusBar
                style={Platform.OS === 'ios' ? 'light' : 'auto'}
            />
        </View>


    );
}

const styles = StyleSheet.create({
    container: {flex: 1, alignItems: 'center', justifyContent: 'center',},

    title: {fontSize: 20, fontWeight: 'bold',},

    logoutButton: {
        backgroundColor: '#DC2626',
        paddingVertical: 14,
        paddingHorizontal: 35,
        borderRadius: 10,
        marginTop: 20,
    },

    logoutText: {color: '#FFFFFF', fontSize: 16, fontWeight: 'bold',},

    separator: {marginVertical: 30, height: 1, width: '80%',},
});