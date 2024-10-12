import React, {useMemo} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {BottomSheetModal, BottomSheetView} from "@gorhom/bottom-sheet";

import {BlurView} from 'expo-blur';
import {Extrapolation, interpolate, useAnimatedStyle} from "react-native-reanimated";
import Animated from 'react-native-reanimated'

const FiltersModal = ({modalRef}) => {

    // variables
    // const snapPoints = useMemo(() => ['25%', '50%'], []);
    const snapPoints = useMemo(() => ['75%'], []);

    return (
        <BottomSheetModal
            ref={modalRef}
            index={0}
            snapPoints={snapPoints}
            enablePanDownToClose={true} //для закрытия по свайпу вниз
            backdropComponent={customBackdrop}
            // onChange={handleSheetChanges}
        >
            <BottomSheetView style={styles.contentContainer}>
                <Text>Awesome 🎉</Text>
            </BottomSheetView>
        </BottomSheetModal>
    );
};


const customBackdrop = ({animatedIndex, style}) => {


    const containerAnimatedStyle = useAnimatedStyle(() => {
        let opacity = interpolate(
            animatedIndex.value,
            [-1,0],
            [0,1],
            Extrapolation.CLAMP
        )

        return{
            opacity
        }
    })


    const containerStyle = [
        StyleSheet.absoluteFill,
        style,
        styles.overlay,
        containerAnimatedStyle
    ]

    return (
        <Animated.View style={containerStyle}>
            <BlurView
                style={StyleSheet.absoluteFill}
                tint="dark"
                intensity={25}
            />

        </Animated.View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        justifyContent: 'center',
        backgroundColor: 'grey',
    },
    contentContainer: {
        flex: 1,
        alignItems: 'center',
    },
    overlay: {
        backgroundColor: 'rgba(0,0,0,0.5)',
    }

})

export default FiltersModal;
