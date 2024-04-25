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
                    <h2 class="fs-4 mt-3"><span class="ms-1">Danh sách tour hợp lệ</span></h2>
                </div>`;

  // Xóa nội dung cũ trong kết quả hiển thị
  $("#kếtQuảTìmKiếm").empty();
  $("#header_TimKiem").empty();
  $("#My").empty();
  $("#Nhat").empty();
  $("#Canada").empty();
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

$(document).ready(function () {
  const urlParams = new URLSearchParams(window.location.search);
  const type = urlParams.get("type");
  var mylist = [];
  var nhatlist = [];
  var canadalist = [];
  var nav = ``;
  var headerMy = ``;
  var headerNhat = ``;
  var headerCanada = ``;

  if (type === "My") {
    $.getJSON("../data/TourNuocNgoai.json", function (data) {
      data.data.forEach((tour) => {
        if (tour.region === "Mỹ") {
          mylist.push(tour);
        }
      });
      nav = `<nav aria-label="breadcrumb"><ol class="breadcrumb mb-2">
                        <li class="breadcrumb-item fs-6"><a href="/">Trang chủ</a></li>
                        <li class="breadcrumb-item fs-6 active" >
                            <a href="./TourNuocNgoai.html">Tour nước ngoài</a>
                        </li>
                        <li class="breadcrumb-item fs-6 active" asdas>
                            <a href="./TourNuocNgoai.html?type=My">Mỹ</a>
                        </li>
                    </ol>
                </nav>`;
      headerMy = `<h1 class=" fs-2 text-center 
                            mt-5 mb-3" style="  color: white;
                            text-shadow: 1px 1px 2px black, 0 0 25px blue, 0 0 5px darkblue; ">Mỹ</h1>
    
                            <div style="text-align:center;">
                                <h2 class="fs-4"><span class="ms-1">Danh sách tour</span></h2>
                            </div>`;
      var clickMore = `<button id="load_more_button" class="btn btn-primary mt-3">Hiển thị thêm</button>`;
      var numToursToShow = 8; // Số lượng tour hiển thị ban đầu
      var totalTours = mylist.length; // Tổng số tour
      // Hàm render tour cards
      function renderTourCards(startIndex, numTours) {
        let tourCardsHTML = "";
        for (let i = startIndex; i < startIndex + numTours; i++) {
          if (i < totalTours) {
            const tour = mylist[i];
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
        $("#list_tour_My").append(tourCardsHTML);
        numToursToShow += 8;
        if (remainingTours > 0 && remainingTours < 9) {
          $("#load_more_button").hide();
        }
      }
      // Hiển thị các tour ban đầu
      const initialTourCardsHTML = renderTourCards(0, numToursToShow);
      $("#nav").html(nav);
      $("#header_My").html(headerMy);
      $("#list_tour_My").html(initialTourCardsHTML);
      $(".load_more_My").html(clickMore);
      // Xử lý sự kiện click nút "Hiển thị thêm"
      $("#load_more_button").click(function () {
        loadMoreTours();
      });
    });
  } else if (type === "Nhat") {
    $.getJSON("../data/TourNuocNgoai.json", function (data) {
      data.data.forEach((tour) => {
        if (tour.region === "Nhật Bản") {
          nhatlist.push(tour);
        }
      });
      nav = `<nav aria-label="breadcrumb"><ol class="breadcrumb mb-2">
                        <li class="breadcrumb-item fs-6"><a href="/">Trang chủ</a></li>
                        <li class="breadcrumb-item fs-6 active" asdas>
                            <a href="./TourNuocNgoai.html">Tour nước ngoài</a>
                        </li>
                        <li class="breadcrumb-item fs-6 active" asdas>
                            <a href="./TourNuocNgoai.html?type=Nhat">Nhật Bản</a>
                        </li>
                    </ol>
                </nav>`;
      headerNhat = `<h1 class=" fs-2 text-center 
                             mt-4 mb-3" style="  color: white;
                            text-shadow: 1px 1px 2px black, 0 0 25px blue, 0 0 5px darkblue; ">Nhật Bản</h1>
    
                            <div style="text-align:center;">
                                <h2 class="fs-4"><span class="ms-1">Danh sách tour</span></h2>
                            </div>`;
      var clickMore = `<button id="load_more_button" class="btn btn-primary mt-3 mb-4">Hiển thị thêm</button>`;
      var numToursToShow = 8; // Số lượng tour hiển thị ban đầu
      var totalTours = nhatlist.length; // Tổng số tour
      // Hàm render tour cards
      function renderTourCards(startIndex, numTours) {
        let tourCardsHTML = "";
        for (let i = startIndex; i < startIndex + numTours; i++) {
          if (i < totalTours) {
            const tour = nhatlist[i];
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
        $("#list_tour_Nhat").append(tourCardsHTML);
        numToursToShow += 8;
        if (remainingTours > 0 && remainingTours < 9) {
          $("#load_more_button").hide();
        }
      }
      // Hiển thị các tour ban đầu
      const initialTourCardsHTML = renderTourCards(0, numToursToShow);
      $("#nav").html(nav);
      $("#header_Nhat").html(headerNhat);
      $("#list_tour_Nhat").html(initialTourCardsHTML);
      $(".load_more_Nhat").html(clickMore);
      // Xử lý sự kiện click nút "Hiển thị thêm"
      $("#load_more_button").click(function () {
        loadMoreTours();
      });
    });
  } else if (type === "Canada") {
    $.getJSON("../data/TourNuocNgoai.json", function (data) {
      data.data.forEach((tour) => {
        if (tour.region === "Canada") {
          canadalist.push(tour);
        }
      });
      nav = `<nav aria-label="breadcrumb"><ol class="breadcrumb mb-2">
                        <li class="breadcrumb-item fs-6"><a href="/">Trang chủ</a></li>
                        <li class="breadcrumb-item fs-6 active" asdas>
                            <a href="./TourNuocNgoai.html">Tour nước ngoài</a>
                        </li>
                        <li class="breadcrumb-item fs-6 active" asdas>
                            <a href="./TourNuocNgoai.html?type=Canada">Canada</a>
                        </li>
                    </ol>
                </nav>`;
      headerCanada = `<h1 class=" fs-2 text-center
                              mb-3" style="  color: white;
                            text-shadow: 1px 1px 2px black, 0 0 25px blue, 0 0 5px darkblue; ">Canada</h1>
    
                            <div style="text-align:center;">
                                <h2 class="fs-4"><span class="ms-1">Danh sách tour</span></h2>
                            </div>`;
      var clickMore = `<button id="load_more_button" class="btn btn-primary mt-3 mb-5" style ="margin-bottom: 20px">Hiển thị thêm</button><div class="row"></div>`;
      var numToursToShow = 8; // Số lượng tour hiển thị ban đầu
      var totalTours = canadalist.length; // Tổng số tour
      // Hàm render tour cards
      function renderTourCards(startIndex, numTours) {
        let tourCardsHTML = "";
        for (let i = startIndex; i < startIndex + numTours; i++) {
          if (i < totalTours) {
            const tour = canadalist[i];
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
        $("#list_tour_Canada").append(tourCardsHTML);
        numToursToShow += 8;
        if (remainingTours > 0 && remainingTours < 9) {
          $("#load_more_button").hide();
        }
      }
      // Hiển thị các tour ban đầu
      const initialTourCardsHTML = renderTourCards(0, numToursToShow);
      $("#nav").html(nav);
      $("#header_Canada").html(headerCanada);
      $("#list_tour_Canada").html(initialTourCardsHTML);
      $(".load_more_Canada").html(clickMore);
      // Xử lý sự kiện click nút "Hiển thị thêm"
      $("#load_more_button").click(function () {
        loadMoreTours();
      });
    });
  } else {
    $.getJSON("../data/TourNuocNgoai.json", function (data) {
      data.data.forEach((tour) => {
        if (tour.region === "Mỹ") {
          mylist.push(tour);
        } else if (tour.region === "Nhật Bản") {
          nhatlist.push(tour);
        } else if (tour.region === "Canada") {
          canadalist.push(tour);
        }
      });
      nav = `<nav aria-label="breadcrumb"><ol class="breadcrumb mb-2">
                        <li class="breadcrumb-item fs-6"><a href="/">Trang chủ</a></li>
                        <li class="breadcrumb-item fs-6 active" asdas>
                            <a href="./TourTrongNuoc.html">Tour nước ngoài</a>
                        </li>
                    </ol>
                </nav>`;
      headerMy = `<h1 class=" fs-2 text-center 
                            mt-5 mb-3" style="  color: white;
                            text-shadow: 1px 1px 2px black, 0 0 25px blue, 0 0 5px darkblue; ">Mỹ</h1>
    
                            <div style="text-align:center;">
                                <h2 class="fs-4"><span class="ms-1">Tour nổi
                                        bật</span></h2>
                                <p><a href="./TourNuocNgoai.html?type=My" id="link_to_My">xem thêm</a></p>
                            </div>`;
      headerNhat = `<h1 class=" fs-2 text-center mt-5 mb-3" style="  color: white;
                            text-shadow: 1px 1px 2px black, 0 0 25px blue, 0 0 5px darkblue; ">Nhật Bản</h1>
    
                            <div style="text-align:center;">
                                <h2 class="fs-4"><span class="ms-1">Tour nổi
                                        bật</span></h2>
                                <p><a href="./TourNuocNgoai.html?type=Nhat" id="link_to_Nhat">xem thêm</a></p>
                            </div>`;
      headerCanada = `<h1 class=" fs-2 text-center mt-5 mb-3" style="  color: white;
                            text-shadow: 1px 1px 2px black, 0 0 25px blue, 0 0 5px darkblue; ">Canada</h1>
    
                            <div style="text-align:center;">
                                <h2 class="fs-4"><span class="ms-1">Tour nổi
                                        bật</span></h2>
                                <p><a href="./TourNuocNgoai.html?type=Canada" id="link_to_Canada">xem thêm</a></p>
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

      var carouselContentMy = "";
      var carouselContentNhat = "";
      var carouselContentCanada = "";

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

      $.each(mylist, function (key, tour) {
        if (tourCountBac < 5) {
          var activeClass = tourCountBac === 0 ? "active" : "";
          carouselContentMy += `
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
          tourCountBac++;
        }
      });
      $.each(nhatlist, function (key, tour) {
        if (tourCountTrung < 5) {
          var activeClass = tourCountTrung === 0 ? "active" : "";
          carouselContentNhat += `
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
      $.each(canadalist, function (key, tour) {
        if (tourCountNam < 5) {
          var activeClass = tourCountNam === 0 ? "active" : "";
          carouselContentCanada += `
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
          tourCountNam++;
        }
      });
      $("#nav").html(nav);
      $("#header_My").html(headerMy);
      $("#carousel_My").html(
        carouselHeaderBac + carouselContentMy + carouselFooterBac
      );
      $("#header_Nhat").html(headerNhat);
      $("#carousel_Nhat").html(
        carouselHeaderTrung + carouselContentNhat + carouselFooterTrung
      );
      $("#header_Canada").html(headerCanada);
      $("#carousel_Canada").html(
        carouselHeaderNam + carouselContentCanada + carouselFooterNam
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
