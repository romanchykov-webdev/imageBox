import {Text, View, StyleSheet, TouchableOpacity, Platform} from "react-native";
import React from "react";
import {hp, wp} from "../helpers/common";
import {theme} from "../constants/theme";


// Условие для планшета или компьютера
const isTabletOrDesktop = wp(100) > 768; // 768px - стандартный порог между мобильными и планшетными устройствами

// SectionView
export const SectionView = ({title, content}) => {
    return (
        <View style={styles.sectionContainer}>
            <Text style={styles.sectionText}>{title}</Text>
            {content}
        </View>
    )
}


// CommonFilterRow
export const CommonFilterRow = ({data, filterName, filters, setFilters}) => {

    const onSelect = (item) => {
        setFilters({...filters, [filterName]: item});

    }

    return (
        <View style={styles.flexRowWrap}>

            {
                data && data.map((item, index) => {

                    let isActive = filters && filters[filterName] === item;

                    let backgroundColor = isActive ? theme.colors.neutral(0.7) : 'white';

                    let color = isActive ? 'white' : theme.colors.neutral(0.7);

                    return (
                        <TouchableOpacity
                            onPress={() => onSelect(item)}
                            key={item}
                            style={[styles.outlinedButton, {backgroundColor}]}
                        >
                            <Text style={[styles.outlinedButtonText, {color}]}>
                                {item}
                            </Text>
                        </TouchableOpacity>
                    )
                })
            }

        </View>
    )
}

// colorFilters
export const ColorFilters = ({data, filterName, filters, setFilters}) => {

    const onSelect = (item) => {
        setFilters({...filters, [filterName]: item});

    }

    return (
        <View style={styles.flexRowWrap}>

            {
                data && data.map((item, index) => {

                    let isActive = filters && filters[filterName] === item;

                    let borderColor = isActive ? theme.colors.neutral(0.7) : 'transparent';


                    return (
                        <TouchableOpacity
                            onPress={() => onSelect(item)}
                            key={item}
                            style={styles.wrapperButtonColor}
                        >
                            <View style={[styles.colorWrapper, {borderColor} ]}>
                                <View style={[styles.color, {backgroundColor: item}]}></View>
                            </View>
                        </TouchableOpacity>
                    )
                })
            }

        </View>
    )
}

const styles = StyleSheet.create({
    sectionContainer: {
        ga: 8,
    },
    sectionText: {
        fontSize: hp(2.8),
        fontWeight: theme.fontWeights.medium,
        color: theme.colors.neutral(0.8),
        textTransform: 'capitalize',
        marginBottom: 5,
        // text shadow
        textShadowColor: theme.colors.neutral(0.8),
        textShadowRadius: 1,
        textShadowOffset: {width: 1, height: 1},
    },
    flexRowWrap: {
        gap: 15,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: isTabletOrDesktop ?'flex-start' : 'space-around',
        // backgroundColor:'red'
    },
    outlinedButton: {
        padding: 8,
        paddingHorizontal: 14,
        borderWidth: 1,
        borderColor: theme.colors.grayBG,
        borderRadius: theme.radius.xs,
        borderCurve: 'continuous',
        // box shadow
        shadowColor: 'black',
        shadowRadius: 1,
        shadowOffset: {width: 1, height: 1},
        shadowOpacity: 0.5,
        elevation: 5, // Для Android
    },
    outlinedButtonText: {
        textTransform: 'capitalize',

    },
    wrapperButtonColor: {},
    colorWrapper: {
        padding: 3,
        borderRadius: theme.radius.sm,
        borderCurve: 'continuous',
        borderWidth: 1,
        borderColor: theme.colors.neutral(0.7),

    },
    color: {
        width: 60,
        height: 40,
        borderRadius: theme.radius.sm,
        borderCurve: 'continuous',
        borderWidth: 1,
        borderColor: theme.colors.grayBG,
        // box shadow
        shadowColor: 'black',
        shadowRadius: 1,
        shadowOffset: {width: 1, height: 1},
        shadowOpacity: 0.5, // Добавьте opacity
        elevation: 5, // Для Android

    },
})


