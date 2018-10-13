
$(document).ready(function(){
    // faq 아코디언
    $(".accordian-wrap .accordian .aco>a").on("click", function (e) {
        e.preventDefault();
        if ($(this).parents('li').hasClass('on')) {
            $(this).siblings('.sub-content').stop().slideUp();
            $(this).parents('li').removeClass('on');
            $('.arrow-btn').removeClass('rotate');
        } else {
            //초기화 코드
            $(this).parents('li').siblings('li').children('ul').stop().slideUp();
            $(this).parents('li').siblings('li').removeClass('on');
            //아코디언 여는 코드
            $(this).next('.sub-content').stop().slideDown();
            $(this).parents('li').addClass('on');
            $('.arrow-btn').removeClass('rotate');
            $(this).find('.arrow-btn').addClass('rotate');
        }
    });
});

var accordion = new Accordion();

function Accordion(){
    
};



// 수정후 
$(document).ready(function () {
    var tabMenu = new sectionTab();
    var tabMenu2 = new sectionTab(".default-jg-tab2");
});
function sectionTab(parent) {
    parent = parent || ".default-jg-tab";
    this.elem = $(parent)[0];
    $(this.elem).addClass("sectionTab");

    this.elem.sectionTab = this;

    this.init();

    this.$tabItem.on("click", this.changeListener);
    this.$selectBoxParent.on("change", this.changeListener);

}

sectionTab.prototype.init = function () {
    this.$tabItem = $(this.elem).find('.tab-wrap .tab-ul .nav-item');
    this.$tabContents = $(this.elem).find('.tab-cont');
    this.$selectBoxParent = $(this.elem).find('.tab-ul');
}

sectionTab.prototype.refreshView = function (index) { //클래스이름.prototype.메서드 = function(){}
    // 탭 변경
    this.$tabItem.removeClass('on');
    this.$tabItem.eq(index).addClass('on');

    // 컨텐츠
    this.$tabContents.removeClass('on');
    this.$tabContents.eq(index).addClass('on');

    //셀렉트박스
    this.$selectBoxParent.val(index);
}

sectionTab.prototype.changeListener = function () {
    var $this = $(this), index, objThis = $this.parents(".sectionTab")[0].sectionTab;
    if (this.tagName.toLowerCase() == "select") {
        index = $this.val();
    } else {
        index = $this.index();
    }

    objThis.refreshView(index);
}

/*  탭 */
$.fn.sectionTab = function (parent) {
    parent = this;
    var sectionTabs = {
        init: function (parent) {
            this.$tabItem = $(parent).find('.tab-wrap .tab-list')
            this.$tabContents = $(parent).find('.tab-cont')
            // this.$selectBoxParent = $(parent).find('.tab-wrap')
        },
        event: function () {
            this.$tabItem.on("click", this.changeListener.bind(this));
        },
        refreshView: function (index) { //클래스이름.prototype.메서드 = function(){}
            // 탭 변경
            this.$tabItem.removeClass('on');
            this.$tabItem.eq(index).addClass('on');
            // 컨텐츠
            this.$tabContents.removeClass('on');
            this.$tabContents.eq(index).addClass('on');
            //셀렉트박스
            // this.$selectBoxParent.val(index);
        },
        changeListener: function (event) {
            event.preventDefault();
            var target = event.currentTarget;
            var index = 0;
            switch (event.type) { //  이벤트의 유형을 문자열을 반환
                case "click":
                    index = $(target).index();
                    break;
                case "change":
                    index = $(target).val();
                    break;
            }
            this.refreshView(index);
        }
    }
    // 선택자 정의
    sectionTabs.init(parent);
    //이벤트
    sectionTabs.event();
}

$(".default-jg-tab").sectionTab();
// $(".tab-list, .tab-cont").removeClass('on');

if (window.location.hash === "#tvu") {
    $("#tab2").trigger("click");
} else if (window.location.hash === "#harmonic") {
    $("#tab3").trigger("click");
} else {
    $("#tab1").trigger("click");
}