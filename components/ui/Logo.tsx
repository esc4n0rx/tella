import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
    interpolate,
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withSequence,
    withTiming,
} from 'react-native-reanimated';

import { ThemedText } from '@/components/ThemedText';

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
}

export function Logo({ size = 'large' }: LogoProps) {
  const scale = useSharedValue(0);
  const rotate = useSharedValue(0);

  useEffect(() => {
    scale.value = withSequence(
      withTiming(1.1, { duration: 600 }),
      withTiming(1, { duration: 300 })
    );
    
    rotate.value = withRepeat(
      withTiming(360, { duration: 8000 }),
      -1,
      false
    );
  }, []);

  const animatedLogoStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: scale.value },
      { rotate: `${interpolate(rotate.value, [0, 360], [0, 5])}deg` }
    ],
  }));

  const animatedTextStyle = useAnimatedStyle(() => ({
    opacity: interpolate(scale.value, [0, 1], [0, 1]),
    transform: [{ translateY: interpolate(scale.value, [0, 1], [20, 0]) }],
  }));

  const logoSize = size === 'large' ? 80 : size === 'medium' ? 60 : 40;
  const fontSize = size === 'large' ? 48 : size === 'medium' ? 36 : 24;

  return (
    <View style={styles.container}>
      <Animated.View style={[animatedLogoStyle, styles.logoContainer]}>
        <View style={[styles.logo, { width: logoSize, height: logoSize }]}>
          <ThemedText style={[styles.logoText, { fontSize: fontSize * 0.6 }]}>T</ThemedText>
        </View>
      </Animated.View>
      
      <Animated.View style={animatedTextStyle}>
        <ThemedText type="heading" style={[styles.brandText, { fontSize }]}>
          Tella
        </ThemedText>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    marginBottom: 16,
  },
  logo: {
    backgroundColor: '#00D4AA',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#00D4AA',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  logoText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  brandText: {
    color: '#FFFFFF',
    textAlign: 'center',
  },
});