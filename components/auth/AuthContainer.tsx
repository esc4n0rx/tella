import { LinearGradient } from 'expo-linear-gradient';
import { ReactNode } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Animated, { FadeIn } from 'react-native-reanimated';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

interface AuthContainerProps {
  children: ReactNode;
}

export function AuthContainer({ children }: AuthContainerProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.outerContainer}>
      {/* Background que vai até as bordas */}
      <View style={styles.backgroundContainer}>
        <LinearGradient
          colors={['#1A1D29', '#252835', '#1A1D29']}
          style={styles.backgroundGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        />
        
        {/* Overlay gradiente animado */}
        <LinearGradient
          colors={['rgba(0, 212, 170, 0.15)', 'rgba(0, 212, 170, 0.08)', 'transparent', 'rgba(0, 212, 170, 0.05)']}
          style={styles.overlayGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        />
      </View>

      {/* Content com SafeArea e KeyboardAware */}
      <SafeAreaView style={styles.safeContainer}>
        <KeyboardAwareScrollView
          style={styles.keyboardScrollView}
          contentContainerStyle={[
            styles.scrollContent,
            { paddingTop: Math.max(insets.top, 20) }
          ]}
          showsVerticalScrollIndicator={false}
          bounces={false}
          enableOnAndroid={true}
          enableAutomaticScroll={true}
          extraHeight={20}
          extraScrollHeight={20}
          keyboardOpeningTime={250}
          resetScrollToCoords={{ x: 0, y: 0 }}
          enableResetScrollToCoords={true}
        >
          <Animated.View 
            entering={FadeIn.duration(800)}
            style={styles.content}
          >
            {children}
          </Animated.View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: '#1A1D29',
  },
  backgroundContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  backgroundGradient: {
    flex: 1,
  },
  overlayGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  safeContainer: {
    flex: 1,
  },
  keyboardScrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingBottom: 40,
    minHeight: Platform.OS === 'ios' ? '85%' : '90%',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});