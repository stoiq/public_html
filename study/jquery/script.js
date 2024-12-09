$(function() {
  $("#content1 .draggable").draggable({
    containment: "#container" // 親要素（フィールド）内に限定
  });
  $("#content1 .droppable").droppable({
    drop: function(event, ui) {
      $(this).text(i18next.t("dropped"));
    }
  });
  $( "#content1 .resizable" ).resizable();
  $( "#content1 .selectable" ).selectable();
  $( "#content1 .sortable" ).sortable();
});

// 翻訳データを定義
const resources = {
  en: {
    translation: {
      title: "Interactions",
      jqueryui1: "Draggable and Droppable",
      jqueryui2: "Selectable and Sortable",
      draggable: "Drag me",
      droppable: "Drop here",
      dropped: "Dropped!",
      resizable:"Resize me"
    }
  },
  ja: {
    translation: {
      title: "インタラクション",
      jqueryui1: "DraggableとDroppable",
      jqueryui2: "SelectableとSortable",
      draggable: "ドラッグ可",
      droppable: "ここにドロップ",
      dropped: "ドロップ成功!",
      resizable:"リサイズ可"
    }
  }
};

// Cookie に保存する関数
function setCookie(name, value, days) {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = "expires=" + date.toUTCString();
  document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

// Cookie を取得する関数
function getCookie(name) {
  const cookies = document.cookie.split("; ");
  for (let cookie of cookies) {
    const [key, value] = cookie.split("=");
    if (key === name) return value;
  }
  return null;
}
// i18next を初期化
i18next.init({
  lng: getCookie("language") || "ja", // 初期言語
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
    // 言語を変更し、Cookie に保存
    i18next.changeLanguage(selectedLanguage).then(() => {
      setCookie("language", selectedLanguage, 7); // 7日間有効
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

  // ラジオボタンの状態を更新
  const currentLanguage = i18next.language;
  document.querySelectorAll('input[name="language"]').forEach((radio) => {
    radio.checked = radio.value === currentLanguage;
  });
}