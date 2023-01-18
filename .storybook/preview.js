import { ThemeProvider } from 'styled-components';
import theme from "../src/theme";
import { ConfigProvider } from 'antd';

const withTheme = (StoryFn, context) => {
  // Get the active theme value from the story parameter


  return (
    <ThemeProvider theme={ theme }>
      <ConfigProvider
        theme={{
          ...theme,
        }}
      >
      <StoryFn />
      </ConfigProvider>
    </ThemeProvider>
  )
}

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

export const decorators = [withTheme];