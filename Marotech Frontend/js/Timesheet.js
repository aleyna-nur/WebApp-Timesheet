window.onload=function(){

    var form = document.getElementById('postTimesheetForm');
    form.onsubmit = function(event){
        var xhr = new XMLHttpRequest();
        var formData = new FormData(form);

        xhr.open('POST', 'http://localhost:8080/customer/getCustomerById')
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.responseType = 'json'
        xhr.send(JSON.stringify(formData.get('customerId')));

        xhr.onreadystatechange = function() {
            if (xhr.readyState == XMLHttpRequest.DONE) {

                formData.append('Location', xhr.response.name + '/' + xhr.response.location)

                var xhr2 = new XMLHttpRequest();

                xhr2.open('POST','http://localhost:8080/timesheet/createTimesheet')
                xhr2.setRequestHeader("Content-Type", "application/json");

                //send the form data
                xhr2.send(JSON.stringify(Object.fromEntries(formData)));

                xhr2.onreadystatechange = function() {
                    if (xhr2.readyState == XMLHttpRequest.DONE) {
                        form.reset(); //reset form after AJAX success or do something else
                    }
                }
            }
        }
        return false;       
    }

    getTimesheets();
}


function setTimesheetValue(id){
    id = id.substring(4)
    var request = new XMLHttpRequest();
        //open the request
    request.open('POST','http://localhost:8080/timesheet/getTimesheetById')
    request.setRequestHeader("Content-Type", "application/json");
        //send the form data
    request.send(JSON.stringify(id));

    request.onload = (e) => {
        timesheetArray = JSON.parse(request.response)
        document.getElementById("ts_duration").setAttribute("value", timesheetArray.duration)
        //document.getElementById("ts_location").innerHTML = `<option value="">${timesheetArray.location}</option>`
        buildSelectCustomer('ts_location', timesheetArray.location)
        var x = new Date(timesheetArray.timesheetDate)
        //document.getElementById("ts_timesheetDate").setAttribute("value", )
        document.getElementById("ts_description").setAttribute("value", timesheetArray.description)
        document.getElementById("ts_createUser").setAttribute("value", timesheetArray.createUser)

    
        var form = document.getElementById('putTimesheetForm');
        form.onsubmit = function(event){
            var xhr = new XMLHttpRequest();
            var formData = new FormData(form);

            xhr.open('POST', 'http://localhost:8080/customer/getCustomerById')
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.responseType = 'json'
            xhr.send(JSON.stringify(formData.get('customerId')));

            xhr.onreadystatechange = function() {
                if (xhr.readyState == XMLHttpRequest.DONE) {
    
                    formData.append('Location', xhr.response.name +"/"+ xhr.response.location)
    
                    var xhr2 = new XMLHttpRequest();
    
                    xhr2.open('PUT', `http://localhost:8080/timesheet/timesheet/${id}`)
                    xhr2.setRequestHeader("Content-Type", "application/json");

                    //send the form data
                    xhr2.send(JSON.stringify(Object.fromEntries(formData)));
    
                    xhr2.onreadystatechange = function() {
                        if (xhr2.readyState == XMLHttpRequest.DONE) {
                            form.reset(); //reset form after AJAX success or do something else
                        }
                    }
                }
            }
            return false;
        }
    }
}


function deleteTimesheetById(id){
    id = id.substring(6)
    sendHttpRequest("DELETE", "http://localhost:8080/timesheet/deleteTimesheetById", id)
}




//------------------------GetTimesheet---------------------

var timesheetArray;
function getTimesheets() {
    const request = new XMLHttpRequest();
    request.open("GET", "http://localhost:8080/timesheet/getTimesheets");
    request.send();

    request.onload = (e) => {
        //alert(request.response);
        //console.log(request)
        //console.log(request.response)
        timesheetArray = JSON.parse(request.response);
        //console.log(timesheetArray)

        buildTimesheetTable(timesheetArray);
       
    }
}

var prTimesheetDataLenght = 0;

function buildTimesheetTable(data){
	var table = document.getElementById('timesheetTable')
    table.innerHTML = ''

    /*if (prTimesheetDataLenght){
        var i = prTimesheetDataLenght;
    } else {
        var i = 0;
    }*/

	for(var i =0; i < data.length; i++){
        var d = new Date(data[i].createDate)
        d = (d.toLocaleDateString('tr-TR', {
            weekday: 'long',
            year: 'numeric',
            month: 'numeric',
            day: 'numeric'
        }))

        var t = new Date(data[i].timesheetDate)
        t = (t.toLocaleDateString('tr-TR', {
            weekday: 'long',
            year: 'numeric',
            month: 'numeric',
            day: 'numeric'
        }))

		var row = `<tr>
                        <td>${data[i].id}</td>
                        <td>${data[i].userId}</td>
                        <td>${data[i].location}</td>
						<td hidden>${data[i].customerId}</td>
						<td>${t}</td>
						<td>${data[i].duration}</td>
                        <td>${data[i].taskId}</td>
                        <td>${data[i].description}</td>
                        <td>${d}</td>
                        <td>${data[i].createUser}</td>
                        <td><button onclick="deleteTimesheetById(this.id)" class="btn btn-primary btn-delete" id = "delete${data[i].id}">Delete</button>
                        <button onclick="setTimesheetValue(this.id)" onclick="buildSelectCustomer('ts_location')" class="btn btn-primary btn-edit" data-bs-toggle="modal" data-bs-target="#put" id = "edit${data[i].id}">Edit</button></td>
					</tr>`
		table.innerHTML += row;

	}
    //prTimesheetDataLenght = data.length
}


//------------------------PostTimesheet---------------------



const sendHttpRequest = (method, url, data) => {
    const promise = new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url);
    
    xhr.responseType = 'json';
    
    if (data) {
        xhr.setRequestHeader('Content-Type', 'application/json');
    }
    
    xhr.onload = () => {
        if (xhr.status >= 400) {
            reject(xhr.response);
        } else {
            resolve(xhr.response);
        }
    };
    
    xhr.onerror = () => {
        reject('Something went wrong!');
    };
    
    xhr.send(JSON.stringify(data));
    });
    return promise;
};




function buildSelectCustomer(id){

    const request = new XMLHttpRequest();
    request.open("GET", "http://localhost:8080/customer/getCustomers");
    request.send();

    request.onload = (e) => {
        //alert(request.response);
        //console.log(request)
        //console.log(request.response)
        selectArray = JSON.parse(request.response);
        //console.log(timesheetArray)

        var selectObj = document.getElementById(id)
        selectObj.innerHTML = '<option value="">Please choose a customer</option>'

        for (var i=0; i < selectArray.length; i++){
            var row = `<option value = ${selectArray[i].id}>${selectArray[i].name}/${selectArray[i].location}</option>`
            selectObj.innerHTML += row;
        }       
    }
}


function buildSelectCustomer(id, option = '' ){

    const request = new XMLHttpRequest();
    request.open("GET", "http://localhost:8080/customer/getCustomers");
    request.send();

    request.onload = (e) => {
        //alert(request.response);
        //console.log(request)
        //console.log(request.response)
        selectArray = JSON.parse(request.response);
        //console.log(timesheetArray)

        var selectObj = document.getElementById(id)
        selectObj.innerHTML ='<option value="">Please choose a customer</option>'

        for (var i=0; i < selectArray.length; i++){
            if(option == `${selectArray[i].name}/${selectArray[i].location}`){
                var row = `<option selected value = ${selectArray[i].id}>${selectArray[i].name}/${selectArray[i].location}</option>`
            }
            else{
                var row = `<option value = ${selectArray[i].id}>${selectArray[i].name}/${selectArray[i].location}</option>`
            }
            selectObj.innerHTML += row;
        }       
    }
}



