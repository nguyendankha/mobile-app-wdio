require('module-alias/register');
const path = require('path');

// Register aliases
const moduleAlias = require('module-alias');

moduleAlias.addAliases({
    '@pages': path.join(__dirname, 'pages'),
    '@resources': path.join(__dirname, 'resources'),
    '@utils': path.join(__dirname, 'utils')
});

console.log('Aliases registered:', {
    '@pages': path.join(__dirname, 'pages'),
    '@resources': path.join(__dirname, 'resources'),
    '@utils': path.join(__dirname, 'utils')
});
