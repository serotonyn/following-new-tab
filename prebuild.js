const fs = require('fs');
const path = require('path');
const glob = require('glob');

const distPath = path.join(__dirname, 'dist');
console.log('fs', path.join(__dirname, 'dist'));

fs.rmdirSync(distPath, { recursive: true });

fs.mkdirSync(distPath);


glob('icon*', (err, res) => {
    if (err) throw err;
    res.forEach(filePath => {
        fs.copyFileSync(filePath, path.join(distPath, filePath));
    });
});
