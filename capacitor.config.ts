import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.crownworksnl.app',
  appName: 'CrownWorksNL',
  webDir: 'out',
  server: {
    androidScheme: 'https',
    iosScheme: 'https',
    url: 'https://crownworksnl.com',
    cleartext: false,
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      launchAutoHide: true,
      backgroundColor: '#4f46e5',
      androidSplashResourceName: 'splash',
      androidScaleType: 'CENTER_CROP',
      showSpinner: false,
      iosSpinnerStyle: 'small',
      spinnerColor: '#ffffff',
      splashFullScreen: true,
      splashImmersive: true,
    },
    StatusBar: {
      style: 'default',
      backgroundColor: '#4f46e5',
    },
    App: {
      launchUrl: 'https://crownworksnl.com',
    },
  },
  android: {
    buildOptions: {
      keystorePath: undefined,
      keystoreAlias: undefined,
    },
  },
  ios: {
    scheme: 'CrownWorksNL',
  },
};

export default config;

