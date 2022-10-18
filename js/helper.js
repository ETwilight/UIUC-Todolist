"use strict"
var tdhe = null;
function addTDHE(text, length) {
    tdhe.push([text, length]);
    tdhe[0][1] += length;
}

function resetTDHE() {
    tdhe = [["config", 0]];
}

function renderTDHE() {
    TDHEAD.innerHTML = "";
    for(var i = 1; i < tdhe.length; i++) {
        var len = tdhe[i][1] / tdhe[0][1] * 100;
        var lenstr = len.toString() + "%";
        var tdhel = "<tdhe style=\"width: "+ lenstr + ";\"> " + tdhe[i][0] + " </tdhe>";
        TDHEAD.innerHTML += tdhel;
    }
}

function TDBLInput(phs) {
    if (TDBODY.innerHTML != "") {
        TDBODY.innerHTML += "<br/><tblank class=\"bline relative\"></tblank><br/>";
    }
    var fm = "<form class=\"tdbl\" id=\"new-form\">";
    for(var i = 1; i < tdhe.length; i++) {
        var len = tdhe[i][1] / tdhe[0][1] * 100;
        var lbl = null;
        if(i != 1) {
            console.log(tdhe[i][0] + " " + i.toString());
            var lenstr = len.toString() + "%";
            lbl = "<input class=\"tdbe\" type=\"text\"" + 
                    " placeholder=\"eg " + phs[i-1] + "\"" +
                    " id=\"new-" + (i-1).toString() + "\"" + 
                    " style=\"width: "+ lenstr + ";\"" + 
                    "/>";
            console.log(lbl);
        }
        else {
            var lbl1 = "<input class=\"tdbe ok\" type=\"button\"" + 
                  " value = \"" + "U" + "\"" + 
                  " style=\"width: "+ (len/3.0).toString() + "%" + ";\"" + 
                  " id=ok" + " onclick=\"istElement()\"" + 
                  "/>";
            var lbl2 = "<input class=\"tdbe nok\" type=\"button\"" + 
                  " value = \"" + "D" + "\"" + 
                  " style=\"width: "+ (len/3.0).toString() + "%" + ";\"" + 
                  " id=nok" + " onclick=\"renderPage()\"" + 
                  "/>";
            lbl = lbl1 + lbl2;
        }
        fm += lbl;
    }
    fm += "</form>";
    TDBODY.innerHTML += fm;
    return fm;
}

function renderTDBL(tdbl) {
    TDBODY.innerHTML = "";
    console.log(tdbl);
    for(var j = 0; j < tdbl.length; j++) {
        var tdbe = tdbl[j];
        var tdblstr = "<tdbl>";
        for(var i = 0; i < tdbe.length; i++) {
            var len = tdhe[i+1][1] / tdhe[0][1] * 100;
            var lenstr = len.toString() + "%";
            var tdbel = "<tdbe style=\"width: "+ lenstr + ";\"> " + tdbe[i] + " </tdbe>";
            tdblstr += tdbel;
        }
        tdblstr += "</tdbl>";
        TDBODY.innerHTML += tdblstr;
        if(j != tdbl.length - 1) {
            TDBODY.innerHTML += "<br/><tblank class=\"bline relative\"></tblank><br/>";
        }
    }
}