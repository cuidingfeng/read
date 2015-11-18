/**
 * @require collect:static/js/zepto.min.js
 */
var page = 0, moreUrl = location.href;
$(".loadmore").live("click", function(){
  var self = $(this);
  self.text("加载中……");
  page++;
  $.get(moreUrl + "&page=" + page, function(html){
    self.after(html);
    self.remove();
  });
});
