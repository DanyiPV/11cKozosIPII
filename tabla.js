var jatekTer = document.getElementById("jatekter");

var balPanel = document.createElement("div");
var kartyaBox = document.createElement("div");
var pontokBox = document.createElement("div");
var tabla = document.createElement("div");
var korokBox = document.createElement("div");

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
    var rlista = new Array();
    var klista = new Array();
    var i = 0;
    while(i < db)
    {
        var random = Math.floor(Math.random()*30+1);
        var random2 = Math.floor(Math.random()*23+1);
        if(!rlista.includes(random) && !klista.includes(random2)){
            rlista.push(random);
            klista.push(random2);
            var kep = document.createElement("img");
            kep.src = "kartyak/"+random2+".png";
            var cella = document.getElementById(random);
            cella.appendChild(kep);
            i++;
        }
    }
    VarakFeltoltes(30-db,rlista,klista);
}
function VarakFeltoltes(a, rlista,klista)
{
    var vlista = new Array();
    var varszin = ["kek", "piros", "sarga", "zold"];
    var i = 0;
    while(i < a)
    {
        var random = Math.floor(Math.random()*30+1);
        var random2 = Math.floor(Math.random()*4+1);
        var varak = Math.floor(Math.random()*3+1);
        if(!rlista.includes(random) && !vlista.includes(random)){
            vlista.push(random);
            var kep = document.createElement("img");
            kep.src = "bastyak/"+varszin[varak]+"/"+random2+".png";
            var cella = document.getElementById(random);
            cella.appendChild(kep);
            i++;
        }
    }
    SorKiszamolas(klista);
}

function SorKiszamolas(klista){
    /*var SorSzamolas = document.createElement("div");
    SorSzamolas.id = "SorSzamolas";
    document.body.appendChild(SorSzamolas);*/
    var ertekLista = [1,1,-1,2,-2,-2,2,3,3,-3,4,4,-4,5,5,-5,6,6,-6,0,0,0,0];
    //Nem kell milliónyi if^^^^
    var db = 0;
    for(let i = 0; i < Object.keys(klista).length;i++){
        /*
        if(klista[i] < 20){
            if(klista[i] == 2 || klista[i] == 1){
                db++;
            }
            else if(klista[i] == 3){
                db -=1;
            }
            else if(klista[i] == 4 || lista[i] == 7){
                db += 2;
            }   
            else if(klista[i] == 5 || klista[i] == 6){
                db -= 2;
            }
            else if(klista[i] == 8 || klista[i] == 9){
                db += 3;
            }  
            else if(klista[i] == 10){
                db -= 3;
            }  
            else if(klista[i] == 11 || klista[i] == 12){
                db += 4;
            }  
            else if(klista[i] == 13){
                db -= 4;
            }  
            else if(klista[i] == 14 || klista[i] == 15){
                db += 5;
            }  
            else if(klista[i] == 16){
                db -= 5;
            }
            else if(klista[i] == 17 || klista[i] == 17){
                db += 6;
            }  
            else if(klista[i] == 18){
                db -= 6;
            }
        }
        */
        db += ertekLista[klista[i]-1];
        if(i % 5 == 0 || i == klista.lenght-1){
            console.log(db);
            db = 0;
        }
    }
}

function Main()
{
    JatekterBetoltes();
    JatekterElrendezes();
    TablaGeneralas();
    TablaFeltoltes(23);
}
Main();