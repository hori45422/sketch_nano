'use strict';

$(function () {
  var $canvas = $('canvas');
  var canvas = $canvas[0];
  var width = canvas.width;
  var height = canvas.height;

  var context2d = canvas.getContext('2d');
  var isDrawing = false;

  // 画面を真っ白にする
  context2d.fillStyle = '#FFF';
  context2d.fillRect(0, 0, width, height);

  context2d.strokeStyle="red";

  $(kesu).on("click",function(){context2d.clearRect(0, 0, 640, 480)})

  // マウスを押し始めた時
  $canvas.mousedown(function (e) {
    var x = e.originalEvent.layerX; // 行き先
    var y = e.originalEvent.layerY; // 行き先

    context2d.beginPath();
    context2d.moveTo(x, y);
    isDrawing = true;

    context2d.lineWidth=$("#pen-hutosa").val();
    context2d.strokeStyle=$("#pen-iro").val();



  });

  // マウスを動かしているあいだ中
  $canvas.mousemove(function (e) {
    var x = e.originalEvent.layerX; // 行き先
    var y = e.originalEvent.layerY; // 行き先
    if (isDrawing) {
      context2d.lineTo(x, y);
      context2d.stroke();
    }
  });

  // マウスを離した時
  $canvas.mouseup(function (e) {
    isDrawing = false;


  });

  // マウスがキャンバスの外に出た時時
  $canvas.mouseleave(function (e) {
    isDrawing = false;
  });

  // 保存
  $('button.save').click(function (e) {
    var dataUrl = canvas.toDataURL();
    var title = $('.drawbox input[name=title]').val();
    var adult = 0;

    if($('#adult').prop('checked')){
      adult = 1;
    }

    $.post('/draw', {
      src: dataUrl,
      title: title,
      adult: adult
    }, function (result) {
    window.location.href='/';
      // 画面を真っ白にする
      //context2d.fillStyle = '#FFF';
      //context2d.fillRect(0, 0, width, height);

    });
  });
});
