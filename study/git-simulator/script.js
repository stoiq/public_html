$(function() {
  $(".commit").draggable({
    revert: "invalid"
  });

  $("#remote").droppable({
    accept: ".commit",
    drop: function(event, ui) {
      const commit = ui.draggable;
      $(this).append(commit);
      $(commit).css({
        top: "auto",
        left: "auto"
      });
      $(this).css("background-color", "#90ee90");
      setTimeout(() => {
        $(this).css("background-color", "#ffefd5");
      }, 500);
      alert("Commit pushed to Remote Repository!");
    }
  });
});

// 翻訳データを定義
const resources = {
  en: {
    translation: {
      description: "Tic-tac-toe is a two-player game where the goal is to align three of your symbols in a row on a 3x3 grid."
    }
  },
  ja: {
    translation: {
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