import type {StorybookConfig} from '@storybook/angular';


const config: StorybookConfig = {
  stories: ['../**/*.@(stories.@(ts))'],
  addons: ['@storybook/addon-essentials', '@storybook/addon-interactions'],
  framework: {
    name: '@storybook/angular',
    options: {},
  },
};

export default config;
