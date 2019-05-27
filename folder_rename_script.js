const fs = require('fs')
const path = require('path')

const folderName = 'F:\\Photos\\PM'

try {
  if (!fs.existsSync(folderName)){
    fs.mkdirSync(folderName)
  }

  fs.readdirSync(folderName).map(fileName => {
    const parts = fileName.split('-');
    if(parts.length === 3){     
      if(parts[0].length === 2){
        const newFolderName = parts.reverse().join('-');
        console.log(fileName, newFolderName);
        console.log('Using old format', parts,  fileName);
        try {
          fs.renameSync(path.join(folderName, fileName), path.join(folderName, newFolderName))
        } catch (err) {
          console.error(err)
        }
      }      
    }
  });

} catch (err) {
  console.error(err)
}