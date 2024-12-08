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
          playerSymbol = playerSymbol === "×" ? "〇" : "×"; // プレイヤーのシンボルを交互に切り替え
          playerTurn = true;
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

    // 1. 勝てる手を探す
    let chosenCell = findWinningCell(aiSymbol);

    // 2. プレイヤーのリーチを妨害
    if (!chosenCell) {
      chosenCell = findWinningCell(playerSymbol);
    }

    // 3. ランダムな手を選ぶ
    if (!chosenCell) {
      const randomIndex = Math.floor(Math.random() * emptyCells.length);
      chosenCell = emptyCells.eq(randomIndex);
    }

    // AIが選んだセルにマークを置く
    chosenCell.text(aiSymbol);

    // 勝敗判定
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

  // 指定されたシンボルで勝てるセルを探す
  function findWinningCell(symbol) {
    const cells = $(".cell").map(function() {
      return $(this).text();
    }).get();

    const winningCombinations = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // 横
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // 縦
      [0, 4, 8], [2, 4, 6]             // 斜め
    ];

    for (const combination of winningCombinations) {
      const [a, b, c] = combination;
      const line = [cells[a], cells[b], cells[c]];

      // 勝利または妨害可能な場所を特定
      if (line.filter(cell => cell === symbol).length === 2 && line.includes("")) {
        const emptyIndex = line.indexOf("");
        return $(".cell").eq(combination[emptyIndex]);
      }
    }

    return null; // 見つからない場合
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
    $(".cell").text("");
    $(".piece").each(function(index) {
      $(this).css({ top: "0px", left: "0px" });
      $(this).draggable("enable");
    });

    playerTurn = true;
    playerSymbol = "×";
  }

  // AIモード切り替えボタン
  $("#ai-toggle").click(function() {
    isAIMode = !isAIMode;
    $(this).toggleClass("off", !isAIMode);
    $(this).text(`CPU: ${isAIMode ? "ON" : "OFF"}`);
    resetGame();
  });
});

// 翻訳データを定義
const resources = {
  en: {
    translation: {
      title: "Tic-tac-toe",
      description: "Tic-tac-toe is a two-player game where the goal is to align three of your symbols in a row on a 3x3 grid."
    }
  },
  ja: {
    translation: {
      title: "〇×ゲーム",
      description: "〇と×を交互に置き、縦・横・斜めのいずれかに3つ揃えると勝ちです"
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