const enhancePresetForBrowser = (envPreset, browserTargets) => {
  const presetConfig = envPreset[1];
  presetConfig.modules = false;
  presetConfig.useBuiltIns = 'entry';
  presetConfig.corejs = 3;
  presetConfig.targets = {};

  if (browserTargets) {
    presetConfig.targets.browsers = browserTargets;
  }
};

const defaultBrowserTargets = [
  'last 2 Chrome versions',
  'not Chrome < 60',
  'last 2 Safari versions',
  'not Safari < 10.1',
  'last 2 iOS versions',
  'not iOS < 10.3',
  'last 2 Firefox versions',
  'not Firefox < 54',
  'last 2 Edge versions',
  'not Edge < 15',
];

module.exports = {
  getBabelLoaderOptions: ({
    id,
    hot,
    browserTargets = defaultBrowserTargets,
  }) => {
    const babelConfig = require('../babel.config');

    const envPreset = babelConfig.presets[0];

    enhancePresetForBrowser(envPreset, browserTargets);
    enhancePresetForBrowser(
      babelConfig.overrides[0].presets[0],
      browserTargets
    );

    const cfg = {
      babelrc: false, // this is important to prevent babel from trying to use the babelrc
      presets: babelConfig.presets,
      cacheDirectory: !id ? true : `node_modules/.cache/babel-loader-${id}`,
      plugins: babelConfig.plugins,
      overrides: babelConfig.overrides,
    };

    if (hot) {
      cfg.plugins = cfg.plugins.concat(['react-hot-loader/babel']);
    }

    return cfg;
  },
};
