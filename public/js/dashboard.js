'use strict'

$(function () {
  $('button.like').click(function (e) {
    var $clicked = $(this);
    var dataId   = $clicked.data('id');
    var likes    = $clicked.text();
    $.post(
    "/api/like",{"id":dataId} ,function(data){
    //成功した時に書くこ
    $.get(
      "/api/like",{"id":dataId} ,function(data){
          $clicked.text('😄'+data[0]['likes']);
      }
    )

  　});
  });
});
