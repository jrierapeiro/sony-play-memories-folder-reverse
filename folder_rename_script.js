const fs = require('fs')
const path = require('path')

const defaultFolderName = 'F:\\Photos\\PM'

const renameFolders = (args) => {
  console.log('Args: ', args);

  let folderName = defaultFolderName;
  // Args 0 and 1 are node + program.js
  if (args && args.length > 2) {
    folderName = args[2];
  }

  console.log('Working on folder: ', folderName);
  try {
    if (!fs.existsSync(folderName)) {
      fs.mkdirSync(folderName)
    }

    fs.readdirSync(folderName).map(fileName => {
      const parts = fileName.split('-');
      if (parts.length === 3) {
        // Old Format MM-DD-YYYY
        if (parts[0].length === 2) {
          const newFolderName = parts.reverse().join('-');
          console.log('Renaming folder:', fileName, newFolderName);
          try {
            fs.renameSync(path.join(folderName, fileName), path.join(folderName, newFolderName))
          } catch (err) {
            console.error(err)
          }
        } else {
          console.log('Folder already using new format', fileName);
        }
      }
    });
  } catch (err) {
    console.error(err)
  }
};

renameFolders(process.argv);

