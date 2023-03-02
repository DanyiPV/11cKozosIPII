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
    Kep.src = "lekartya.png";
    Kep.setAttribute("onclick","RandomKivalaszt()");
    Kep.id = "KartyabBoxKepHover";
    KartyaBox.appendChild(Kep);
    var KivalasztoDiv = document.createElement("div");
    KivalasztoDiv.id = "KivalasztoDiv";
    document.body.appendChild(KivalasztoDiv);
    CellakRandomizalasa();
}

function CellakRandomizalasa(){
    //Kártya tagek randomizálása
    var rlista = new Array();
    for(let i = 0; i< 23;i++)
    {
        var random = Math.floor(Math.random()*23);
        while(rlista.includes(random)){
            random = Math.floor(Math.random()*23);
        }
        rlista.push(random);
        var cella = {id: random+1};
        cella.type = "kártya";
        cella.kartya = KartyakTag[random];
        cellak.push(cella);
    }
    //Vár tagek randomizálása
    /*for(let i = 0; i< 16;i++)
    {
        var cella = {id: i+24};
        cella.type = "vár";
        cella.kartya = VarTag[i];
        cellak.push(cella);
    }*/
    console.log(cellak);
}

var RanyomE = false;
var CellaIndex = 0;
var RanyomE2 = true;
function RandomKivalaszt(){
    if(RanyomE == false && CellaIndex != 23){   
        RanyomE = true;
        var Kep = document.createElement("img");
        Kep.id = -1;
        Kep.src = "kartyak/"+cellak[CellaIndex].kartya.id+".png";
        var KivalasztoDiv = document.getElementById("KivalasztoDiv").appendChild(Kep);
        RanyomE2 = false;
    }
}
//Globál változók
//Alsó táblába való kép behelyezés
var ValuesArray = new Array();
function KepAtteves(div){
    if(RanyomE2 == false && CellaIndex != 23){
        var index = div.id;
        var kep = document.createElement("img");
        kep.src = "kartyak/"+cellak[CellaIndex].kartya.id+".png";
        var AmiKellDiv = document.getElementById(index).removeAttribute("onclick");
        var ValueCella = {};
        ValueCella.id = index;
        ValueCella.type = cellak[CellaIndex].type;
        ValueCella.value = cellak[CellaIndex].kartya.value;
        ValuesArray.push(ValueCella);
        var hely = document.getElementById(index).appendChild(kep);
        var KivalasztoDiv = document.getElementById("KivalasztoDiv").removeChild(document.getElementById(-1));
        RanyomE2 = true;
        RanyomE = false;
        CellaIndex++;
        if(CellaIndex == 23){
            document.getElementById("KartyabBoxKepHover").id = "";
        }
    }
}
//Sor Oszlop kiszámoló
/*function Kiszamolas(){
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
}*/

function Main()
{
    JatekterBetoltes();
    JatekterElrendezes();
    TablaGeneralas();
    //eddig jó
}
Main();