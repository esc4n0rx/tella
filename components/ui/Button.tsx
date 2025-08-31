import { Pressable, StyleSheet, type PressableProps } from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    withTiming,
} from 'react-native-reanimated';

import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';

interface ButtonProps extends PressableProps {
  title: string;
  variant?: 'primary' | 'secondary' | 'ghost' | 'toggle' | 'toggleActive';
  size?: 'small' | 'medium' | 'large';
  loading?: boolean;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export function Button({ 
  title, 
  variant = 'primary', 
  size = 'large',
  loading = false,
  disabled,
  onPressIn,
  onPressOut,
  style,
  ...rest 
}: ButtonProps) {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  const handlePressIn = (e: any) => {
    scale.value = withSpring(0.96);
    opacity.value = withTiming(0.8);
    onPressIn?.(e);
  };

  const handlePressOut = (e: any) => {
    scale.value = withSpring(1);
    opacity.value = withTiming(1);
    onPressOut?.(e);
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
      opacity: opacity.value,
    };
  });

  const getButtonStyle = () => {
    const baseStyle = [styles.button, styles[size]];
    
    switch (variant) {
      case 'primary':
        return [...baseStyle, styles.primary];
      case 'secondary':
        return [...baseStyle, styles.secondary];
      case 'ghost':
        return [...baseStyle, styles.ghost];
      case 'toggle':
        return [...baseStyle, styles.toggle];
      case 'toggleActive':
        return [...baseStyle, styles.toggleActive];
      default:
        return [...baseStyle, styles.primary];
    }
  };

  const getTextStyle = () => {
    switch (variant) {
      case 'primary':
        return styles.primaryText;
      case 'secondary':
        return styles.secondaryText;
      case 'ghost':
        return styles.ghostText;
      case 'toggle':
        return styles.toggleText;
      case 'toggleActive':
        return styles.toggleActiveText;
      default:
        return styles.primaryText;
    }
  };

  return (
    <AnimatedPressable
      style={[getButtonStyle(), animatedStyle, (disabled || loading) && styles.disabled, style]}
      disabled={disabled || loading}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      {...rest}
    >
      <ThemedText 
        type="defaultSemiBold" 
        style={[getTextStyle(), (disabled || loading) && styles.disabledText]}
      >
        {loading ? 'Carregando...' : title}
      </ThemedText>
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
  },
  small: {
    height: 40,
    paddingHorizontal: 16,
    flex: 1,
  },
  medium: {
    height: 48,
    paddingHorizontal: 24,
  },
  large: {
    height: 56,
    paddingHorizontal: 32,
  },
  primary: {
    backgroundColor: Colors.dark.tint,
    shadowColor: Colors.dark.tint,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  secondary: {
    backgroundColor: Colors.dark.card,
    borderWidth: 1,
    borderColor: Colors.dark.border,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  ghost: {
    backgroundColor: 'transparent',
  },
  toggle: {
    backgroundColor: 'transparent',
  },
  toggleActive: {
    backgroundColor: Colors.dark.tint,
  },
  primaryText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryText: {
    color: Colors.dark.text,
    fontSize: 16,
    fontWeight: '600',
  },
  ghostText: {
    color: Colors.dark.tint,
    fontSize: 16,
    fontWeight: '500',
  },
  toggleText: {
    color: Colors.dark.placeholder,
    fontSize: 14,
    fontWeight: '500',
  },
  toggleActiveText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  disabled: {
    opacity: 0.5,
  },
  disabledText: {
    opacity: 0.7,
  },
});