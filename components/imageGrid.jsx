import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import {MasonryFlashList} from "@shopify/flash-list";
import ImageCard from "./imageCard";
import {getColumnCount, wp} from "../helpers/common";

const ImageGrid = ({images}) => {

    const columns = getColumnCount()


    return (
        <View style={styles.container}>
            <MasonryFlashList
                data={images}
                numColumns={columns}
                initialnumRender={1000}
                contentContainerStyle={styles.listContainerStyle}
                renderItem={({item, index}) => <ImageCard item={item} index={index} columns={columns}/>}
                estimatedItemSize={200}

            />



        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        minHeight: 3,
        width: wp(92),
        overflow:'hidden',
        columnGap:5
    },
    listContainerStyle: {

    }

})

export default ImageGrid;
