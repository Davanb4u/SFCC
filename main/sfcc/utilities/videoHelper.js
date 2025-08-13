const fs = require('fs');
const path = require('path');

async function createContextWithVideo(browser, testName, outputDir = 'test-results/videos') {
  // Ensure output directory exists
  fs.mkdirSync(outputDir, { recursive: true });

  const context = await browser.newContext({
    recordVideo: {
      dir: outputDir,
      size: { width: 1920, height: 1080 }
    }
  });

  // Return context and a helper to finalize and rename the video
  return {
    context,
    async finalizeVideo(page) {
      const videoPath = await page.video().path();
      await context.close(); // finalize video
      const newVideoPath = path.join(outputDir, `${testName}.webm`);
      fs.renameSync(videoPath, newVideoPath);
      return newVideoPath;
    }
  };
}

module.exports = { createContextWithVideo };