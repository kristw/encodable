/* eslint-disable no-undef */
module.exports.onCreateWebpackConfig = ({ actions, getConfig }) => {
  const config = getConfig();

  const newRules = config.module.rules.filter(
    rule =>
      !(
        rule.use &&
        rule.use[0] &&
        rule.use[0].options &&
        rule.use[0].options.useEslintrc !== undefined
      ),
  );

  config.module.rules = newRules;

  actions.replaceWebpackConfig(config);
};
