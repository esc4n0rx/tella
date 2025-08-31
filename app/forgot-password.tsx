import { Link, router } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';

import { AuthContainer } from '@/components/auth/AuthContainer';
import { ThemedText } from '@/components/ThemedText';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Logo } from '@/components/ui/Logo';
import { useAuth } from '@/hooks/useAuth';

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isEmailSent, setIsEmailSent] = useState(false);

  const { forgotPassword, isLoading, error, clearError } = useAuth();

  const handleForgotPassword = async () => {
    // Limpar erros
    setEmailError('');
    clearError();

    // Validação local
    if (!email) {
      setEmailError('Email é obrigatório');
      return;
    }

    const success = await forgotPassword(email);
    if (success) {
      setIsEmailSent(true);
    }
  };

  const handleBackToLogin = () => {
    router.replace('/');
  };

  if (isEmailSent) {
    return (
      <AuthContainer>
        <Animated.View 
          entering={FadeInUp.duration(800)}
          style={styles.successContainer}
        >
          <View style={styles.iconContainer}>
            <ThemedText style={styles.successIcon}>✉️</ThemedText>
          </View>
          
          <ThemedText type="title" style={styles.successTitle}>
            Email Enviado!
          </ThemedText>
          
          <ThemedText type="default" style={styles.successMessage}>
            Enviamos um link de recuperação para{'\n'}
            <ThemedText type="defaultSemiBold" style={styles.emailText}>
              {email}
            </ThemedText>
            {'\n\n'}
            Verifique sua caixa de entrada e siga as instruções para redefinir sua senha.
          </ThemedText>

          <View style={styles.buttonsContainer}>
            <Button 
              title="Voltar ao Login"
              onPress={handleBackToLogin}
              style={styles.backButton}
            />
            
            <Button 
              title="Reenviar Email"
              variant="ghost"
              onPress={handleForgotPassword}
              loading={isLoading}
            />
          </View>
        </Animated.View>
      </AuthContainer>
    );
  }

  return (
    <AuthContainer>
      <Animated.View 
        entering={FadeInUp.delay(200).duration(800)}
        style={styles.logoContainer}
      >
        <Logo size="medium" />
        <ThemedText type="title" style={styles.title}>
          Esqueci a Senha
        </ThemedText>
        <ThemedText type="default" style={styles.subtitle}>
          Digite seu email e enviaremos um link para redefinir sua senha
        </ThemedText>
      </Animated.View>

      <Animated.View 
        entering={FadeInDown.delay(400).duration(800)}
        style={styles.formContainer}
      >
        <View style={styles.form}>
          <Input
            label="Email"
            value={email}
            onChangeText={setEmail}
            placeholder="seu@email.com"
            keyboardType="email-address"
            autoCapitalize="none"
            error={emailError}
          />

          {error && (
            <ThemedText style={styles.errorText}>
              {error}
            </ThemedText>
          )}

          <Button 
            title="Enviar Link de Recuperação"
            onPress={handleForgotPassword}
            loading={isLoading}
            disabled={isLoading}
            style={styles.submitButton}
          />

          <Link href="/" asChild>
            <Button 
              title="Voltar ao Login"
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
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    marginTop: 16,
    marginBottom: 16,
    fontSize: 28,
  },
  subtitle: {
    textAlign: 'center',
    opacity: 0.8,
    paddingHorizontal: 16,
    lineHeight: 22,
  },
  formContainer: {
    width: '100%',
    maxWidth: 400,
  },
  form: {
    gap: 16,
  },
  submitButton: {
    marginTop: 8,
  },
  errorText: {
    color: '#EF4444',
    textAlign: 'center',
    marginBottom: 8,
  },
  successContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#252835',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  successIcon: {
    fontSize: 40,
  },
  successTitle: {
    marginBottom: 20,
    fontSize: 28,
  },
  successMessage: {
    textAlign: 'center',
    lineHeight: 24,
    opacity: 0.9,
    marginBottom: 40,
  },
  emailText: {
    color: '#00D4AA',
  },
  buttonsContainer: {
    width: '100%',
    gap: 12,
  },
  backButton: {
    marginBottom: 8,
  },
});