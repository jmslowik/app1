const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

const deps = require("./package.json").dependencies;
module.exports = (_,  argv) => ({
  output: {
    publicPath: argv.mode === "production" ? "https://app1-jmslowik.vercel.app/" : "http://localhost:3001/",
  },

  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
  },

  devServer: {
    port: 3001,
    historyApiFallback: true,
  },

  module: {
    rules: [
      {
        test: /\.m?js/,
        type: "javascript/auto",
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.(css|s[ac]ss)$/i,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },

  plugins: [
    new ModuleFederationPlugin({
      name: "app1",
      filename: "remoteEntry.js",
      remotes: {
        app1: `app1@${argv.mode === "production" ? "https://app1-jmslowik.vercel.app" : "http://localhost:3001"}/remoteEntry.js`,
        app2: `app2@${argv.mode === "production" ? "https://app2-jmslowik.vercel.app" : "http://localhost:3002"}/remoteEntry.js`,
        app3: `app3@${argv.mode === "production" ? "https://app3-jmslowik.vercel.app" : "http://localhost:3003"}/remoteEntry.js`,
      },
      exposes: {
        './MyContext': './src/MyContext'
      },
      shared: {
        ...deps,
        react: {
          singleton: true,
          requiredVersion: deps.react,
        },
        "react-dom": {
          singleton: true,
          requiredVersion: deps["react-dom"],
        },
      },
    }),
    new HtmlWebPackPlugin({
      template: "./src/index.html",
    }),
  ],
});
