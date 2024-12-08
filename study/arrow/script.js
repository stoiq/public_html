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
  const dynamicLabel  = document.getElementById("dynamicLabel");
  dynamicLabel.textContent = i18next.t("updatedText1") + `${key}` + i18next.t("updatedText2");
}

// 各ボタンにイベントリスナーを追加
document.getElementById("up").addEventListener("click", () => updateMessage("↑"));
document.getElementById("left").addEventListener("click", () => updateMessage("←"));
document.getElementById("down").addEventListener("click", () => updateMessage("↓"));
document.getElementById("right").addEventListener("click", () => updateMessage("→"));

// 翻訳データを定義
const resources = {
  en: {
    translation: {
      title: "Arrow keys",
      initialText: "Please press the button",
      updatedText1: "You pressed the ",
      updatedText2: " key"
    }
  },
  ja: {
    translation: {
      title: "矢印キー",
      initialText: "ボタンを押してください",
      updatedText1: "",
      updatedText2: "キーを押しました"
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