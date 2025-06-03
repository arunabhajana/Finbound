import React, { useRef, useState } from 'react';
import { Animated, PanResponder, Text, StyleSheet, View } from 'react-native';
import * as Haptics from 'expo-haptics';

export default function DraggableTag({ label, initialPosition }) {
  const pan = useRef(new Animated.ValueXY(initialPosition)).current;
  const [dragging, setDragging] = useState(false);

  // For snap-back effect
  const initial = useRef(initialPosition);

  // Wiggle/rotate effect based on drag x
  const rotate = pan.x.interpolate({
    inputRange: [-120, 0, 120],
    outputRange: ['-12deg', '0deg', '12deg'],
    extrapolate: 'clamp',
  });

  // Scale up when dragging
  const scale = dragging
    ? 1.13
    : 1;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        setDragging(true);
        pan.setOffset({
          x: pan.x._value,
          y: pan.y._value,
        });
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      },
      onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: () => {
        setDragging(false);
        pan.flattenOffset();
        // Snap back to original position with bounce
        Animated.spring(pan, {
          toValue: initial.current,
          friction: 5,
          tension: 80,
          useNativeDriver: false,
        }).start();
      },
    })
  ).current;

  return (
    <Animated.View
      style={[
        styles.tag,
        dragging && styles.tagDragging,
        {
          transform: [
            { translateX: pan.x },
            { translateY: pan.y },
            { scale },
            { rotate },
          ],
        },
      ]}
      {...panResponder.panHandlers}
    >
      <Text style={styles.text}>{label}</Text>
      {dragging && (
        <View style={styles.emojiTooltip}>
          <Text style={styles.emoji}>🎈</Text>
        </View>
      )}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  tag: {
    position: 'absolute',
    backgroundColor: '#fff',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#232323',
    paddingHorizontal: 16,
    paddingVertical: 6,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.07,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    alignItems: 'center',
    flexDirection: 'row',
  },
  tagDragging: {
    backgroundColor: '#e9e7ff',
    shadowOpacity: 0.25,
    elevation: 5,
    borderColor: '#615efa',
  },
  text: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 16,
    color: '#232323',
  },
  emojiTooltip: {
    marginLeft: 8,
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 2,
    paddingVertical: 1,
    shadowColor: '#615efa',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
  },
  emoji: {
    fontSize: 18,
  },
});
