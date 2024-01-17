const fs = require('fs');
const path = require('path');

const pathFile = path.join(__dirname, './secret-folder');

fs.readdir(pathFile, (err, files) => {
  if (err) console.log(err);
  else {
    files.forEach((file) => {
      fs.stat(path.join(pathFile, file), (err, stats) => {
        if (err) throw err;

        if (stats.isFile()) {
          console.log(
            `${file.replace(/\.[^.]*$/, '')} - ${path
              .extname(file)
              .replace(/./, '')} - ${stats.size} Bytes`,
          );
        }
      });
    });
  }
});
