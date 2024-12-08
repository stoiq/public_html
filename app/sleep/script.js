// 曜日の名前
const weekDays = ['日', '月', '火', '水', '木', '金', '土'];

// カレンダーの描画関数
function renderCalendar(data) {
  const calendarContainer = document.getElementById('calendar');
  calendarContainer.innerHTML = ''; // カレンダーをリセット

  // 過去30日分の日付を取得
  const today = new Date();
  const dates = Array.from({ length: 30 }, (_, i) => {
    const date = new Date(today);
    date.setDate(today.getDate() - (29 - i));
    return date;
  });

  // カレンダーにデータを表示
  dates.forEach((date, index) => {
    const dayDiv = document.createElement('div');
    dayDiv.className = 'calendar-day';

    const formattedDate = `${date.getMonth() + 1}/${date.getDate()}`;
    const sleepHours = data[index] || 'N/A'; // データがない場合は "N/A"

    // 睡眠時間の色を設定
    const sleepHoursClass = sleepHours >= 7 ? 'green' : 'red';

    dayDiv.innerHTML = `
      <span>${formattedDate}</span>
      <div class="sleep-hours ${sleepHoursClass}">${sleepHours} 時間</div>
    `;
    calendarContainer.appendChild(dayDiv);
  });
  
  // 平均睡眠時間を計算
  const totalSleep = data.reduce((sum, hours) => sum + (hours || 0), 0); // 合計睡眠時間
  const averageSleep = (totalSleep / data.length).toFixed(2); // 平均を計算し、小数点2桁までに

  // 平均睡眠時間を表示
  const averageText = `過去30日間の平均睡眠時間: ${averageSleep} 時間`;
  averageSleepContainer.textContent = averageText;
}

// CSVファイルを読み込む関数
function loadCSV() {
  const fileInput = document.getElementById('csvFile');
  const file = fileInput.files[0];

  if (!file) {
    alert('CSVファイルを選択してください');
    return;
  }

  const reader = new FileReader();
  reader.onload = function (event) {
    const csvData = event.target.result;
    const parsedData = parseCSV(csvData);

    // バリデーションをチェック
    const isValid = validateData(parsedData);
    if (!isValid) {
      alert('データは0〜24の範囲内で、30行の数値でなければなりません。');
      return;
    }

    renderCalendar(parsedData); // カレンダーを更新
  };
  reader.readAsText(file);
}

// CSVデータを配列に変換する関数
function parseCSV(csv) {
  const rows = csv.trim().split('\n'); // 行ごとに分割
  return rows.map(row => parseFloat(row)); // 各行を数値に変換
}

// データのバリデーション関数
function validateData(data) {
  if (data.length !== 30) return false; // データが30行でなければ無効
  return data.every(value => value >= 0 && value <= 24); // すべての値が0〜24の範囲内であるかチェック
}

// 初期データをレンダリング（デモ用）
renderCalendar(Array(30).fill(7)); // 30日分の初期データを全て7時間に設定
