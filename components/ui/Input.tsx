import { useState } from 'react';
import { Pressable, StyleSheet, TextInput, View, type TextInputProps } from 'react-native';
import Animated, {
    interpolateColor,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';

import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import { useThemeColor } from '@/hooks/useThemeColor';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  isPassword?: boolean;
}

export function Input({ 
  label, 
  error, 
  isPassword = false,
  onFocus,
  onBlur,
  ...rest 
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  
  const backgroundColor = useThemeColor({}, 'cardDark');
  const borderColor = useThemeColor({}, 'border');
  const textColor = useThemeColor({}, 'text');
  const placeholderColor = useThemeColor({}, 'placeholder');

  const focusAnimation = useSharedValue(0);

  const handleFocus = (e: any) => {
    setIsFocused(true);
    focusAnimation.value = withTiming(1, { duration: 200 });
    onFocus?.(e);
  };

  const handleBlur = (e: any) => {
    setIsFocused(false);
    focusAnimation.value = withTiming(0, { duration: 200 });
    onBlur?.(e);
  };

  const animatedContainerStyle = useAnimatedStyle(() => {
    return {
      borderColor: interpolateColor(
        focusAnimation.value,
        [0, 1],
        [borderColor, Colors.dark.borderFocus]
      ),
      shadowOpacity: focusAnimation.value * 0.2,
    };
  });

  return (
    <View style={styles.container}>
      {label && (
        <ThemedText type="defaultSemiBold" style={styles.label}>
          {label}
        </ThemedText>
      )}
      
      <Animated.View style={[
        styles.inputContainer, 
        { backgroundColor },
        animatedContainerStyle
      ]}>
        <TextInput
          style={[styles.input, { color: textColor }]}
          placeholderTextColor={placeholderColor}
          onFocus={handleFocus}
          onBlur={handleBlur}
          secureTextEntry={isPassword && !isPasswordVisible}
          {...rest}
        />
        
        {isPassword && (
          <Pressable 
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
            style={styles.eyeButton}
          >
            <ThemedText style={styles.eyeText}>
              {isPasswordVisible ? '👁️' : '👁️‍🗨️'}
            </ThemedText>
          </Pressable>
        )}
      </Animated.View>
      
      {error && (
        <ThemedText style={[styles.error, { color: Colors.dark.error }]}>
          {error}
        </ThemedText>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16, // Reduzido de 20
  },
  label: {
    marginBottom: 6, // Reduzido de 8
    fontSize: 14, // Reduzido de 16
    fontWeight: '500',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'transparent',
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 52, // Reduzido de 56
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 8,
    elevation: 2,
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'System',
  },
  eyeButton: {
    padding: 4,
  },
  eyeText: {
    fontSize: 18,
    opacity: 0.7,
  },
  error: {
    marginTop: 6, // Reduzido de 8
    fontSize: 12, // Reduzido de 14
    fontWeight: '500',
  },
});