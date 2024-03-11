const express = require('express');
const bodyParser = require('body-parser');
const { Translate } = require('@google-cloud-translate');

const app = express();
const port = 3000;

// 使用body-parser中间件解析POST请求的JSON数据
app.use(bodyParser.json());

// 设置Google Cloud翻译API凭证
const translate = new Translate({
  projectId: 'your-google-cloud-project-id',
});

// 处理文本翻译请求
app.post('/translate/text', async (req, res) => {
  const { text, targetLanguage } = req.body;

  try {
    const [translation] = await translate.translate(text, targetLanguage);
    res.json({ translation });
  } catch (error) {
    console.error(`Error translating text: ${error.message}`);
    res.status(500).json({ message: 'Translation failed' });
  }
});

// 处理语音翻译请求
app.post('/translate/speech', (req, res) => {
  // 在实际应用中，你可能需要使用语音识别库来将语音转换为文本
  // 这里只是一个简单的示例
  const { speech, targetLanguage } = req.body;

  // 使用Google Cloud翻译API进行文本翻译
  translate.translate(speech, targetLanguage)
    .then(([translation]) => {
      res.json({ translation });
    })
    .catch((error) => {
      console.error(`Error translating speech: ${error.message}`);
      res.status(500).json({ message: 'Translation failed' });
    });
});

// 启动Express应用程序
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
