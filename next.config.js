const withPlugins = require('next-compose-plugins');
const withImages = require('next-images');



require("dotenv").config({ path: `${process.env.ENVIRONMENT}` });
const webpack = require('webpack')

const { nextI18NextRewrites } = require('next-i18next/rewrites')

const localeSubpaths = {}

module.exports =withPlugins([[withImages()]]),{
    rewrites: async () => nextI18NextRewrites(localeSubpaths),

    webpack: (config, {dev}) => {
        const env = process.env.ENV? process.env.ENV : "development";
        
        config.plugins.push(
            new webpack.EnvironmentPlugin(process.env)
          )
      
        return config
      }
    
}
