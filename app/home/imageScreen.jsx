import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Platform} from 'react-native';
import {BlurView} from "expo-blur";
import {hp, wp} from "../../helpers/common";
import {useLocalSearchParams, useRouter} from "expo-router";
import {Image} from 'expo-image'
import {theme} from "../../constants/theme";
import LoaderStandard from "../../components/LoaderStandard";
import {Entypo, Octicons} from "@expo/vector-icons";
import Animated, {FadeInDown} from 'react-native-reanimated'

const ImageScreen = () => {

    const platformMobile = Platform.OS === 'ios' || Platform.OS === 'android';

    const router = useRouter();

    const item = useLocalSearchParams()

    console.log('image data', JSON.stringify(item, null, 2))

    let uri = item?.webformatURL;
    let uriMax = item?.largeImageURL;

    const [status, setStatus] = useState('loading')

    // onLoad
    const onLoad = () => {
        setStatus('')

    }

    // getSize
    const getSize = () => {

        const aspectRatio = item?.imageWidth / item?.imageHeight;

        // console.log('aspectRatio',aspectRatio)

        const maxWidth = Platform.OS === 'web' ? wp(50) : wp(92);
        console.log('maxWidth', maxWidth)

        let calculatedHeight = maxWidth / aspectRatio;
        // console.log('calculatedHeight',calculatedHeight)

        let calculatedWidth = maxWidth;
        // console.log('calculatedWidth',calculatedWidth)

        if (aspectRatio < 1) { //portrait image
            calculatedWidth = calculatedHeight * aspectRatio;
        }
        if (!platformMobile) {
            calculatedHeight = hp(80);

        }

        return {
            width: calculatedWidth,
            height: calculatedHeight
        }
    }


    return (
        <BlurView
            style={styles.container}
            tint='dark'
            intensity={60}
        >

            <View style={[styles.wrapperImage,
                // getSize()
            ]}>
                <View style={styles.loading}>
                    {
                        status === 'loading' && <LoaderStandard/>
                    }

                </View>

                <Image
                    transition={100}
                    style={[styles.image, getSize()]}
                    source={platformMobile ? uri : uriMax}
                    onLoad={onLoad}

                />

            </View>

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
                    <TouchableOpacity
                        style={styles.button}
                    >
                        <Octicons name="download" size={24} color="white"/>
                    </TouchableOpacity>
                </Animated.View>

                {/*button download*/}
                <Animated.View
                    entering={FadeInDown.delay(200).springify()}
                >
                    <TouchableOpacity
                        style={styles.button}
                    >
                        <Entypo name="share" size={24} color="white"/>
                    </TouchableOpacity>
                </Animated.View>
            </View>

        </BlurView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.6)',

        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: wp(4),
    },
    wrapperImage: {
        // padding:10,
        // borderWidth:1,
        // borderColor: "red",
        //box shadow
        borderRadius: theme.radius.lg,
        shadowColor: 'black',
        shadowRadius: 5,
        shadowOffset: {width: 5, height: 5},
        shadowOpacity: 0.5,
        elevation: 5, // Для Android

    },
    image: {

        borderRadius: theme.radius.lg,
        borderWidth: 2,
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderColor: 'rgba(255,255,255,0.1)',


    },
    loading: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
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
        borderCurve:'continuous',
        // padding:20,
        // box shadow
        shadowColor: theme.colors.shadowColor,
        // shadowColor: 'white',
        shadowRadius: 1,
        shadowOffset: {width: 1, height: 3},
        shadowOpacity: 0.9,
        elevation: 5, // Для Android
    }


})

export default ImageScreen;
