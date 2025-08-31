import { Link, router } from 'expo-router';
import { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';

import { AuthContainer } from '@/components/auth/AuthContainer';
import { ThemedText } from '@/components/ThemedText';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Logo } from '@/components/ui/Logo';
import { useAuth } from '@/hooks/useAuth';

export default function RegisterScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const { register, isLoading, error, clearError } = useAuth();

  const handleRegister = async () => {
    // Limpar erros
    setEmailError('');
    setPasswordError('');
    setConfirmPasswordError('');
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
    if (!confirmPassword) {
      setConfirmPasswordError('Confirmação de senha é obrigatória');
      hasError = true;
    }
    if (password && confirmPassword && password !== confirmPassword) {
      setConfirmPasswordError('Senhas não conferem');
      hasError = true;
    }

    if (hasError) return;

    const success = await register({ email, password, confirmPassword });
    if (success) {
      Alert.alert(
        'Sucesso!', 
        'Conta criada com sucesso! Você já pode fazer login.',
        [
          { text: 'OK', onPress: () => router.replace('/') }
        ]
      );
    }
  };

  return (
    <AuthContainer>
      {/* Header - Mais compacto */}
      <Animated.View 
        entering={FadeInUp.delay(300).duration(1000)}
        style={styles.headerContainer}
      >
        <Logo size="small" />
        <ThemedText type="title" style={styles.title}>
          Criar Nova Conta
        </ThemedText>
        <ThemedText type="caption" style={styles.subtitle}>
          Junte-se à comunidade Tella
        </ThemedText>
      </Animated.View>

      {/* Formulário */}
      <Animated.View 
        entering={FadeInDown.delay(500).duration(1000)}
        style={styles.formContainer}
      >
        {/* Toggle Slider */}
        <View style={styles.toggleContainer}>
          <Link href="/" asChild>
            <Button 
              title="Já tenho conta" 
              variant="toggle" 
              size="small"
            />
          </Link>
          <Button 
            title="Criar conta" 
            variant="toggleActive" 
            size="small"
          />
        </View>

        {/* Inputs - Espaçamentos reduzidos */}
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
            placeholder="Mínimo 6 caracteres"
            isPassword
            autoComplete="new-password"
            error={passwordError}
          />

          <Input
            label="Confirmar Senha"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder="Digite a senha novamente"
            isPassword
            autoComplete="new-password"
            error={confirmPasswordError}
          />
        </View>

        {/* Error Message */}
        {error && (
          <ThemedText style={styles.errorText}>
            {error}
          </ThemedText>
        )}

        {/* Botão Principal */}
        <Button 
          title="Criar Conta"
          onPress={handleRegister}
          loading={isLoading}
          disabled={isLoading}
          style={styles.registerButton}
        />

        {/* Termos - Mais compacto */}
        <ThemedText type="caption" style={styles.termsText}>
          Ao criar uma conta, você concorda com nossos{' '}
          <ThemedText type="caption" style={styles.linkText}>
            Termos de Uso
          </ThemedText>
          {' '}e{' '}
          <ThemedText type="caption" style={styles.linkText}>
            Política de Privacidade
          </ThemedText>
        </ThemedText>
      </Animated.View>
    </AuthContainer>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    alignItems: 'center',
    marginBottom: 24, // Reduzido de 40
    paddingHorizontal: 32,
  },
  title: {
    marginTop: 12, // Reduzido de 20
    marginBottom: 4, // Reduzido de 8
    fontSize: 22, // Reduzido de 24
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
    opacity: 0.8,
    marginTop: 0,
    fontSize: 13, // Reduzido
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
    marginBottom: 24, // Reduzido de 32
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
    marginBottom: 4, // Reduzido de 8
  },
  errorText: {
    color: '#EF4444',
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 16,
  },
  registerButton: {
    width: '100%',
    shadowColor: '#00D4AA',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 12,
    marginBottom: 16, // Reduzido de 24
  },
  termsText: {
    textAlign: 'center',
    opacity: 0.7,
    lineHeight: 16, // Reduzido de 18
    fontSize: 11, // Reduzido
    paddingHorizontal: 8, // Reduzido de 16
  },
  linkText: {
    color: '#00D4AA',
    fontWeight: '500',
  },
});