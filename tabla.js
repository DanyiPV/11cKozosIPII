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
{id:6,value:0,sign:'hegy'},
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
var kezLista = new Array(1);
var varKeszletLista = []; //A bal lent lévő várak listája
var kivalasztottKartya;
var CellaSzamlalo = 5; //Hány lerakott kártya van - Ez a kör váltáshoz nem működik
var KorSzamolo = 1;
var KorValtasDB = 0; //Kör váltáshoz a db számláló
var ErmekLista = new Array(); //érmék tárolásához való lista
var TeljesDB = 0; //Érmék teljes összege
var hatterKartyaLepteto = 0; //Háttérben a kártyát lépteti
var VarLista = [1,1,1,1,1,1,1,2,2,2,2,2,2,3,3,3,3,3,4,4];
var vanEkivalasztva = false;
var VarDB = 0; //Körönként csak 7 várat lehet letenni
var KartyaDB = 0; //Kártya lerakás számolás, hogy az id-t le tudjam venni

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
}

function KorokBoxGen(){
    let KorokBox = document.getElementById("korokbox");
    let KorokSorDiv = document.createElement("div");
    KorokSorDiv.id = "KorokSorDiv";
    for(let i = 0; i < 3;i++){
        let KorokDivek = document.createElement("div");
        KorokDivek.classList = "KorokDivek";
        KorokDivek.id = "K"+(i+1);
        KorokDivek.innerHTML = "<p>"+(i+1)+". Kör</p>";
        KorokSorDiv.appendChild(KorokDivek);
    }
    KorokBox.appendChild(KorokSorDiv);
}

function AlapPontokBox(){
    let ErmeID = 0;
    let PontokBox = document.getElementById("pontokbox");
    for(let i = 0; i < 4;i++){
        var PontokSorDiv = document.createElement("div");
        PontokSorDiv.className = "PontokSorDiv"
        for(let j = 0; j < 8;j++){
            let PontokDiv = document.createElement("div");
            PontokDiv.id = "P"+ErmeID++;
            let Kep = document.createElement("img")
            if(i == 0 && j == 0){
                Kep.src = "ermek/50.png";
                ErmekLista.push(50);
            }
            PontokDiv.className = "PontokDiv";
            PontokDiv.appendChild(Kep);
            PontokSorDiv.appendChild(PontokDiv);
        }
        PontokBox.appendChild(PontokSorDiv);
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
    elsoKepKirakas();
    VarakGen();
}

function VarakGen(){
    var Indexe = 0;
    var VarDiv = document.getElementById("VarDiv");
    for(var i = 0; i < 2;i++){
        var VarakKiGensor = document.createElement("div");
        VarakKiGensor.className = "VarakKiGensor";
        for(var j = 0; j < 10;j++){
            var KiGenVarDivek = document.createElement("div");
            KiGenVarDivek.className= "KiGenVarDivek";
            KiGenVarDivek.id = "KGV"+Indexe;
            //var Kep = document.createElement("img");
            //Kep.setAttribute("onclick","kepFelveves("+Indexe+",this,'vár')");
            //Kep.id = "v"+Indexe;
            let Objekt = {};
            Objekt.id = Indexe;
            Objekt.value = VarLista[Indexe++];
            Objekt.type = "vár";
            varKeszletLista.push(Objekt);
            //Kep.src = "bastyak/"+VarLista[Indexe++]+".png";
            //KiGenVarDivek.appendChild(Kep);
            VarakKiGensor.appendChild(KiGenVarDivek);
        }
        VarDiv.appendChild(VarakKiGensor);
    }
    for(let i = 0; i < 7;i++){
        VarLista[i] = 1;
    }
    VarakGenKepKigeneralas();
}

function VarakGenKepKigeneralas(){
    for(let i = 0; i < VarLista.length;i++){
        if(VarLista[i] != 0){
            let Kep = document.createElement("img");
            Kep.setAttribute("onclick","kepFelveves("+i+",this,'vár')");
            Kep.id = "v"+i;
            Kep.src = "bastyak/"+VarLista[i]+".png";
            document.getElementById("KGV"+i).appendChild(Kep);
        }
    }
}

function elsoKepKirakas(){
    var OtosLapok= document.getElementById("OtosLapok");
    kezLista[0] = tablaKartyaLista[hatterKartyaLepteto];
    var LapDivek = document.createElement("div");
    LapDivek.className = "LapDivek";
    LapDivek.id = "o"+0;
    var Lapok = document.createElement("img");
    Lapok.src = "kartyak/"+tablaKartyaLista[hatterKartyaLepteto++].kartya.id+".png";
    Lapok.setAttribute("onclick","kepFelveves("+0+",this,'kártya')");
    LapDivek.appendChild(Lapok);
    OtosLapok.appendChild(LapDivek);
}

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
    //ertekCheckDebug();
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
            lerakottKartyaLista.splice(div.id-1,1,kivalasztottKartya);
            KartyaDB++;
        }
        else
        {
            lerakottKartyaLista.splice(div.id-1,1,kivalasztottKartya);
        }
        if(KorValtasDB == 30)
        {
            console.log("Tábla tele, következő kör");
            Kiszamolas();
            KorKigyujt();
        }
        kivalasztottKartya = undefined;
        if(KartyaDB == 23){
            document.getElementById("kartyabox").firstChild.id = "";
        }
    }
    else
    {
        console.log("Még nincs kiválsztva kártya"); 
    }
}

function kepFelveves(index,kep,fajta)
{
    let kigyulte = false;
    if(fajta == "vár" && VarDB == 7){
        kigyulte = true;
    }
    if(vanEkivalasztva == false && kigyulte == false)
    {
        kep.removeAttribute("onclick");
        vanEkivalasztva = true;
        var div = document.getElementById("KivalasztoDiv");
        div.appendChild(kep);
        if(fajta == "vár"){
            let objekt = {};
            objekt.id = VarTag[VarLista[index]-1].id;
            objekt.value = VarTag[VarLista[index]-1].value;
            objekt.type = "vár";
            kivalasztottKartya = objekt;
            VarLista[index] = 0;
            VarDB++;
        }
        else{
            kivalasztottKartya = tablaKartyaLista[0];
        }
        kezLista = new Array(1); 
    }
}

function huzas()
{
    if(vanEkivalasztva == false && hatterKartyaLepteto != tablaKartyaLista.length){
        //Azért van ez külön mert most nem akardtam cseszekedeni hogy a kirajzolást használja itt is, mert ezzel nem kompatibilis
        var Kep = document.createElement("img");
        Kep.src = "kartyak/"+tablaKartyaLista[hatterKartyaLepteto].kartya.id+".png";
        var slot = document.getElementById("KivalasztoDiv");
        slot.appendChild(Kep);
        vanEkivalasztva = true;
        kivalasztottKartya = tablaKartyaLista[hatterKartyaLepteto];
        hatterKartyaLepteto++;
        CellaSzamlalo++;
    }
}

function KorKigyujt(){
    if(KorSzamolo < 4){
        if(KorSzamolo != 1){
            CellaSzamlalo = 0;
            vanEkivalasztva = false;
            CellaSzamlalo = 5;
            kezLista = new Array(1);
            hatterKartyaLepteto = 0;
            tablaKartyaLista = [];
            lerakottKartyaLista = new Array(30);
            KorValtasDB = 0;
            VarDB = 0;
            KartyaDB = 0;
            ChildTorlesek();
            JatekterBetoltes();
            JatekterElrendezes();
            KorGen();
        }
        else{
            KorGen();
        }
    }
    else{
        let KorokBoxDiv = document.getElementById("K"+3);
        KorokBoxDiv.className += " VKoredik";
        KorokBoxDiv = document.getElementById("K"+2);
        KorokBoxDiv.className += " VKoredik";
        KorokBoxDiv = document.getElementById("K"+1);
        KorokBoxDiv.className += " VKoredik";
        VegKiiratas();
    }
}

function KorGen(){
    TablaGeneralas();
    CellakRandomizalasa();
    KozosDivek();
    KorokBoxGen();
    let KorokBoxDiv = document.getElementById("K"+(KorSzamolo));
    KorokBoxDiv.className += " KoredikErtek";
    if(KorSzamolo == 2){
        KorokBoxDiv = document.getElementById("K"+1);
        KorokBoxDiv.className += " VKoredik";
    }
    else if(KorSzamolo == 3){
        KorokBoxDiv = document.getElementById("K"+1);
        KorokBoxDiv.className += " VKoredik";
        KorokBoxDiv = document.getElementById("K"+2);
        KorokBoxDiv.className += " VKoredik";
    }
    KorSzamolo++;
}

function ChildTorlesek(){
    document.getElementById("kartyabox").removeChild(document.getElementById("kartyabox").firstChild);
    for(let i = 0; i < 5; i++){
        document.getElementById("tabla").removeChild(document.getElementById("tabla").firstChild);
    }
    document.body.removeChild(document.getElementById("KozosDiv"));
    document.getElementById("korokbox").removeChild(document.getElementById("korokbox").firstChild);
    document.getElementById("balpanel").removeChild(document.getElementById("balpanel").firstChild);
}

function Kiszamolas(){
    //Test íras
    let klista = lerakottKartyaLista;
    //HegyLeSzamolas();
    PapVarNov();
    Taliga();
    SarkanyVanE();
    for(let i = 0; i < klista.length;i += 6){
        let vdb = 0; //Vár darab
        let db = 0; //Kártya darab
        for(let j = i; j < i+6;j++){
            if(klista[j].type != "vár" && klista[j].sign != 'hegy'){
                    db += klista[j].kartya.value;
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
        //console.log("Sor összeg: ",SorOsszeg);
        TeljesDB += SorOsszeg;
    }
    for(let i = 0; i < 6;i++){
        let vdb = 0; //Vár darab
        let db = 0; //Kártya darab
        for(let j = i; j < klista.length;j += 6){
            if(klista[j].type != "vár" && klista[j].sign != 'hegy'){
                    db += klista[j].kartya.value;
            }
            else if(klista[j].type == "vár"){
                vdb += klista[j].value;
            }
        }
        var OszlopOsszeg = 0;
        if(vdb != 0){
            OszlopOsszeg = db*vdb;
        }
        else{
            OszlopOsszeg = db;
        }
        //console.log("OSzlop összeg: ",OszlopOsszeg);
        TeljesDB += OszlopOsszeg;
    }
    //console.log(lerakottKartyaLista);
    //console.log("A teljes összeg: "+TeljesDB);
    ErmekLeszamolsa(TeljesDB, false);
}

function SarkanyVanE(){
    //sor
    let igaze = false;
    let index = 0;
    for(let i = 0; i < lerakottKartyaLista.length; i+=6){
        for(let j = i; j < i+6; j++){
            if(lerakottKartyaLista[j].type == "kártya" && lerakottKartyaLista[j].kartya.sign == 'sárkány'){
                index = i;
                igaze = true;
            }
        }
    }
    if(igaze == true){
        for(let i = index; i < index+6;i++){
            if(lerakottKartyaLista[i].type == "kártya" && lerakottKartyaLista[i].kartya.value > 0){
                lerakottKartyaLista[i].kartya.value = 0;
            }
        }
    }
    //oszlop
    igaze = false;
    index = 0;
    for(let i = 0; i < lerakottKartyaLista.length/5; i++){
        for(let j = i; j < lerakottKartyaLista.length; j += 6){
            if(lerakottKartyaLista[j].type == "kártya" && lerakottKartyaLista[j].kartya.sign == 'sárkány'){
                index = i;
                igaze = true;
            }
        }
    }
    if(igaze == true){
        for(let i = index; i < lerakottKartyaLista.length;i+=6){
            if(lerakottKartyaLista[i].type == "kártya" && lerakottKartyaLista[i].kartya.value > 0){
                lerakottKartyaLista[i].kartya.value = 0;
            }
        }
    }
}

function PapVarNov(){
    for(let i = 0; i < lerakottKartyaLista.length;i++){
        if(lerakottKartyaLista[i].type == "kártya" && lerakottKartyaLista[i].kartya.sign == 'pap'){
            if(i-1 > -1 && lerakottKartyaLista[i-1].type != undefined && lerakottKartyaLista[i-1].type == "vár"){
                lerakottKartyaLista[i-1].value++;
            }
            else if(i+1 < 31 && lerakottKartyaLista[i-1].type != undefined && lerakottKartyaLista[i+1].type == "vár"){
                lerakottKartyaLista[i+1].value++;
            }
            else if(i-6 > -1 && lerakottKartyaLista[i-1].type != undefined &&lerakottKartyaLista[i-6].type == "vár"){
                lerakottKartyaLista[i-6].value++;
            }
            else if(i+6 < 31 && lerakottKartyaLista[i-1].type != undefined &&lerakottKartyaLista[i+6].type == "vár"){
                lerakottKartyaLista[i+6].value++;
            } 
        }
    }
}

function Taliga(){
    //sor
    let index = 0;
    let igaze = false;
    for(let i = 0; i < lerakottKartyaLista.length; i+=6){
        for(let j = i; j < i+6; j++){
            if(lerakottKartyaLista[j].type == "kártya" && lerakottKartyaLista[j].kartya.sign == "taliga"){
                index = i;
                igaze = true;
            }
        }
    }
    if(igaze == true){
        for(let i = index; i < index+6;i++){
            if(lerakottKartyaLista[i].type == "kártya"){
                lerakottKartyaLista[i].kartya.value = lerakottKartyaLista[i].kartya.value*2;
            }
        }
    }
    //oszlop
    index = 0;
    igaze = false;
    for(let i = 0; i < 6; i++){
        for(let j = i; j < lerakottKartyaLista.length; j += 6){
            index = i;
            igaze = true;
        }
    }
    if(igaze == true){
        for(let i = index; i < lerakottKartyaLista.length;i += 6)
        if(lerakottKartyaLista[i].type == "kártya"){
            lerakottKartyaLista[i].kartya.value = lerakottKartyaLista[i].kartya.value*2;
        }
    }
}

function ErmekLeszamolsa(db, igaze){
    if(igaze == false){
        let szazasok = Math.floor(db / 100);
        let otvenesek =  Math.floor((db % 100) / 50);
        let tizesek =  Math.floor(((db % 100) % 50) / 10);
        let otosok =  Math.floor((((db % 100) % 50) % 10) /5);
        let egyesek =  Math.floor((((db % 100) % 50) % 10) % 5);
        if(db > -1){
            for(let i = 0; i < szazasok; i++){
                ErmekLista.push(100);
            }
            for(let i = 0; i < otvenesek; i++){
                ErmekLista.push(50);
            }
            for(let i = 0; i < tizesek; i++){
                ErmekLista.push(10);
            }
            for(let i = 0; i < otosok; i++){
                ErmekLista.push(5);
            }
            for(let i = 0; i < egyesek; i++){
                ErmekLista.push(1);
            }
            //console.log("Százasok: "+szazasok+"\nÖtvensek: "+otvenesek+"\nTizesek: "+tizesek+"\nÖtösök: "+otosok+"\nEgyesek: "+egyesek);
        }
        else{
            let listaosszeg = 0;
            for(let i = 0; i < ErmekLista.length;i++){
                listaosszeg += ErmekLista[i];
            }
            ErmekLeszamolsa(listaosszeg, true);
        }
    }
    else{
        let vegosszeg = TeljesDB + db;
        if(vegosszeg < 0){
            for(let i = 0; i < ErmekLista.length;i++){
                document.getElementById("P"+i).removeChild(document.getElementById("P"+i).firstChild);
            }
            TeljesDB = 0;
            ErmekLista = new Array();
        }
        else{
            ErmekLista = new Array();
            ErmekLeszamolsa(vegosszeg, false);
        }
    }
    if(ErmekLista.length > 0){
        ErmeKipakolas();
    }
}

function ErmeKipakolas(){
    for(let i = 0; i < 32;i++){
        if(document.getElementById("P"+i).firstChild != undefined){
            document.getElementById("P"+i).removeChild(document.getElementById("P"+i).firstChild);
        }
    }
    for(let i = 0; i < ErmekLista.length;i++){
        let Kep = document.createElement("img");
        Kep.src = "ermek/"+ErmekLista[i]+".png";
        document.getElementById("P"+i).appendChild(Kep);
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

function VegKiiratas(){
    document.body.removeChild(document.getElementById("KozosDiv"));
    for(let i = 0; i < 5; i++){
        document.getElementById("tabla").removeChild(document.getElementById("tabla").firstChild);
    }
    let sotetito = document.createElement("div");
    sotetito.id = "SotetitoDiv";
    tabla.appendChild(sotetito);
    let JatekVegeterFelIrat = document.createElement("div");
    JatekVegeterFelIrat.id = "JatekVegeterFelIrat";
    JatekVegeterFelIrat.innerHTML = "<h1>A játék véget ért!</h1>";
    let PontSzamKiiras = document.createElement("div");
    PontSzamKiiras.id = "PontSzamKiiras";
    PontSzamKiiras.innerHTML = "<h3>Pontszámod:</h3>";
    let db = 0;
    for(let i = 0; i < ErmekLista.length;i++){
        db += ErmekLista[i];
    }
    let PontSzam = document.createElement("div");
    PontSzam.id = "PontSzam";
    PontSzam.innerHTML = "<p>"+db+"</p>";
    let KozDiv = document.createElement("div");
    KozDiv.id = "KozDiv";
    KozDiv.appendChild(JatekVegeterFelIrat);
    KozDiv.appendChild(PontSzamKiiras);
    KozDiv.appendChild(PontSzam);
    let KozosGombDiv = document.createElement("div");
    KozosGombDiv.id = "KozosGombDiv";
    let Befejezes = document.createElement("div");
    Befejezes.id = "Befejezes";
    Befejezes.innerHTML = "<p>Befejezés</p>";
    Befejezes.setAttribute("onclick","Befejezes(this)");
    let UjraKezdes = document.createElement("div");
    UjraKezdes.id = "UjraKezdes";
    UjraKezdes.innerHTML = "<p>Újrakezdés</p>";
    UjraKezdes.setAttribute("onclick","UjraKezdes()");
    KozosGombDiv.appendChild(Befejezes);KozosGombDiv.appendChild(UjraKezdes);
    KozDiv.appendChild(KozosGombDiv);
    sotetito.appendChild(KozDiv);
}

function Befejezes(div){
    div.removeAttribute("onclick");
    document.getElementById("UjraKezdes").removeAttribute("onclick");
    div.id = "Kivalasztva";
}

function UjraKezdes(){
    document.body.removeChild(document.getElementById("LogoDiv"));
    document.body.removeChild(document.getElementById("jatekter"));
    Logo();
    jatekTer = document.createElement("div");
    jatekTer.id = "jatekter";
    document.body.appendChild(jatekTer);
    balPanel = document.createElement("div");
    kartyaBox = document.createElement("div");
    pontokBox = document.createElement("div");
    tabla = document.createElement("div");
    korokBox = document.createElement("div");
    tablaKartyaLista = [];
    lerakottKartyaLista = new Array(30);
    kezLista = new Array(1);
    varKeszletLista = [];
    kivalasztottKartya;
    CellaSzamlalo = 5;
    KorSzamolo = 1;
    KorValtasDB = 0;
    ErmekLista = new Array();
    TeljesDB = 0;
    hatterKartyaLepteto = 0;
    VarLista = [1,1,1,1,1,1,1,2,2,2,2,2,2,3,3,3,3,3,4,4];
    vanEkivalasztva = false;
    VarDB = 0;
    KartyaDB = 0;
    KorSzamolo = 1;
    JatekterBetoltes();
    JatekterElrendezes();
    AlapPontokBox();
    KorKigyujt();
}

function Main()
{
    JatekterBetoltes();
    JatekterElrendezes();
    AlapPontokBox();
    KorKigyujt();
}
Main();