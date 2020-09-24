var obj, title, myPos, result;
var churchList = document.getElementsByClassName("grid-wrap")[0];
var content = document.getElementsByClassName("content")[0];
var churchData = $.ajax({
    url: "../php/church.php",
    dataType: "json",
    data: churchData,
    success: churchSuccessLoad
});
var churchsData;

window.onhashchange = function() {
    if (window.location.hash.split("&").length > 1) {
        title = decodeURI(window.location.hash).split("&")[1];
        this.loadChurch(title);
    }
};

function churchSuccessLoad() {
    obj = churchData.responseJSON;
    obj.sort(function(a, b){
        var titleA = a.title.toLowerCase(), 
            titleB = b.title.toLowerCase();
        if ( titleA < titleB ) { //сортируем строки по возрастанию
            return -1;
        }
        if ( titleA > titleB ){
            return 1;
        }
        return 0; // Никакой сортировки
    });
    obj.forEach((element) => {
        for (var key in element) {
            if (key == "title"){
                    var a = document.createElement("a"),
                        divWrap = document.createElement("div"),
                        h3 = document.createElement("h3"),
                        divScale = document.createElement("div"),
                        img = document.createElement("img");
                    a.className = "block";
                    a.href = "#Храмы" + "&" + element[key];
                    divWrap.className = "block-wrap";
                    h3.innerText = element.title;
                    divScale.className = "scale";
                    img.setAttribute('src', element.img);
                    img.setAttribute('alt', element.title);
                    img.className = "scale";
                    churchList.appendChild(a);
                    a.appendChild(divWrap);
                    divWrap.appendChild(h3);
                    divWrap.appendChild(divScale);
                    divScale.appendChild(img);
                }
        }
    });
    
}
function initMyPos() {

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(geolocationSuccess, geolocationFailure); //передаем две функции для определения геолокации
    } else {
        myPos = [0,0];
        alert("Ваш браузер не поддерживает геолокацию");
    }
}

function geolocationSuccess(position){
    myPos = [position.coords.latitude, position.coords.longitude];
}

function geolocationFailure(positionError) {
    if(positionError == 1) {
		result = "Вы решили не предоставлять данные о своем местоположении, " + 
		        "но это не проблема. Мы больше не будем запрашивать их у вас.";
	}
	else if(positionError == 2) {
		result = "Проблемы с сетью или нельзя связаться со службой определения " + 
		        "местоположения по каким-либо другим причинам.";
	}
	else if(positionError == 3) {
		result = "He удалось определить местоположение " 
		        + "в течение установленного времени. ";

	}
	else {
		result = "Загадочная ошибка.";
    }
    console.log(result);
    myPos = [0,0];
}

function initMap(latitude, longitude) {
    var opt = {
        "center": [+latitude, +longitude],
        "zoom": 14
    };
    var myMap = new ymaps.Map("map", opt);
    var myPlacemark = new ymaps.GeoObject({
        geometry: {
            type: "Point",
            coordinates: [+latitude, +longitude]
        }
    });
    myMap.geoObjects.add(myPlacemark); 
}

function initRoute(latitude, longitude, myLat, myLong) {
    /**
     * Создаем мультимаршрут.
     * Первым аргументом передаем модель либо объект описания модели.
     * Вторым аргументом передаем опции отображения мультимаршрута.
     */

    myLat = myPos[0];
    myLong = myPos[1];
    
    var multiRoute = new ymaps.multiRouter.MultiRoute({
        // Описание опорных точек мультимаршрута.
        referencePoints: [
            [myLat, myLong],                //точка А (моя позиция)
            [+latitude, +longitude]         //Точка Б (конечная)
        ],
        // Параметры маршрутизации.
        params: {
            // Ограничение на максимальное количество маршрутов, возвращаемое маршрутизатором.
            results: 2
        }
    }, {
        // Автоматически устанавливать границы карты так, чтобы маршрут был виден целиком.
        boundsAutoApply: true
    });

    // Создаем кнопки для управления мультимаршрутом.
    var trafficButton = new ymaps.control.Button({
            data: { content: "Учитывать пробки" },
            options: { selectOnClick: true }
        }),
        viaPointButton = new ymaps.control.Button({
            data: { content: "Добавить транзитную точку" },
            options: { selectOnClick: true }
        });

    // Объявляем обработчики для кнопок.
    trafficButton.events.add('select', function () {
        /**
         * Задаем параметры маршрутизации для модели мультимаршрута.
         */
        multiRoute.model.setParams({ avoidTrafficJams: true }, true);
    });

    trafficButton.events.add('deselect', function () {
        multiRoute.model.setParams({ avoidTrafficJams: false }, true);
    });

    viaPointButton.events.add('deselect', function () {
        var referencePoints = multiRoute.model.getReferencePoints();
        referencePoints.splice(1, 1);
        multiRoute.model.setReferencePoints(referencePoints, []);
    });

    // Создаем карту с добавленными на нее кнопками.
    var myMap = new ymaps.Map('mapRoute', {
        center: [myLat, myLong],
        zoom: 14,
        controls: [trafficButton, viaPointButton, 'zoomControl', 'searchControl', 'typeSelector',  'fullscreenControl']
    }, {
        buttonMaxWidth: 300
    });

    // Добавляем мультимаршрут на карту.
    myMap.geoObjects.add(multiRoute);
}
function loadChurch(church) {
    if (content.childNodes.length > 1) {
        content.removeChild(content.childNodes[1]);
        loadChurch(church);
    } else { 
        if (!obj) {
            var obj2;
            var churchsData = $.ajax({
                url: "../php/church.php",
                dataType: "json",
                data: churchsData,
                cache: false,
                async: false,
                success: churchSuccessLoad
            });
            obj2 = churchsData.responseJSON;
            obj2.forEach((element) => {
                for (var key in element) {
                    if (church == element[key]) {
                        var h3 = document.createElement("h3"),
                            p = document.createElement("p"),
                            img = document.createElement("img"),
                            churchContentGridWrap = document.createElement("div"),
                            churchContentBlockWrap = document.createElement("div"),
                            churchContentBlock = document.createElement("div"),
                            churchContentScaleDiv = document.createElement("div"),
                            divMap = document.createElement("div"),
                            btnRoute = document.createElement("button"),
                            divMapRoute = document.createElement("div");
    
                        $(churchContentGridWrap).addClass("grid-wrap");
                        content.appendChild(churchContentGridWrap);
                        $(churchContentBlock).addClass("block");
                        $(churchContentGridWrap).append(churchContentBlock);
                        $(churchContentBlockWrap).addClass("block-wrap");
                        $(churchContentBlock).append(churchContentBlockWrap);
                        $(btnRoute).text("Построить маршрут");
                        $(btnRoute).addClass("btnRoute");
                        $(h3).text(element.title);
                        $(h3).addClass("content-header");
                        $(p).text(element.description);
                        $(img).attr("src", element.img);
                        $(p).addClass("text");
                        $(churchContentBlockWrap).append(h3);
                        $(churchContentBlockWrap).append(p);
                        $(churchContentScaleDiv).addClass("scale_one");
                        $(churchContentBlockWrap).append(churchContentScaleDiv);
                        $(img).addClass("scale_one");
                        $(churchContentScaleDiv).append(img);
                        $(churchContentBlockWrap).append(btnRoute);
                        $(divMap).attr("id", "map");
                        $(divMap).attr("style", "height: 300px;");
                        $(divMapRoute).attr("id", "mapRoute");
                        $(divMapRoute).attr("style", "height: 300px");
                        $(divMapRoute).attr("style","display: none");
                        $(churchContentBlock).append(divMap);
                        $(churchContentBlock).append(divMapRoute);
                        initMap(element.lat, element.lng);

                        $(btnRoute).click(function() {
        
                            initMyPos();
                    
                            var StaticMap = document.getElementById("map"),
                                RouteMap = document.getElementById("mapRoute");
                            
                            $(StaticMap).hide();
                            $(RouteMap).show();
                            $(divMapRoute).attr("style", "height: 300px");
                            ymaps.ready(initRoute(element.lat, element.lng, myPos[0], myPos[1]));
                        });
                    }
                }
            })
            $('.content').fadeIn();
        } else {    
            obj.forEach((element) => {
                for (var key in element) {
                    if (church == element[key]) {
                        var h3 = document.createElement("h3"),
                            p = document.createElement("p"),
                            img = document.createElement("img"),
                            churchContentGridWrap = document.createElement("div"),
                            churchContentBlockWrap = document.createElement("div"),
                            churchContentBlock = document.createElement("div"),
                            churchContentScaleDiv = document.createElement("div"),
                            divMap = document.createElement("div"),
                            btnRoute = document.createElement("button"),
                            divMapRoute = document.createElement("div");
    
                        $(churchContentGridWrap).addClass("grid-wrap");
                        content.appendChild(churchContentGridWrap);
                        $(churchContentBlock).addClass("block");
                        $(churchContentGridWrap).append(churchContentBlock);
                        $(churchContentBlockWrap).addClass("block-wrap");
                        $(churchContentBlock).append(churchContentBlockWrap);
                        $(btnRoute).text("Построить маршрут");
                        $(btnRoute).addClass("btnRoute");
                        $(h3).text(element.title);
                        $(h3).addClass("content-header");
                        $(p).text(element.description);
                        $(img).attr("src", element.img);
                        $(p).addClass("text");
                        $(churchContentBlockWrap).append(h3);
                        $(churchContentBlockWrap).append(p);
                        $(churchContentScaleDiv).addClass("scale_one");
                        $(churchContentBlockWrap).append(churchContentScaleDiv);
                        $(img).addClass("scale_one");
                        $(churchContentScaleDiv).append(img);
                        $(churchContentBlockWrap).append(btnRoute);
                        $(divMap).attr("id", "map");
                        $(divMap).attr("style", "height: 300px;");
                        $(divMapRoute).attr("id", "mapRoute");
                        $(divMapRoute).attr("style", "height: 300px");
                        $(divMapRoute).attr("style","display: none");
                        $(churchContentBlock).append(divMap);
                        $(churchContentBlock).append(divMapRoute);
                        initMap(element.lat, element.lng);
                        
                        $(btnRoute).click(function() {
            
                            initMyPos();
                    
                            var StaticMap = document.getElementById("map"),
                                RouteMap = document.getElementById("mapRoute");
                            
                            $(StaticMap).hide();
                            $(RouteMap).show();
                            $(divMapRoute).attr("style", "height: 300px");
                            ymaps.ready(initRoute(element.lat, element.lng, myPos[0], myPos[1]));
                        });
    
                    }
                }
            });
            $('.content').fadeIn();
        }
        
    }
}

$(document).ready(function() {
    if (window.location.hash.split("&").length > 1) {
        title = decodeURI(window.location.hash).split("&")[1];
        loadChurch(title);
    }
    $('.content').click(function(e) {
        if (this == e.target) {
            $('.content').fadeOut();
            window.location.hash = window.location.hash.split("&")[0];
        }
    });
    $(document).keyup(function(e) {
        if (e.which == 27) {
            $('.content').fadeOut();
            window.location.hash = window.location.hash.split("&")[0];
        }
    });
    
    ymaps.ready(initMap);
    initMyPos();
    
});
