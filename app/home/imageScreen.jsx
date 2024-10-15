import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Platform, Alert} from 'react-native';
import {BlurView} from "expo-blur";
import {hp, wp} from "../../helpers/common";
import {useLocalSearchParams, useRouter} from "expo-router";
import {Image} from 'expo-image'
import {theme} from "../../constants/theme";
import LoaderStandard from "../../components/LoaderStandard";
import {Entypo, Octicons} from "@expo/vector-icons";
import Animated, {FadeInDown, FadeInUp} from 'react-native-reanimated'
// for download file
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from "expo-media-library";
// for sharing
import * as Sharing from 'expo-sharing';

// pooup message
import Toast from 'react-native-toast-message';


const ImageScreen = () => {

    const platformMobile = Platform.OS === 'ios' || Platform.OS === 'android';

    const router = useRouter();

    const item = useLocalSearchParams()

    // console.log('image data', JSON.stringify(item, null, 2))

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
        // console.log('maxWidth', maxWidth)

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


//  download file image xxxxxxxxxxxxxxxxxxxxxxxxxxx

    const imageUri = item?.largeImageURL;  // ссылка на изображение в максимальном качестве
    const fileName = imageUri.split('/').pop();  // имя файла
    const filepath = `${FileSystem.documentDirectory}${fileName}`;

    // downloadFileWeb
    const downloadFileWeb = async () => {
        // const imageUri = item?.largeImageURL;  // Используйте largeImageURL для высокого качества
        // const fileName = imageUri.split('/').pop();  // Имя файла

        try {
            const response = await fetch(imageUri);  // Запрос на скачивание большого изображения
            const blob = await response.blob();  // Преобразуем ответ в blob
            const url = window.URL.createObjectURL(blob);  // Создаем временную ссылку для скачивания
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = fileName || 'downloaded_image.jpg';  // Указываем имя файла
            document.body.appendChild(a);
            a.click();  // Инициируем скачивание
            window.URL.revokeObjectURL(url);  // Удаляем временную ссылку
            document.body.removeChild(a);

            setStatus('')
            // Alert.alert('Успех', 'Изображение загружено в максимальном качестве!');
        } catch (error) {
            console.log('got error', error.message);
            Alert.alert('Ошибка', error.message);
            setStatus('')
        }
    };

    // downloadFileMobile
    const downloadFileMobile = async () => {
        // const imageUri = item?.largeImageURL;  // ссылка на изображение в максимальном качестве
        // const fileName = imageUri.split('/').pop();  // имя файла

        // const filepath = `${FileSystem.documentDirectory}${fileName}`;

        try {
            const {uri} = await FileSystem.downloadAsync(imageUri, filepath);
            // console.log('downloaded at:', uri);

            const {status} = await MediaLibrary.requestPermissionsAsync();
            if (status === 'granted') {
                const asset = await MediaLibrary.createAssetAsync(uri);
                await MediaLibrary.createAlbumAsync('Download', asset, false);
                // Alert.alert('Успех', 'Изображение сохранено в галерею!');////
            } else {
                // Alert.alert('Разрешение отклонено', 'Доступ к медиабиблиотеке был отклонен.');
            }

            setStatus('')
            return uri;
        } catch (error) {
            console.log('got error', error.message);
            Alert.alert('Ошибка', error.message);
            setStatus('')
        }
    };

//     handle download
    const handleDownload = async () => {
        setStatus('downloaded')

        if (Platform.OS === 'web') {
            let uri = await downloadFileWeb();
            // if (uri) console.log('show toast later') //show toast later
            if (uri) showToast('Image download')
        } else {
            let uri = await downloadFileMobile();
            // if (uri) console.log('show toast later') //show toast later
            if (uri) showToast('Image download')
        }
    }
//     handle download


//  download file image------------------------------------


//  Sharing file image xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

    const sharingFile = async () => {
        // const filepath = `${FileSystem.documentDirectory}${fileName}`;
        try {
            const {uri} = await FileSystem.downloadAsync(imageUri, filepath);
            // console.log('downloaded at:', uri);

            const {status} = await MediaLibrary.requestPermissionsAsync();
            if (status === 'granted') {
                const asset = await MediaLibrary.createAssetAsync(uri);
                await MediaLibrary.createAlbumAsync('Download', asset, false);
                // Alert.alert('Успех', 'Изображение сохранено в галерею!');
            } else {
                Alert.alert('Разрешение отклонено', 'Доступ к медиабиблиотеке был отклонен.');
            }

            setStatus('')
            return uri;
        } catch (error) {
            console.log('got error', error.message);
            Alert.alert('Ошибка', error.message);
            setStatus('')
        }
    }

//     handle
    const handleSharing = async () => {
        setStatus('sharing')
        let uri = await sharingFile();

        if (uri) {
            //Sharing file
            await Sharing.shareAsync(uri)
        }

    }
//     handle

//  Sharing file image xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

// toast-message
    const showToast = (message) => {
        Toast.show({
            type: 'success',
            text1: message,
            position: 'bottom',
        });
    }

    const toastConfig={
        success:({text1,props,...rest})=>{
            return(
                <View style={styles.wrapperToast}>
                    <Text style={styles.textToast}>{text1}</Text>
                </View>
            )
        }
    }
// toast-message


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

                <Animated.View
                    entering={FadeInUp.delay(100).springify().damping(10)}
                >
                    <Image
                        transition={100}
                        style={[styles.image, getSize()]}
                        source={platformMobile ? uri : uriMax}
                        onLoad={onLoad}

                    />
                </Animated.View>
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
                                <TouchableOpacity
                                    onPress={handleSharing}
                                    style={styles.button}
                                >
                                    <Entypo name="share" size={24} color="white"/>
                                </TouchableOpacity>
                            )
                    }

                </Animated.View>
            </View>

            <Toast  config={toastConfig} visibilityTime={2500} />

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
    wrapperToast:{
        padding:15,
        paddingHorizontal:30,
        borderRadius:theme.radius.xl,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:theme.colors.neutral(0.8)
    },
    textToast:{
        fontSize:hp(1.8),
        fontWeight:theme.fontWeights.semibold,
        color:theme.colors.white
    }


})

export default ImageScreen;
