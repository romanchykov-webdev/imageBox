import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Platform} from 'react-native';
import {BlurView} from "expo-blur";
import {hp, wp} from "../../helpers/common";
import {useLocalSearchParams, useRouter} from "expo-router";
import {Image} from 'expo-image'
import {theme} from "../../constants/theme";
import LoaderStandard from "../../components/LoaderStandard";

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
        if(!platformMobile){
            calculatedHeight=hp(90);

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

            <TouchableOpacity
                onPress={() => router.back()}
            >
                <Text>
                    Back
                </Text>
            </TouchableOpacity>

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
    wrapperImage:{
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
    loading:{
        position:'absolute',
        width:'100%',
        height:'100%',
        justifyContent:'center',
        alignItems:'center',
    }


})

export default ImageScreen;
