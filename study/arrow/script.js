// 矢印キーのイベントを模倣する関数
function handleArrowKey(key) {
  console.log(`Arrow ${key} pressed`);
  // Tetrisのピースを動かすなど、処理をここに追加できます。
}

// 各ボタンにイベントリスナーを追加
document.getElementById("up").addEventListener("click", () => handleArrowKey("Up"));
document.getElementById("left").addEventListener("click", () => handleArrowKey("Left"));
document.getElementById("down").addEventListener("click", () => handleArrowKey("Down"));
document.getElementById("right").addEventListener("click", () => handleArrowKey("Right"));


// メッセージを更新する関数
function updateMessage(key) {
  const messageElement = document.getElementById("message");
  messageElement.textContent = `今 ${key} キーを押しています`;
}

// 各ボタンにイベントリスナーを追加
document.getElementById("up").addEventListener("click", () => updateMessage("↑"));
document.getElementById("left").addEventListener("click", () => updateMessage("←"));
document.getElementById("down").addEventListener("click", () => updateMessage("↓"));
document.getElementById("right").addEventListener("click", () => updateMessage("→"));
