$(document).ready(function () {

    let user = JSON.parse(localStorage.getItem("user"));
    $("#tentaikhoan").html(user.ten);
    $("#muc_tai_khoan img").attr("src", user.avatar);

    let dattour = JSON.parse(localStorage.getItem("dattour"));

    if (dattour != null) {
        $("#dattour").html("");
        for (let i = 0; i < dattour.length; i++) {
            $("#dattour").append(`
                <div class="card mb-3">
                    <div class="card-header bg-success text-white">
                        <h5 class="card-title">Địa điểm: ${dattour[i].diadiem}</h5>
                    </div>
                    <div class="card-body">
                        <p class="card-text">Khởi hành: ${dattour[i].khoihanh}</p>
                        <p class="card-text">Thời gian: ${dattour[i].tg}</p>
                        <p class="card-text">Nơi khởi hành: ${dattour[i].noikh}</p>
                        <p class="card-text">Ngày đăng ký: ${dattour[i].ngaydk}</p>
                        <p class="card-text">Số lượng: ${dattour[i].soluong}</p>
                        <p class="card-text">Thanh toán: ${dattour[i].thanhtoan}</p>
                    </div>
                </div>
            `);
        }
    }

    $("#dangxuat").click(function (e) { 
    e.preventDefault();
    localStorage.removeItem("dangnhap");
    window.location.href = "../index.html";
    });
});