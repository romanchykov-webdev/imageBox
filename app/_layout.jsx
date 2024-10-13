import React from 'react';
import {Stack} from "expo-router";
import {
    BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import GestureHandler from "react-native-gesture-handler/src/web_hammer/GestureHandler";
import {GestureHandlerRootView} from "react-native-gesture-handler";


const LayoutRoot = () => {
    return (
        <GestureHandlerRootView style={{flex: 1}}>
            <BottomSheetModalProvider>
                <Stack>

                    <Stack.Screen name="index" options={{headerShown: false}}/>
                    <Stack.Screen name="home/homeScreen" options={{headerShown: false}}/>

                </Stack>
            </BottomSheetModalProvider>
        </GestureHandlerRootView>
    );
};


export default LayoutRoot;
