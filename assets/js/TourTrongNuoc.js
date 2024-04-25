function addItemsToCarousel() {
  let carousels = document.querySelectorAll(".carousel");
  carousels.forEach((carousel) => {
    let items = carousel.querySelectorAll(".carousel-item");
    items.forEach((el) => {
      const minPerSlide = 4;
      let next = el.nextElementSibling;
      for (var i = 1; i < minPerSlide; i++) {
        if (!next) {
          next = items[0];
        }
        let cloneChild = next.cloneNode(true);
        el.appendChild(cloneChild.children[0]);
        next = next.nextElementSibling;
      }
    });
  });
}

$(document).ready(function () {
  const urlParams = new URLSearchParams(window.location.search);
  const type = urlParams.get("type");
  var mienbaclist = [];
  var mientrunglist = [];
  var miennamlist = [];
  var nav = ``;
  var headerMienBac = ``;
  var headerMienTrung = ``;
  var headerMienNam = ``;
  function hiểnThịKếtQuảTìmKiếm(kếtQuảTìmKiếm) {
    var $kếtQuảDiv = $("#kếtQuảTìmKiếm");
    nav = `<nav aria-label="breadcrumb"><ol class="breadcrumb mb-2">
            <li class="breadcrumb-item fs-6"><a href="/">Trang chủ</a></li>
            <li class="breadcrumb-item fs-6 disable" >
                <a href="#">Danh Sách Tìm kiếm</a>
            </li>
        </ol>
    </nav>`;
    headerTimKiem = `<div style="text-align:center;">
                    <h2 class="fs-4 mt-4"><span class="ms-1">Danh sách tour hợp lệ</span></h2>
                </div>`;

    // Xóa nội dung cũ trong kết quả hiển thị
    $("#kếtQuảTìmKiếm").empty();
    $("#header_TimKiem").empty();
    $("#MienBac").empty();
    $("#MienTrung").empty();
    $("#MienNam").empty();
    $("#nav").empty();

    if (kếtQuảTìmKiếm.length === 0) {
      $("#nav").html(nav);
      $kếtQuảDiv.append("<p>Không tìm thấy tour phù hợp.</p>");
    } else {
      var totalTours = kếtQuảTìmKiếm.length;
      function renderTourCards(startIndex, numTours) {
        let tourCardsHTML = "";
        for (let i = startIndex; i < startIndex + numTours; i++) {
          if (i < totalTours) {
            const tour = kếtQuảTìmKiếm[i];
            tourCardsHTML += `
                <div class="col-12 col-md-4 col-lg-3 mb-4">
                    <div class="card">
                        <div class="card-img" style="height : 520px">
                            <a style="text-decoration: none" href="./ChiTietTour.html?id=${tour.id}">
                                <img class="row" src="${tour.img}"
                                    style="width: 90%; margin-left: 5%; height: 200px; border-radius: 20px;"
                                    alt="">
                                <div class="text-center mt-1 text-secondary">${tour.title}</div>
                                <div class="text-dark small" style="opacity: 0.5; margin-left: 5%;">
                                    <p><i class="bi bi-clock "></i> ${tour.duration}</p>
                                    <p><i class="bi bi-calendar"></i> ${tour.DepartureDate}</p>
                                    <p><i class="bi bi-send-fill"></i> ${tour.itinerary}</p>
                                    <p><i class="bi bi-cash"></i> ${tour.Price} ₫</p>
                                </div>
                                <div class="card-tour-footer mt-auto position-absolute bottom-0 start-50 translate-middle-x mb-1">
                                    <a class="card-tour-link" href="./ChiTietTour.html?id=${tour.id}">Xem chi tiết</a>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            `;
          }
        }
        return tourCardsHTML;
      }
      const initialTourCardsHTML = renderTourCards(0, totalTours);
      $("#nav").html(nav);
      $("#header_TimKiem").html(headerTimKiem);
      $($kếtQuảDiv).html(initialTourCardsHTML);
    }
  }

  if (type === "MienBac") {
    $.getJSON("../data/TourTrongNuoc.json", function (data) {
      data.data.forEach((tour) => {
        if (tour.region === "Miền Bắc") {
          mienbaclist.push(tour);
        }
      });
      nav = `<nav aria-label="breadcrumb"><ol class="breadcrumb mb-2">
                        <li class="breadcrumb-item fs-6"><a href="/">Trang chủ</a></li>
                        <li class="breadcrumb-item fs-6 active" asdas>
                            <a href="./TourTrongNuoc.html">Tour trong nước</a>
                        </li>
                        <li class="breadcrumb-item fs-6 active" asdas>
                            <a href="./TourTrongNuoc.html?type=MienBac">Miền Bắc</a>
                        </li>
                    </ol>
                </nav>`;
      headerMienBac = `<h1 class=" fs-2 text-center 
                            mt-5 mb-3" style="  color: white;
                            text-shadow: 1px 1px 2px black, 0 0 25px blue, 0 0 5px darkblue; ">Miền Bắc</h1>
    
                            <div style="text-align:center;">
                                <h2 class="fs-4"><span class="ms-1">Danh sách tour</span></h2>
                            </div>`;
      var clickMore = `<button id="load_more_button" class="btn btn-primary mt-3">Hiển thị thêm</button>`;
      var numToursToShow = 8;
      var totalTours = mienbaclist.length;
      function renderTourCards(startIndex, numTours) {
        let tourCardsHTML = "";
        for (let i = startIndex; i < startIndex + numTours; i++) {
          if (i < totalTours) {
            const tour = mienbaclist[i];
            tourCardsHTML += `
                <div class="col-12 col-md-4 col-lg-3 mb-4">
                    <div class="card" >
                        <div class="card-img" style ="height : 520px">
                            <a style="text-decoration: none" href="./ChiTietTour.html?id=${tour.id}">
                                <img class="row" src="${tour.img}"
                                    style="width: 90%; margin-left: 5%; height: 200px; border-radius: 20px;"
                                    alt="">
                                <div class="text-center mt-1 text-secondary">${tour.title}</div>
                                <div class="text-dark small" style="opacity: 0.5; margin-left: 5%;">
                                    <p><i class="bi bi-clock "></i> ${tour.duration}</p>
                                    <p><i class="bi bi-calendar"></i> ${tour.DepartureDate}</p>
                                    <p><i class="bi bi-send-fill"></i> ${tour.itinerary}</p>
                                    <p><i class="bi bi-cash"></i> ${tour.Price} ₫</p>
                                </div>
                                <div class="card-tour-footer mt-auto position-absolute bottom-0 start-50 translate-middle-x mb-1">
                                    <a class="card-tour-link" href="./ChiTietTour.html?id=${tour.id}">Xem chi tiết</a>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            `;
          }
        }
        return tourCardsHTML;
      }
      function loadMoreTours() {
        const remainingTours = totalTours - numToursToShow;
        const tourCardsHTML = renderTourCards(numToursToShow, 8);
        $("#list_tour_MienBac").append(tourCardsHTML);
        numToursToShow += 8;
        if (remainingTours > 0 && remainingTours < 9) {
          $("#load_more_button").hide();
        }
      }
      const initialTourCardsHTML = renderTourCards(0, numToursToShow);
      $("#nav").html(nav);
      $("#header_MienBac").html(headerMienBac);
      $("#list_tour_MienBac").html(initialTourCardsHTML);
      $(".load_more_MienBac").html(clickMore);
      // Xử lý sự kiện click nút "Hiển thị thêm"
      $("#load_more_button").click(function () {
        loadMoreTours();
      });
    });
  } else if (type === "MienTrung") {
    $.getJSON("../data/TourTrongNuoc.json", function (data) {
      data.data.forEach((tour) => {
        if (tour.region === "Miền Trung") {
          mientrunglist.push(tour);
        }
      });
      nav = `<nav aria-label="breadcrumb"><ol class="breadcrumb mb-2">
                        <li class="breadcrumb-item fs-6"><a href="/">Trang chủ</a></li>
                        <li class="breadcrumb-item fs-6 active" asdas>
                            <a href="./TourTrongNuoc.html">Tour trong nước</a>
                        </li>
                        <li class="breadcrumb-item fs-6 active" asdas>
                            <a href="./TourTrongNuoc.html?type=MienTrung">Miền Trung</a>
                        </li>
                    </ol>
                </nav>`;
      headerMienTrung = `<h1 class=" fs-2 text-center 
                             mt-4 mb-3" style="  color: white;
                            text-shadow: 1px 1px 2px black, 0 0 25px blue, 0 0 5px darkblue; ">Miền Trung</h1>
    
                            <div style="text-align:center;">
                                <h2 class="fs-4"><span class="ms-1">Danh sách tour</span></h2>
                            </div>`;
      var clickMore = `<button id="load_more_button" class="btn btn-primary mt-3 mb-4">Hiển thị thêm</button>`;
      var numToursToShow = 8; // Số lượng tour hiển thị ban đầu
      var totalTours = mientrunglist.length; // Tổng số tour
      // Hàm render tour cards
      function renderTourCards(startIndex, numTours) {
        let tourCardsHTML = "";
        for (let i = startIndex; i < startIndex + numTours; i++) {
          if (i < totalTours) {
            const tour = mientrunglist[i];
            tourCardsHTML += `
                <div class="col-12 col-md-4 col-lg-3 mb-4">
                    <div class="card">
                        <div class="card-img" style ="height : 500px">
                            <a style="text-decoration: none" href="./ChiTietTour.html?id=${tour.id}">
                                <img class="row" src="${tour.img}"
                                    style="width: 90%; margin-left: 5%; height: 200px; border-radius: 20px;"
                                    alt="">
                                <div class="text-center mt-1 text-secondary">${tour.title}</div>
                                <div class="text-dark small" style="opacity: 0.5; margin-left: 5%;">
                                    <p><i class="bi bi-clock "></i> ${tour.duration}</p>
                                    <p><i class="bi bi-calendar"></i> ${tour.DepartureDate}</p>
                                    <p><i class="bi bi-send-fill"></i> ${tour.itinerary}</p>
                                    <p><i class="bi bi-cash"></i> ${tour.Price} ₫</p>
                                </div>
                                <div class="card-tour-footer mt-auto position-absolute bottom-0 start-50 translate-middle-x mb-1">
                                    <a class="card-tour-link" href="./ChiTietTour.html?id=${tour.id}">Xem chi tiết</a>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            `;
          }
        }
        return tourCardsHTML;
      }
      //Hiển thị thêm
      function loadMoreTours() {
        const remainingTours = totalTours - numToursToShow;
        const tourCardsHTML = renderTourCards(numToursToShow, 8);
        $("#list_tour_MienTrung").append(tourCardsHTML);
        numToursToShow += 8;
        if (remainingTours > 0 && remainingTours < 9) {
          $("#load_more_button").hide();
        }
      }
      // Hiển thị các tour ban đầu
      const initialTourCardsHTML = renderTourCards(0, numToursToShow);
      $("#nav").html(nav);
      $("#header_MienTrung").html(headerMienTrung);
      $("#list_tour_MienTrung").html(initialTourCardsHTML);
      $(".load_more_MienTrung").html(clickMore);
      // Xử lý sự kiện click nút "Hiển thị thêm"
      $("#load_more_button").click(function () {
        loadMoreTours();
      });
    });
  } else if (type === "MienNam") {
    $.getJSON("../data/TourTrongNuoc.json", function (data) {
      data.data.forEach((tour) => {
        if (tour.region === "Miền Nam") {
          miennamlist.push(tour);
        }
      });
      nav = `<nav aria-label="breadcrumb"><ol class="breadcrumb mb-2">
                        <li class="breadcrumb-item fs-6"><a href="/">Trang chủ</a></li>
                        <li class="breadcrumb-item fs-6 active" asdas>
                            <a href="./TourTrongNuoc.html">Tour trong nước</a>
                        </li>
                        <li class="breadcrumb-item fs-6 active" asdas>
                            <a href="./TourTrongNuoc.html?type=MienNam">Miền Nam</a>
                        </li>
                    </ol>
                </nav>`;
      headerMienNam = `<h1 class=" fs-2 text-center
                              mb-3" style="  color: white;
                            text-shadow: 1px 1px 2px black, 0 0 25px blue, 0 0 5px darkblue; ">Miền Nam</h1>
    
                            <div style="text-align:center;">
                                <h2 class="fs-4"><span class="ms-1">Danh sách tour</span></h2>
                            </div>`;
      var clickMore = `<button id="load_more_button" class="btn btn-primary mt-3 mb-5" style ="margin-bottom: 20px">Hiển thị thêm</button><div class="row"></div>`;
      var numToursToShow = 8; // Số lượng tour hiển thị ban đầu
      var totalTours = miennamlist.length; // Tổng số tour
      // Hàm render tour cards
      function renderTourCards(startIndex, numTours) {
        let tourCardsHTML = "";
        for (let i = startIndex; i < startIndex + numTours; i++) {
          if (i < totalTours) {
            const tour = miennamlist[i];
            tourCardsHTML += `
                <div class="col-12 col-md-4 col-lg-3 mb-4">
                    <div class="card">
                        <div class="card-img" style ="height : 500px">
                            <a style="text-decoration: none" href="./ChiTietTour.html?id=${tour.id}">
                                <img class="row" src="${tour.img}"
                                    style="width: 90%; margin-left: 5%; height: 200px; border-radius: 20px;"
                                    alt="">
                                <div class="text-center mt-1 text-secondary">${tour.title}</div>
                                <div class="text-dark small" style="opacity: 0.5; margin-left: 5%;">
                                    <p><i class="bi bi-clock "></i> ${tour.duration}</p>
                                    <p><i class="bi bi-calendar"></i> ${tour.DepartureDate}</p>
                                    <p><i class="bi bi-send-fill"></i> ${tour.itinerary}</p>
                                    <p><i class="bi bi-cash"></i> ${tour.Price} ₫</p>
                                </div>
                                <div class="card-tour-footer mt-auto position-absolute bottom-0 start-50 translate-middle-x mb-1">
                                    <a class="card-tour-link" href="./ChiTietTour.html?id=${tour.id}">Xem chi tiết</a>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            `;
          }
        }
        return tourCardsHTML;
      }
      //Hiển thị thêm
      function loadMoreTours() {
        const remainingTours = totalTours - numToursToShow;
        const tourCardsHTML = renderTourCards(numToursToShow, 8);
        $("#list_tour_MienNam").append(tourCardsHTML);
        numToursToShow += 8;
        if (remainingTours > 0 && remainingTours < 9) {
          $("#load_more_button").hide();
        }
      }
      // Hiển thị các tour ban đầu
      const initialTourCardsHTML = renderTourCards(0, numToursToShow);
      $("#nav").html(nav);
      $("#header_MienNam").html(headerMienNam);
      $("#list_tour_MienNam").html(initialTourCardsHTML);
      $(".load_more_MienNam").html(clickMore);
      // Xử lý sự kiện click nút "Hiển thị thêm"
      $("#load_more_button").click(function () {
        loadMoreTours();
      });
    });
  } else {
    $.getJSON("../data/TourTrongNuoc.json", function (data) {
      data.data.forEach((tour) => {
        if (tour.region === "Miền Bắc") {
          mienbaclist.push(tour);
        } else if (tour.region === "Miền Trung") {
          mientrunglist.push(tour);
        } else if (tour.region === "Miền Nam") {
          miennamlist.push(tour);
        }
      });
      nav = `<nav aria-label="breadcrumb"><ol class="breadcrumb mb-2">
                        <li class="breadcrumb-item fs-6"><a href="/">Trang chủ</a></li>
                        <li class="breadcrumb-item fs-6 active" asdas>
                            <a href="./TourTrongNuoc.html">Tour trong nước</a>
                        </li>
                    </ol>
                </nav>`;
      headerMienBac = `<h1 class=" fs-2 text-center 
                            mt-5 mb-3" style="  color: white;
                            text-shadow: 1px 1px 2px black, 0 0 25px blue, 0 0 5px darkblue; ">Miền Bắc</h1>
    
                            <div style="text-align:center;">
                                <h2 class="fs-4"><span class="ms-1">Tour nổi
                                        bật</span></h2>
                                <p><a href="./TourTrongNuoc.html?type=MienBac" id="link_to_MB">xem thêm</a></p>
                            </div>`;
      headerMienTrung = `<h1 class=" fs-2 text-center mt-5 mb-3" style="  color: white;
                            text-shadow: 1px 1px 2px black, 0 0 25px blue, 0 0 5px darkblue; ">Miền Trung</h1>
    
                            <div style="text-align:center;">
                                <h2 class="fs-4"><span class="ms-1">Tour nổi
                                        bật</span></h2>
                                <p><a href="./TourTrongNuoc.html?type=MienTrung" id="link_to_MT">xem thêm</a></p>
                            </div>`;
      headerMienNam = `<h1 class=" fs-2 text-center mt-5 mb-3" style="  color: white;
                            text-shadow: 1px 1px 2px black, 0 0 25px blue, 0 0 5px darkblue; ">Miền Nam</h1>
    
                            <div style="text-align:center;">
                                <h2 class="fs-4"><span class="ms-1">Tour nổi
                                        bật</span></h2>
                                <p><a href="./TourTrongNuoc.html?type=MienNam" id="link_to_MN">xem thêm</a></p>
                            </div>`;

      var carouselHeaderBac = `
        <div id="mbCarousel" class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-inner" role="listbox">
    `;
      var carouselHeaderTrung = `
        <div id="mtCarousel" class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-inner" role="listbox">
    `;
      var carouselHeaderNam = `
        <div id="mnCarousel" class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-inner" role="listbox">
    `;

      var carouselContentMienBac = "";
      var carouselContentMienTrung = "";
      var carouselContentMienNam = "";

      var carouselFooterBac = `
            </div>
            <a class="carousel-control-prev bg-transparent w-aut" data-bs-target="#mbCarousel"
                role="button" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            </a>
            <a class="carousel-control-next bg-transparent w-aut" data-bs-target="#mbCarousel"
                role="button" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
            </a>
        </div>
        <hr>
    `;
      var carouselFooterTrung = `
            </div>
            <a class="carousel-control-prev bg-transparent w-aut" data-bs-target="#mtCarousel"
                role="button" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            </a>
            <a class="carousel-control-next bg-transparent w-aut" data-bs-target="#mtCarousel"
                role="button" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
            </a>
        </div>
        <hr>
    `;
      var carouselFooterNam = `
            </div>
            <a class="carousel-control-prev bg-transparent w-aut" data-bs-target="#mnCarousel"
                role="button" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            </a>
            <a class="carousel-control-next bg-transparent w-aut" data-bs-target="#mnCarousel"
                role="button" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
            </a>
        </div>
        
    `;

      var tourCountBac = 0;
      var tourCountTrung = 0;
      var tourCountNam = 0;

      $.each(mienbaclist, function (key, tour) {
        if (tourCountBac < 5) {
          var activeClass = tourCountBac === 0 ? "active" : "";
          carouselContentMienBac += `
    <div class="carousel-item ${activeClass}">
        <div class="col-md-3 m-1">
            <div class="card">
                <div class="card-img" style ="height : 520px">
                    <a style="text-decoration: none" href="./ChiTietTour.html?id=${tour.id}">
                        <img class="row" src="${tour.img}"
                            style="width: 90%; margin-left: 5%; height: 200px; border-radius: 20px;"
                            alt="">
                        <div class="text-center mt-1 text-secondary">${tour.title}</div>
                        <div class="text-dark small" style="opacity: 0.5; margin-left: 5%;">
                            <p><i class="bi bi-clock "></i> ${tour.duration}</p>
                            <p><i class="bi bi-calendar"></i> ${tour.DepartureDate}</p>
                            <p><i class="bi bi-send-fill"></i> ${tour.itinerary}</p>
                            <p><i class="bi bi-cash"></i> ${tour.Price} ₫</p>
                        </div>
                        <div class="card-tour-footer mt-auto position-absolute bottom-0 start-50 translate-middle-x mb-1">
                            <a class="card-tour-link" href="./ChiTietTour.html?id=${tour.id}">Xem chi tiết</a>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    </div>
    `;
          tourCountBac++;
        }
      });
      $.each(mientrunglist, function (key, tour) {
        if (tourCountTrung < 5) {
          var activeClass = tourCountTrung === 0 ? "active" : "";
          carouselContentMienTrung += `
    <div class="carousel-item ${activeClass}">
        <div class="col-md-3 m-1">
            <div class="card">
                <div class="card-img" style ="height : 500px">
                    <a style="text-decoration: none" href="./ChiTietTour.html?id=${tour.id}">
                        <img class="row" src="${tour.img}"
                            style="width: 90%; margin-left: 5%; height: 200px; border-radius: 20px;"
                            alt="">
                        <div class="text-center mt-1 text-secondary">${tour.title}</div>
                        <div class="text-dark small" style="opacity: 0.5; margin-left: 5%;">
                            <p><i class="bi bi-clock "></i> ${tour.duration}</p>
                            <p><i class="bi bi-calendar"></i> ${tour.DepartureDate}</p>
                            <p><i class="bi bi-send-fill"></i> ${tour.itinerary}</p>
                            <p><i class="bi bi-cash"></i> ${tour.Price} ₫</p>
                        </div>
                        <div class="card-tour-footer mt-auto position-absolute bottom-0 start-50 translate-middle-x mb-1">
                            <a class="card-tour-link" href="./ChiTietTour.html?id=${tour.id}">Xem chi tiết</a>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    </div>
    `;
          tourCountTrung++;
        }
      });
      $.each(miennamlist, function (key, tour) {
        if (tourCountNam < 5) {
          var activeClass = tourCountNam === 0 ? "active" : "";
          carouselContentMienNam += `
    <div class="carousel-item ${activeClass}">
        <div class="col-md-3 m-1">
            <div class="card">
                <div class="card-img" style ="height : 490px">
                    <a style="text-decoration: none" href="./ChiTietTour.html?id=${tour.id}">
                        <img class="row" src="${tour.img}"
                            style="width: 90%; margin-left: 5%; height: 200px; border-radius: 20px;"
                            alt="">
                        <div class="text-center mt-1 text-secondary">${tour.title}</div>
                        <div class="text-dark small" style="opacity: 0.5; margin-left: 5%;">
                            <p><i class="bi bi-clock "></i> ${tour.duration}</p>
                            <p><i class="bi bi-calendar"></i> ${tour.DepartureDate}</p>
                            <p><i class="bi bi-send-fill"></i> ${tour.itinerary}</p>
                            <p><i class="bi bi-cash"></i> ${tour.Price} ₫</p>
                        </div>
                        <div class="card-tour-footer mt-auto position-absolute bottom-0 start-50 translate-middle-x mb-1">
                            <a class="card-tour-link" href="./ChiTietTour.html?id=${tour.id}">Xem chi tiết</a>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    </div>
    `;
          tourCountNam++;
        }
      });
      $("#nav").html(nav);
      $("#header_MienBac").html(headerMienBac);
      $("#carousel_MienBac").html(
        carouselHeaderBac + carouselContentMienBac + carouselFooterBac
      );
      $("#header_MienTrung").html(headerMienTrung);
      $("#carousel_MienTrung").html(
        carouselHeaderTrung + carouselContentMienTrung + carouselFooterTrung
      );
      $("#header_MienNam").html(headerMienNam);
      $("#carousel_MienNam").html(
        carouselHeaderNam + carouselContentMienNam + carouselFooterNam
      );
      addItemsToCarousel();
    });
  }
  $("#tìmKiếmBtn").click(function (event) {
    event.preventDefault();
    var địaĐiểm = $("#location").val().toLowerCase();
    var nơiKhởiHành = $("#location-start").val().toLowerCase();
    var ngàyKhởiHành = $("#check-out-date").val();

    var ngàyChuyểnĐổi = new Date(ngàyKhởiHành);
    var ngàyDạngChuỗi =
      ngàyChuyểnĐổi.getDate().toString().padStart(2, "0") +
      "/" +
      (ngàyChuyểnĐổi.getMonth() + 1).toString().padStart(2, "0") +
      "/" +
      ngàyChuyểnĐổi.getFullYear().toString();
    var kếtQuảTìmKiếm = [];
    $.getJSON("../data/TourTrongNuoc.json", function (data) {
      $.each(data.data, function (index, tour) {
        if (
          (địaĐiểm === "" || tour.title.toLowerCase().includes(địaĐiểm)) &&
          (nơiKhởiHành === "" ||
            tour.departureLocation.toLowerCase().includes(nơiKhởiHành)) &&
          (ngàyKhởiHành === "" || tour.DepartureDate === ngàyDạngChuỗi)
        ) {
          kếtQuảTìmKiếm.push(tour);
        }
      });
      $.getJSON("../data/TourNuocNgoai.json", function (data2) {
        $.each(data2.data, function (index, tour2) {
          if (
            (địaĐiểm === "" || tour2.title.toLowerCase().includes(địaĐiểm)) &&
            (nơiKhởiHành === "" ||
              tour2.departureLocation.toLowerCase().includes(nơiKhởiHành)) &&
            (ngàyKhởiHành === "" || tour2.DepartureDate === ngàyDạngChuỗi)
          ) {
            kếtQuảTìmKiếm.push(tour2);
          }
        });

        hiểnThịKếtQuảTìmKiếm(kếtQuảTìmKiếm);
      });
    });
  });
});
