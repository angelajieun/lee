/*MOBILE 네비게이션*/
$("document").ready(function(){
  mobileHeader();
});
function mobileHeader() {
  var $btnMobileNav = $(".m-menu-btn");
  
  $btnMobileNav.on("click", function () {
    console.log(22);
    mobileNavOn();
  });

  $(".mobile-nav-wrap .m-menu-btn").on("click", function () {
    $("html , body").removeClass("m-nav-open");
    $btnMobileNav.removeClass("on"); // 엑스로 만들기
    $(".mobile-nav-wrap").addClass("tempHide");
    setTimeout(function () {
      mobileNavOff();
    }, 800);
  });

  function mobileNavOn() {
    $("html , body").addClass("m-nav-open");
    $btnMobileNav.addClass("on"); // 엑스로 만들기
    $("header").addClass("on");
    $(".mobile-nav-wrap").addClass("show");
  }

  function mobileNavOff() {
    $("header").removeClass("on");
    $(".mobile-nav-wrap").removeClass("tempHide");
    $(".mobile-nav-wrap").removeClass("show");
  }

  /// 콘텐츠 높이에 따른 네비게이션 컬러 변경
  $(window).on("load resize", function () {
    var navBtn = $(".m-menu-btn");
    var mainConWrap = $(".sub-article-wrap"); // 공통 네임으로 변경
    var mainConHeight = [];
    var index = 0;

    mainConWrap.each(function (idx) {
      console.log(idx);
      if(idx == 0){
        mainConHeight.push([0, $(this).outerHeight()]);
      }else {
        mainConHeight.push([$(this).offset().top + 1, $(this).offset().top + $(this).outerHeight()]);
      }
    });

    $(window).on('scroll', function () {
      var nowScrollTop = $(window).scrollTop() + 66;
      $.each(mainConHeight, function (i, range) {
        if (nowScrollTop >= range[0] && nowScrollTop <= range[1]) { 
          index = i; //현재 인덱스 값
          colorChange(index);
        }
      });
    }).scroll();

    function colorChange(index) {
      if (mainConWrap.eq(index).hasClass("white")) { // 공통으로 변경
        navBtn.removeClass("bg-black");
      } else {
        navBtn.addClass("bg-black");
      }
    }
  });

}

///////////////////////////////
/*=================================================
  스크롤 애니메이션
=================================================*/
if (document.querySelector("[data-ani]")) {
  (function scrollAni() {
    var aniEls = document.querySelectorAll("[data-ani]");
    var revs = []; //revealAni에 사용할 배열용 변수
    var aniWatchers = [];
    var aniStates = [];

    Array.prototype.slice.call(aniEls).forEach(function (el, idx) {
      var position = el.dataset.aniPosition ? el.dataset.aniPosition : -100;
      aniWatchers[idx] = scrollMonitor.create(el, Number(position) * -1);
      aniStates[idx] = false;
    });

    aniWatchers.forEach(function (watcherEl, idx) {
      var el = watcherEl.watchItem;

      if (el.dataset.ani === "css") {
        setCssAddClass(watcherEl, el.dataset.aniDelay);
      } else if (el.dataset.ani === "reveal") {
        setRevsObj(idx, el, { color: el.dataset.aniColor, delay: el.dataset.aniDelay });
        setRevOnOff(idx, watcherEl);
      } else if (el.watchItem.dataset.ani === "tweenMax") {
        console.log("tweenMax");
      }
    });



    // css 애니메이션
    function setCssAddClass(watcherEl, delay) {
      delay = delay ? delay : 0;
      var el = watcherEl.watchItem;

      watcherEl.enterViewport(function () {
        setTimeout(function () {
          if (typeof el.addClass === "function") {// svgElement 인지 여부 판단
            el.addClass("ani-on");
          } else {
            el.classList.add("ani-on");
          }
        }, delay);
      });
    }

    //rev 객체셋팅
    function setRevsObj(idx, el, options) {
      var blockColor = options.color ? options.color : '#f9f9f9';
      var blockDelay = options.delay ? options.delay : 0;

      revs[idx] = new RevealFx(el, {
        revealSettings: {
          bgcolor: blockColor,
          duration: 800,
          delay: blockDelay,
          onStart: function (contentEl, revealerEl) {
            contentEl.style.opacity = 0;
          },
          onCover: function (contentEl, revealerEl) {
            contentEl.style.opacity = 1;
          }
        }
      });
    }

    //rev 애니메이션 셋팅
    function setRevOnOff(idx, watcherEl) {
      watcherEl.enterViewport(function () {
        revs[idx].reveal();
      });
      watcherEl.exitViewport(function () {
        if (aniStates[idx] === false && document.body.classList.contains("scroll-reset") === false) {
          aniWatchers[idx].destroy();
          aniStates[idx] = true;
        }
      });
    }
  }());
}

///////////////////////////////
$(window).resize(function () {
  var windowWidth = window.innerWidth;
  var windowHeight = window.innerHeight;
  $(".main-visual-wrapper").innerHeight(windowHeight);

  // var $sec1 = $(".sec1").offset().top;

  // $(".scroll-hint").on("click", function () {
  //   scrollAnimation.scrollDown($sec1);
  // });

  // if (window_width >= mediaQuery.lg) {
  //   scrollAnimation.pcScrollDown();
  // } else {
  //   scrollAnimation.mobileScrollDown();
  // }

  $(".scroll-hint").on("click", function () {
    $("html,body").animate({ scrollTop: $(".slide-group").offset().top }, 1000, 'easeInOutSine');
  });

}).resize();


if (document.querySelector(".main-visual-wrapper")) {
  (function () {
    $(".main-visual-wrapper video")[0].play();
  })()
}


/*=================================================
 메인 슬라이드 스크롤 애니메이션
 =================================================*/
var scrollAnimation = scrollAnimation || {};

scrollAnimation.isScroll = 0;//스크롤 프로세스 상태변수(0스크롤전,1스크롤중)
var mousewheelevt = (/Firefox/i.test(navigator.userAgent) ? "DOMMouseScroll" : "mousewheel");//파이어폭스를 위한 크로스브라우징 코드
// scrollAnimation.pcScrollDown = function () {
//   scrollAnimation.targetSection = $(".main-visual-group");
//   scrollAnimation.moveTagetSection = $(".slide-group");
//   scrollAnimation.moveTagetSectionTop = scrollAnimation.moveTagetSection.offset().top;

//   scrollAnimation.targetSection.on(mousewheelevt, function (e) {
//     $("body").addClass("is-scrolling");
//     if (scrollAnimation.isScroll === 1) return false;//스크롤중 이벤트 막기
//     e.preventDefault();
//     var evt = window.event || e;// 이전 브라우저에서 window.event라고 표기해야 하는 경우가 있으므로 변수에 or 연산자를 사용하여 할당함.
//     var delta = evt.detail ? evt.detail : evt.wheelDelta;//파이어폭스일때 evt.originalEvent.detail을 사용함. 스크롤 이벤트 방향이 다른 브라우저와 반대임.
//     if (/Firefox/i.test(navigator.userAgent)) delta = -evt.originalEvent.detail;

//     if (delta < 0) {
//       scrollAnimation.isScroll = 1;
//       scrollAnimation.scrollDown(scrollAnimation.moveTagetSectionTop, "pc");
//     } else {
//       scrollAnimation.isScroll = 1;
//       scrollAnimation.scrollUp();
//     }
//   });
//   if ($("body").hasClass("is-scrolling") === true) {
//     scrollAnimation.moveTagetSection.on(mousewheelevt, function (e) {
//       e.preventDefault();
//     });
//   }
// };
scrollAnimation.mobileScrollDown = function () {
  scrollAnimation.targetSection = $(".main-visual-group")[0];
  scrollAnimation.moveTagetSectionTop = $(".slide-group").offset().top;
  // var hammertime = new Hammer(scrollAnimation.targetSection);
  // hammertime.get('pan').set({ direction: Hammer.DIRECTION_ALL });

  // // listen to events...
  // hammertime.on("panup pandown", function (ev) {
  //   if (ev.direction == "8") {
  //     scrollAnimation.scrollDown(scrollAnimation.moveTagetSectionTop);
  //   }
  //   else if (ev.direction == "16") {
  //     scrollAnimation.scrollUp();
  //   }
  // });
};

scrollAnimation.scrollDown = function (moveTagetSection, divice) {
  $("html,body").stop().animate({
    scrollTop: moveTagetSection
  }, 800, function () {
    scrollAnimation.isScroll = 0;
    // if (divice === "pc") {
    //   $("body").removeClass("is-scrolling");
    //   scrollAnimation.moveTagetSection.off(mousewheelevt);
    // }
  });
};
scrollAnimation.scrollUp = function () {
  $("html,body").stop().animate({
    scrollTop: 0
  }, 800, function () {
    scrollAnimation.isScroll = 0;
    $("body").removeClass("is-scrolling");
  });
};

if (document.querySelector(".advisor-video")) {
  (function () {
    $(".advisor-video video")[0].play();
  })()
}

(function () {
  /*=================================================
     해당 섹션에서 원 그리기
  ================================================= */
  $(window).resize(function () {
    $(window).scroll(function () {
      var scrollTop = $(this).scrollTop();
      var serviceHeight = $(".main-service-wrap").outerHeight() / 2;
      var performaceTop = $(".main-performance-wrap").offset().top;
      // var $cntNum = $("#cntNum");

      if (scrollTop >= (performaceTop - serviceHeight)) {
        //if ($cntNum.hasClass("animated") != true) {
          // countNum();
          //$cntNum.addClass("animated");
        //}
        $(".startAni").addClass('active');
      }
    });
  }).resize();

  // /*=================================================
  //    숫자 카운팅
  // ================================================= */
  // var countNum = function () {
  //   var countOptions = {
  //     useEasing: false,
  //     useGrouping: true,
  //     separator: ',',
  //     decimal: '.'
  //   };
  //   //argument(TargetEl, startNum, endNum, decimal, Duration, option)
  //   var count = new CountUp('cntNum', 20, 52.27, 2, 2, countOptions);
  //   count.start();
  // };

})()
