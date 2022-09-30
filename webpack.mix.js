const mix = require('laravel-mix');
const path = require('path');

require('laravel-mix-tailwind');

// mix.options({
//     processCssUrls: false,
//     imgLoaderOptions: false
// });

// Add alias
mix.alias({
    '@': path.join(__dirname, 'resources/scripts')
});

mix.copy('resources/assets', 'public/static');
mix.sass('resources/styles/main.scss', 'public/static/main.css').tailwind('tailwind.config.js');
mix.js('resources/scripts/main.js', 'public/static/main.js').vue();