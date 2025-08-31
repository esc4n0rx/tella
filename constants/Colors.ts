/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#00D4AA';
const tintColorDark = '#00D4AA';

export const Colors = {
  light: {
    text: '#FFFFFF',
    background: '#1A1D29',
    backgroundGradient: 'linear-gradient(135deg, #1A1D29 0%, #252835 100%)',
    tint: tintColorLight,
    icon: '#9BA1A6',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
    card: '#2A2D3A',
    cardDark: '#1F2229',
    border: '#3A3D4A',
    borderFocus: '#00D4AA',
    placeholder: '#6B7280',
    error: '#EF4444',
    success: '#10B981',
    overlay: 'rgba(0, 212, 170, 0.1)',
  },
  dark: {
    text: '#FFFFFF',
    background: '#1A1D29',
    backgroundGradient: 'linear-gradient(135deg, #1A1D29 0%, #252835 100%)',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
    card: '#2A2D3A',
    cardDark: '#1F2229',
    border: '#3A3D4A',
    borderFocus: '#00D4AA',
    placeholder: '#6B7280',
    error: '#EF4444',
    success: '#10B981',
    overlay: 'rgba(0, 212, 170, 0.1)',
  },
};