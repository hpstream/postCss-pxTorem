// postcss.config.js
module.exports = {
    syntax: require('postcss-less'),
    plugins: [
        require('postcss-import')(),
        require('postcss-url')(),
        require('autoprefixer')({
            'overrideBrowserslist': [
                '> 0.1%',
                'Android >= 4.1',
                'ios >= 8',
                'not ie < 12'
            ]
        }),
        require('./loaders/pxToRem/pxToRem.js')({})

    ]
};
