$(document).ready(function () {
  $("#btndn").click(function (e) {
    e.preventDefault();
    let email_sdt = $("#email_sdt").val();
    let password = $("#password").val();
    if (email_sdt != "" && password != "") {
      // Lấy thông tin user từ localStorage
      let user = JSON.parse(localStorage.getItem("user"));
      // Kiểm tra thông tin đăng nhập
      if (user == null) {
        alert("Chưa đăng ký tài khoản");
      } else if (
        (email_sdt == user.email_sdt_1 || email_sdt == user.email_sdt_2) &&
        password == user.matkhau
      ) {
        let dangnhap = 1;
        localStorage.setItem("dangnhap", JSON.stringify(dangnhap));
        window.location.href = "../index.html";
      } else {
        alert("Sai thông tin đăng nhập");
      }
    } else {
      alert("Vui lòng nhập đầy đủ thông tin");
    }
  });
});
