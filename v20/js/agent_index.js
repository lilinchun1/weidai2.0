/**
 * Created by 闫继鹏 on 2015/1/15.
 * 店铺首页使用的js
 */
//下拉翻页
var curpage=1;
var pageCount="";
var ajax_inspect=2//用于防止json重复提交;
function ajax_page(){
    $.ajax({
        url: '/wedai/wap/index.php/agent_shop/index/goods.do?curpage='+curpage,
        dataType: "json",
        type: 'post',
        data: {'agent_id':agent_id},
        success: function (result) {   //成功后回调
            var data=result['datas'];
            pageCount=result['pages'];//总页数
            curpage=result['curpage'];//当前页
		
            $.each(data['goods'], function (key, val) {
                var image_url=val.goods_image_url;//图片地址
                //var goods_commend=val['goods_commend'];//是否特价,有值为特价;
                var goods_name=val['goods_name'];//标题
                var goods_price=val['goods_price'];//价格.
                var goods_marketprice=val['goods_marketprice'];//原价
                var goods_id=val['goods_id'];//商品ID
				var goods_agent_id =val['agent_id'];
                $(".search-list").append('<li>' +
                    '<a href="'+goods_agent_id+'/'+goods_id+'"><div class="search-pic">' +
                        '<img src="/wedai/wap/template/v20/img/grey.gif" data-original="'+image_url+'" alt=""/>' +
                        '<div class="price"><em><span>&yen;</span>'+goods_price+'</em><i>原价：'+goods_marketprice+'</i></div>' +
                    '</div>' +
                    '<h2><a href="">'+goods_name+'</a></h2></a>' +
                    '<button type="button" class="search-b-btn search-btn-l">立即购买</button>' +
                    '</li>');
            });
            curpage++;
            $('.search-pic img').picLazyLoad();//懒加载js
        },
        error: function (e) {    //失败后回调
            floatNotify.simple("请求有误，请稍后重试");
        },
        beforeSend: function () {
            $('.add-more').show();
            //return false;
        }
    });
}

$(window).scroll(function () {
    var scrollTop = $(this).scrollTop();
    var scrollHeight = $(document).height();
    var windowHeight = $(this).height();
    if (scrollTop + windowHeight >= scrollHeight && curpage <= pageCount) {
        ajax_alert=false;
        if(ajax_inspect==curpage) {
            ajax_page();
        }else{
            floatNotify.simple("请稍后重试");
        }
        ajax_inspect++;
    }
    if(curpage > pageCount)
    {
       $('.add-more').html("全部加载完毕");
       $('.add-more').css("background-image","none");
       $('.add-more').css("padding-left","0");
       $('.add-more').css("text-align","center");
    }
});
$(function(){
    ajax_page();
})
