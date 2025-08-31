import { Link } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import Animated, {
    FadeInDown,
    FadeInUp,
    interpolate,
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withTiming,
} from 'react-native-reanimated';

import { AuthContainer } from '@/components/auth/AuthContainer';
import { ThemedText } from '@/components/ThemedText';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Logo } from '@/components/ui/Logo';
import { useAuth } from '@/hooks/useAuth';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const { login, isLoading, error, clearError } = useAuth();

  // Animação sutil de flutuação
  const floatAnimation = useSharedValue(0);

  useEffect(() => {
    floatAnimation.value = withRepeat(
      withTiming(1, { duration: 3000 }),
      -1,
      true
    );
  }, []);

  const animatedLogoStyle = useAnimatedStyle(() => {
    const translateY = interpolate(floatAnimation.value, [0, 1], [0, -8]);
    
    return {
      transform: [{ translateY }],
    };
  });

  const handleLogin = async () => {
    // Limpar erros
    setEmailError('');
    setPasswordError('');
    clearError();

    // Validações locais
    let hasError = false;
    if (!email) {
      setEmailError('Email é obrigatório');
      hasError = true;
    }
    if (!password) {
      setPasswordError('Senha é obrigatória');
      hasError = true;
    }

    if (hasError) return;

    const success = await login({ email, password });
    if (success) {
      Alert.alert('Sucesso!', 'Login realizado com sucesso!');
    }
  };

  return (
    <AuthContainer>
      {/* Logo e Título */}
      <Animated.View 
        entering={FadeInUp.delay(300).duration(1000)}
        style={[styles.headerContainer, animatedLogoStyle]}
      >
        <Logo size="large" />
        <ThemedText type="caption" style={styles.subtitle}>
          Conversas anônimas com IA. Roleplay real,{'\n'}conexão verdadeira.
        </ThemedText>
      </Animated.View>

      {/* Formulário */}
      <Animated.View 
        entering={FadeInDown.delay(500).duration(1000)}
        style={styles.formContainer}
      >
        {/* Toggle Slider */}
        <View style={styles.toggleContainer}>
          <Button 
            title="Já tenho conta" 
            variant="toggleActive" 
            size="small"
          />
          <Link href="/register" asChild>
            <Button 
              title="Criar conta" 
              variant="toggle" 
              size="small"
            />
          </Link>
        </View>

        {/* Inputs */}
        <View style={styles.inputsContainer}>
          <Input
            label="Email"
            value={email}
            onChangeText={setEmail}
            placeholder="seu@email.com"
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
            error={emailError}
          />

          <Input
            label="Senha"
            value={password}
            onChangeText={setPassword}
            placeholder="••••••••"
            isPassword
            autoComplete="password"
            error={passwordError}
          />
        </View>

        {/* Error Message */}
        {error && (
          <View style={styles.errorContainer}>
            <ThemedText style={styles.errorText}>
              {error}
            </ThemedText>
          </View>
        )}

        {/* Botão Principal */}
        <View style={styles.mainButtonContainer}>
          <Button 
            title="Entrar"
            onPress={handleLogin}
            loading={isLoading}
            disabled={isLoading}
            style={styles.loginButton}
          />
        </View>

        {/* Link de Esqueceu Senha */}
        <View style={styles.forgotPasswordContainer}>
          <Link href="/forgot-password" asChild>
            <Button 
              title="Esqueci minha senha"
              variant="ghost"
              size="medium"
            />
          </Link>
        </View>
      </Animated.View>
    </AuthContainer>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    alignItems: 'center',
    marginBottom: 48,
    paddingHorizontal: 32,
  },
  subtitle: {
    textAlign: 'center',
    marginTop: 20,
    opacity: 0.8,
    lineHeight: 20,
  },
  formContainer: {
    width: '100%',
    maxWidth: 400,
  },
  toggleContainer: {
    flexDirection: 'row',
    backgroundColor: '#2A2D3A',
    borderRadius: 16,
    padding: 4,
    marginBottom: 32,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
  },
  inputsContainer: {
    marginBottom: 8,
  },
  errorContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  errorText: {
    color: '#EF4444',
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '500',
  },
  mainButtonContainer: {
    marginBottom: 16,
  },
  loginButton: {
    width: '100%',
    shadowColor: '#00D4AA',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 12,
  },
  forgotPasswordContainer: {
    alignItems: 'center',
  },
});