import React from 'react';
import { SvgProps } from 'react-native-svg';
import { RectButtonProps } from 'react-native-gesture-handler';

import { Button, ImageContainer, Text } from './styles';

import AppleSVG from '../../assets/images/apple.svg';
import GoogleSVG from '../../assets/images/google.svg';
import LogoSVG from '../../assets/images/logo.svg';
import { RFValue } from 'react-native-responsive-fontsize';

interface Props extends RectButtonProps {
  title: string;
  svg: React.FC<SvgProps>;
}

export const SignInSocialButton = ({ title, svg: Svg, ...rest }: Props) => {
  return (
    <Button {...rest}>
      <ImageContainer>
        <Svg />
      </ImageContainer>
      <Text>{title}</Text>
    </Button>
  );
};
