import React from 'react';
import { RFValue } from 'react-native-responsive-fontsize';

import { SignInSocialButton } from '../../components/SignInSocialButton';

import AppleSVG from '../../assets/images/apple.svg';
import GoogleSVG from '../../assets/images/google.svg';
import LogoSVG from '../../assets/images/logo.svg';

import { useAuth } from '../../hooks/auth';

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
  const { signInWithGoogle } = useAuth();

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
            onPress={signInWithGoogle}
          />
          {/* <SignInSocialButton title="Entrar com Apple" svg={AppleSVG} /> */}
        </FooterWrapper>
      </Footer>
    </Container>
  );
};
