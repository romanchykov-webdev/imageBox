import React, {useState} from 'react';
import { TouchableOpacity} from 'react-native';
import {View, Image, Text, StyleSheet} from 'react-native';

import {hp, wp} from "../helpers/common";
import {LinearGradient} from "expo-linear-gradient";
import Animated, {FadeInDown} from 'react-native-reanimated'
import {theme} from "../constants/theme";
import LoaderStandard from "../components/LoaderStandard";

import {router} from 'expo-router'

const WelcomeScreen = () => {

    const [imgBgLoaded, setImgBgLoaded] = useState(false)

    return (

        <View style={styles.container}>

            <Image
                style={styles.bgImage}
                resizeMode="cover"
                source={require('../assets/images/welcome.png')}
                onLoad={() => setImgBgLoaded(true)} // обработчик загрузки изображения
            />

              {/*linear Gradient  */}
            {
                imgBgLoaded
                    ? (
                        <Animated.View entering={FadeInDown.duration(400)} style={{flex: 1}}>
                            <LinearGradient
                                colors={['rgba(255,255,255,0)', 'rgba(255,255,255,0.5)', 'white', 'white']}
                                style={styles.gradient}
                                start={{x: 0.5, y: 0}}
                                end={{x: 0.5, y: 0.8}}
                            />
                            {/*  content  */}
                            <View style={styles.contendContainer}>

                                <Animated.Text
                                    entering={FadeInDown.duration(600)}
                                    style={styles.title}>
                                    Pixel
                                </Animated.Text>

                                <Animated.Text
                                    entering={FadeInDown.duration(800)}
                                    style={styles.punchline}>
                                    Every Pixel Tells a Story
                                </Animated.Text>

                                {/*    button */}
                                <Animated.View
                                    entering={FadeInDown.duration(1000)}
                                >
                                    <TouchableOpacity
                                        onPress={()=>router.replace('/home/homeScreen')}
                                        style={styles.startButton}>
                                        <Text style={styles.startText}>Start Explore</Text>
                                    </TouchableOpacity>
                                </Animated.View>

                            </View>

                        </Animated.View>
                    )
                    : (
                        <LoaderStandard/>
                    )
            }

        </View>

    );
};


const styles = StyleSheet.create({

    container: {
        flex: 1
    },
    bgImage: {
        width: wp(100),
        height: hp(100),
        position: 'absolute',
    },
    gradient: {
        width: wp(100),
        height: hp(65),
        bottom: -30,
        position: 'absolute',
    },
    contendContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
        gap: 14,
    },
    title: {
        fontSize: hp(7),
        color: theme.colors.neutral(0.9),
        fontWeight: theme.fontWeights.bold,
    },
    punchline: {
        fontSize: hp(2),
        latterSpacing: 1,
        marginBottom: 10,
        fontWeight: theme.fontWeights.medium,
    },
    startButton: {
        marginBottom: 50,
        backgroundColor: theme.colors.neutral(0.9),
        padding: 15,
        paddingHorizontal: 90,
        borderRadius: theme.radius.xl,
        borderCurve: 'continuous',
    },
    startText: {
        color: theme.colors.white,
        fontSize: hp(3),
        fontWeight: theme.fontWeights.medium,
        letterSpacing: 1,
    },
})

export default WelcomeScreen;
