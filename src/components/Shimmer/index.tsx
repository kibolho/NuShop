import {Animated, Easing, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';

import {LinearGradient} from 'expo-linear-gradient';
import {SHIMMER} from '@app/test/testIDs';
import {getDimensions} from '@app/utils/deviceUtils';

const styles = StyleSheet.create({
  shimmer: {
    overflow: 'hidden',
    backgroundColor: '#eee',
  },
});

const SCREEN_WIDTH = getDimensions().width;
const START = -1;
const END = 1;
const DURATION = 2000;
const COLORS = ['#eee', '#ddd', '#eee'];
const LOCATIONS = [0.3, 0.5, 0.7];
const ANIMATION = new Animated.Value(START);

const runAnimation = () => {
  ANIMATION.setValue(START);
  if (Animated.timing)
    Animated.timing(ANIMATION, {
      toValue: END,
      duration: DURATION,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(runAnimation);
};

const linear = ANIMATION.interpolate({
  inputRange: [START, END],
  outputRange: [-SCREEN_WIDTH, SCREEN_WIDTH],
});

runAnimation();

interface ShimmerProps {
  width: number;
  height: number;
}
const Shimmer = ({width, height}: ShimmerProps) => {
  const [positionX, setPositionX] = useState<null | number>(null);
  let viewRef: null | View = null;
  return (
    <View
      testID={SHIMMER}
      style={[styles.shimmer, {width, height}]}
      ref={ref => (viewRef = ref)}
      onLayout={() => {
        if (viewRef) {
          viewRef.measure((_x, _y, _width, _height, pageX, _pageY) => {
            setPositionX(pageX);
          });
        }
      }}>
      {positionX !== null && (
        <Animated.View
          style={{
            flex: 1,
            left: -positionX,
            transform: [{translateX: linear}],
          }}>
          <LinearGradient
            style={{flex: 1, width: SCREEN_WIDTH}}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            locations={LOCATIONS}
            colors={COLORS}
          />
        </Animated.View>
      )}
    </View>
  );
};

export default Shimmer;
