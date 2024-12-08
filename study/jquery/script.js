$(function() {
  $("#content1 .draggable").draggable({
    containment: "#container" // 親要素（フィールド）内に限定
  });
  $("#content1 .droppable").droppable({
    drop: function(event, ui) {
      $(this).text(i18next.t("dropped"));
    }
  });
});

// 翻訳データを定義
const resources = {
  en: {
    translation: {
      jqueryui1: "・Draggable and Droppable",
      draggable: "Drag me",
      droppable: "Drop here",
      dropped: "Dropped!"
    }
  },
  ja: {
    translation: {
      jqueryui1: "・DraggableとDroppable",
      draggable: "ドラッグ可",
      droppable: "ここにドロップ",
      dropped: "ドロップ成功!"
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