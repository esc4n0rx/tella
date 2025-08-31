import { Link, Stack } from 'expo-router';
import { StyleSheet } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Button } from '@/components/ui/Button';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <ThemedView style={styles.container}>
        <Animated.View 
          entering={FadeIn.duration(800)}
          style={styles.content}
        >
          <ThemedText style={styles.emoji}>🤖</ThemedText>
          <ThemedText type="title" style={styles.title}>
            Página não encontrada
          </ThemedText>
          <ThemedText style={styles.message}>
            A página que você está procurando não existe ou foi movida.
          </ThemedText>
          
          <Link href="/" asChild>
            <Button 
              title="Voltar ao Login" 
              style={styles.button}
            />
          </Link>
        </Animated.View>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  content: {
    alignItems: 'center',
    maxWidth: 400,
  },
  emoji: {
    fontSize: 80,
    marginBottom: 20,
  },
  title: {
    marginBottom: 16,
    textAlign: 'center',
  },
  message: {
    textAlign: 'center',
    opacity: 0.8,
    lineHeight: 22,
    marginBottom: 32,
  },
  button: {
    minWidth: 200,
  },
});