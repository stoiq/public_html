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