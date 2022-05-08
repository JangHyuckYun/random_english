import { DefaultTheme } from 'styled-components';

// 추후 다크테마, 라이트테마 필요성 느낄 시 수정 예정
export const theme: DefaultTheme = {
  textColor: '#666',
  fonts: {
    family: {
      base: `'Noto Sans KR', sans-serif`,
      title: `'Merriweather', serif`,
    },
    size: {
      min: '1.0rem',
      sm: '1.4rem',
      base: '1.6rem',
      lg: '2rem',
      xl: '2.5rem',
      title: '6rem',
    },
    weight: {
      light: 100,
      normal: 400,
      bold: 700,
    },
  },
  containerSize: {
    mobile: '580px',
    tablet: '768px',
    desktop: '1440px',
  },
};
