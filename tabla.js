Logo();
var jatekTer = document.createElement("div");
jatekTer.id = "jatekter";
document.body.appendChild(jatekTer);

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
var CellaSzamlalo = 5; //Hány lerakott kártya van - Ez a kör váltáshoz nem működik
var KorSzamolo = 1;
var KorValtasDB = 0; //Kör váltáshoz a db számláló

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
    var KorokSorDiv = document.createElement("div");
    KorokSorDiv.id = "KorokSorDiv";
    for(let i = 0; i < 3;i++){
        var KorokDivek = document.createElement("div");
        KorokDivek.classList = "KorokDivek";
        KorokDivek.id = "K"+(i+1);
        KorokDivek.innerHTML = "<p>"+(i+1)+". Kör</p>";
        KorokSorDiv.appendChild(KorokDivek);
    }
    KorokBox.appendChild(KorokSorDiv);
}

function AlapPontokBox(){
    let PontokBox = document.getElementById("pontokbox");
    let PontokSorDiv = document.createElement("div");
    PontokSorDiv.id = "PontokSorDiv";
    let PontokDiv = document.createElement("div");
    PontokDiv.className = "PontokDiv";
    let Kep = document.createElement("img");
    Kep.src = "ermek/50.png";
    PontokDiv.appendChild(Kep   );
    PontokSorDiv.appendChild(PontokDiv);
    PontokBox.appendChild(PontokSorDiv);
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
            Objekt.id = Indexe;
            Objekt.value = VarLista[Indexe];
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
}

function kepKeszites(kartyaObjekt)
{
    ertekCheckDebug();
    var kep = document.createElement("img");
    if(kartyaObjekt.type == "vár")
    {
        kep.src= "bastyak/"+kartyaObjekt.value+".png";
    }
    else
    {
        kep.src = "kartyak/"+kartyaObjekt.kartya.id+".png";
    }
    return kep;
}
function ertekCheckDebug()
{
    //console.log(kivalasztottKartya);
    //console.log(kezLista);
    //console.log(varKeszletLista);
    //console.log(tablaKartyaLista);
    console.log(lerakottKartyaLista);
    //console.log(KorValtasDB);
}

function kepLerakas(div)
{
    //console.log(kivalasztottKartya);
    if(vanEkivalasztva == true)
    {
        //Kép generálás
        vanEkivalasztva = false;
        var kep = kepKeszites(kivalasztottKartya);
        div.removeAttribute("onclick");
        div.appendChild(kep);
        KorValtasDB++;
        //Kiválasztás törlés
        document.getElementById("KivalasztoDiv").removeChild(document.getElementById("KivalasztoDiv").firstChild);
        if(kivalasztottKartya.type == "kártya")
        {
            lerakottKartyaLista.splice(div.id,1,kivalasztottKartya);
            kezbenLevoKartyakSzama--;
        }
        else
        {
            lerakottKartyaLista.splice(div.id,1,kivalasztottKartya);
        }
        if(KorValtasDB ==30)
        {
            console.log("Tábla tele, következő kör");
            //ChildTorlesek();
            //KorKigyujt();
            Kiszamolas();
            vanEkivalasztva = false;
            CellaSzamlalo = 5;
            kezLista = new Array(5);
            hatterKartyaLepteto = 0;
            tablaKartyaLista = [];
            lerakottKartyaLista = new Array(30);
            KorValtasDB = 0;
            KorSzamolo++;
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
    if(vanEkivalasztva == false)
    {
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
            varKeszletLista.splice(index,1,undefined);
        }
    }
}
function huzas()
{
    if(vanEkivalasztva == false && CellaSzamlalo < 23 && kezbenLevoKartyakSzama<5){
        //Azért van ez külön mert most nem akardtam cseszekedeni hogy a kirajzolást használja itt is, mert ezzel nem kompatibilis
        var Kep = document.createElement("img");
        Kep.src = "kartyak/"+tablaKartyaLista[hatterKartyaLepteto].kartya.id+".png";
        let i = 0;
        while(kezLista[i]!=undefined)
        {
            i++;
        }
        var slot = document.getElementById("o"+i);
        Kep.setAttribute("onclick","kepFelveves("+i+",this,'kártya')");
        slot.appendChild(Kep);
        kezLista[i] = tablaKartyaLista[hatterKartyaLepteto];
        hatterKartyaLepteto++;
        kezbenLevoKartyakSzama++;
        CellaSzamlalo++;
    }
}

function KorKigyujt(){
    if(KorSzamolo < 4){
        if(KorSzamolo != 1){
            CellaSzamlalo = 0;
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
    document.getElementById("korokbox").removeChild(document.getElementById("korokbox").firstChild);
    document.getElementById("pontokbox").removeChild(document.getElementById("pontokbox").firstChild);
}

function Kiszamolas(){
    //Test íras
    let klista = lerakottKartyaLista;
    console.log(klista);
    for(let i = 1; i < klista.length;i += 6){
        let vdb = 0;
        let db = 0;
        for(let j = i; j < i+6;j++){
            SarkanyVanE(i);
            if(klista[j].type != "vár" && KartyakTag[klista[j].id -1].sign != 'hegy'){
                if(KartyakTag[klista[j].id -1].sign == 'taliga'){
                    vdb += 2;
                }
                else if(KartyakTag[klista[j].id -1].sign == 'pap'){
                    if(j-1 > -1 && klista[j-1].type == "vár"){
                        vdb += 1;
                    }
                    else if(j+1 < 31 && klista[j+1].type == "vár"){
                        vdb += 1;
                    }
                    else if(j-6 > -1 &&klista[j-6].type == "vár"){
                        vdb += 1;
                    }
                    else if(j+6 < 31 && klista[j+6].type == "vár"){
                        vdb += 1;
                    } 
                }
                else{
                    db += klista[j].kartya.value;
                }
            }
            else if(klista[j].type == "vár"){
                vdb += klista[j].value;
            }
        }
        var SorOsszeg = 0;
        if(vdb != 0){
            SorOsszeg = db*vdb;
        }
        else{
            SorOsszeg = db;
        }
        console.log("Sor összeg: ",SorOsszeg);
    }
}

function SarkanyVanE(index){
    for(let i = index; i < index+6; i++){
        if(lerakottKartyaLista[i].type != "vár" && KartyakTag[lerakottKartyaLista[i].id-1].sign == 'sárkány'){
            for(let k = index; k < index+6;k++){
                if(lerakottKartyaLista[k].kartya.value > 0)
                lerakottKartyaLista[k] = undefined;
            }
        }
        break;
    }
}

function Logo(){
    let Kep = document.createElement("img");
    let KepDiv = document.createElement("div");
    KepDiv.id = "LogoDiv";
    Kep.src = "Logo.png";
    Kep.id = "Logo";
    KepDiv.appendChild(Kep);
    document.body.appendChild(KepDiv);
}

function Main()
{
    JatekterBetoltes();
    JatekterElrendezes();
    AlapPontokBox();
    KorKigyujt();
}
Main();