const fs = require('fs');
const path = require('path');

function updateFilesJson(folderPath, folderName) {
  const filesJsonPath = path.join(folderPath, 'files.json');

  // Read existing files.json if it exists
  let existingData = {};
  if (fs.existsSync(filesJsonPath)) {
    try {
      const content = fs.readFileSync(filesJsonPath, 'utf8');
      existingData = JSON.parse(content);
    } catch (error) {
      console.warn(`Warning: Could not parse existing ${folderName}/files.json, creating new one.`);
    }
  }

  // Get all .txt files
  const txtFiles = fs.readdirSync(folderPath).filter(file => file.endsWith('.txt'));

  // Preserve existing properties and update files array
  const updatedData = {
    ...existingData,
    files: txtFiles
  };

  // Write back to files.json
  const jsonContent = JSON.stringify(updatedData, null, 2);
  fs.writeFileSync(filesJsonPath, jsonContent);
  console.log(`${folderName}/files.json updated successfully.`);
}

// Update files.json for EN folder
updateFilesJson('./en', 'en');

// Update files.json for CN folder
updateFilesJson('./cn', 'cn');

// Update files.json for TW folder
updateFilesJson('./tw', 'tw');
