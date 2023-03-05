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

var tablaKartyaLista = []; //Ki generált DE még nem lerakott kártyák (pakli)
var lerakottKartyaLista = new Array(30); //Lerakott
var kezLista = new Array(5);
var kezbenLevoKartyakSzama = 5;
var varKeszletLista = []; //A bal lent lévő várak listája
var kivalasztottKartya;
var CellaSzamlalo = 5; //Hány lerakott kártya van
var KorSzamolo = 1;

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
            oszlopDiv.setAttribute("onclick","kepLerakas(this)");
            sorDiv.appendChild(oszlopDiv);
            oszlopDiv.id = k++;
        }
        tabla.appendChild(sorDiv);
    }
    var KartyaBox = document.getElementById("kartyabox");
    var Kep = document.createElement("img");
    Kep.src = "kartyaamikell.png";
    Kep.setAttribute("onclick","huzas()");
    Kep.id = "KartyabBoxKepHover";
    KartyaBox.appendChild(Kep);
    //KorokBoxGen();
}

function KorokBoxGen(){
    var KorokBox = document.getElementById("korokbox");
    for(let i = 0; i < 3;i++){
        var KorokDivek = document.createElement("div");
        KorokDivek.classList = "KorokDivek";
        KorokDivek.id = "K"+(i+1);
        KorokDivek.innerHTML = "<p>"+(i+1)+". Kör</p>";
        KorokBox.appendChild(KorokDivek);
    }
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
    elsoOtKepKirakas();
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
            var Kep = document.createElement("img");
            Kep.setAttribute("onclick","kepFelveves("+Indexe+",this,'vár')");
            Kep.id = "v"+Indexe;
            let Objekt = {};
            Objekt.id = VarLista[Indexe];
            Objekt.value = 0;
            Objekt.type = "vár";
            varKeszletLista.push(Objekt);
            Kep.src = "bastyak/"+VarLista[Indexe++]+".png";
            KiGenVarDivek.appendChild(Kep);
            VarakKiGensor.appendChild(KiGenVarDivek);
        }
        VarDiv.appendChild(VarakKiGensor);
    }
}

var VarIndex;
function KiGenVarAttesz(img){
    VarIndex = img.id;
    RanyomE = true;
}

function elsoOtKepKirakas(){
    var OtosLapok= document.getElementById("OtosLapok");
    for(let i = 0; i < 5; i++){
        kezLista[i] = tablaKartyaLista[hatterKartyaLepteto];
        var LapDivek = document.createElement("div");
        LapDivek.className = "LapDivek";
        LapDivek.id = "o"+i;
        var Lapok = document.createElement("img");
        Lapok.src = "kartyak/"+tablaKartyaLista[hatterKartyaLepteto].kartya.id+".png";
        hatterKartyaLepteto++;
        Lapok.setAttribute("onclick","kepFelveves("+i+",this,'kártya')");
        LapDivek.appendChild(Lapok);
        OtosLapok.appendChild(LapDivek);
    }   
}

var vanEkivalasztva = false;
/*function OtoskepAttevo(img){
    if(CellaIndex > 4 && CellaSzamlalo != 30){
        CellaIndex2 = CellaIndex;
    }
    CellaIndex = Math.abs(img.id)-2;
    RanyomE = true;
}*/

function CellakRandomizalasa(){
    //Kártya tagek randomizálása
    tablaKartyaLista = [];
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
        tablaKartyaLista.push(cella);
    }
    console.log(tablaKartyaLista);
}

/*function RandomKivalaszt(){
    if(RanyomE == false && VarIndex == 0 && CellaSzamlalo < 30){
        var Kep = document.createElement("img");
        Kep.id = -1;
        Kep.src = "kartyak/"+cellak[CellaIndex].kartya.id+".png";
        document.getElementById("KivalasztoDiv").appendChild(Kep);
        RanyomE = true;
    }
}*/
function kepKeszites(kartyaObjekt)
{
    var kep = document.createElement("img");
    console.log(kartyaObjekt);
    if(kartyaObjekt.type == "vár")
    {
        kep.src= "bastyak/"+kartyaObjekt.id+".png";
    }
    else
    {
        kep.src = "kartyak/"+kartyaObjekt.kartya.id+".png";
    }
    return kep;
}

function kepLerakas(div)
{
    console.log(kivalasztottKartya);
    var mentes = kivalasztottKartya;//Valamiért szarakodik
    if(vanEkivalasztva == true)
    {
        //Kép generálás
        vanEkivalasztva = false;
        var kep = kepKeszites(mentes);
        div.appendChild(kep);
        //Kiválasztás törlés
        document.getElementById("KivalasztoDiv").removeChild(document.getElementById("KivalasztoDiv").firstChild);
        lerakottKartyaLista.splice(div.id);
        kezbenLevoKartyakSzama--;
        if(CellaSzamlalo==30)
        {
            console.log("Tábla tele, következő kör");
            ChildTorlesek();
            KorKigyujt();
            vanEkivalasztva = false;
            CellaSzamlalo = 5;
            kezLista = new Array(5);
            hatterKartyaLepteto = 0;
            tablaKartyaLista = [];
            lerakottKartyaLista = new Array(30);
        }
        kivalasztottKartya = undefined;
    }
    else
    {
        console.log("Még nincs kiválsztva kártya"); 
    }
}
var hatterKartyaLepteto = 0;
function kepFelveves(index,kep,fajta)
{
    if(document.getElementById("KivalasztoDiv").firstChild == undefined){
        kep.removeAttribute("onclick");
        vanEkivalasztva = true;
        var div = document.getElementById("KivalasztoDiv");
        div.appendChild(kep);
        if(fajta != "vár")
        {
            kivalasztottKartya = kezLista[index];
            kezLista.splice(index,1,undefined);
        }
        else
        {
            kivalasztottKartya = varKeszletLista[index];
            kezLista.splice(index,1);
        }
    }
}
function huzas()
{
    console.log(CellaSzamlalo);
    if(vanEkivalasztva == false && CellaSzamlalo < 23 && kezbenLevoKartyakSzama<5){
        //Azért van ez külön mert most nem akardtam cseszekedeni hogy a kirajzolást használja itt is, mert ezzel nem kompatibilis
        var Kep = document.createElement("img");
        Kep.src = "kartyak/"+tablaKartyaLista[hatterKartyaLepteto].kartya.id+".png";
        let i = 0;
        while(kezLista[i]!=undefined)
        {
            i++;
        }
        console.log(i);
        var slot = document.getElementById("o"+i);
        Kep.setAttribute("onclick","kepFelveves("+i+",this,'kártya')");
        slot.appendChild(Kep);
        kezLista[i] = tablaKartyaLista[hatterKartyaLepteto];
        hatterKartyaLepteto++;
        kezbenLevoKartyakSzama++;
        CellaSzamlalo++;
    }
}
//Boccs hogy kikommenteztem, úgy voltam vele hogy inkább átszedtem onnan azokat a részeket amik jók voltak, és akkor az indexeléseket így könnyeben köré tudtam írni
/*
var LapDivIndex = -10;
var LapIndex = -2;
function KepAtteves(div){
    if(RanyomE == true && VarIndex == 0 && CellaSzamlalo < 30){
        var index = div.id;
        var kep = document.createElement("img");
        kep.src = "kartyak/"+cellak[CellaIndex].kartya.id+".png";
        document.getElementById(index).removeAttribute("onclick");
        document.getElementById(index).appendChild(kep);
        if(CellaIndex > 4){
            document.getElementById("KivalasztoDiv").removeChild(document.getElementById(-1));
            CellaIndex++;
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
        }
        if(CellaIndex == 23){
            document.getElementById("KartyabBoxKepHover").removeAttribute("onclick");
            document.getElementById("KartyabBoxKepHover").id = "";
            CellaIndex = 0;
        }
        CellaSzamlalo++;
    }
    else if(RanyomE == true && VarIndex != 0 && CellaSzamlalo != 30){
        var index = div.id;
        var kep = document.createElement("img");
        kep.src = "bastyak/"+VarLista[VarIndex-1]+".png";
        document.getElementById(index).removeAttribute("onclick");
        document.getElementById(index).appendChild(kep);
        document.getElementById(VarIndex+200).removeChild(document.getElementById(VarIndex+100));
        RanyomE = false;
        VarIndex = 0;
        CellaSzamlalo++;
    }
    if(document.getElementById(-1) != undefined){
        RanyomE = true;
    }
    else{
        RanyomE = false;
    }
    VarIndex = 0;
    if(CellaSzamlalo == 30){
        ChildTorlesek();
        KorKigyujt();
        CellaIndex = 5;
        CellaIndex2 = 0;
        RanyomE = false;
    }
}*/
function KorKigyujt(){
    JatekterBetoltes();
    JatekterElrendezes();
    if(KorSzamolo != 4){
        if(KorSzamolo != 1){
            CellaSzamlalo = 0;
            Kiszamolas();
            KorGen();
        }
        else{
            KorGen();
        }
    }
    else{
        KorGen();
        ChildTorlesek();
    }
}

function KorGen(){
    TablaGeneralas();
    CellakRandomizalasa();
    KozosDivek();
    KorokBoxGen();
    var KorokBoxDiv = document.getElementById("K"+KorSzamolo++);
    KorokBoxDiv.className += " KoredikErtek";
}

function ChildTorlesek(){
    document.getElementById("kartyabox").removeChild(document.getElementById("kartyabox").firstChild);
    for(let i = 0; i < 5; i++){
        document.getElementById("tabla").removeChild(document.getElementById("tabla").firstChild);
    }
    document.body.removeChild(document.getElementById("KozosDiv"));
    for(let i = 0; i < 3; i++){
        document.getElementById("korokbox").removeChild(document.getElementById("korokbox").firstChild);
    }
}

function Kiszamolas(){
    console.log("Sor-Oszlop kiszámolás");
    //Ezt még meg kell írni
}

function Main()
{
    KorKigyujt();
}
Main();