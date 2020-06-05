const path = require("path");
const webpack = require("webpack");
const HtmlWebPackPlugin = require('html-webpack-plugin');

const paths = {
	entryClient: path.resolve(__dirname, "src", 'index.js'),
	srcHtml: path.resolve(__dirname, "src", "index.html"),
	dest: path.resolve(__dirname, 'public'),
	destHtml: path.resolve(__dirname, 'public', 'index.html'),
	contentBase: path.join(__dirname, 'public')
};

module.exports = {
	mode: "development",
	entry: "./src/index.js",
	devtool: "inline-source-map",
	module: {
		rules: [
			{
				test: /.(js|jsx)$/,
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
				test: /.html$/,
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
		path: paths.dest,
		publicPath: "/",
		filename: "allbundle.js"
	},
	devServer: {
		contentBase: paths.contentBase,
		compress: true, // enable gzip compression
		historyApiFallback: true, // true for index.html upon 404, object for multiple paths
		hot: true, // hot module replacement. Depends on HotModuleReplacementPlugin
		https: false, // true for self-signed, object for cert authority
		port: 3000,
		proxy: {
			"/api": "http://localhost:4000"
		}
	},
	plugins: [
		new webpack.NamedModulesPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new HtmlWebPackPlugin({
			template: paths.srcHtml,
			filename: paths.destHtml
		})
	]
};
