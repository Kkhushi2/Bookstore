$(document).ready(function () {
    $.getJSON("/books/displayJSON", { ajax: true }, function (result) {
      if (result.status) {
        var str = ``;
        result.data.forEach((item, index) => {
          var peroff = ((item.price - item.offerprice) * 100) / item.price;
  
          str += `<div style="padding:30px;width:330px;">
          <img src="/images/${item.picture}" width="300"><br>
          <b>${item.bookname.slice(0, 30)}${
            item.bookname.length > 30 ? "..." : ""
          }</b>
          <p>${item.description.slice(0, 100)}${
            item.description.length > 100 ? "..." : ""
          }</p>
          <p><b>Rs.${item.offerprice}</b> <s>Rs.${
            item.price
          }</s> <font color="#ff905a">(${parseInt(peroff)}% OFF)</font></p>
          </div>`;
        });
        $("#books").html(str);
      }
    });
  
    $(".publication").click(function () {
      var publicationid = $(this).attr("publicationid");
      alert($(this).attr("publicationid"))
      $.getJSON(
        "/bookcategory/displayJSON",
        { ajax: true, publicationid: publicationid },
        function (result) {
          console.log(result);
          if (result.status) {
            var str = "<table style='width:20%'><tr>";
            result.data.forEach((item, index) => {
              str +=
                "<td class='bcategory' bookcategory=" +
                item.bookcategoryid +
                " style='cursor:pointer;'><img src='/images/" +
                item.picture +
                "' width=100><br>" +
                item.bookcategoryname +
                "</td>";
            });
            str += "</tr></table>";
            $("#bookcategory").html(str);
          }
        }
      );
    });
    $(document).on("click", ".bcategory", function () {
      var bookcategoryid = $(this).attr("bookcategory");
      alert($(this).attr("bookcategory"))
      $.getJSON(
        "/categorywriter/displayJSONbybookcategoryid",
        { ajax: true, bookcategoryid: bookcategoryid },
        function (result) {
          console.log(result);
          if (result.status) {
            var str = "<table style='width:20%'><tr>";
            result.data.forEach((item, index) => {
              str +=
                "<td class='cwriter' categorywriter=" +
                item.categorywriterid +
                " style='cursor:pointer;'><img src='/images/" +
                item.picture +
                "' width=100><br>" +
                item.categorywritername +
                "</td>";
            });
            str += "</tr></table>";
            $("#categorywriter").html(str);
          }
        }
      );
    });
  
  
    $(document).on("click", ".cwriter", function () {
      $(window).scrollTop($('#books').offset().top);
      alert($(this).attr("categorywriter"))
      $.getJSON(
        "/categorywriter/displayJSONbycategorywriterid",
        { ajax: true, categorywriterid: $(this).attr("categorywriter") },
        function (result) {
          if (result.status) {
            var str = ``;
            result.data.forEach((item, index) => {
              var peroff = ((item.price - item.offerprice) * 100) / item.price;
  
              str += `<div style="padding:30px;width:330px;">
              <img src="/images/${item.picture}" width="300"><br>
              <b>${item.bookname.slice(0, 30)}${
                item.bookname.length > 30 ? "..." : ""
              }</b>
              <p>${item.description.slice(0, 100)}${
                item.description.length > 100 ? "..." : ""
              }</p>
              <p><b>Rs.${item.offerprice}</b> <s>Rs.${
                item.price
              }</s> <font color="#ff905a">(${parseInt(peroff)}% OFF)</font></p>
              </div>`;
            });
            $("#books").html(str);
          }
        }
      );
    });
  });
  