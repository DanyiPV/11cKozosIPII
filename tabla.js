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
{id:6,value:2,sign:''},
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
[{id:1,value:1,sign:'kék'},
{id:2,value:2,sign:'kék'},
{id:3,value:3,sign:'kék'},
{id:4,value:4,sign:'kék'},
{id:5,value:1,sign:'piros'},
{id:6,value:2,sign:'piros'},
{id:6,value:3,sign:'piros'},
{id:8,value:4,sign:'piros'},
{id:9,value:1,sign:'sárga'},
{id:10,value:2,sign:'sárga'},
{id:11,value:3,sign:'sárga'},
{id:12,value:4,sign:'sárga'},
{id:13,value:1,sign:'zöld'},
{id:14,value:2,sign:'zöld'},
{id:15,value:3,sign:'zöld'},
{id:16,value:4,sign:'zöld'}
];

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
            sorDiv.appendChild(oszlopDiv);
            oszlopDiv.id = k++;
        }
        tabla.appendChild(sorDiv);
    }
}

function TablaFeltoltes(db)
{
    var cellaLista = new Array(30);
    //Átírtam for-ciklusba mert túl macera volt ott a while
    for(let i =0;i<db;i++)
    {
        //Kártya gen
        var randomKep = Math.floor(Math.random()*23+1);
        while(cellaLista.includes(randomKep))
        {
            randomKep = Math.floor(Math.random()*23+1);
        }
        var kep = document.createElement("img");
        kep.src = "kartyak/"+randomKep+".png";

        //Cella gen
        var randomCella = Math.floor(Math.random()*30+1);
        while(cellaLista[randomCella-1]!=undefined)
        {
            randomCella = Math.floor(Math.random()*30+1);
        }

        var kivalaszottCella = document.getElementById(randomCella);
        kivalaszottCella.appendChild(kep);

        cellaLista.splice(randomCella-1,1,randomKep);
        //console.log(cellaLista);
    }
    //30-db lehet nem ideális, nem feltétlen kell minden üres helyet várral feltölteni
    VarakFeltoltes(30-db,cellaLista);
    SorKiszamolas(cellaLista);
}
function VarakFeltoltes(db, cellaLista)
{
    var varLista = new Array(db);
    var varSzinLista = ["k", "p", "s", "z"];
    var varSzinSzamlalo = [0,0,0,0];
    var varSzintLista = new Array(4);
    //2D matrix gen
    for(let i =0;i<4;i++)
    {
        varSzintLista.splice(i,1,new Array(4));
        for(let j =0;j<varSzintLista[i].length;j++)
        {
            varSzintLista[i][j] = false;
        }
    }

    for(let i =0;i<db;i++)
    {
        //Vár gen
        var randomSzin = Math.floor(Math.random()*4);
        while(varSzinSzamlalo[randomSzin]==4)
        {
            randomSzin = Math.floor(Math.random()*4);
        }
        varSzinSzamlalo[randomSzin]++;

        var randomSzint = Math.floor(Math.random()*4+1);
        //console.log(varSzintLista);
        //console.log(randomSzin);
        //console.log(randomSzint);
        while(varSzintLista[randomSzin][randomSzint-1]==true)
        {
            randomSzint = Math.floor(Math.random()*4+1);
        }
        varSzintLista[randomSzin][randomSzint-1] = true;

        var varKep = document.createElement("img");
        varKep.src = "bastyak/"+varSzinLista[randomSzin]+"/"+randomSzint+".png";

        //Cella gen
        var randomCella = Math.floor(Math.random()*30+1);
        while(cellaLista[randomCella-1]!=undefined)
        {
            randomCella = Math.floor(Math.random()*30+1);
        }

        var kivalaszottCella = document.getElementById(randomCella);
        kivalaszottCella.appendChild(varKep);

        cellaLista.splice(randomCella-1,1,varSzinLista[randomSzin]+randomSzint);
        //console.log(cellaLista);
    }
}

function SorKiszamolas(cellaLista){
    var Szamolas = document.createElement("div");
    Szamolas.id = "Szamolas";
    document.body.appendChild(Szamolas);
    var SorSzam = document.createElement("div");
    SorSzam.id = "SorSzam";
    var OszlopSzam = document.createElement("div");
    OszlopSzam.id = "OszlopSzam";
    Szamolas.appendChild(SorSzam);
    Szamolas.appendChild(OszlopSzam);
    var ertekLista = [1,1,-1,2,-2,-2,2,3,3,-3,4,4,-4,5,5,-5,6,6,-6,0,0,0,0];
    var db = 0;
    for(let i = 0; i < cellaLista.length;i+=6){
        for(let j = i;j<i+6;j++)
        {
            if(typeof cellaLista[j] != "string"){
                db += ertekLista[cellaLista[j]-1];
                //console.log("j: "+j);
                //console.log(cellaLista[i]-1);
            }
        }
        //console.log(db);
        SorSzam.innerHTML+=db+";";
        db = 0;
    }
    for(let i = 0; i < 6;i++){
        for(let j = i;j<cellaLista.length;j+=6)
        {
            console.log("j: "+j);
            if(typeof cellaLista[j] != "string"){
                db += ertekLista[cellaLista[j]-1];
                //console.log("j: "+j);
                //console.log(cellaLista[i]-1);
            }
        }
        console.log(db);
        OszlopSzam.innerHTML+=db+";";
        db = 0;
    }
}

function Main()
{
    JatekterBetoltes();
    JatekterElrendezes();
    TablaGeneralas();
    TablaFeltoltes(23);//14 és 23 között lehet
}
Main();