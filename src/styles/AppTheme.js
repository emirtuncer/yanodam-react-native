const ThemeColors = {
  primaryText: {
    dark: 'white',
    light: 'black',
  },

  primaryBackground: {
    dark: 'black',
    light: 'white',
  },

  headerBackground: {
    dark: '#1B1B1B',
    light: '#FBFBFB',
  },

  text: {
    dark: '#FFFFFF',
    light: '#383838',
  },

  main: {
    dark: '#282828',
    light: '#828282',
  },

  background: {
    light: '#E1E1E1',
    dark: '#1E1E1E',
  },

  background18: {
    light: '#C8C8C8',
    dark: '#181818',
  },

  card: {
    dark: '#1B1B1B',
    light: '#ECECEC',
  },

  profileCardBackground: {
    dark: '#2D2D2D',
    light: '#ECECEC',
  },

  border: {
    dark: '#737373',
    light: '#ECECEC',
  },

  green: {
    dark: '#B2B2B2',
    light: '#535353',
  },

  greenD: {
    dark: '#1ABC9C',
    light: '#1ABC9C',
  },

  red: {
    dark: '#FD6060',
    light: '#FF5252',
  },

  modalBg: {
    dark: 'rgba(0, 0, 0, 0.6)',
    light: 'rgba(255, 255, 255, 0.6)',
  },

  modalBackground: {
    dark: '#1A1A1A',
    light: '#fff',
  },

  textInputBackground: {
    dark: '#1F1F1F',
    light: '#DEDEDE',
  },

  buttonBackground: {
    dark: '#161616',
    light: '#EBEBEB',
  },

  bottomTab: {
    dark: '#1E1E1E',
    light: '#FBFBFB',
  },

  bottomTabActive: {
    dark: '#FFFFFF',
    light: '#000',
  },

  bottomTabInactive: {
    dark: '#737373',
    light: '#7C7C7C',
  },

  statusBarBackground: {
    dark: '#000',
    light: '#fff',
  },

  statusBarStyle: {
    dark: 'light-content',
    light: 'dark-content',
  },

  chipBarBackground: {
    dark: '#121212',
    light: '#fff',
  },

  profilePhotoContainer: {
    dark: '#242424',
    light: '#E1E1E1',
  },

  searchInside: {
    dark: '#1F1F1F',
    light: '#1F1F1F',
  },

  searchOutside: {
    dark: '#0F0F0F',
    light: '#0F0F0F',
  },

  swipeable: {
    dark: '#1F1F1F',
    light: '#DEDEDE',
  },

  infoRowBorder: {
    dark: '#383838',
    light: '#E1E1E1',
  },

  tabView: {
    dark: '#2D2D2D',
    light: '#FBFBFB',
  },

  listView: {
    dark: '#F7F7F7',
    light: '#F7F7F7',
  },

  authBackground: {
    dark: '#2D2D2D',
    light: '#D2D2D2',
  },

  divider: {
    dark: '#1E1E1E',
    light: '#E1E1E1',
  },

  authView: {
    dark: '#1F1F1F',
    light: '#F1F1F1',
  },
};

const getTheme = (mode: string) => {
  let Theme = {};
  for (let key in ThemeColors) {
    Theme[key] = ThemeColors[key][mode];
  }
  return Theme;
};

export {ThemeColors, getTheme};
