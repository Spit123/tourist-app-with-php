"use strict"

function hideDiv(){
    $('#fountainG').delay(9000).fadeOut(); 
}

var articles = $.ajax({
    url: "../php/articles.php",
    dataType: "json",
    data: articles,
    success: successLoad,
    error: errorLoad
});

var err = "", divError, btnMenu, divMenu;
var URLHash = decodeURI(window.location.hash);

function successLoad() {
    err = "";
}

function errorLoad(e) {
    err = "error";
    console.error('Тип ошибки: ' + e.name);
    console.error('Текст ошибки: ' + e.message);
    console.log(err);
}
window.onhashchange = function() {
    URLHash = decodeURI(window.location.hash);
    console.log(URLHash);
    loadData(URLHash);
    if (window.location.hash) {
        $('.fullscreen-bg').attr("style", "height: auto;");
    }
};
function loadData(list) {
    let url;
    switch(list) {
        case "#Храмы": 
            url = "church.html";
            break;
        case "#Памятники": 
            url = "monuments.html";
            break;
        case "#Исторические сооружения":
            url = "buildings.html";
            break;
        default:
            url = "404.html";
            break;
    }
    $.ajax(url,
        { 
            type:'GET', 
            dataType:'html', 
            success: dataLoaded, 
            error: errorLoad 
        }
    );
}

function dataLoaded(data) {
    $(".main-content").show();
    document.getElementsByClassName("main-content")[0].innerHTML = data;
    if (window.location.hash.split("&").length > 1) {
        URLHash = decodeURI(window.location.hash).split("&")[0];
    }
    switch (URLHash) {
        case "#Храмы":
            extendedScriptListener();
            break;
        case "#Памятники":
            break;
        case "#Исторические сооружения":
            break;
        default:
            break;
    }
}

function extendedScriptListener() {
    var extendedScript = document.createElement('script');
			extendedScript.src = "../js/church.js";
			document.getElementsByTagName('body')[0].appendChild(extendedScript);
}

$(document).ready(function() {
    hideDiv();
    if (!window.location.hash) {
        $('.welcome').delay(10000).fadeIn(1500).delay(2000).fadeOut(1500);
        $('button').delay(15300).fadeIn();
        $('.button').click(function() {
            $(this).fadeOut(1500);
            if (err) {
                divError = document.createElement('div');
                $(divError).addClass('error-load');
                $('.overlay').append(divError);
            } else {
                divMenu = document.createElement('div');
                $('.overlay').append(divMenu);
                $(divMenu).addClass("menu");
                articles.responseJSON.forEach((element) => {
                    btnMenu = document.createElement('a');
                    $(btnMenu).addClass('btn-menu');
                    $(btnMenu).text(element.name);
                    $(btnMenu).attr("href", "#" + element.name);
                    $(divMenu).append(btnMenu);
                })
                $(divMenu).delay(1500).fadeIn(900);
                $('.btn-menu').click(function() {
                    $('.fullscreen-bg').attr("style", "height: auto;");
                    console.log($(this).text());
                    $('.btn-menu').fadeOut();
                    $('.main-content').delay(3000).fadeIn();
                    loadData($(this).text());
                });
            }
        });
    } else {
        setTimeout(() => {
            if (window.location.hash.split("&").length > 1) {
                URLHash = decodeURI(window.location.hash).split("&")[0];
                $('.main-content').fadeIn();
                loadData(URLHash);
                if (document.getElementById("fountainG").style.display == "none") {
                    $('.fullscreen-bg').attr("style", "height: auto;");
                };
                var title = decodeURI(window.location.hash).split("&")[1];
                loadChurch(title);
            } else {
                $('.main-content').fadeIn();
                loadData(URLHash);
                if (document.getElementById("fountainG").style.display == "none") {
                    $('.fullscreen-bg').attr("style", "height: auto;");
                };
            }
        }, 9200);

    }
});