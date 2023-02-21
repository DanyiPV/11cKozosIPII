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
[{id:1,value:1,color:1},
{id:2,value:2,color:2},
{id:3,value:3,color:3},
{id:4,value:4,color:4},
{id:5,value:1,color:1},
{id:6,value:2,color:2},
{id:6,value:3,color:3},
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
            sorDiv.appendChild(oszlopDiv);
            cellak.push({id: k});
            oszlopDiv.id = k++;
        }
        tabla.appendChild(sorDiv);
    }
    console.log(cellak);
}
function benneVanE(elem,lista)
{
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
function TablaFeltoltes(db)
{
    var cellaLista = new Array(30);
    //Átírtam for-ciklusba mert túl macera volt ott a while
    for(let i =0;i<db;i++)
    {
        //Kártya gen
        var randomKep = Math.floor(Math.random()*23+1);
        while(benneVanE(randomKep,cellaLista))
        {
            randomKep = Math.floor(Math.random()*23+1);
        }
        

        //Cella gen
        var randomCella = Math.floor(Math.random()*30+1);
        while(cellaLista[randomCella-1]!=undefined)
        {
            randomCella = Math.floor(Math.random()*30+1);
        }

        cellaLista.splice(randomCella-1,1,cellak[randomKep-1]);
    }
    console.log(cellaLista);
    //30-db lehet nem ideális, nem feltétlen kell minden üres helyet várral feltölteni
    //VarakFeltoltes(30-db,cellaLista);
    //SorKiszamolas(cellaLista);
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

        //varKep.src = "bastyak/"+varSzinLista[randomSzin]+"/"+randomSzint+".png";

        //Cella gen
        var randomCella = Math.floor(Math.random()*30+1);
        while(cellaLista[randomCella-1]!=undefined)
        {
            randomCella = Math.floor(Math.random()*30+1);
        }

        cellaLista.splice(randomCella-1,1,varSzinLista[randomSzin]+randomSzint);
        //console.log(cellaLista);
    }
}
/*
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
        //console.log(db)
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
}*/

function cellakFeltoltese(){
    var cellalist = new Array();
    var random = Math.floor(Math.random()*23);
    for(let i = 0; i< 23;i++)
    {
        while(cellalist.includes(random)) {
            random = Math.floor(Math.random()*23);
        }
        cellak[i].type = "kartya";
        cellak[i].kartya = KartyakTag[random];
        cellalist.push(random);
    }
    var cellalist1 = new Array();
    random = Math.floor(Math.random()*16);
    for(let i = 23; i< 30;i++)
    {
        while(cellalist1.includes(random)) {
            random = Math.floor(Math.random()*16);
        }
        cellak[i].type = "vár";
        cellak[i].kartya = VarTag[random];
        cellalist1.push(random);
    }
}

function Main()
{
    JatekterBetoltes();
    JatekterElrendezes();
    TablaGeneralas();
    cellakFeltoltese();
    TablaFeltoltes(23);//14 és 23 között lehet
}

Main();