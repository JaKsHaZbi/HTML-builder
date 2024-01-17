const fs = require('fs');
const path = require('path');

const pathFolder = path.join(__dirname, 'files');
const pathFolderCopy = path.join(__dirname, 'files-copy');

fs.stat(pathFolderCopy, (err) => {
  if (!err) {
    fs.readdir(pathFolderCopy, (err, files) => {
      if (err) throw err;
      files.forEach((file) => {
        fs.unlink(path.join(pathFolderCopy, file), (err) => {
          if (err) throw err;
        });
      });
      fs.readdir(pathFolder, (err, files) => {
        if (err) throw err;
        files.forEach((file) => {
          fs.copyFile(
            path.join(pathFolder, file),
            path.join(pathFolderCopy, file),
            (err) => {
              if (err) throw err;
            },
          );
        });
      });
    });
    console.log('Finish');
  } else {
    fs.mkdir(pathFolderCopy, { recursive: true }, (err) => {
      if (err) throw err;
      fs.readdir(pathFolder, (err, files) => {
        if (err) throw err;
        files.forEach((file) => {
          fs.copyFile(
            path.join(pathFolder, file),
            path.join(pathFolderCopy, file),
            (err) => {
              if (err) throw err;
            },
          );
        });
      });
    });
    console.log('Finish');
  }
});
