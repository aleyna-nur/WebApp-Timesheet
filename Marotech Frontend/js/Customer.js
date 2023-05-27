//------------------------GetCustomers---------------------

window.onload=function(){


    var form = document.getElementById('postCustomerForm');
    form.onsubmit = function(event){
        var xhr = new XMLHttpRequest();
        var formData = new FormData(form);
        //open the request
        xhr.open('POST','http://localhost:8080/customer/createCustomer')
        xhr.setRequestHeader("Content-Type", "application/json");

        //send the form data
        xhr.send(JSON.stringify(Object.fromEntries(formData)));

        xhr.onreadystatechange = function() {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                form.reset(); //reset form after AJAX success or do something else
            }
        }
        //Fail the onsubmit to avoid page refresh.
        return false; 
    }
       
    getCustomers();
}


function setCustomerValue(id){
    id = id.substring(4)
    var request = new XMLHttpRequest();
    
        //open the request
    request.open('POST','http://localhost:8080/customer/getCustomerById')
    request.setRequestHeader("Content-Type", "application/json");

        //send the form data
    request.send(JSON.stringify(id));

    request.onload = (e) => {
        customerArray = JSON.parse(request.response)
        document.getElementById("ct_name").setAttribute("value", customerArray.name)
        document.getElementById("ct_location").setAttribute("value", customerArray.location)
        if(customerArray.status == "A"){
            document.getElementById("ct_status").setAttribute("checked", "enabled")
        }
        else{
            document.getElementById("ct_status").removeAttribute("checked")
        }
        document.getElementById("ct_createUser").setAttribute("value", customerArray.createUser)
    
        var form = document.getElementById('putCustomerForm');
        form.onsubmit = function(event){
            request.open('PUT', `http://localhost:8080/customer/customer/${id}`)
            request.setRequestHeader("Content-Type", "application/json");
            var formData = new FormData(form);

            if(!formData.has("status")){
                formData.append("status", "P")
            }
            
            //send the form data
            request.send(JSON.stringify(Object.fromEntries(formData)));
            console.log(JSON.stringify(Object.fromEntries(formData)))

            request.onreadystatechange = function() {
                if (request.readyState == XMLHttpRequest.DONE) {
                    form.reset(); //reset form after AJAX success or do something else
                }
            }
            //Fail the onsubmit to avoid page refresh.
            return false;
        }
    }
}


//-------------------GET Customer----------------------

var customerArray;
function getCustomers() {
    const request = new XMLHttpRequest();
    request.open("GET", "http://localhost:8080/customer/getCustomers");
    request.send();

    request.onload = (e) => {
        customerArray = JSON.parse(request.response);
        
        buildCustomerTable(customerArray);
       
    }
}

var prCustomerDataLenght = 0;

function buildCustomerTable(data){
	var table = document.getElementById('customerTable')
    table.innerHTML = ''

    /*if (prCustomerDataLenght){
        var i = prCustomerDataLenght;
    } else {
        var i = 0;
    }*/

	for (var i = 0; i < data.length; i++){
        var d = new Date(data[i].createDate)
        d = (d.toLocaleDateString('tr-TR', {
            weekday: 'long',
            year: 'numeric',
            month: 'numeric',
            day: 'numeric'
        }))
        
		var row = `<tr>
                        <td>${data[i].id}</td>
                        <td>${data[i].name}</td>
						<td>${data[i].location}</td>
						<td>${data[i].status}</td>
						<td>${d}</td>
						<td>${data[i].createUser}</td>
                        <td><button onclick="setCustomerValue(this.id)" class="btn btn-primary btn-edit" data-bs-toggle="modal" data-bs-target="#put" id = "edit${data[i].id}">Edit</button></td>
					</tr>`
		table.innerHTML += row;

	}

    //prCustomerDataLenght = data.length

}




//------------------------PostCustomers---------------------

    
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
    