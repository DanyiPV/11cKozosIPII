var jatekTer = document.getElementById("jatekter");

var balPanel = document.createElement("div");
var kartyaBox = document.createElement("div");
var pontokBox = document.createElement("div");
var tabla = document.createElement("div");
var korokBox = document.createElement("div");
//1,1,-1,2,-2,-2,2,3,3,-3,4,4,-4,5,5,-5,6,6,-6,0,0,0,0
var KartyakTag = 
[{id:1,value:1,sign:''},
{id:2,value:1,sign:''},
{id:3,value:-1,sign:''},
{id:4,value:2,sign:''},
{id:5,value:-2,sign:''},
{id:6,value:-2,sign:''},
{id:7,value:2,sign:''},
{id:8,value:3,sign:''},
{id:9,value:3,sign:''},
{id:10,value:-3,sign:''},
{id:11,value:4,sign:''},
{id:12,value:4,sign:''},
{id:13,value:-4,sign:''},
{id:14,value:5,sign:''},
{id:15,value:5,sign:''},
{id:16,value:-5,sign:''},
{id:17,value:6,sign:''},
{id:18,value:6,sign:''},
{id:19,value:-6,sign:''},
{id:20,value:0,sign:'pap'},
{id:21,value:0,sign:'hegy'},
{id:22,value:0,sign:'taliga'},
{id:23,value:0,sign:'sárkány'}
];

var VarTag = 
[{id:1,value:1,color:1},
{id:2,value:2,color:2},
{id:3,value:3,color:3},
{id:4,value:4,color:4},
{id:5,value:1,color:1},
{id:6,value:2,color:2},
{id:7,value:3,color:3},
{id:8,value:4,color:4},
{id:9,value:1,color:1},
{id:10,value:2,color:2},
{id:11,value:3,color:3},
{id:12,value:4,color:4},
{id:13,value:1,color:1},
{id:14,value:2,color:2},
{id:15,value:3,color:3},
{id:16,value:4,color:4}
];

var cellak = [];

function JatekterBetoltes()
{
    balPanel.appendChild(kartyaBox);
    balPanel.appendChild(pontokBox);
    jatekTer.appendChild(balPanel);
    jatekTer.appendChild(tabla);
    jatekTer.appendChild(korokBox);

    //kartyaBox.innerHTML = "kartyaBox";
    pontokBox.innerHTML = "pontokBox";
    //tabla.innerHTML = "tabla";
    korokBox.innerHTML = "korokBox";
}
function JatekterElrendezes()
{
    balPanel.id = "balpanel";
    kartyaBox.id = "kartyabox";
    pontokBox.id = "pontokbox";
    tabla.id = "tabla";
    korokBox.id = "korokbox";
}
function TablaGeneralas()
{
    var k = 1;
    for(var i = 0; i < 5; i++)
    {
        var sorDiv = document.createElement("div");
        sorDiv.classList += " sordiv";
        for(var j = 0; j<6;j++)
        {
            var oszlopDiv = document.createElement("div");
            oszlopDiv.classList += " oszlopdiv";
            oszlopDiv.setAttribute("onclick","KepAtteves(this)");
            sorDiv.appendChild(oszlopDiv);
            oszlopDiv.id = k++;
        }
        tabla.appendChild(sorDiv);
    }
    var KartyaBox = document.getElementById("kartyabox");
    var Kep = document.createElement("img");
    Kep.src = "lekartya.jpg";
    Kep.setAttribute("onclick","RandomKivalaszt()");
    KartyaBox.appendChild(Kep);
    var KivalasztoDiv = document.createElement("div");
    KivalasztoDiv.id = "KivalasztoDiv";
    document.body.appendChild(KivalasztoDiv);
}
/*
function benneVanE(elem, lista){
    for(let i = 0;i<lista.length;i++)
    {
        if(lista[i] != undefined){
            if(lista[i].id == elem)
            {
                return true;
            }
        }
    }
    return false;
}*/

function CellakRandomizalasa(){
    //Kártya tagek randomizálása
    for(let i = 0; i< 23;i++)
    {
        /*var random = Math.floor(Math.random()*30);
        while(benneVanE(random+1,cellak)) {
            random = Math.floor(Math.random()*30);
        }
        var cella = {id: random+1};
        cella.type = "kártya";
        cella.kartya = KartyakTag[i];
        cellak.splice(i,1,cella);*/
        var cella = {id: i+1};
        cella.type = "kártya";
        cella.kartya = KartyakTag[i];
        cellak.push(cella);
    }
    //var rklista = [];
    //Vár tagek randomizálása
    for(let i = 0; i< 16;i++)
    {
        /*random = Math.floor(Math.random()*30);
        var rKep = Math.floor(Math.random()*16);
        while(benneVanE(random+1,cellak)) {
            random = Math.floor(Math.random()*30);
        }
        while(rklista .includes(rKep)) {
            rKep = Math.floor(Math.random()*16);
        }
        rklista .push(rKep);
        var cella = {id: random+1};
        cella.type = "vár";
        cella.kartya = VarTag[rKep];
        cellak.splice(23+i,1,cella);*/
        var cella = {id: i+24};
        cella.type = "vár";
        cella.kartya = VarTag[i];
        cellak.push(cella);
    }
    console.log(cellak);
    /*KepKivalaszto();
    Táblába helyezés
    for(let i = 0; i< 30;i++)
    {
        var hely2 = document.getElementById(cellak[i].id+30);
        var kep = document.createElement("img");
        if(cellak[i].type=="kártya")
        {
            kep.src = "kartyak/"+cellak[i].kartya.id+".png";
        }
        else
        {
            kep.src = "bastyak/"+cellak[i].kartya.id+".png";
        }
        hely2.appendChild(kep);
    }*/
}
/*
function KepKivalaszto(){
    var Kivalaszto = document.createElement("div");
    Kivalaszto.id = "Kivalaszto";
    document.body.appendChild(Kivalaszto);
    var k = 31;
    for(var i = 0; i < 2; i++)
    {
        var sorDiv = document.createElement("div");
        sorDiv.classList += "MSordiv";
        for(var j = 0; j<15;j++)
        {
            var oszlopDiv = document.createElement("div");
            oszlopDiv.classList += "MOszlopdiv";
            oszlopDiv.setAttribute("onclick","KepAttevo(this)");
            sorDiv.appendChild(oszlopDiv);
            oszlopDiv.id = k++;
        }
        Kivalaszto.appendChild(sorDiv);
    }
}
//Globál változók
var indexlista = new Array();
var RanyomE = false;
var KartyaIndex = 0;
var RanyomE2 = false;
var KivalasztoDB = 0;
//Alsó táblából való kép kiválasztás
function KepAttevo(div){
    if(RanyomE == false){
        var HelyIndex = div.id;
        let i = 0;
        while(cellak[i].id != HelyIndex-30){
            i++
        }
        if(!indexlista.includes(cellak[i].id)){
            indexlista.push(cellak[i].id);
            KartyaIndex = cellak[i].id;
            div.setAttribute("onclick","");
            RanyomE = true;
            RanyomE2 = false;
            div.classList += " Eltuntet";
            KivalasztoDB++;
            if(KivalasztoDB == 30){
                var KivalasztoTer = document.getElementById("Kivalaszto");
                KivalasztoTer.classList = "Eltuntet";
            }
        }
    }
}
//Alap táblába való kép behelyezés
var ValuesArray = new Array();
function KepAtteves(div){
    if(RanyomE2 == false){
        var index = div.id;
        var kep = document.createElement("img");
        let i = 0;
        while(cellak[i].id != KartyaIndex){
            i++
        }
        if(cellak[i].type == "kártya")
        {
            kep.src = "kartyak/"+cellak[i].kartya.id+".png";
        }
        else
        {
            kep.src = "bastyak/"+cellak[i].kartya.id+".png";
        }
        div.setAttribute("onclick","");
        var ValueCella = {};
        ValueCella.id = index;
        ValueCella.type = cellak[i].type;
        ValueCella.value = cellak[i].kartya.value;
        ValuesArray.push(ValueCella);
        var hely = document.getElementById(index);
        hely.appendChild(kep);
        RanyomE = false;
        RanyomE2 = true;
    }
    if(ValuesArray.length == 30){
        Kiszamolas();
    }
}
//Sor Oszlop kiszámoló
function Kiszamolas(){
    console.log("---------Sor összegek---------");
    for(var i = 1; i < 31;i+=6){
        var db = 0;
        for(var j = 0; j < 5;j++){
            for(var k = 0; k < 30;k++){
                if(ValuesArray[k].id == (i+j) && ValuesArray[k].type == "kártya"){
                    db += ValuesArray[k].value;
                    break;
                }
            }
        }
        console.log((Math.floor((i/6))+1)+". sor: "+db);
    }
    console.log("---------Oszlop összegek---------");
    for(var i = 0; i < 6;i++){
        var db = 0;
        for(var j = 1; j < 31;j+=6){
            for(var k = 0; k < 30;k++){
                if(ValuesArray[k].id == (i+j) && ValuesArray[k].type == "kártya"){
                    db += ValuesArray[k].value;
                    break;
                }
            }
        }
        console.log((i+1)+". oszlop: "+db); 
    }
}
*/

var RanyomE = false;
var RandomLista = new Array();
var KepIndex = 0;
var RanyomE2 = true;
function RandomKivalaszt(){
    if(RanyomE == false && RandomLista.length != 23){
        RanyomE = true;
        var random = Math.floor(Math.random()*23);
        while(RandomLista.includes(random)){
            random = Math.floor(Math.random()*23);
        }
        RandomLista.push(random);
        KepIndex = random;
        var KivalasztoDiv = document.getElementById("KivalasztoDiv");
        var Kep = document.createElement("img");
        Kep.setAttribute("onclick","KepAttevo()");
        Kep.id = -1;
        Kep.src = "kartyak/"+cellak[random].kartya.id+".png";
        KivalasztoDiv.appendChild(Kep);
        RanyomE2 = false;
    }
}
//Globál változók
//Alsó táblából való kép kiválasztás
/*function KepAttevo(){
    if(RanyomE2 == false){
        RanyomE2 = true;
        RanyomE3 = false;
    }
}*/
//Alap táblába való kép behelyezés
var ValuesArray = new Array();
function KepAtteves(div){
    if(RanyomE2 == false){
        var index = div.id;
        var kep = document.createElement("img");
        kep.src = "kartyak/"+cellak[KepIndex].kartya.id+".png";
        var AmiKellDiv = document.getElementById(index);
        AmiKellDiv.removeAttribute("onclick");
        var ValueCella = {};
        ValueCella.id = index;
        ValueCella.type = cellak[KepIndex].type;
        ValueCella.value = cellak[KepIndex].kartya.value;
        ValuesArray.push(ValueCella);
        var hely = document.getElementById(index);
        hely.appendChild(kep);
        var KivalasztoDiv = document.getElementById("KivalasztoDiv");
        var Kep2 = document.getElementById(-1);
        KivalasztoDiv.removeChild(Kep2);
        RanyomE2 = true;
        RanyomE = false;
        if(ValuesArray.length == 23){
            //console.log(ValuesArray);
            Kiszamolas();
        }
    }
}
//Sor Oszlop kiszámoló
function Kiszamolas(){
    console.log("---------Sor összegek---------");
    for(var i = 1; i < 24;i+=6){
        var db = 0;
        for(var j = 0; j < 6;j++){
            for(var k = 0; k < 23;k++){
                if(ValuesArray[k].id == (i+j) && ValuesArray[k].type == "kártya"){
                    db += ValuesArray[k].value;
                    break;
                }
            }
        }
        console.log((Math.floor((i/6))+1)+". sor: "+db);
    }
    console.log("---------Oszlop összegek---------");
    for(var i = 0; i < 6;i++){
        var db = 0;
        for(var j = 1; j < 24;j+=6){
            for(var k = 0; k < 23;k++){
                if(ValuesArray[k].id == (i+j) && ValuesArray[k].type == "kártya"){
                    db += ValuesArray[k].value;
                    break;
                }
            }
        }
        console.log((i+1)+". oszlop: "+db); 
    }
}
function Main()
{
    JatekterBetoltes();
    JatekterElrendezes();
    TablaGeneralas();
    CellakRandomizalasa();
    //eddig jó
}
Main();