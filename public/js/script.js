$(document).ready(function () {
  var btntop = $("#button");

  $(window).scroll(function () {
    if ($(window).scrollTop() > 300) {
      btntop.addClass("show");
    } else {
      btntop.removeClass("show");
    }
  });

  btntop.on("click", function (e) {
    e.preventDefault();
    $("html, body").animate({ scrollTop: 0 }, "300");
  });

  var $table = $(".table-responsive");
  $(".move").click(function () {
    var $target = $table.find("td.target");
    if ($target.length == 0) $target = $table.find("td:first");

    $target = $target[$(this).data("dir")]("td");
    if ($target.length == 0) return;

    $(".table-responsive")
      .stop()
      .animate({ scrollLeft: $target.position().left });
    $table.find(".target").removeClass("target");
    $target.addClass("target");
  });
});

let lastUrl = location.href;
new MutationObserver(() => {
  const url = location.href;
  if (url !== lastUrl) {
    lastUrl = url;
    onUrlChange();
  }
}).observe(document, { subtree: true, childList: true });

function onUrlChange() {
  $("html, body").animate(
    {
      scrollTop: 0,
    },
    600
  );
  var btntop = $("#button");

  $(window).scroll(function () {
    if ($(window).scrollTop() > 300) {
      btntop.addClass("show");
    } else {
      btntop.removeClass("show");
    }
  });

  btntop.on("click", function (e) {
    e.preventDefault();
    $("html, body").animate({ scrollTop: 0 }, "300");
  });
  var $table = $(".table-responsive");
  $(".move").click(function () {
    var $target = $table.find("td.target");
    if ($target.length == 0) $target = $table.find("td:first");

    $target = $target[$(this).data("dir")]("td");
    if ($target.length == 0) return;

    $(".table-responsive")
      .stop()
      .animate({ scrollLeft: $target.position().left });
    $table.find(".target").removeClass("target");
    $target.addClass("target");
  });
}
