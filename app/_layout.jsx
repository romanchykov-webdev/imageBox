import React from 'react';
import {Stack} from "expo-router";

const LayoutRoot = () => {
    return (
        <Stack>

            <Stack.Screen name="index" options={{headerShown: false}}/>
            <Stack.Screen name="home/homeScreen" options={{headerShown: false}}/>

        </Stack>
    );
};


export default LayoutRoot;
