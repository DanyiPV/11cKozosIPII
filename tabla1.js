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

    kartyaBox.innerHTML = "kartyaBox";
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
}

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
}

function CellakRandomizalasa(){
    //Kártya tagek randomizálása
    for(let i = 0; i< 23;i++)
    {
        var random = Math.floor(Math.random()*30);
        while(benneVanE(random+1,cellak)) {
            random = Math.floor(Math.random()*30);
        }
        var cella = {id: random+1};
        cella.type = "kártya";
        cella.kartya = KartyakTag[i];
        cellak.splice(i,1,cella);
    }
    var rklista = [];
    //Vár tagek randomizálása
    for(let i = 0; i< 7;i++)
    {
        random = Math.floor(Math.random()*30);
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
        cellak.splice(23+i,1,cella);
    }
    console.log(cellak);
    KepKivalaszto();
    //Táblába helyezés
    for(let i = 0; i< 30;i++)
    {
        var hely2 = document.getElementById(cellak[i].id+30);
        var kep = document.createElement("img");
        if(cellak[i].type=="kártya")
        {
            kep.src = "kartyak/"+cellak[i].kartya.id+".png";
            //kep.title = cellak[i].id;
        }
        else
        {
            kep.src = "bastyak/"+cellak[i].kartya.id+".png";
            //kep.title = cellak[i].id;
        }
        //kep.setAttribute("onclick","KepAttevo(this)");
        hely2.appendChild(kep);
    }
    Kiszamolas();
}
function Kiszamolas(){
    for(var i = 1; i < 31;i+=6){
        var db = 0;
        for(var j = 0; j < 6;j++){
            for(var k = 0; k < 30;k++){
                if(cellak[k].id == (i+j) && cellak[k].type == "kártya"){
                    db += cellak[k].kartya.value;
                    break;
                }
            }
        }
        console.log((Math.floor((i/6))+1)+". sor: "+db);
    }
    for(var i = 0; i < 6;i++){
        var db = 0;
        for(var j = 1; j < 31;j+=6){
            for(var k = 0; k < 30;k++){
                if(cellak[k].id == (i+j) && cellak[k].type == "kártya"){
                    db += cellak[k].kartya.value;
                    break;
                }
            }
        }
        console.log((i+1)+". oszlop: "+db); 
    }
}
function KepKivalaszto(){
    var Kivalaszto = document.createElement("div");
    Kivalaszto.id = "Kivalaszto";
    document.body.appendChild(Kivalaszto);
    var k = 31;
    for(var i = 0; i < 5; i++)
    {
        var sorDiv = document.createElement("div");
        sorDiv.classList += "MSordiv";
        for(var j = 0; j<6;j++)
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
var indexlista = new Array();
var RanyomE = false;
var KartyaIndex = 0;
var RanyomE2 = false;
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
        }
    }
}
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
        var hely = document.getElementById(index);
        hely.appendChild(kep);
        RanyomE = false;
        RanyomE2 = true;
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