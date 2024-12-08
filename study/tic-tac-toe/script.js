$(function() {
    let playerTurn = true; // プレイヤーのターン
    let isAIMode = false; // AIモード
    let aiSymbol = "〇"; // AIのマーク
    let playerSymbol = "×"; // プレイヤーのマーク
  
    // ドラッグ可能にする
    $(".piece").draggable({
      revert: "invalid",
      containment: "body"
    });
  
    // ドロップ可能エリア設定
    $(".cell").droppable({
      accept: ".piece",
      drop: function(event, ui) {
        if (!playerTurn) return; // AIが動くターン中は何もしない
  
        const droppedPiece = ui.draggable.text();
        const cell = $(this);
  
        if (cell.text() === "") {
          cell.text(droppedPiece);
          ui.draggable.draggable("disable");
          
          // 勝敗判定を一手ごとに実行
          if (checkWin(droppedPiece)) {
            alert(`${droppedPiece} の勝ちです！`);
            resetGame();
            return;
          }
  
          if (isBoardFull()) {
            alert("引き分けです！");
            resetGame();
            return;
          }
  
          // プレイヤーのターンを交代
          playerTurn = false;
  
          if (isAIMode) {
            setTimeout(aiTurn, 500); // AIが動く
          } else {
            // プレイヤーが交互にシンボルを変更
            playerSymbol = playerSymbol === "×" ? "〇" : "×";
            playerTurn = true; // プレイヤーのターンに戻す
          }
        }
      }
    });
  
    // AIのターン
    function aiTurn() {
      const emptyCells = $(".cell").filter(function() {
        return $(this).text() === "";
      });
  
      if (emptyCells.length === 0) return;
  
      const randomIndex = Math.floor(Math.random() * emptyCells.length);
      const chosenCell = emptyCells.eq(randomIndex);
  
      chosenCell.text(aiSymbol);
  
      // AIが一手ごとに勝敗判定を実行
      if (checkWin(aiSymbol)) {
        alert(`${aiSymbol} の勝ちです！`);
        resetGame();
        return;
      }
  
      if (isBoardFull()) {
        alert("引き分けです！");
        resetGame();
        return;
      }
  
      playerTurn = true; // プレイヤーのターンに戻す
    }
    
  
    // 勝敗判定
    function checkWin(symbol) {
      const cells = $(".cell").map(function() {
        return $(this).text();
      }).get();
  
      const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // 横
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // 縦
        [0, 4, 8], [2, 4, 6]             // 斜め
      ];
  
      return winningCombinations.some(combination => {
        const [a, b, c] = combination;
        return cells[a] === symbol && cells[b] === symbol && cells[c] === symbol;
      });
    }
  
    // ボードが満杯か確認
    function isBoardFull() {
      const cells = $(".cell").map(function() {
        return $(this).text();
      }).get();
  
      return cells.every(cell => cell !== "");
    }
  
    // ゲームのリセット
    function resetGame() {
      // ボードをリセット
      $(".cell").text("");
  
      // ピースを元の位置に戻す
      $(".piece").each(function(index) {
        $(this).css({ top: "0px", left: "0px" });
        $(this).draggable("enable");
      });
  
      playerTurn = true;
      playerSymbol = "×"; // 初期状態でプレイヤーのシンボルを×に戻す
    }
  
    // AIモード切り替えボタン
    $("#ai-toggle").click(function() {
      isAIMode = !isAIMode;
      $(this).toggleClass("off", !isAIMode);
      $(this).text(`CPU: ${isAIMode ? "オン" : "オフ"}`);
      resetGame(); // モード切り替え時にゲームをリセット
    });
  });
  
  // 翻訳データを定義
const resources = {
  en: {
    translation: {
      greeting: "Welcome",
      menu1: "JavaScript Exercises",
      menu2: "jQuery Exercises",
      jquery1: "・button",
      jqueryui1: "・Draggable and Droppable",
      jqueryui2: "・tic-tac-toe",
    }
  },
  ja: {
    translation: {
      greeting: "ようこそ",
      menu1: "JavaScriptの練習",
      menu2: "jQueryの練習",
      jquery1: "・ボタン",
      jqueryui1: "・DraggableとDroppable",
      jqueryui2: "・〇×ゲーム",
    }
  }
};

// i18next を初期化
i18next.init({
  lng: "ja", // 初期言語
  debug: true, // デバッグ情報を表示
  resources: resources // 翻訳リソース
}).then(() => {
  // 初期レンダリング
  updateContent();
});

// ラジオボタンのイベントリスナーを設定
document.querySelectorAll('input[name="language"]').forEach((radio) => {
  radio.addEventListener("change", (event) => {
    const selectedLanguage = event.target.value;
    i18next.changeLanguage(selectedLanguage).then(() => {
      updateContent();
    });
  });
});

// コンテンツを更新
function updateContent() {
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.getAttribute("data-i18n");
    element.textContent = i18next.t(key);
  });
}