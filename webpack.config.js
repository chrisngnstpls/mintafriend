const path = require('path')
const HtmlWepackPlugin = require('html-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const Dotenv = require('dotenv-webpack');

module.exports = {
    mode:'development',
    experiments: {
        topLevelAwait : true
    },
    entry: {
        bundle:path.resolve(__dirname, 'src/index.js')
    },
    output:{
        path:path.resolve(__dirname,'dist'),
        filename:'[name][contenthash].js',// redirects to name from entry
        clean:true,//keep files clean, delete previous build
        assetModuleFilename:'[name][ext]' //keep filenames for assets in original filename format

    },
    devtool:'source-map', //enable sourcemaps for debugging

    devServer:{ // configure dev server
        static:{
            directory:path.resolve(__dirname, 'dist')
        },
        port:3000,
        open:true, //open a new page on runtime
        hot:true, // hot reloading
        compress:true, //gzip compression
        historyApiFallback:true,
    },
    module:{ //loaders for different types of files
        rules:[
            {
                test: /\.scss$/,
                use:[
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.js$/,
                exclude:/node_modules/,
                use:{
                    loader:'babel-loader',
                    options:{
                        presets:[
                            '@babel/preset-env',
                        ]
                    }
                }
            },
            {
                test:/\.(jpeg|jpg|png|svg|gif)$/i,
                type:'asset/resource'

            }
        ]
    },
    plugins: [ //plugin for html page, looks in src
        new HtmlWepackPlugin({
            title:'Mint a Friend',
            filename : 'index.html',
            template:'src/template.html'
        }),
        new BundleAnalyzerPlugin(),
        new Dotenv()
    ]
}