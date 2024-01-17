const fs = require('fs');
const path = require('path');

const stylesDir = path.join(__dirname, 'styles');
const outputDir = path.join(__dirname, 'project-dist');
const outputFile = 'bundle.css';

fs.readdir(stylesDir, (err, files) => {
  if (err) throw err;

  const styles = [];

  files.forEach((file) => {
    const filePath = path.join(stylesDir, file);

    fs.stat(filePath, (err, stats) => {
      if (err) throw err;

      if (stats.isFile() && path.extname(filePath) === '.css') {
        fs.readFile(filePath, 'utf-8', (err, data) => {
          if (err) throw err;

          styles.push(data);

          const outputFilePath = path.join(outputDir, outputFile);

          fs.writeFile(outputFilePath, styles.join('\n'), (err) => {
            if (err) throw err;
          });
        });
      }
    });
  });
  console.log(
    `Стили успешно объединены в файл ${path.join(outputDir, outputFile)}`,
  );
});
