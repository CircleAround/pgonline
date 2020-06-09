// Playerインターフェース
interface Player {
  play()

  stop()

  seek(position)
}

// 動画再生クラス
class VideoPlayer implements Player {
  constructor(path) {
    // 何か処理があるつもりです
    console.log(`${path}からファイルをロードしました`);
  }

  play() {
    // 何か処理があるつもりです
    console.log('動画を再生する処理を実行しました');
  }

  stop() {
    // 何か処理があるつもりです
    console.log('動画を停止する処理を実行しました');
  }

  seek(position) {
    // 何か処理があるつもりです
    console.log(`動画の再生場所を${position}に変更しました`);
  }
}

// 音楽再生クラス
class AudioPlayer implements Player {
  constructor(path) {
    console.log(`${path}からファイルをロードしました`);
  }

  play() {
    console.log('音楽を再生する処理を実行しました');
  }

  stop() {
    console.log('音楽を停止する処理を実行しました');
  }

  seek(position) {
    console.log(`音楽の再生場所を${position}に変更しました`);
  }
}


function sample(player) {
  // 画面から操作したりするイメージで見てください
  player.play(); // 再生
  player.seek(0.5); // 半分まで再生場所を移動
  player.stop(); // 停止
}

console.log('### 動画再生のテスト ###');
const videoPlayer = new VideoPlayer('my/video.mp4');
sample(videoPlayer);

console.log('### 音楽再生のテスト ###');
const audioPlayer = new AudioPlayer('my/audio.mp4');
sample(audioPlayer);







