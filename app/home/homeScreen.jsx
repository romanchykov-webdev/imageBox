import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {FontAwesome6} from "@expo/vector-icons";
import {theme} from "../../constants/theme";
import {hp, wp} from "../../helpers/common";

const HomeScreen = () => {

    const {top} = useSafeAreaInsets();

    const paddingTop = top > 0 ? top + 20 : 40;


    return (
        <View style={[styles.container, {paddingTop}]}>
        {/*    header   */}
            <View style={styles.header}>
                <TouchableOpacity>
                    <Text style={styles.title}>
                        <Text style={styles.textAccent}>I</Text>mage
                        <Text style={styles.textAccent}>B</Text>ox
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity>
                    <FontAwesome6 name="bars-staggered" size={22} color={theme.colors.neutral(0.7)} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 15
    },
    header:{
        marginHorizontal: wp(4),
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
    },
    textAccent:{
        color:theme.colors.accent,
    },
    title:{
        fontSize: hp(4),
        fontWeight: theme.fontWeights.semibold,
        color:theme.colors.neutral(0.9),
    }
})


export default HomeScreen;
