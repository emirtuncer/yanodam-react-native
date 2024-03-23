import React from 'react';
import normalize from 'react-native-normalize';
import styled from 'styled-components/native';

const TextStyle = ({...props}) => {
  return <Text {...props}>{props.children}</Text>;
};

const Text = styled.Text`
  color: ${props => props.color ?? '#414959'};
  margin: ${props => props.margin ?? 0};
  padding: ${props => props.padding ?? 0};
  font-family: ${props => props.fontFamily ?? 'Montserrat-Regular'};

  ${({yes, no}) => {
    switch (true) {
      case yes:
        return `color: #00B400`;
      case no:
        return `color: #E43F3F`;
    }
  }}

  /* ${({title, large, medium, small, tiny}) => {
    switch (true) {
      case title:
        return `font-size: hpx`.replace('h', normalize(28));

      case large:
        return `font-size: hpx`.replace('h', normalize(20));

      case medium:
        return `font-size: hpx`.replace('h', normalize(16));

      case small:
        return `font-size: hpx`.replace('h', normalize(13));

      case tiny:
        return `font-size: hpx`.replace('h', normalize(8));

      default:
        return `font-size: hpx`.replace('h', normalize(16));
    }
  }} */

    ${({title, large, medium, small, tiny}) => {
    switch (true) {
      case title:
        return `font-size: hpx`.replace('h', 28);

      case large:
        return `font-size: hpx`.replace('h', 20);

      case medium:
        return `font-size: hpx`.replace('h', 16);

      case small:
        return `font-size: hpx`.replace('h', 13);

      case tiny:
        return `font-size: hpx`.replace('h', 8);

      default:
        return `font-size: hpx`.replace('h', 16);
    }
  }}

    ${({extralight, light, med, semibold, bold}) => {
    switch (true) {
      case extralight:
        return `fontFamily: 'Montserrat-ExtraLight'`;

      case light:
        return `fontFamily: 'Montserrat-Light'`;

      case med:
        return `fontFamily: 'Montserrat-Medium'`;

      case semibold:
        return `fontFamily: 'Montserrat-SemiBold'`;

      case bold:
        return `fontFamily: 'Montserrat-Bold'`;

      default:
        return `fontFamily: 'Montserrat-Regular'`;
    }
  }}

    ${({center, right}) => {
    switch (true) {
      case center:
        return `text-align: center`;

      case right:
        return `text-align: right`;

      default:
        return `text-align: left`;
    }
  }}
`;

export default TextStyle;
