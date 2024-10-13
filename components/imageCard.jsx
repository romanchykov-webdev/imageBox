import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

import {Image} from 'expo-image';
import {getImageSize, hp, wp} from "../helpers/common";
import {theme} from "../constants/theme";

const ImageCard = ({item, index, columns, router}) => {


    const isLastInRow = () => {
        return (index + 1) % columns === 0;
    }


    const getImageHeight = () => {
        let {imageHeight: height, imageWidth: width} = item;

        return {height: getImageSize(height, width)}

    }


    return (
        <TouchableOpacity
            onPress={() => router.push({
                pathname:'home/imageScreen',
                params:{...item}
            })}
            style={[styles.imageWrapper, !isLastInRow() && styles.spacing]}
        >
            <Image
                style={[styles.image, getImageHeight()]}
                source={item?.webformatURL}
                contentFit="cover"
                transition={100}
            />


        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    imageWrapper: {
        backgroundColor: theme.colors.grayBG,
        borderRadius: theme.radius.xl,
        borderCurve: 'continuous',
        // overflow: 'hidden',
        marginBottom: wp(2),
        // Настройки для тени на iOS и вебе
        shadowColor: 'black',
        shadowOffset: {width: 3, height: 3},
        shadowOpacity: 0.5,
        shadowRadius: 3,
        // Тень для Android
        elevation: 5,

    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: theme.radius.xl,
        overflow: 'hidden',
    },
    spacing: {
        marginRight: wp(2),
    }

})

export default ImageCard;
