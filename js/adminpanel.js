var td = document.getElementsByClassName("data_article");
var formTD = document.getElementsByClassName("TD_edit");
var formTDAdd = document.getElementsByClassName("TD_insert");
var btnAdd = document.getElementById("insert_btn");
var btnRmv = document.getElementById("remove_btn");
var innerText, obj;

var churchData = $.ajax({
    url: "../php/church.php",
    dataType: "json",
    data: churchData,
    success: churchSuccessLoad
});

function churchSuccessLoad() {
    obj = churchData.responseJSON;
    console.log(obj);
};

btnAdd.addEventListener("click", function() {
    document.getElementsByClassName("editForm")[0].style.display = "none";
    document.getElementsByClassName("removeForm")[0].style.display = "none";
    document.getElementsByClassName("insertForm")[0].style.display = "block";
    formTDAdd[0].innerText = "ID";
    document.getElementById("idAdd").style.display = "block";
    formTDAdd[2].innerText = "Наименование";
    document.getElementById("titleAdd").style.display = "block";
    formTDAdd[4].innerText = "Описание";
    document.getElementById("descriptionAdd").style.display = "block";
    formTDAdd[6].innerText = "Изображение";
    document.getElementById("imgAdd").style.display = "block";
    formTDAdd[8].innerText = "Широта";
    document.getElementById("latAdd").style.display = "block";
    formTDAdd[10].innerText = "Долгота";
    document.getElementById("lngAdd").style.display = "block";
    document.getElementById("insert").style.display = "block";
});

btnRmv.addEventListener("click", function() {
    document.getElementsByClassName("editForm")[0].style.display = "none";
    document.getElementsByClassName("insertForm")[0].style.display = "none";    
    document.getElementsByClassName("removeForm")[0].style.display = "block";
    document.getElementsByClassName("TD_remove")[0].innerText = "ID";
    document.getElementById("idRemove").style.display = "block";
    document.getElementById("remove").style.display = "block";
});

$(document).ready(function() {
    for (let i = 0; i < td.length-1; i++) {
        td[i].addEventListener("click", function(e) {
            document.getElementsByClassName("editForm")[0].style.display = "block";
            document.getElementsByClassName("insertForm")[0].style.display = "none";
            document.getElementsByClassName("removeForm")[0].style.display = "none";
        if (this == e.target) {
            innerText = td[i].innerText;
            obj = churchData.responseJSON;
            obj.forEach((element) => {
                for (var key in element) {
                    if (innerText == element["title"]) {
                        formTD[0].innerText = "id";
                        document.getElementById("id").style.display = "block";
                        document.getElementById("id").value = element["id"];
                        formTD[2].innerText = "Наименование";
                        document.getElementById("title").style.display = "block";
                        document.getElementById("title").value = element["title"];
                        formTD[4].innerText = "Описание";
                        document.getElementById("description").style.display = "block";
                        document.getElementById("description").value = element["description"];
                        formTD[6].innerText = "Изображение";
                        document.getElementById("img").style.display = "block";
                        document.getElementById("img").value = element["img"];
                        formTD[8].innerText = "Широта";
                        document.getElementById("lat").style.display = "block";
                        document.getElementById("lat").value = element["lat"];
                        formTD[10].innerText = "Долгота";
                        document.getElementById("lng").style.display = "block";
                        document.getElementById("lng").value = element["lng"];
                        document.getElementById("submit").style.display = "block";
                    }
                }
            });
        }
        }, false)
    };
    
})