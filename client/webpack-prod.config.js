const path = require("path");
const webpack = require("webpack");
const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
	mode: "production",
	entry: "./src/index.js",
	devtool: "hidden-source-map",
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
						presets: ["@babel/preset-env", "@babel/preset-react"],
						plugins: ["transform-class-properties", "@babel/transform-runtime"]
					}
				}
			},
			{
				test: /\.html$/,
				use: [
					{
						loader: "html-loader"
					}
				]
			},
			{
				test: /\.css$/,
				use: ["style-loader", "css-loader"]
			},
			{
				test: /\.(png|jpg|jpeg|gif|svg|pdf)$/,
				loader: "url-loader",
				options: {
					limit: 10000
				}
			}
		]
	},
	resolve: { extensions: ["*", ".js", ".jsx"] },
	output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: "/",
		filename: "bundle.js"
	},
	plugins: [
		new webpack.NamedModulesPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new HtmlWebPackPlugin({
			template: path.resolve(__dirname, "src", "index.html"),
			filename: path.resolve(__dirname, "dist", "index.html")
		})
	]
};
