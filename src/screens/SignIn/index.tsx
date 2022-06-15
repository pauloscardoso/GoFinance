import React from 'react';
import { ActivityIndicator, Alert, Platform } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import { useTheme } from 'styled-components';
import { SignInSocialButton } from '../../components/SignInSocialButton';
import { useAuth } from '../../hooks/auth';

import AppleSVG from '../../assets/images/apple.svg';
import GoogleSVG from '../../assets/images/google.svg';
import LogoSVG from '../../assets/images/logo.svg';

import {
  Container,
  Header,
  TitleWrapper,
  Title,
  SignInTitle,
  Footer,
  FooterWrapper,
} from './styles';

export const SignIn = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const { signInWithGoogle } = useAuth();
  const theme = useTheme();

  const handleSignInWithGoogle = async () => {
    try {
      setIsLoading(true);
      return await signInWithGoogle();
    } catch (err) {
      console.log(err);
      Alert.alert('Não foi possível conectar a conta Google');
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <Header>
        <TitleWrapper>
          <LogoSVG width={RFValue(120)} height={RFValue(68)} />
          <Title>
            Controle suas {'\n'}finanças de forma {'\n'}muito simples
          </Title>
        </TitleWrapper>
        <SignInTitle>
          Faça seu login com {'\n'}uma das contas abaixo
        </SignInTitle>
      </Header>
      <Footer>
        <FooterWrapper>
          <SignInSocialButton
            title="Entrar com Google"
            svg={GoogleSVG}
            onPress={handleSignInWithGoogle}
          />

          {Platform.OS === 'ios' && (
            <SignInSocialButton
              title="Entrar com Apple"
              svg={AppleSVG}
              onPress={() => {}}
            />
          )}
        </FooterWrapper>

        {isLoading && (
          <ActivityIndicator
            color={theme.colors.primary}
            size="large"
            style={{ marginTop: 18 }}
          />
        )}
      </Footer>
    </Container>
  );
};
