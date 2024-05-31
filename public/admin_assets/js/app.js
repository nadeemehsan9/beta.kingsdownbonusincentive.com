$(function () {
  "use strict";

  // Tooltops

  $(function () {
    $('[data-bs-toggle="tooltip"]').tooltip();
  });

  $(".nav-toggle-icon").on("click", function () {
    $(".wrapper").toggleClass("toggled");
  });

  $(".mobile-toggle-icon").on("click", function () {
    $(".wrapper").addClass("toggled");
  });

  $(function () {
    for (
      var e = window.location,
        o = $(".metismenu li a")
          .filter(function () {
            return this.href == e;
          })
          .addClass("")
          .parent()
          .addClass("mm-active");
      o.is("li");

    )
      o = o.parent("").addClass("mm-show").parent("").addClass("mm-active");
  });

  $(".toggle-icon").click(function () {
    $(".wrapper").hasClass("toggled")
      ? ($(".wrapper").removeClass("toggled"),
        $(".sidebar-wrapper").unbind("hover"))
      : ($(".wrapper").addClass("toggled"),
        $(".sidebar-wrapper").hover(
          function () {
            $(".wrapper").addClass("sidebar-hovered");
          },
          function () {
            $(".wrapper").removeClass("sidebar-hovered");
          }
        ));
  });

  $(function () {
    $("#menu").metisMenu();
  });

  $(document).ready(function () {
    $(window).on("scroll", function () {
      $(this).scrollTop() > 300
        ? $(".back-to-top").fadeIn()
        : $(".back-to-top").fadeOut();
    }),
      $(".back-to-top").on("click", function () {
        return (
          $("html, body").animate(
            {
              scrollTop: 0,
            },
            600
          ),
          !1
        );
      });
  });

  $(document).on("keypress", "#circle-list .list-input", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();

      $("#circle-list").append(
        ' <li><div class=" input-group "><input type="text" class="form-control list-input" placeholder="List data" /> <div class="input-group-append"><button class="list-item-add" type="button"><i class="bi bi-plus"></i></button><button class="list-item-remove" type="button"><i class="bi bi-dash"></i></button></div></div></li>'
      );
    }
    $("#circle-list li:last-child .list-input").focus();
  });
  $(document).on("click", ".list-item-add", function () {
    $("#circle-list").append(
      ' <li><div class=" input-group "><input type="text" class="form-control list-input" placeholder="List data" /> <div class="input-group-append"><button class="list-item-add" type="button"><i class="bi bi-plus"></i></button><button class="list-item-remove" type="button"><i class="bi bi-dash"></i></button></div></div></li>'
    );
    $("#circle-list li:last-child .list-input").focus();
  });

  $(document).on("click", ".list-item-remove", function () {
    $("#circle-list li:last").remove();
    $("#circle-list li:last-child .list-input").focus();
  });

  // image upload sinbgle
  document.querySelectorAll(".drop-zone__input").forEach((inputElement) => {
    const dropZoneElement = inputElement.closest(".drop-zone");

    dropZoneElement.addEventListener("click", (e) => {
      inputElement.click();
    });

    inputElement.addEventListener("change", (e) => {
      if (inputElement.files.length) {
        updateThumbnail(dropZoneElement, inputElement.files[0]);
      }
    });

    dropZoneElement.addEventListener("dragover", (e) => {
      e.preventDefault();
      dropZoneElement.classList.add("drop-zone--over");
    });

    ["dragleave", "dragend"].forEach((type) => {
      dropZoneElement.addEventListener(type, (e) => {
        dropZoneElement.classList.remove("drop-zone--over");
      });
    });

    dropZoneElement.addEventListener("drop", (e) => {
      e.preventDefault();

      if (e.dataTransfer.files.length) {
        inputElement.files = e.dataTransfer.files;
        updateThumbnail(dropZoneElement, e.dataTransfer.files[0]);
      }

      dropZoneElement.classList.remove("drop-zone--over");
    });
  });

  /**
   * Updates the thumbnail on a drop zone element.
   *
   * @param {HTMLElement} dropZoneElement
   * @param {File} file
   */
  function updateThumbnail(dropZoneElement, file) {
    let thumbnailElement = dropZoneElement.querySelector(".drop-zone__thumb");

    // First time - remove the prompt
    if (dropZoneElement.querySelector(".drop-zone__prompt")) {
      dropZoneElement.querySelector(".drop-zone__prompt").remove();
    }

    // First time - there is no thumbnail element, so lets create it
    if (!thumbnailElement) {
      thumbnailElement = document.createElement("div");
      thumbnailElement.classList.add("drop-zone__thumb");
      dropZoneElement.appendChild(thumbnailElement);
    }

    thumbnailElement.dataset.label = file.name;

    // Show thumbnail for image files
    if (file.type.startsWith("image/")) {
      const reader = new FileReader();

      reader.readAsDataURL(file);
      reader.onload = () => {
        thumbnailElement.style.backgroundImage = `url('${reader.result}')`;
      };
    } else {
      thumbnailElement.style.backgroundImage = null;
    }
  }

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

  // switcher
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
  $(function () {
    $("#menu").not("metismenu").metisMenu();
  });

  $(function () {
    $('[data-bs-toggle="tooltip"]').tooltip();
  });

  $(".nav-toggle-icon").on("click", function () {
    $(".wrapper").toggleClass("toggled");
  });

  $(".mobile-toggle-icon").on("click", function () {
    $(".wrapper").addClass("toggled");
  });
  $(function () {
    $("#menu").metisMenu();
  });
  $(function () {
    for (
      var e = window.location,
        o = $(".metismenu li a")
          .filter(function () {
            return this.href == e;
          })
          .addClass("")
          .parent()
          .addClass("mm-active");
      o.is("li");

    )
      o = o.parent("").addClass("mm-show").parent("").addClass("mm-active");
  });

  $(".toggle-icon").click(function () {
    $(".wrapper").hasClass("toggled")
      ? ($(".wrapper").removeClass("toggled"),
        $(".sidebar-wrapper").unbind("hover"))
      : ($(".wrapper").addClass("toggled"),
        $(".sidebar-wrapper").hover(
          function () {
            $(".wrapper").addClass("sidebar-hovered");
          },
          function () {
            $(".wrapper").removeClass("sidebar-hovered");
          }
        ));
  });
  $(".back-to-top").on("click", function () {
    return (
      $("html, body").animate(
        {
          scrollTop: 0,
        },
        600
      ),
      !1
    );
  });

  // image upload sinbgle
  document.querySelectorAll(".drop-zone__input").forEach((inputElement) => {
    const dropZoneElement = inputElement.closest(".drop-zone");

    dropZoneElement.addEventListener("click", (e) => {
      inputElement.click();
    });

    inputElement.addEventListener("change", (e) => {
      if (inputElement.files.length) {
        updateThumbnail(dropZoneElement, inputElement.files[0]);
      }
    });

    dropZoneElement.addEventListener("dragover", (e) => {
      e.preventDefault();
      dropZoneElement.classList.add("drop-zone--over");
    });

    ["dragleave", "dragend"].forEach((type) => {
      dropZoneElement.addEventListener(type, (e) => {
        dropZoneElement.classList.remove("drop-zone--over");
      });
    });

    dropZoneElement.addEventListener("drop", (e) => {
      e.preventDefault();

      if (e.dataTransfer.files.length) {
        inputElement.files = e.dataTransfer.files;
        updateThumbnail(dropZoneElement, e.dataTransfer.files[0]);
      }

      dropZoneElement.classList.remove("drop-zone--over");
    });
  });

  /**
   * Updates the thumbnail on a drop zone element.
   *
   * @param {HTMLElement} dropZoneElement
   * @param {File} file
   */
  function updateThumbnail(dropZoneElement, file) {
    let thumbnailElement = dropZoneElement.querySelector(".drop-zone__thumb");

    // First time - remove the prompt
    if (dropZoneElement.querySelector(".drop-zone__prompt")) {
      dropZoneElement.querySelector(".drop-zone__prompt").remove();
    }

    // First time - there is no thumbnail element, so lets create it
    if (!thumbnailElement) {
      thumbnailElement = document.createElement("div");
      thumbnailElement.classList.add("drop-zone__thumb");
      dropZoneElement.appendChild(thumbnailElement);
    }

    thumbnailElement.dataset.label = file.name;

    // Show thumbnail for image files
    if (file.type.startsWith("image/")) {
      const reader = new FileReader();

      reader.readAsDataURL(file);
      reader.onload = () => {
        thumbnailElement.style.backgroundImage = `url('${reader.result}')`;
      };
    } else {
      thumbnailElement.style.backgroundImage = null;
    }
  }

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
