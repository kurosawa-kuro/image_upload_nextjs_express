const upload = async () => {
  console.log("Upload started");
  setUploadStatus("アップロード開始");
  setUploadedImageUrl(null);
  
  if (!file) {
    console.log("No file selected");
    setUploadStatus('ファイルが選択されていません');
    return;
  }

  const formData = new FormData();
  formData.append('file', file);

  try {
    console.log("Sending request to server");
    setUploadStatus("サーバーにリクエスト中...");
    const res = await axios.post('http://localhost:3001/upload', formData);
    
    console.log("Server response:", res.data);
    if (res.data.message) {
      setUploadStatus(res.data.message);
    } else {
      setUploadStatus('ファイルが正常にアップロードされました');
    }
    
    if (res.data.url) {
      setUploadedImageUrl(res.data.url);
    }
  } catch (error) {
    console.error('アップロードエラー:', error);
    setUploadStatus('アップロードエラーが発生しました');
  } finally {
    console.log("Upload process completed");
    setUploadStatus(prevStatus => `${prevStatus} (処理完了)`);
  }
};