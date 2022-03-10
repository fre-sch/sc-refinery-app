require("dotenv").config()
const resolveEnvVars = require("resolve-env-vars")
const { DefinePlugin } = require("webpack")

export default function (config, env, helpers) {
  config.output.publicPath = '/app/';
  Object.assign(config.devServer, {
    host: 'localhost'
  })

  const { stringified, raw } = resolveEnvVars("PREACT_APP_");
  config.plugins.push(new DefinePlugin(stringified));

  const { plugin: htmlPlugin } =
    helpers.getPluginsByName(config, "HtmlWebpackPlugin")[0] || {};

  if (htmlPlugin) {
    // Pass all prefixed env vars to the HTML template.
    htmlPlugin.options.env = raw;
  }
}
