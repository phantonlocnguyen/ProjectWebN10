$(document).ready(function () {
  // Lấy tham số từ URL
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");
  // Lấy dữ liệu từ file JSON và xử lý
  $.getJSON("../data/ChiTietTour.json", (tours) => {
    const data = tours.data;
    // const tour = tours.data[0];

    const tour = data.find((item) => item.id == id);

    if (tour) {
      document.title = tour.title;
      updateHeader(tour);
      updateImagesContent(tour);
      updateThongTin1(tour);
      updateThongTin2(tour);
      updateLichTrinh(tour);
      updateChiTiet1(tour);
      updateChiTiet2(tour);
      updateLuuY(tour);
    }
  });
  // Cập nhật phần header
  function updateHeader(tour) {
    $(".header-content").html(`
                <div class="col-6 col-md-8 col-12">
                    <h3 class=" mt-4 " style="color: #154c79;">${tour.title}</h3>
                </div>
                <div class="col-6 col-md-4 col-12">
                    <div class="row">
                        <div class="col-7 col-md-7 col-12">
                            <h5 class="mt-4 float-end ">${tour.Price}/ khách</h5>
                        </div>
                        <div class="col-5 col-md-5 col-12 ">
                            <button type="button" class="btn btn-lg btn-danger float-end mt-3 mb-4" style="width: 100%;" onclick="window.location.href='../html/DatTour.html?id=${tour.id}'"> Đặt ngay</button> <p></p>
                            <button type="button" class="btn btn-lg btn-light border border-dark float-end" style="width: 100%;" onclick="window.location.href='../html/LienHeT.html'">Liên hệ</button>
                        </div>
                    </div>
                </div>
  `);
  }
  // Cập nhật phần images
  function updateImagesContent(tour) {
    $(".images-content").html(`
        <div class="col-7 col-md-7 col-12 ">
                    <img src="${tour.img1}" style="width: 100%; border-radius: 10px; height: 524px;"
                        alt="">
                </div>
                <div class="col-5 col-md-5 col-12">
                    <div class="row mb-2">
                        <div class="col-6 col-md-6 col-12"><img src="${tour.img2}"
                                style="width: 100%; height: 200px; border-radius: 10px;" alt="">
                        </div>
                        <div class="col-6 col-md-6 col-12"><img src="${tour.img3}"
                                style="width: 100%; height: 200px; border-radius: 10px;" alt=""></div>
                    </div>
                    <div class="row mb-2">
                        <img src="${tour.img4}" style="border-radius: 20px;" alt="">
                    </div>
                </div>
  `);
  }
  // Cập nhật phần thông tin
  function updateThongTin1(tour) {
    $(".thongtin1").html(`
        <div class="col-3 col-md-3 col-12 bi bi-alarm-fill">
                    <h4>Thời gian</h4>
                    <h5>${tour.contents[1].content}</h5>
                </div>
                <div class="col-3 col-md-3 col-12 bi bi-airplane-fill">
                    <h4>Phương tiện di chuyển</h4>
                    <h5>${tour.contents[3].content}</h5>
                </div>
                <div class="col-3 col-md-3 col-12 bi bi-map-fill">
                    <h4>Điểm tham quan</h4>
                    <h5>${tour.contents[5].content}</h5>
                </div>
                <div class="col-3 col-md-3 col-12 bi bi-cup-hot-fill">
                    <h4>Ẩm thực</h4>
                    <h5>${tour.contents[7].content}</h5>
                </div>
  `);
  }
  function updateThongTin2(tour) {
    $(".thongtin2").html(`
        <div class="col-3 col-md-3 col-12 bi bi-building-fill">
                    <h4>Khách sạn</h4>
                    <h5>${tour.contents[9].content}</h5>
                </div>
                <div class="col-3 col-md-3 col-12 bi bi-calendar-fill">
                    <h4>Thời gian lý tưởng</h4>
                    <h5>${tour.contents[11].content}</h5>
                </div>
                <div class="col-3 col-md-3 col-12 bi bi-people-fill">
                    <h4>Đối tượng thích hợp</h4>
                    <h5>${tour.contents[13].content}</h5>
                </div>
                <div class="col-3 col-md-3 col-12 bi bi-gift-fill">
                    <h4>Ưu đãi</h4>
                    <h5>${tour.contents[15].content}</h5>
                </div>
  `);
  }
  // Cập nhật phần Lịch trình
  function updateLichTrinh(tour) {
    $(".lichtrinh").html(`
        <h3 class="text-center m-4">Lịch trình</h3>
                <hr>
                <div class="col-4 col-md-4 col-12">
                    <ul class="nav flex-column img-thumbnail">
                        <li class="nav-item">
                            <a href="#ngay1" class="nav-link float-md-start " style="color: #154c79;">
                                <h5>Ngày 1</h5>
                            </a>
                            <div class="m-2">${tour.contents[17].content}</div>
                        </li>
                        <li class="nav-item">
                            <a href="#ngay2" class="nav-link float-md-start " style="color: #154c79;">
                                <h5>Ngày 2</h5>
                            </a>
                            <div class="m-2">${tour.contents[18].content}</div>
                        </li>
                        <li class="nav-item">
                            <a href="#ngay3" class="nav-link float-md-start " style="color: #154c79;">
                                <h5>Ngày 3</h5>
                            </a>
                            <div class="m-2">${tour.contents[19].content} </div>
                        </li>
                    </ul>
                </div>
                <div class="col-8 col-md-8 col-12 border-start ">
                    <h4 id="ngay1">${tour.contents[20].content}</h4>
                    <div class="text">
                        ${tour.contents[21].content}<p></p>

                        ${tour.contents[22].content}
                        <p></p>
                        <div class="row d-flex align-items-center justify-content-center"> <img
                                src="${tour.contents[23].content}" style="width: 75%; border-radius: 30px;" alt=""
                                class=" img-thumbnail ">
                        </div>
                        ${tour.contents[24].content} <p></p>
                        <div class="row d-flex align-items-center justify-content-center"> <img
                                src="${tour.contents[25].content}" style="width: 75%; border-radius: 30px;" alt=""
                                class=" img-thumbnail">
                       
                        </div>

                        ${tour.contents[26].content}
                        <p></p>

                        <div class="fw-bold ">${tour.contents[27].content}</div>
                        <hr>
                    </div>
                    <h4 id="ngay2">${tour.contents[28].content}</h4>
                    <div class="text">
                        ${tour.contents[29].content}<p></p>

                        ${tour.contents[30].content} <p></p>

                        <div class="row d-flex align-items-center justify-content-center"> <img
                                src="${tour.contents[31].content}" style="width: 75%; border-radius: 30px;" alt=""
                                class="  img-thumbnail">
                        </div>

                        ${tour.contents[32].content} <p></p>


                        <div class="row d-flex align-items-center justify-content-center"> <img
                                src="${tour.contents[33].content}" style="width: 75%; border-radius: 30px;" px alt=""
                                class="  img-thumbnail">
                        </div>

                        <div class="fw-bold ">${tour.contents[34].content}</div>
                        <hr>
                    </div>
                    <h4 id="ngay3">${tour.contents[35].content}</h4>
                    <div class="text">
                        ${tour.contents[36].content}<p></p>

                        ${tour.contents[37].content}<p></p>
                     

                        <div class="row  d-flex align-items-center justify-content-center"> <img
                                src="${tour.contents[38].content}" style="width: 75%; border-radius: 30px;" alt=""
                                class=" img-thumbnail">
                        </div>
                        ${tour.contents[39].content}<p></p>
                        ${tour.contents[40].content}<p></p>

                        <div class="row  d-flex align-items-center justify-content-center"> <img
                                src="${tour.contents[41].content}" style="width: 75%; border-radius: 30px;" alt=""
                                class=" img-thumbnail">
                        </div>

                        ${tour.contents[42].content} <p></p>

                        <div class="fw-bold mb-5">${tour.contents[43].content}</div>
                    </div>
                </div>
                <hr>
  `);
  }
  // Cập nhật phần chi tiết tour
  function updateChiTiet1(tour) {
    $(".chitiet1").html(`
        <div class="col-5 col-md-5 col-12  img-thumbnail me-5">
                    <h4>Chi tiết tour</h4>
                    <h5 class="m-4">Thông tin chuyến bay</h5>
                    <div class="row m-5" id="chitiettour1">
                        <div class="col-6 col-md-8 col-12">
                            ${tour.contents[44].content}
                            <div class="row m-2">
                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th>${tour.contents[45].content}</th>

                                            <th>${tour.contents[46].content}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th>${tour.contents[47].content}</th>
                                            <th>${tour.contents[48].content}</th>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div class="col-6 col-md-8 col-12">
                            ${tour.contents[49].content}
                            <div class="row m-2">
                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th>${tour.contents[50].content}</th>

                                            <th>${tour.contents[51].content}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th>${tour.contents[52].content}</th>
                                            <th>${tour.contents[53].content}</th>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-5 col-md-5 col-12  img-thumbnail">
                    <h4>Giá tour & phụ thu phòng đơn</h4>
                    <div class="row">
                        <table class="table m-2">
                            <thead>
                                <tr>
                                    <th>Loại khách</th>
                                    <th>Giá tour</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Người lớn (Từ 12 tuổi trở lên)</td>
                                    <td>${tour.contents[54].content}</td>
                                </tr>
                                <tr>
                                    <td>Trẻ em (Từ 5 - 11 tuổi)</td>
                                    <td>${tour.contents[55].content}</td>
                                </tr>
                                <tr>
                                    <td>Trẻ nhỏ (Từ 2 - 4 tuổi)</td>
                                    <td>${tour.contents[56].content}</td>
                                </tr>
                                <tr>
                                    <td>Em bé (Dưới 2 tuổi)</td>
                                    <td>${tour.contents[57].content}</td>
                                </tr>
                                <tr>
                                    <th>Phụ thu phòng đơn</th>
                                    <th>${tour.contents[58].content}</th>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
  `);
  }
  function updateChiTiet2(tour) {
    $(".chitiet2").html(`
        <div class="col-5 col-md-5 col-12 me-5 img-thumbnail">
                    <table class="table">
                        <thead>
                            <tr>
                                <th colspan="2" style="color: #154c79;">Thông tin tập trung</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Ngày giờ tập trung</td>
                                <td>${tour.contents[59].content}</td>
                            </tr>
                            <tr>
                                <td>Nơi tập trung</td>
                                <td>${tour.contents[60].content}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="col-5 col-md-5 col-12 img-thumbnail">
                    <h4 class="m-2">Thông tin hướng dẫn viên</h4>
                    <table class="table">
                        <thead>
                            <tr>
                                <th>Hướng dẫn viên dẫn đoàn</th>
                                <th>Hướng dẫn viên tiễn</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="ms-2">
                                <td>${tour.contents[61].content}</td>
                                <td>${tour.contents[62].content}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <hr>
  `);
  }
  // Cập nhật phần lưu ý
  function updateLuuY(tour) {
    let luuyHTML = `
    <h4 id="note">Những thông tin cần lưu ý</h4>
    <div class="ms-3">`;

    for (let i = 63; i <= 72; i++) {
      luuyHTML += `${tour.contents[i].content}<p></p>`;
    }

    luuyHTML += `</div>`;

    $(".luuy").html(luuyHTML);
  }
});
