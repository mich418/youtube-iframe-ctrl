import fs from 'fs';

if (fs.existsSync('./dist/index.js')) {
  const data = fs.readFileSync('./dist/index.js', 'utf8');
  const result = data.replace('"./YouTubeIFrameCtrl"', '"./YouTubeIFrameCtrl.js"');
  fs.writeFileSync('./dist/index.js', result, 'utf8');
}
