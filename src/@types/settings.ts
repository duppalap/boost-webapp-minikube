// ----------------------------------------------------------------------

export type ThemeMode = 'light' | 'dark';
export type ThemeDirection = 'rtl' | 'ltr';
export type ThemeColor = 'default' | 'purple' | 'cyan' | 'blue' | 'orange' | 'red';
export type ThemeFont = 'Poppins, sans-serif' | 'Public Sans, sans-serif';

export type SettingsContextProps = {
  themeMode: ThemeMode;
  themeDirection: ThemeDirection;
  themeColor: ThemeColor;
  themeFont: ThemeFont;
  themeStretch: boolean;
  setColor: {
    name: string;
    lighter: string;
    light: string;
    main: string;
    dark: string;
    darker: string;
    contrastText: string;
  };
  colorOption: {
    name: string;
    value: string;
  }[];
  onChangeMode: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeDirection: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeColor: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeFont: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onToggleStretch: VoidFunction;
};
