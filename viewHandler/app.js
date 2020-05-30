const Store = require('electron-store');
const store = new Store();
const uuid = require('uuid');
const fs = require('fs');
const path = require('path');
const dirPath = path.join(__dirname, '../../new.html');
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
	let n,g,d,p,s,sid,a,e='';
	if(type=='add')
		sid=uuid.v4();
	else{
		sid=id;
		e = 'Edit';
		$('#table').css('display','');
		$('#update').css('display','none');		
	}

	n=$('#name'+e).val();
	g=$('#gender'+e).val();
	d=$('#date'+e).val();
	a=$('#age'+e).val();
	p=$('#phn'+e).val();
	s=$('#side'+e).val();
	p1=$('#p1'+e).val();
	p2=$('#p2'+e).val();
	p3=$('#p3'+e).val();
	p4=$('#p4'+e).val();
	p5=$('#p5'+e).val();
	i1=$('#i1'+e).val();
	i2=$('#i2'+e).val();
	i3=$('#i3'+e).val();
	i4=$('#i4'+e).val();
	i5=$('#i5'+e).val();
	
	let ps=[p1,p2,p3,p4,p5];
	let is=[i1,i2,i3,i4,i5];
	
	let obj = {
		name:n,
		gender:g,
		date:d,
		age:a,
		phone:p,
		sidenote:s,
		prescription:ps,
		instructions:is
	}

	store.set(`db.${sid}`,obj);
	setTable();

	writer(obj);

}


function setTable(){
	let db = store.get('db');
	$('#table').html(`<tr><th>Patient Name</th><th>Date</th><th>Gender</th><th>Edit/Delete</th></tr>`);
	Object.keys(db).forEach(patient=>{
		$('#table').append(
			`<tr>
		        <td>${db[patient].name}</td>
		        <td>${db[patient].date}</td>
		        <td>${db[patient].gender}</td>
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
	$('#appendForm').submit((e)=>{
		saveHandler('edit',id);
	});

	let e='Edit';
	let db = store.get('db');
	$("#update label").addClass('active');
	$('#name'+e).val(db[id].name).trigger("change");
	$('#gender'+e).val(db[id].gender).trigger("change");
	$('#date'+e).val(db[id].date);
	$('#age'+e).val(db[id].age);
	$('#phn'+e).val(db[id].phone);
	$('#side'+e).val(db[id].sidenote);
	$('#p1'+e).val(db[id].prescription[0]);
	$('#p2'+e).val(db[id].prescription[1]);
	$('#p3'+e).val(db[id].prescription[2]);
	$('#p4'+e).val(db[id].prescription[3]);
	$('#p5'+e).val(db[id].prescription[4]);
	$('#i1'+e).val(db[id].instructions[0]);
	$('#i2'+e).val(db[id].instructions[1]);
	$('#i3'+e).val(db[id].instructions[2]);
	$('#i4'+e).val(db[id].instructions[3]);
	$('#i5'+e).val(db[id].instructions[4]);
	
}


function editHandler(){

}


function deleteHandler(id){
	let db = store.get('db');
	delete db[id];
	store.set('db',db); 
	setTable();
}



function writer(obj){
	var html = `<!DOCTYPE html>
			<html lang="en">
			<head>
				<meta charset="UTF-8">
				<title>Sample Presciption</title>
				<style type="text/css">
					*{
						margin:0px;
						padding: 0;
					}
					html,body{
						height: 860px;
						width: 700px;
						position: relative;
					}
					html{
						margin: auto;
						margin-top: 20px;
					}
					.center-header{
						position: absolute;
						left: 50%;
						top: -8%;
						transform: translateX(-50%);
						font-size: 35px;
						border-radius: 10px;
						padding: 5px;
						border: 4px solid;
					}
					.hcontainer{
						padding: 20px;
						display: flex;
						justify-content: space-between;
						margin-top: 100px;
						font-size: 18px;
					}
					.bottom{
						border-top: 3px solid black;
						padding-top: 5px;
						width: 100%;
						text-align: center;
						position: absolute;
						bottom:3%;
						font-size: 20px;
					}
					.side-note{
						margin-top:75px;
						margin-left: 10px; 
						width: 125px;
						height: 350px;
						font-size: 17px;
					}
					.details{
						display: flex;
						justify-content: space-around;
						font-size: 20px;
						font-weight: 800;
					}
					.rx{
						position: absolute;
						top: 35%;
						left: 29%;

					}
					.pContainer{
						position: absolute;
						top: 40%;
						left: 33%;
						width: 66%;
						height: 43%;
						font-size: 20px;
					}
				</style>
			</head>
			<body>
				<span class='center-header'>I Treat He Cures</span>
				<div class="hcontainer">
				<div class="left" style="text-align: right;">
					<h2>Dr S.K. Das</h2>
					D.H.M.S.(BU),<br>
					M.D.E.H.(KNP),ND(LKO),<br>
					Experienced in chronic &<br>
					complicated diseases,<br>
					Regd:Central council of<br>
					Homoeopathy(New Delhi)<br><br>
					<h2>Dr D.C.Verma</h2>
					D.B.M.S.(Cal)
				</div>
				<div class="right" style="text-align: center;letter-spacing: 0.4px;">
					<h3>VERMA HOMOEO CLINIC</h3>
					<h4>MIG-54,Hanuman Nagar</h4> 
					Kankarbagh,Patna -800020<br>                                       
					CONSULTING HOURS<br>
					9.00 A.M. to 12.00 P.M.<br>
					5.30 P.M. to 08.30 P.M.<br>
					Contact No-<br>
					9835050075<br>
					9771417464<br>
					Sunday Closed
				</div>
				</div>


			<div class="details"><span>Name : ${obj.name}</span> <span>Age:${obj.age}</span> <span>Sex:${obj.gender[0]}</span></div>
			<div class="side-note">
			${obj.sidenote}	
			</div>
			<img src="rx.png" height="40" width="40" alt="Rx" class="rx">

			<div class="pContainer">
				${obj.prescription[0]}<br>
			    <p style="padding-left:22px">${obj.instructions[0]}</p><br>
				${obj.prescription[1]}<br>
			    <p style="padding-left:22px"> ${obj.instructions[1]}</p><br>
				${obj.prescription[2]}<br>
			    <p style="padding-left:22px"> ${obj.instructions[2]}</p><br>
				${obj.prescription[3]}<br>
			    <p style="padding-left:22px"> ${obj.instructions[3]}</p><br>
				${obj.prescription[4]}<br>
			    <p style="padding-left:22px"> ${obj.instructions[4]}</p><br>
				
			</div>



			 
			<div class="bottom">परहेज:कच्चे प्याज, लहसुन, अदरक, आम और इमली का अचार, हिंग और नशीली वस्तुएं</div>


			</body>
			</html>`;





	fs.writeFile(`../${obj.name}-${obj.date}.html`, html, function (err) {
  		if (err) throw err;
  		console.log('Saved!');
	}); 
}