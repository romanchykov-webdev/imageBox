import React from 'react';
import {ActivityIndicator,StyleSheet} from 'react-native';
import {hp} from "../helpers/common";

const LoaderStandard = () => {
  return (
      <ActivityIndicator size="large" color="#00ff00" style={styles.loader}/>
  );
};

const styles = StyleSheet.create({

    loader: {
        flex: 1,
        minHeight: hp(50),
        justifyContent: 'center',
        alignItems:'center',
        // borderWidth: 1,
        // borderColor:'red'
    },
})

export default LoaderStandard;
