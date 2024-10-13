import React, {useMemo} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {BottomSheetModal, BottomSheetView} from "@gorhom/bottom-sheet";

import {BlurView} from 'expo-blur';
import {Extrapolation, FadeInDown, interpolate, useAnimatedStyle} from "react-native-reanimated";
import Animated from 'react-native-reanimated'
import {capitalize, hp} from "../helpers/common";
import {theme} from "../constants/theme";
import {ColorFilters, CommonFilterRow, SectionView} from "./filterViews";
import {data} from "../constants/data";


const FiltersModal = ({
      modalRef,
      filters,
      setFilters,
      onClose,
      onApply,
      onReset,

      }) => {

    // variables
    // const snapPoints = useMemo(() => ['25%', '50%'], []);
    const snapPoints = useMemo(() => ['75%', '90%'], []);

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

                <View style={styles.content}>
                    <Text style={styles.filterText}>Filters</Text>
                    {/*<Text style={styles.filterText}>Sections here</Text>*/}

                    {
                        Object.keys(sections).map((sectionName, index) => {

                            let sectionView = sections[sectionName];
                            let sectionData = data.filters[sectionName]

                            // let title=capitalize(sectionName)

                            return (
                                <Animated.View
                                    entering={FadeInDown.delay((index*100)+100).springify().damping(11)}
                                    key={sectionName}
                                >
                                    <SectionView
                                        title={sectionName}
                                        // title={title}
                                        content={sectionView({
                                            data: sectionData,
                                            filters,
                                            setFilters,
                                            filterName: sectionName
                                        })}
                                    />
                                </Animated.View>
                            )
                        })
                    }

                    {/*    buttons reset filter and apply   */}
                    <Animated.View
                        entering={FadeInDown.delay(500)}
                        style={styles.wrapperButtons}>

                        <TouchableOpacity
                            onPress={onReset}
                            style={styles.wrapperButton}
                        >
                            <Text style={styles.textButton}
                            >
                                Reset
                            </Text>

                        </TouchableOpacity>


                        <TouchableOpacity
                            onPress={onApply}
                            style={styles.wrapperButton}
                        >
                            <Text
                                style={styles.textButton}
                            >
                                Apply
                            </Text>
                        </TouchableOpacity>
                    </Animated.View>

                </View>


            </BottomSheetView>
        </BottomSheetModal>
    );
};


const sections = {
    "order": (props) => <CommonFilterRow {...props} />,
    "orientation": (props) => <CommonFilterRow {...props} />,
    "type": (props) => <CommonFilterRow {...props} />,
    "colors": (props) => <ColorFilters {...props} />,
}


const customBackdrop = ({animatedIndex, style}) => {


    const containerAnimatedStyle = useAnimatedStyle(() => {
        let opacity = interpolate(
            animatedIndex.value,
            [-1, 0],
            [0, 1],
            Extrapolation.CLAMP
        )

        return {
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

    contentContainer: {
        flex: 1,
        alignItems: 'center',
    },
    overlay: {
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    content: {
        width: '100%',
        gap: 15,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    filterText: {
        fontSize: hp(4),
        fontWeight: theme.fontWeights.bold,
        color: theme.colors.neutral(0.8),
        marginBottom: 5,
    },
    wrapperButtons: {
        marginTop: 20,
        marginBottom: 30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        // borderWidth: 1,
        // borderColor: 'red',
        // padding: 10,
        gap: 20,
    },
    wrapperButton: {
        backgroundColor: theme.colors.neutral(0.2),
        flex: 1,
        borderWidth: 1,
        borderColor: theme.colors.grayBG,
        padding: 12,
        paddingHorizontal: 15,
        paddingVertical: 15,
        borderRadius: theme.radius.lg,
        borderCurve: 'continuous',

    },
    textButton: {
        fontSize: hp(2.2),
        fontWeight: theme.fontWeights.medium,
        textAlign: 'center',
    },


})

export default FiltersModal;
