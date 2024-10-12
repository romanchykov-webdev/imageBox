import React from 'react';
import {ActivityIndicator,StyleSheet} from 'react-native';

const LoaderStandard = () => {
  return (
      <ActivityIndicator size="large" color="white" style={styles.loader}/>
  );
};

const styles = StyleSheet.create({

    loader: {
        flex: 1,
        justifyContent: 'center',
    },
})

export default LoaderStandard;
