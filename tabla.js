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
    CellakRandomizalasa();
    KozosDivek();
}

function KozosDivek(){
    var KozosDiv = document.createElement("div");
    KozosDiv.id = "KozosDiv";
    var VarDiv = document.createElement("div");
    VarDiv.id = "VarDiv";
    KozosDiv.appendChild(VarDiv);
    var KivalasztoDiv = document.createElement("div");
    KivalasztoDiv.id = "KivalasztoDiv";
    KozosDiv.appendChild(KivalasztoDiv);
    document.body.appendChild(KozosDiv);
    var OtosLapok= document.createElement("div");
    OtosLapok.id = "OtosLapok";
    KozosDiv.appendChild(OtosLapok);
    OtosKepKiGen();
    VarakGen();
}

var VarLista = [1,1,1,1,2,2,2,3,3,4];
function VarakGen(){
    var Indexe = 0;
    var VarDiv = document.getElementById("VarDiv");
    for(var i = 1; i < 3;i++){
        var VarakKiGensor = document.createElement("div");
        VarakKiGensor.className = "VarakKiGensor";
        for(var j = 0; j < 5;j++){
            var KiGenVarDivek = document.createElement("div");
            KiGenVarDivek.className= "KiGenVarDivek";
            KiGenVarDivek.id = (Indexe+1)+200;
            var Kep = document.createElement("img");
            Kep.id = (Indexe+1)+100;
            Kep.src = "bastyak/"+VarLista[Indexe++]+".png";
            Kep.setAttribute("onclick","KiGenVarAttesz(this)");
            KiGenVarDivek.appendChild(Kep);
            VarakKiGensor.appendChild(KiGenVarDivek);
        }
        VarDiv.appendChild(VarakKiGensor);
    }
}

var VarIndex = 0;
function KiGenVarAttesz(img){
    VarIndex = img.id-100;
    RanyomE = true;
}

function OtosKepKiGen(){
    var OtosLapok= document.getElementById("OtosLapok");
    for(let i = 0; i < 5; i++){
        var LapDivek = document.createElement("div");
        LapDivek.className = "LapDivek";
        LapDivek.id = -i-10;
        var Lapok = document.createElement("img");
        Lapok.src = "kartyak/"+cellak[i].kartya.id+".png";
        Lapok.id = -i-2;
        Lapok.setAttribute("onclick","OtoskepAttevo(this)");
        LapDivek.appendChild(Lapok);
        OtosLapok.appendChild(LapDivek);
    }
}

var RanyomE = false;
var CellaIndex = 5;
var CellaIndex2 = 0;
function OtoskepAttevo(img){
    if(CellaIndex > 4){
        CellaIndex2 = CellaIndex;
    }
    CellaIndex = Math.abs(img.id)-2;
    RanyomE = true;
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
    console.log(cellak);
}

function RandomKivalaszt(){
    if(RanyomE == false && CellaIndex != 23 && VarIndex == 0){
        RanyomE = true;
        var Kep = document.createElement("img");
        Kep.id = -1;
        Kep.src = "kartyak/"+cellak[CellaIndex].kartya.id+".png";
        document.getElementById("KivalasztoDiv").appendChild(Kep);
    }
}

var LapDivIndex = -10;
var LapIndex = -2;
function KepAtteves(div){
    if(RanyomE == true && CellaIndex != 23 && VarIndex == 0){
        var index = div.id;
        var kep = document.createElement("img");
        kep.src = "kartyak/"+cellak[CellaIndex].kartya.id+".png";
        document.getElementById(index).removeAttribute("onclick");
        document.getElementById(index).appendChild(kep);
        if(CellaIndex > 4){
            document.getElementById("KivalasztoDiv").removeChild(document.getElementById(-1));
        }
        else{
            document.getElementById(LapDivIndex-CellaIndex).removeChild(document.getElementById(LapIndex-CellaIndex));
            if(CellaIndex2 > 4){
                CellaIndex = CellaIndex2;
                CellaIndex2 = 0;
            }
            else{
                CellaIndex = 5;
            }
            RanyomE = true;
        }
        if(document.getElementById(-1) != undefined){
            RanyomE = true;
        }
        else{
            RanyomE = false;
            if(CellaIndex > 4){
                CellaIndex++;
            }
        }
        if(CellaIndex == 23){
            document.getElementById("KartyabBoxKepHover").id = "";
        }
    }
    else if(RanyomE == true && CellaIndex != 23 && VarIndex != 0){
        var index = div.id;
        var kep = document.createElement("img");
        kep.src = "bastyak/"+VarLista[VarIndex-1]+".png";
        document.getElementById(index).removeAttribute("onclick");
        document.getElementById(index).appendChild(kep);
        document.getElementById(VarIndex+200).removeChild(document.getElementById(VarIndex+100));
        RanyomE = false;
        VarIndex = 0;
    }
    if(document.getElementById(-1) != undefined){
        RanyomE = true;
    }
    else{
        RanyomE = false;
        if(CellaIndex > 4){
            CellaIndex++;
        }
    }
}


function Main()
{
    JatekterBetoltes();
    JatekterElrendezes();
    TablaGeneralas();
    //eddig jó
}
Main();