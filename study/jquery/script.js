$(function() {
  $("#content1 .draggable").draggable({
    containment: "#container" // 親要素（フィールド）内に限定
  });
  $("#content1 .droppable").droppable({
    drop: function(event, ui) {
      $(this).text("Dropped!");
    }
  });
});