const fs = require('fs');
const path = require('path');

const pathDir = path.join(__dirname, 'project-dist');

fs.mkdir(pathDir, { recursive: true }, (err) => {
  if (err) throw err;
});

fs.readdir(__dirname, (err, files) => {
  if (err) throw err;

  files.forEach((file) => {
    fs.stat(path.join(__dirname, file), (err, stats) => {
      if (err) throw err;

      if (stats.isFile() && path.extname(file) === '.html') {
        fs.readFile(path.join(__dirname, file), 'utf-8', (err, dataMain) => {
          if (err) throw err;

          const components = {};

          fs.readdir(path.join(__dirname, 'components'), (err, files) => {
            if (err) throw err;

            let count = 0;

            files.forEach((file) => {
              fs.readFile(
                path.join(__dirname, 'components', file),
                'utf-8',
                (err, data) => {
                  if (err) throw err;

                  components[file.replace('.html', '')] = data;
                  count++;

                  if (count === files.length) {
                    const result = dataMain.replace(
                      /{{(.+?)}}/g,
                      (match, p1) => {
                        return components[p1] || '';
                      },
                    );
                    fs.writeFile(
                      path.join(__dirname, 'project-dist/index.html'),
                      result,
                      'utf8',
                      (err) => {
                        if (err) throw err;
                        console.log('File saved!');
                      },
                    );
                  }
                },
              );
            });
          });
        });
      }
    });
  });
});

fs.readdir(path.join(__dirname, 'styles'), (err, files) => {
  if (err) throw err;

  let styles = '';
  let countStyle = 0;
  files.forEach((file) => {
    fs.readFile(path.join(__dirname, 'styles', file), 'utf-8', (err, data) => {
      if (err) throw err;
      styles += data;
      countStyle++;
      if (countStyle === files.length) {
        fs.writeFile(
          path.join(__dirname, 'project-dist/style.css'),
          styles,
          'utf-8',
          (err) => {
            if (err) throw err;
            console.log('Styles saved!');
          },
        );
      }
    });
  });
});

fs.readdir(
  path.join(__dirname, 'assets'),
  { withFileTypes: true },
  (err, floders) => {
    if (err) throw err;

    floders.forEach((folder) => {
      if (folder.isDirectory()) {
        fs.mkdir(
          path.join(__dirname, 'project-dist', 'assets', folder.name),
          { recursive: true },
          (err) => {
            if (err) throw err;

            fs.readdir(
              path.join(__dirname, 'assets', folder.name),
              { withFileTypes: true },
              (err, files) => {
                if (err) throw err;

                files.forEach((file) => {
                  if (file.isFile()) {
                    fs.copyFile(
                      path.join(__dirname, 'assets', folder.name, file.name),
                      path.join(
                        __dirname,
                        'project-dist',
                        'assets',
                        folder.name,
                        file.name,
                      ),
                      (err) => {
                        if (err) throw err;
                      },
                    );
                  }
                });
              },
            );
          },
        );
      }
    });
    console.log('Asset copy!');
  },
);
