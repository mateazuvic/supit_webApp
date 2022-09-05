const putanja='http://www.fulek.com/VUA/SUPIT/GetNastavniPlan';

function Kolegij(naziv, id){
    this.label=naziv;
    this.value=id;
}

let kolegiji;
var kNazivi = [];


$.ajax({
    url: putanja,
    method: 'post',
    dataType:'json',
    success:(podatak) => {
       // console.log(podatak);
         kolegiji = podatak.map((p) => new Kolegij(p.label, p.value));
         kolegiji.forEach(k => {
             //console.log(k);
             kNazivi.push(k.label);
        });

         //console.log(kNazivi);
         $('#txtKolegij').autocomplete({
            source:kolegiji,
             focus: (event, ui) => {
                 event.preventDefault();
                 $('#txtKolegij').val(ui.item.label);
                 console.log(ui.item.label);
             },
             select: (event, ui) => {
                 event.preventDefault();
                 $('#txtKolegij').val(ui.item.label);
                 //console.log(ui.item.value);
                PrikaziDetalje(ui.item.value);

             }
            
            });          
           
    }
});


var EctsUk = 0;

const PrikaziDetalje = (id) => {
    $.ajax({
        url: `http://www.fulek.com/VUA/supit/GetKolegij/${id}`,
        data: { id },
        success: (kol) => {
            //console.log(kol);
            
            $(kol).each((index, kolegij) => {
               
                $('tbody').append(
                    `<tr>
                       <td>${kolegij.kolegij}&nbsp</td>
                       <td>&nbsp&nbsp${kolegij.ects}</td>
                       <td>${kolegij.sati}</td>
                       <td>${kolegij.predavanja}</td>
                       <td>${kolegij.vjezbe}</td>
                       <td>${kolegij.tip}</td>
                    </tr>`
                   
                )
               
                zbrojEcts(kolegij.ects);
            })
            IspisiUkupno(EctsUk);
        
        }
    });
   
}


function zbrojEcts(ects)  {
   
    EctsUk += ects;
   
}

function IspisiUkupno(EctsUk) {
    var s = document.getElementById("placeholder");
    s.value=EctsUk;
    
}

    




