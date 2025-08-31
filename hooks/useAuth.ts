import { useState } from 'react';

interface AuthState {
  isLoading: boolean;
  error: string | null;
}

interface LoginData {
  email: string;
  password: string;
}

interface RegisterData {
  email: string;
  password: string;
  confirmPassword: string;
}

export function useAuth() {
  const [state, setState] = useState<AuthState>({
    isLoading: false,
    error: null,
  });

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string): boolean => {
    return password.length >= 6;
  };

  const login = async (data: LoginData): Promise<boolean> => {
    setState({ isLoading: true, error: null });

    try {
      // Validações
      if (!validateEmail(data.email)) {
        throw new Error('Email inválido');
      }

      if (!validatePassword(data.password)) {
        throw new Error('Senha deve ter pelo menos 6 caracteres');
      }

      // Simular chamada de API
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock: sempre sucesso para demonstração
      setState({ isLoading: false, error: null });
      return true;
    } catch (error: any) {
      setState({ isLoading: false, error: error.message });
      return false;
    }
  };

  const register = async (data: RegisterData): Promise<boolean> => {
    setState({ isLoading: true, error: null });

    try {
      // Validações
      if (!validateEmail(data.email)) {
        throw new Error('Email inválido');
      }

      if (!validatePassword(data.password)) {
        throw new Error('Senha deve ter pelo menos 6 caracteres');
      }

      if (data.password !== data.confirmPassword) {
        throw new Error('Senhas não conferem');
      }

      // Simular chamada de API
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setState({ isLoading: false, error: null });
      return true;
    } catch (error: any) {
      setState({ isLoading: false, error: error.message });
      return false;
    }
  };

  const forgotPassword = async (email: string): Promise<boolean> => {
    setState({ isLoading: true, error: null });

    try {
      if (!validateEmail(email)) {
        throw new Error('Email inválido');
      }

      // Simular chamada de API
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setState({ isLoading: false, error: null });
      return true;
    } catch (error: any) {
      setState({ isLoading: false, error: error.message });
      return false;
    }
  };

  const clearError = () => {
    setState(prev => ({ ...prev, error: null }));
  };

  return {
    ...state,
    login,
    register,
    forgotPassword,
    clearError,
  };
}