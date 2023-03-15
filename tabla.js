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
{id:23,value:0,sign:'sarkany'}
];

var VarTag = 
[{id:1,value:1,color:1},
{id:2,value:1,color:1},
{id:3,value:1,color:1},
{id:4,value:1,color:1},
{id:5,value:1,color:1},
{id:6,value:1,color:1},
{id:7,value:1,color:1},
{id:8,value:2,color:1},
{id:9,value:2,color:1},
{id:10,value:2,color:1},
{id:11,value:2,color:1},
{id:12,value:3,color:1},
{id:13,value:3,color:1},
{id:14,value:3,color:1},
{id:15,value:3,color:1},
{id:16,value:4,color:1},
{id:17,value:4,color:1},
{id:18,value:4,color:1},
{id:19,value:4,color:1},
{id:20,value:4,color:1}
];

var tablaKartyaLista = []; //Ki generált DE még nem lerakott kártyák (pakli)
var lerakottKartyaLista = new Array(30); //Lerakott
var varKeszletLista = []; //A bal lent lévő várak listája
var kivalasztottKartya;
var HuzottlapSzamlalo = 1; //Ez a kör váltáshoz nem működik, 1-ről indul mert a kezdő kártyát már technikailag "felhúztuk"
var lerakottLapokSzamlalo = 0;
var KorSzamolo = 1; //Körváltáshoz nem kell db-t nézni, csak lerakottKartyaLista.Length
var EremOsszeg = 0; //Érmék teljes összege
var vanEkivalasztva = false;

function JatekBetoltes(){
    KorSzamolo = 1;
    Betoltes_Panelek();
    Betoltes_BelsoDivek();
}

function Betoltes_Panelek(){
    var jatekTer = document.createElement("div");
    var balPanel = document.createElement("div");
    var kartyaBox = document.createElement("div");
    var pontokBox = document.createElement("div");
    var tabla = document.createElement("div");
    var korokBox = document.createElement("div");
    let Kep = document.createElement("img");
    let KepDiv = document.createElement("div");
    var KozosDiv = document.createElement("div");
    var VarDiv = document.createElement("div");
    var KivalasztoDiv = document.createElement("div");
    var KezdoLap = document.createElement("div");
    var LapDivek = document.createElement("div");
    
    jatekTer.id = "jatekter";
    balPanel.id="balPanel";
    kartyaBox.id="kartyaBox";
    pontokBox.id="pontokBox";
    tabla.id="tabla";
    korokBox.id="korokBox";
    KepDiv.id = "LogoDiv";
    Kep.src = "Logo.png";
    Kep.id = "Logo";
    KozosDiv.id = "KozosDiv";
    VarDiv.id = "VarDiv";
    KivalasztoDiv.id = "KivalasztoDiv";
    KezdoLap.id = "KezdoLap";
    LapDivek.className = "LapDivek";
    LapDivek.id = "kezdoLapDIV";

    KepDiv.appendChild(Kep);
    document.body.appendChild(KepDiv);
    document.body.appendChild(jatekTer);
    jatekTer.appendChild(balPanel);
    balPanel.appendChild(kartyaBox);
    balPanel.appendChild(pontokBox);
    jatekTer.appendChild(tabla);
    jatekTer.appendChild(korokBox);
    KozosDiv.appendChild(VarDiv);
    KozosDiv.appendChild(KivalasztoDiv);
    document.body.appendChild(KozosDiv);
    KezdoLap.appendChild(LapDivek);
    KozosDiv.appendChild(KezdoLap);
}

function objektKeszito(index,fajta,kartya){
    let Objekt = {};
    Objekt.id = index;
    Objekt.kartya = kartya;
    Objekt.type = fajta;
    return Objekt;
}

function Betoltes_BelsoDivek(){
    let Indexelo = 0;
    //Vár hely divek
    for(let i = 0; i < 2;i++){
        let VarakKiGensor = document.createElement("div");
        VarakKiGensor.className = "VarakKiGensor";
        for(let j = 0; j < 10;j++){
            let KiGenVarDivek = document.createElement("div");
            KiGenVarDivek.className= "KiGenVarDivek";
            KiGenVarDivek.id = "varSlot"+Indexelo++;
            VarakKiGensor.appendChild(KiGenVarDivek);
        }
        VarDiv.appendChild(VarakKiGensor);
    }
    //Körök
    let KorokBox = document.getElementById("korokBox");
    let KorokSorDiv = document.createElement("div");
    KorokSorDiv.id = "KorokSorDiv";
    for(let i = 0; i < 3;i++){
        let KorokDivek = document.createElement("div");
        KorokDivek.classList = "KorokDivek";
        KorokDivek.id = "Kor"+(i+1);
        KorokDivek.innerHTML = "<p>"+(i+1)+". Kör</p>";
        KorokSorDiv.appendChild(KorokDivek);
    }
    KorokBox.appendChild(KorokSorDiv);
    document.getElementById("Kor"+1).className += " KoredikErtek";
    //Tábla
    Indexelo = 0;
    for(let i = 0; i < 5; i++)
    {
        let sorDiv = document.createElement("div");
        sorDiv.classList += " sordiv";
        for(let j = 0; j<6;j++)
        {
            let oszlopDiv = document.createElement("div");
            oszlopDiv.classList += " oszlopdiv";
            oszlopDiv.setAttribute("onclick","lerakas(this)");
            sorDiv.appendChild(oszlopDiv);
            oszlopDiv.id = "tabla"+Indexelo++;
        }
        tabla.appendChild(sorDiv);
    }
    let Kep = document.createElement("img");
    Kep.src = "kartyaamikell.png";
    Kep.setAttribute("onclick","huzas()");
    Kep.id = "KartyabBoxKepHover";
    kartyaBox.appendChild(Kep);
    //Érem
    Indexelo = 0;
    for(let i = 0; i < 4;i++){
        var PontokSorDiv = document.createElement("div");
        PontokSorDiv.className = "PontokSorDiv"
        for(let j = 0; j < 8;j++){
            let PontokDiv = document.createElement("div");
            PontokDiv.id = "ermeSlot"+Indexelo++;
            PontokDiv.className = "PontokDiv";
            PontokSorDiv.appendChild(PontokDiv);
        }
        pontokBox.appendChild(PontokSorDiv);
    }
}

function KezdoErtekek(){
    if(KorSzamolo==1)
    {
        EremOsszeg=50;
    }
    //Kezdő kártya
    let kep = kepKeszites(tablaKartyaLista[0]);
    kep.setAttribute("onclick","felveves('kezdoLapDIV',this.parentElement)");
    document.getElementById("kezdoLapDIV").appendChild(kep);
}

function pakliGen(){
    let Indexelo = 0;
    let kigeneralt = [];
    for(let i = 0;i<23;i++)
    {
        var random = Math.floor(Math.random()*23);
        while(kigeneralt.includes(random))
        {
            random = Math.floor(Math.random()*23);
        }
        tablaKartyaLista.push(objektKeszito(Indexelo++,"kartya",KartyakTag[random]));
        kigeneralt.push(random);
    }
}

function varGen(){
    if(KorSzamolo == 1)
    {
        for(let i = 0;i<VarTag.length;i++)
        {
            varKeszletLista.push(objektKeszito(i,"var",VarTag[i]));
        }
    }
    else
    {
        for(let i = 0;i<7;i++)
        {
            if(varKeszletLista[i]==undefined)
            {
                varKeszletLista.splice(i,1,objektKeszito(i,"var",VarTag[i]));
            }
        }
    }
}

function varRajz(){
    for(let i = 0;i<varKeszletLista.length;i++)
    {
        if(varKeszletLista[i]!=undefined)
        {
            console.log(varKeszletLista[i]);
            let kep = kepKeszites(varKeszletLista[i]);
            kep.setAttribute("onclick","felveves("+i+",this.parentElement)");
            document.getElementById("varSlot"+i).appendChild(kep);
        }
    }
}

function kepKeszites(kartyaObjekt){
    var kep = document.createElement("img");
    if(kartyaObjekt.type == "var")
    {
        kep.src= "bastyak/"+kartyaObjekt.kartya.value+".png";
    }
    else
    {
        kep.src = "kartyak/"+kartyaObjekt.kartya.id+".png";
    }
    return kep;
}

function eremRajz(){
    if(EremOsszeg<=0)
    {
        return;
    }
    let tempOszzeg = EremOsszeg;
    let lista = [100,50,10,5,1];
    let Indexelo = 0;
    for(let i = 0;i<lista.length;i++)
    {
        let mennyiKepkell = Math.floor(tempOszzeg/lista[i]);
        tempOszzeg-=mennyiKepkell*lista[i];
        for(let j = 0;j<mennyiKepkell;j++)
        {
            let kep = document.createElement("img");
            kep.id="erme"+Indexelo;
            kep.src="ermek/"+lista[i]+".png"
            document.getElementById("ermeSlot"+Indexelo++).appendChild(kep);
        }
    }
}

function kepTorlo(){
    //tábla
    for(let i = 0;i<30;i++)
    {
        document.getElementById("tabla"+i).innerHTML="";
        document.getElementById("tabla"+i).setAttribute("onclick","lerakas(this)");
    }
    //várak
    for(let i = 0;i<20;i++)
    {
        document.getElementById("varSlot"+i).innerHTML="";
    }
    //Érmék
    for(let i = 0;i<32;i++)
    {
        document.getElementById("ermeSlot"+i).innerHTML="";
    }
    document.getElementById("kezdoLapDIV").innerHTML="";
    let div = document.getElementById("NemKartyabBoxKepHover");
    if(div!=null)
    {
        div.id="KartyabBoxKepHover";
    }
}

function huzas(){
    if(vanEkivalasztva==false&&HuzottlapSzamlalo<23)
    {
        kivalasztottKartya = tablaKartyaLista[HuzottlapSzamlalo];
        vanEkivalasztva = true;
        KivalasztoDiv.appendChild(kepKeszites(kivalasztottKartya));
        HuzottlapSzamlalo++;
        if(HuzottlapSzamlalo == 23){
            document.getElementById("KartyabBoxKepHover").id = "NemKartyabBoxKepHover";
        }
    }
}

function felveves(id,div){
    if(vanEkivalasztva==false)
    {
        div.innerHTML="";
        vanEkivalasztva = true;
        if(id=="kezdoLapDIV")
        {
            kivalasztottKartya = tablaKartyaLista[0];
        }
        else
        {
            kivalasztottKartya = varKeszletLista[id];
        }
        KivalasztoDiv.appendChild(kepKeszites(kivalasztottKartya));
    }
}

function lerakas(div){
    if(vanEkivalasztva==true)
    {
        KivalasztoDiv.innerHTML="";
        div.appendChild(kepKeszites(kivalasztottKartya));
        vanEkivalasztva = false;
        if(kivalasztottKartya.type=="var")
        {
            varKeszletLista[kivalasztottKartya.id]=undefined;
        }
        lerakottKartyaLista.splice(div.id.slice(5),1,kivalasztottKartya);
        kivalasztottKartya = undefined;
        lerakottLapokSzamlalo++;
        document.getElementById(div.id).removeAttribute("onclick");
        if(lerakottLapokSzamlalo==30)
        {
            szamolas();
            KorSzamolo++;
            Kor();
        }
    }
}

function veg(){
    document.body.removeChild(document.getElementById("KozosDiv"));
    tabla.innerHTML = "";
    let sotetito = document.createElement("div");
    sotetito.id = "SotetitoDiv";
    tabla.appendChild(sotetito);
    let JatekVegeterFelIrat = document.createElement("div");
    JatekVegeterFelIrat.id = "JatekVegeterFelIrat";
    JatekVegeterFelIrat.innerHTML = "<h1>A játék véget ért!</h1>";
    let PontSzamKiiras = document.createElement("div");
    PontSzamKiiras.id = "PontSzamKiiras";
    PontSzamKiiras.innerHTML = "<h3>Pontszámod:</h3>";
    let PontSzam = document.createElement("div");
    PontSzam.id = "PontSzam";
    PontSzam.innerHTML = "<p>"+EremOsszeg+"</p>";
    let KozDiv = document.createElement("div");
    KozDiv.id = "KozDiv";
    KozDiv.appendChild(JatekVegeterFelIrat);
    KozDiv.appendChild(PontSzamKiiras);
    KozDiv.appendChild(PontSzam);
    let KozosGombDiv = document.createElement("div");
    KozosGombDiv.id = "KozosGombDiv";
    let UjraKezdes = document.createElement("div");
    UjraKezdes.id = "UjraKezdes";
    UjraKezdes.innerHTML = "<p>Újrakezdés</p>";
    UjraKezdes.setAttribute("onclick","Main()");
    KozosGombDiv.appendChild(UjraKezdes);
    KozDiv.appendChild(KozosGombDiv);
    sotetito.appendChild(KozDiv);
}

function kereses(tag){
    let lista = [];
    let sor = 0;
    for(let i = 0; i<lerakottKartyaLista.length;i++)
    {
        sor = Math.floor(i/6);
        if(lerakottKartyaLista[i].kartya.sign==tag)
        {
            lista.push({index: i,sor: sor});
        }
    }
    return lista;
}

function pap(){
    let lista = kereses('pap');
    console.log(lista);
    for(let i = 0; i<lista.length;i++)
    {
        if(lista[i].index-6>0)
        {
            if(lerakottKartyaLista[lista[i].index-6].type=='var')
            {
                lerakottKartyaLista[lista[i].index-6].kartya.value++;
            }
        }
        if(lista[i].index-1>0&&lista[i].index-1>=lista[i].sor*6)
        {
            if(lerakottKartyaLista[lista[i].index-1].type=='var')
            {
                lerakottKartyaLista[lista[i].index-1].kartya.value++;
            }
        }
        if(lista[i].index+1<30&&lista[i].index-1<=(lista[i].sor*6)+5)
        {
            if(lerakottKartyaLista[lista[i].index+1].type=='var')
            {
                lerakottKartyaLista[lista[i].index+1].kartya.value++;
            }
        }
        if(lista[i].index+6<30)
        {
            if(lerakottKartyaLista[lista[i].index+6].type=='var')
            {
                lerakottKartyaLista[lista[i].index+6].kartya.value++;
            }
        }
    }
}

function sarkany(){
    //Baj van még a sorral (-1 lehet és nem tetszik neki)
    let lista = kereses('sarkany')
    for(let i = 0; i<lista.length;i++)
    {
        for(let j = lista[i].sor*6; j< (lista[i].sor*6)+6;j++)
        {
            if(lerakottKartyaLista[j].type=="kartya" && lerakottKartyaLista[j].kartya.value>0)
            {
                lerakottKartyaLista[j].kartya.value = 0;
            }
        }
        for(let j = lista[i].index-Math.floor(lista[i].index/6)*6; j<30;j+=6)
        {
            if(lerakottKartyaLista[j].type=="kartya" && lerakottKartyaLista[j].kartya.value>0)
            {
                lerakottKartyaLista[j].kartya.value = 0;
            }
        }
    }
}

function banya(){ //A kiszámolás nem jó
    let lista = kereses('taliga')
    console.log(lista);
    for(let i = 0; i<lista.length;i++)
    {
        for(let j = lista[i].sor*6; j<(lista[i].sor*6)+6;j++)
        {
            if(lerakottKartyaLista[j].type=="kartya")
            {
                lerakottKartyaLista[j].kartya.value *= 2;
            }
        }
        for(let j = lista[i].index-Math.floor(lista[i].index/6)*6; j<30;j+=6)
        {
            if(lerakottKartyaLista[j].type=="kartya")
            {
                lerakottKartyaLista[j].kartya.value *= 2;
            }
        }
    }
}

function szamolas(){
    pap();
    banya();
    sarkany();
    for(let i = 0; i<lerakottKartyaLista.length;i+=6)
    {
        let osszeg = 0;
        let szorzo = 0;
        for(let j = i; j<i+6;j++)
        {
            if(lerakottKartyaLista[j].type=="var")
            {
                szorzo +=lerakottKartyaLista[j].kartya.value;
            }
            else if(lerakottKartyaLista[j].type=="kartya")
            {
                osszeg+=lerakottKartyaLista[j].kartya.value;
            }
        }
        EremOsszeg+=(osszeg*szorzo);
        console.log(osszeg);
    }
    for(let i = 0; i<6;i++)
    {
        let osszeg = 0;
        let szorzo = 0;
        for(let j = 0+i; j<lerakottKartyaLista.length;j+=6)
        {
            if(lerakottKartyaLista[j].type=="var")
            {
                szorzo +=lerakottKartyaLista[j].kartya.value;
            }
            else if(lerakottKartyaLista[j].type=="kartya")
            {
                osszeg+=lerakottKartyaLista[j].kartya.value;
            }
        }
        EremOsszeg+=(osszeg*szorzo);
        console.log(osszeg);
    }
    console.log("Teljes osszeg: "+EremOsszeg);
}

function ertekReset(){
    if(KorSzamolo==4)
    {
        tablaKartyaLista = [];
        lerakottKartyaLista = new Array(30);
        varKeszletLista = [];
        kivalasztottKartya;
        HuzottlapSzamlalo = 1;
        lerakottLapokSzamlalo = 0;
        KorSzamolo = 1;
        EremOsszeg = 0;
        vanEkivalasztva = false;
    }
    else
    {
        tablaKartyaLista = [];
        lerakottKartyaLista = new Array(30);
        kivalasztottKartya = undefined;
        HuzottlapSzamlalo = 1; 
        lerakottLapokSzamlalo = 0;
        ErmekLista = new Array();
        vanEkivalasztva = false;
    }
}

function KorLepteto(){
    if(KorSzamolo > 1){
        document.getElementById("Kor"+(KorSzamolo-1)).className = "KorokDivek VKoredik";
        document.getElementById("Kor"+KorSzamolo).className += " KoredikErtek";
    }
}

function Kor(){
    if(KorSzamolo<4)
    {
        ertekReset();
        kepTorlo();
        pakliGen();
        varGen();
        KezdoErtekek();
        varRajz();
        eremRajz();
        KorLepteto();
    }
    else{veg();}
}
function Main()
{
    document.body.innerHTML = "";
    ertekReset();
    JatekBetoltes();Kor();
}
Main();