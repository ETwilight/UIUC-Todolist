"use strict"
// Data Table
// group, task name, finish date, importance, predicted finish time, progress(linear)
var datas = [];
const DATA_LEN = 6;
const cfg0 = ["ID", "Group", "Task Name", "Importance", "PFT", "Progress", "Deadline"];
const hint = ["id", "grp", "tname", "ipt", "pft", "pgs", "ddl"];
const cfg1 = [1, 1.5, 5.5, 3, 2, 1, 2.5];

var TDBODY = null;
var TDHEAD = null;

function scrollTDBody() {
    const ele = document.getElementsByTagName("tdbody")[0];
    ele.scrollBy(0, ele.scrollHeight);
}

function renderPage() {
    configTDHE();
    renderTDHE();
    //testData();
    renderTDBL(dataToTDBL());
}

function readData() {
    datas = JSON.parse(localStorage.getItem("todo"));
    if(datas == null) datas = [];
}

function saveData() {
    localStorage.setItem("todo", JSON.stringify(datas));
    renderPage();
}

function istElement() {
    var group = document.getElementById("new-1").value;
    var task = document.getElementById("new-2").value;
    var finish = document.getElementById("new-6").value;
    var importance = document.getElementById("new-3").value;
    var predict = document.getElementById("new-4").value;
    var progress = document.getElementById("new-5").value;
    insertElement(group, task, finish, importance, predict, progress);
}

function insertElement(group, task, finish, importance, predict, progress) {
    datas.push([group, task, finish, importance, predict, progress]);
    saveData();
}

function modifyElement(index, which, newpar) {
    if (index >= datas.length || index < 0) {
        console.log("Unexpected Behavior! Index out of range error");
        return;
    }
    if (which >= DATA_LEN) {
        console.log("Unexpected Behavior! Which >= DATA_LEN");
    }
    if (typeof(datas[index][which]) != typeof(newpar)) {
        console.log("Unexpected Behavior! Try to store unauthorized type into data");
    }
    datas[index][which] = newpar;
    saveData();
}


function deleteElement(index) {
    if (index >= datas.length || index < 0) {
        console.log("Unexpected Behavior! Index out of range error");
        return;
    }
    var arr1 = datas.slice(0, index);
    var arr2 = datas.slice(index + 1); // Bug Warning: Don't know whether index out of range occur
    datas = arr1.concat(arr2);
    saveData();
}

function resetData() {
    datas = [];
    localStorage.setItem("todo", JSON.stringify(datas));
    saveData();
}

function sortByDefault() {

}

function operateMenu(id) {
    switch(parseInt(id)) {
        case 0:
            var tdform = TDBLInput(hint);
            scrollTDBody();
            break;
        case 2:
            resetData();
            break;
    }
}

function allocateIDToMenu() {
    var menus = document.getElementsByTagName("tmenu");
    for(var i = 0; i < menus.length; ++i) {
        menus[i].id = "menu-" + i.toString();
        document.getElementById("menu-" + i.toString()).onclick = function() {
            operateMenu(this.id.slice(5));
        }
    }
}

function configTDHE() {
    resetTDHE();
    for(var i = 0; i < cfg0.length; ++i)
        addTDHE(cfg0[i], cfg1[i]);
}

function dataToTDBL() {
    var tdbls = [];
    for(var i = 0; i < datas.length; ++i) {
        var data = datas[i];
        var index = i + 1;
        var group = data[0];
        var tn = data[1];
        var ipt = data[3];
        var pft = data[4];
        var pg = data[5];
        var ddl = data[2];
        tdbls.push([index, group, tn, ipt, pft, pg, ddl]);
    }
    console.log(tdbls);
    return tdbls;
}

function testData() {
    datas = [];
    for(var i = 0; i < 60; ++i)
        datas.push(["Maths", "Math 221 Homework 1", "2022/10/11", "10", "12h", "5%"]);
    console.log(datas);
}

window.onload = (event) => {
    TDBODY = document.getElementsByTagName("tdbody")[0];
    TDHEAD = document.getElementsByTagName("tdhead")[0];
    allocateIDToMenu();
    readData();
    renderPage();
};