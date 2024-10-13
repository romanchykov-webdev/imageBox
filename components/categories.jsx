import React from 'react';
import {View, Text, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import {data} from '../constants/data'
import {theme} from "../constants/theme";
import {hp, wp} from "../helpers/common";
import Animated, {FadeInRight} from 'react-native-reanimated'

const Categories = ({activeCategory, handleChangeCategory}) => {
    return (
        <FlatList
            horizontal
            contentContainerStyle={styles.flatListContainer}
            showsHorizontalScrollIndicator={false}
            data={data.categories}
            keyExtractor={item => item}
            renderItem={({item, index}) => (
                <CategoryItem
                    title={item}
                    index={index}
                    isActive={activeCategory === item}
                    handleChangeCategory={handleChangeCategory}
                />
            )}
        />
    );
};

const CategoryItem = ({title, index, isActive, handleChangeCategory}) => {

    let color=isActive ? theme.colors.white : theme.colors.neutral(0.8);

    let backgroundColor=isActive ? theme.colors.neutral(0.8) : theme.colors.white;

    return (
        <Animated.View
            entering={FadeInRight.delay(index*200).duration(1000).springify().damping(14)}
        >
            <TouchableOpacity
                onPress={() => handleChangeCategory(isActive ? null : title)}
                style={[styles.category, {backgroundColor}]}
            >

                <Text style={[styles.title, {color}]}>{title}</Text>

            </TouchableOpacity>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    flatListContainer: {
        gap: 8,
        padding:4,
    },
    category: {
        padding: 12,
        paddingHorizontal: 15,
        borderWidth: 1,
        borderColor: theme.colors.grayBG,
        // backgroundColor:'white',
        borderRadius: theme.radius.lg,
        borderCurve: 'continuous',
        // box shadow
        shadowColor: 'black',
        shadowRadius: 1,
        shadowOffset: {width: 1, height: 1},
        shadowOpacity: 0.5,
        elevation: 5, // Для Android

    },
    title: {
        fontSize: hp(1.8),
        fontWeight: theme.fontWeights.medium,
    }
})

export default Categories;
