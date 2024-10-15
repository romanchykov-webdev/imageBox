import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Animated, {FadeInDown, FadeInUp} from 'react-native-reanimated'
import {Entypo, Octicons} from "@expo/vector-icons";
import LoaderStandard from "./LoaderStandard";
import {useRouter} from "expo-router";
import {theme} from "../constants/theme";
import {hp} from "../helpers/common";

const ButtonsBottomImage =
    ({
         status,
         handleDownload,
         handleSharing,
         platformMobile,
     }) => {

        const router = useRouter();

        return (
            <View style={styles.wrapperButtons}>
                {/*button close*/}
                <Animated.View
                    entering={FadeInDown.delay(100).springify()}
                >
                    <TouchableOpacity
                        onPress={() => router.back()}
                        style={styles.button}
                    >
                        <Octicons name="x" size={24} color="white"/>
                    </TouchableOpacity>
                </Animated.View>

                {/*button download*/}
                <Animated.View
                    entering={FadeInDown.delay(200).springify()}
                >
                    {
                        status === 'downloaded'
                            ? (
                                <View style={styles.button}>
                                    <LoaderStandard/>
                                </View>
                            )
                            : (
                                <TouchableOpacity
                                    onPress={handleDownload}
                                    style={styles.button}
                                >
                                    <Octicons name="download" size={24} color="white"/>
                                </TouchableOpacity>
                            )
                    }

                </Animated.View>

                {/*button download*/}
                <Animated.View
                    entering={FadeInDown.delay(200).springify()}
                >
                    {
                        status === 'sharing'
                            ? (
                                <View style={styles.button}>
                                    <LoaderStandard/>
                                </View>
                            )
                            : (
                                platformMobile &&
                                (
                                    <TouchableOpacity
                                        onPress={handleSharing}
                                        style={styles.button}
                                    >
                                        <Entypo name="share" size={24} color="white"/>
                                    </TouchableOpacity>
                                )


                            )
                    }

                </Animated.View>
            </View>
        );
    };

const styles = StyleSheet.create({
    wrapperButtons: {
        flexDirection: 'row',
        marginTop: 40,
        gap: 50,
    },
    button: {
        backgroundColor: theme.colors.neutral(0.2),
        // padding:10,
        width: hp(6),
        height: hp(6),
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: theme.colors.grayBG,
        borderRadius: theme.radius.lg,
        borderCurve: 'continuous',
        // padding:20,
        // box shadow
        shadowColor: theme.colors.shadowColor,
        // shadowColor: 'white',
        shadowRadius: 1,
        shadowOffset: {width: 1, height: 3},
        shadowOpacity: 0.9,
        elevation: 5, // Для Android
    },
    buttonDisable: {
        backgroundColor: "red",
    },
})

export default ButtonsBottomImage;
