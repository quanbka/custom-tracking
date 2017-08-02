$(document).ready(function () {
    setTimeout(function () {
        $(elementTracking).click(function () {
            if (
                    typeof storeIdTracking != 'undefined' &&
                    storeIdTracking != null &&
                    storeIdTracking != '' &&
                    typeof storeNameTracking != 'undefined' &&
                    storeNameTracking != null &&
                    storeNameTracking != ''
                    ) {
                var url = 'http://coupon.megaads.vn/system/tracking-click';

                var data = {
                    token: "ajsdf435kjdsjf43t343",
                    site: siteTracking,
                    tracking: {id: storeIdTracking, name: storeNameTracking, type: 'store'}, 
                    //userInfo: userInfo
                };
                sendRequest(url, data);
            }
        });
    }, 500);
    setTimeout(function () {
        if (
                typeof storeIdTracking != 'undefined' &&
                storeIdTracking != null &&
                storeIdTracking != '' &&
                typeof storeNameTracking != 'undefined' &&
                storeNameTracking != null &&
                storeNameTracking != ''
                ) {
            var url = 'http://coupon.megaads.vn/system/tracking-impression';
            var data = {
                token: "ajsdf435kjdsjf43t343",
                site: siteTracking,
                tracking: {id: storeIdTracking, name: storeNameTracking, type: 'store'}
            };
            if (sessionStorage.getItem(storeIdTracking) == null) {
                sendRequest(url, data);
            }
        }
    }, 500);
    setTimeout(function () {
        if (
                typeof couponIdTracking != 'undefined' &&
                couponIdTracking != null &&
                couponIdTracking != '' &&
                typeof couponNameTracking != 'undefined' &&
                couponNameTracking != null &&
                couponNameTracking != ''
                ) {
            var url = 'http://coupon.megaads.vn/system/tracking-click';
            var userInfo =  buildUserInfo('coupon');
            var data = {
                token: "ajsdf435kjdsjf43t343",
                site: siteTracking,
                tracking: {id: couponIdTracking, name: couponNameTracking, type: 'coupon'},
                userInfo: userInfo
            };
            if (sessionStorage.getItem(couponIdTracking) == null) {
                sendRequest(url, data);
            }else{
                url = 'http://coupon.megaads.vn/system/tracking-user';
                sendRequest(url, data);
            }
        }
    }, 1000);
});


function buildUserInfo(type){
    var result = {
    }
    if(typeof type == 'undefined' || typeof couponIdTracking == 'undefined' || typeof storeIdTracking == 'undefined'){
        return result;
    }
    result = {
        couponId: couponIdTracking || null,
        storeId: storeIdTracking || null,
    };
    if(typeof uId!= 'undefined' && uId != null){
        var itemId = type == 'coupon' ? couponIdTracking : storeIdTracking;
        result.uId = uId + '_' + type + '_' + itemId;
    }
    if(typeof device != 'undefined' && device != null){
        result.device = device;
    }
    if(typeof referer != 'undefined' && referer != null){
        result.referer = referer;
    }
    if(typeof queryString != 'undefined' && queryString != null){
        result.queryString = queryString;
    }
    return result;
}

function sendRequest(url, data) {
    $.ajax({
        url: url,
        type: "POST",
        data: data,
        success: function (result) {
            sessionStorage.setItem(data.tracking.id, data.tracking.name);
        },
        error: function (error) {
            console.error(error);
        }
    });
}


