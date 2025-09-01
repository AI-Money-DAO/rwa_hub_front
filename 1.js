const fs = require('fs');
const path = require('path');

function createProjectFromJson(jsonFilePath) {
  try {
    // 读取JSON文件
    const jsonData = fs.readFileSync(jsonFilePath, 'utf8');
    const projectStructure = JSON.parse(jsonData);
    
    // 获取当前目录
    const currentDir = process.cwd();
    
    // 创建项目文件
    for (const [filePath, content] of Object.entries(projectStructure)) {
      const fullPath = path.join(currentDir, filePath);
      const dirName = path.dirname(fullPath);
      
      // 确保目录存在
      if (!fs.existsSync(dirName)) {
        fs.mkdirSync(dirName, { recursive: true });
      }
      
      // 写入文件内容
      fs.writeFileSync(fullPath, content, 'utf8');
      console.log(`Created: ${filePath}`);
    }
    
    console.log('\n✅ Project structure created successfully!');
  } catch (error) {
    console.error('❌ Error creating project:', error.message);
  }
}

// 执行脚本
const jsonFilePath = path.join(__dirname, '1.json');
createProjectFromJson(jsonFilePath);