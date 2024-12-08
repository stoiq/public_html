// i18next を初期化
i18next
  .use(i18nextHttpBackend) // JSONファイルから翻訳データを読み込むプラグイン
  .init({
    lng: "ja", // デフォルト言語
    debug: true, // デバッグ情報
    backend: {
      // JSON ファイルのパスを指定
      loadPath: "/locales/{{lng}}.json"
    }
  })
  .then(() => {
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
