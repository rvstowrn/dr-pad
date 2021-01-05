const Store = require('electron-store');
const store = new Store();
const fs = require('fs');
const { remote } = require('electron')


$(document).ready(function(){
    $('.tabs').tabs();
    $('.modal').modal();
    $('input.autocomplete').autocomplete({
      data: {
        "Male": null,
        "Female": null,
        "Others": null
      },
    });
    $('.datepicker').datepicker({});
    setTable();
});

function appstate(state){
	if(state == 'minimize')
		remote.getCurrentWindow().minimize();
	else
		remote.app.quit();
}

function saveHandler(type,id){
    let sid;
	if(type=='add'){
        sid = (Math.floor(Math.random() * 10000) + 10000).toString().substring(1);
    }
	else{
        sid=id;
        $('#toggle-icon').html('&#x2630;');
		$('#table').css('display','');
		$('#update').css('display','none');		
	}

	let name          =   $('#'+type+' #name').val();
	let gender        =   $('#'+type+' #gender').val();
	let date          =   $('#'+type+' #date').val();
	let age           =   $('#'+type+' #age').val();
	let address       =   $('#'+type+' #address').val();
	let present       =   $('#'+type+' #present').val();
    let past          =   $('#'+type+' #past').val();
	let pulse         =   $('#'+type+' #pulse').val();
	let temp          =   $('#'+type+' #temp').val();
	let bp            =   $('#'+type+' #bp').val();
	let chest         =   $('#'+type+' #chest').val();
	let hs            =   $('#'+type+' #hs').val();
	let spo2          =   $('#'+type+' #spo2').val();
	let skin          =   $('#'+type+' #skin').val();
	let bloodsugar    =   $('#'+type+' #bloodsugar').val();
	let cvs           =   $('#'+type+' #cvs').val();
	let ecg           =   $('#'+type+' #ecg').val();
	let pft           =   $('#'+type+' #pft').val();
	let pa            =   $('#'+type+' #pa').val();
	let liver         =   $('#'+type+' #liver').val();
	let spleen        =   $('#'+type+' #spleen').val();
	let kidney        =   $('#'+type+' #kidney').val();
	let ln            =   $('#'+type+' #ln').val();
	let special       =   $('#'+type+' #special').val();
  
  
  let tcells = new Array();
  let tableclass = type=="add"?"add-table":"edit-table"; 
  $(`.${tableclass} td`).each(function () {
    tcells.push($(this).text());  
  });
	
	let obj = {
      sid,
      name,
	  gender,
	  date,
	  age,
	  address,
	  present,
      past,
	  pulse,
	  temp,
	  bp,
	  chest,
	  hs,
	  spo2,
	  skin,
	  bloodsugar,
	  cvs,
	  ecg,
	  pft,
	  pa,
	  liver,
	  spleen,
	  kidney,
      ln,
      tcells,
      special           
	}

    store.set(`db.${sid}`,obj);

	writer(obj);
    setTable();
    
	// Reset Inputs
	$('#'+type+' #name').val('');
	$('#'+type+' #gender').val('');
	$('#'+type+' #date').val('');
	$('#'+type+' #age').val('');
	$('#'+type+' #address').val('');
	$('#'+type+' #present').val('');
    $('#'+type+' #past').val('');
	$('#'+type+' #pulse').val('');
	$('#'+type+' #temp').val('');
	$('#'+type+' #bp').val('');
	$('#'+type+' #chest').val('');
	$('#'+type+' #hs').val('');
	$('#'+type+' #spo2').val('');
	$('#'+type+' #skin').val('');
	$('#'+type+' #bloodsugar').val('');
	$('#'+type+' #cvs').val('');
	$('#'+type+' #ecg').val('');
	$('#'+type+' #pft').val('');
	$('#'+type+' #pa').val('');
	$('#'+type+' #liver').val('');
	$('#'+type+' #spleen').val('');
	$('#'+type+' #kidney').val('');
	$('#'+type+' #ln').val('');
	$('#'+type+' #special').val('');

	// Reset Labels
	$('#'+type+' #name').next().removeClass('active');
	$('#'+type+' #gender').next().removeClass('active');
	$('#'+type+' #date').next().removeClass('active');
	$('#'+type+' #age').next().removeClass('active');
	$('#'+type+' #address').next().removeClass('active');
	$('#'+type+' #present').next().removeClass('active');
    $('#'+type+' #past').next().removeClass('active');
	$('#'+type+' #pulse').next().removeClass('active');
	$('#'+type+' #temp').next().removeClass('active');
	$('#'+type+' #bp').next().removeClass('active');
	$('#'+type+' #chest').next().removeClass('active');
	$('#'+type+' #hs').next().removeClass('active');
	$('#'+type+' #spo2').next().removeClass('active');
	$('#'+type+' #skin').next().removeClass('active');
	$('#'+type+' #bloodsugar').next().removeClass('active');
	$('#'+type+' #cvs').next().removeClass('active');
	$('#'+type+' #ecg').next().removeClass('active');
	$('#'+type+' #pft').next().removeClass('active');
	$('#'+type+' #pa').next().removeClass('active');
	$('#'+type+' #liver').next().removeClass('active');
	$('#'+type+' #spleen').next().removeClass('active');
	$('#'+type+' #kidney').next().removeClass('active');
	$('#'+type+' #ln').next().removeClass('active');
    $('#'+type+' #special').next().removeClass('active');
    
    // Reset Tables
    let datacells = $(`.${tableclass} td`);
    console.log(datacells);
    for(let i=4;i<24;i++){
        datacells[i].innerText='';
    }
    for(let i=28;i<48;i++){
        datacells[i].innerText='';
    }

}


function setTable(){
	let db = store.get('db');
	$('#table').html(`<tr><th>Reference No</th><th>Patient Name</th><th>Date</th><th>Edit/Delete</th></tr>`);
	Object.keys(db).forEach(patient=>{
		$('#table').append(
			`<tr>
		        <td>${patient}</td>
		        <td>${db[patient].name}</td>
		        <td>${db[patient].date}</td>
		        <td>
		            <button class='btn blue darken-1' onclick="editBlockHandler('${patient}')">Edit</button>
		            <button class='btn blue darken-1' onclick=deleteHandler('${patient}')>delete</button>
		        </td>
			</tr>`
		);
	});
} 

		            
function editBlockHandler(id){
	$('#table').css('display','none');
    $('#update').css('display','unset');
    $('#toggle-icon').html('&#9998;');
    
	$('#editBtnSubmit').click((e)=>{
		saveHandler('update',id);
	});

	let db = store.get('db');
	$("#update label").addClass('active');
	$('#update #name').val(db[id].name).trigger("change");
	$('#update #gender').val(db[id].gender).trigger("change");
	$('#update #date').val(db[id].date);
	$('#update #age').val(db[id].age);
	
}


function deleteHandler(id){
	let db = store.get('db');
	delete db[id];
	store.set('db',db); 
	setTable();
}

function tablefill(cells,s){
    var str='';
    for(let i=0;i<6;i++){
        str+='<tr>'
        for(let j=0;j<4;j++){
            str+=`<td>${cells[s++]}</td>`
        }
        str+='</tr>'
    }
    return str
}


function writer(obj){
  let {
    sid,name,gender,date,age,address,
    present,past,
    pulse,temp,bp,chest,hs,spo2,skin,bloodsugar,cvs,ecg,pft,pa,liver,spleen,kidney,ln,
    tcells,special
  } = obj;
  var html = `
  <!DOCTYPE html>
  <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Document</title>
          <style>
              body{
                  width: 800px;
                  margin: auto;
                  border: 2px solid black;
                  padding: 10px;
                  box-sizing: border-box;
                  padding-bottom: 100px;
                  position: relative;
              }
              .flex-center{
                  display: flex;
                  justify-content: center;
                  align-items: baseline;
              }
              .top25{
                  position: relative;
                  top: -25px;
              }
              .bold-spaced{
                  letter-spacing: .5px;
                  font-weight: 500;
              }
              .section{
                  border-top: 3px solid;
                  padding: 5px 2px;
              }
              .halfrow{
                  width: 50%;
                  float: left;
              }
              .bold-large{
                  font-weight: bold;
                  font-size: 17px;
              }
              .flex-down{
                  display: flex;
                  flex-direction: column;
              }
              .underline-bold{
                  font-weight: bold;
                  text-decoration: underline;
              }
              .quarters>div{
                  width: 25%;
                  font-weight: bold;
                  float: left;
              }
              .right-bottom{
                  position: absolute;
                  bottom: 10px;
                  right: 10px;
              }
              table{
                  border-collapse: collapse;
              }
              td{
                  text-align: center;
                  font-weight: bold;
                  height: 20px;
                  width: 200px;
                  border: 1px solid;
              }
              .back-img{
                  position: absolute;
                  z-index: -1;
                  opacity: .8;
                  top: 50%;
                  left: 50%;
                  transform: translate(-50%,-50%);
              }
              .value{
                  font-weight:normal;
                  text-decoration:none !important;
              }
          </style>
      </head>
      <body>
          <img src="pres_misc/background.jpg" alt="" class="back-img">
          <div class="flex-center">
              <h1>Dr. (Prof). N K Verma,</h1> 
              <h2>M.B.B.S.(Ran), M.D.(Pat).</h2>
          </div>
          <h2 class="flex-center top25">GENERAL PHYSICIAN & PAIN SPECIALIST</h2>                                                                                     
          <p class="bold-spaced">
              Retd. Professor & HOD<br>
              Department of Critical Care & Pain Medicine.<br>
              JLN Medical College, Bhagalpur.<br>
              Reg; 12831/Bihar.<br>
              Address: 401 Rameshwaram Apartment, Bhootnath Road, PATNA. (800026).<br>
          </p>
          <section class="section bold-large">
              <div class="halfrow">
                  Patient’s Reference No: <span class='value'>${sid}</span>                                           
              </div>
              <div class="halfrow">
                  Date:<span class='value'>${date}</span>
              </div>
              <div class="halfrow">
                  Patient’s Name:<span class='value'>${name}</span>                                                                                                     
              </div>
              <div class="halfrow">
                  Age:<span class='value'>${age}</span>                                                                         
              </div>
              <div class="halfrow">
                  Sex:<span class='value'>${gender}</span>                                                                         
              </div>
              <div class="halfrow">
                Address:<span class='value'>${address}</span>                                                                         
              </div>
          </section>
          <section class="section flex-down">
              <div class="above">
                <span class='underline-bold'>Presenting Complaints:</span> 
                <span class='value'>${present}</span>
              </div>
              <div class="under">
                <span class='underline-bold'>Past History / Medications /Operations:</span> 
                <span class='value'>${past}</span> 
              </div>    
          </section>
          
          <section class="section">
              <div class="quarters">
                  <div>Pulse:<span class='value'>${pulse}</span></div>
                  <div>Temp:<span class='value'>${temp}</span></div>
                  <div>BP:<span class='value'>${bp}</span></div>
                  <div>Chest:<span class='value'>${chest}</span></div>
                  <div>H/S:<span class='value'>${hs}</span></div>
                  <div>SpO2:<span class='value'>${spo2}</span></div>
                  <div>Skin:<span class='value'>${skin}</span></div>
                  <div>Blood Sugar:<span class='value'>${bloodsugar}</span></div>
                  <div>CVS:<span class='value'>${cvs}</span></div>
                  <div>ECG:<span class='value'>${ecg}</span></div>
                  <div>PFT:<span class='value'>${pft}</span></div>
                  <div>PA:<span class='value'>${pa}</span></div>
                  <div>Liver:<span class='value'>${liver}</span></div>
                  <div>Spleen:<span class='value'>${spleen}</span></div>
                  <div>Kidney:<span class='value'>${kidney}</span></div>
                  <div>LN:<span class='value'>${ln}</span></div>
              </div>
              <br><br>
              <div class="underline-bold">
                  Investigations: 
              </div>
              <table>
                  ${tablefill(tcells,0)}
              </table>  
                  
                  
                  
              <div class="underline-bold">
                  Other investigations: 
              </div>    
                  R
              <table>
                  ${tablefill(tcells,24)}
              </table>
              <div>
                  <span class='underline-bold'>Special Instructions:</span>
                  <span class='value'>${special}</span>
              </div>    
          </section>
          <div class="right-bottom">
              Doctor’s Signature & Stamp
          </div> 
      </body>
  </html>
  `;

	fs.writeFile(`prescriptions/${sid}-${name}.html`, html, function (err) {
  		if (err) throw err;
  		console.log('Saved!');
	}); 
}