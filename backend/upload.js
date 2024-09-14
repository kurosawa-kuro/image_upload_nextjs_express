const multer = require('multer')
const path = require('path')

// Multerストレージの設定
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "./public/Images"),
  filename: (req, file, cb) => cb(null, `${Date.now()}_${file.originalname}`)
})

const upload = multer({ storage })

// ファイルアップロード処理
const handleFileUpload = (req, res) => {
  if (req.file) {
    console.log('アップロードされたファイル:', req.file)
    res.status(200).json({ 
      message: 'ファイルが正常にアップロードされました',
      file: req.file,
      url: `http://localhost:3001/Images/${req.file.filename}`
    })
  } else {
    console.log('ファイルアップロード失敗')
    res.status(400).json({ message: 'ファイルのアップロードに失敗しました' })
  }
}

module.exports = {
  upload,
  handleFileUpload
}