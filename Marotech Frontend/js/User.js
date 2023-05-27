src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"

   

window.onload=function(){
    //const getUserBtn = document.getElementById('getUser-btn');
    const postUserBtn = document.getElementById('postUser-btn');

    var form = document.getElementById('postUserForm');
    form.onsubmit = function(event){
        var xhr = new XMLHttpRequest();
        var formData = new FormData(form);
        //open the request
        xhr.open('POST','http://localhost:8080/user/createUser')
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
    
    getUsers();
}


//------------------------PUT Users---------------------

function setUserValue(id){
    id = id.substring(4)
    var request = new XMLHttpRequest();
    
        //open the request
    request.open('POST','http://localhost:8080/user/getUserById')
    request.setRequestHeader("Content-Type", "application/json");

        //send the form data
    request.send(JSON.stringify(id));

    request.onload = (e) => {
        userArray = JSON.parse(request.response)
        document.getElementById("u_name").setAttribute("value", userArray.name)
        document.getElementById("u_email").setAttribute("value", userArray.email)
        if(userArray.status == "A"){
            document.getElementById("u_status").setAttribute("checked", "enabled")
        }
        else{
            document.getElementById("u_status").removeAttribute("checked")
        }
        document.getElementById("u_createUser").setAttribute("value", userArray.createUser)
        document.getElementById("u_role").setAttribute("value", userArray.role)
    
        var form = document.getElementById('putUserForm');
        form.onsubmit = function(event){
            request.open('PUT', `http://localhost:8080/user/user/${id}`)
            request.setRequestHeader("Content-Type", "application/json");
            var formData = new FormData(form);

            if(!formData.has("status")){
                formData.append("status", "P")
            }
            
            //send the form data
            request.send(JSON.stringify(Object.fromEntries(formData)));

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



//------------------------GetUsers---------------------

var userArray;
function getUsers() {
    const request = new XMLHttpRequest();
    request.open("GET", "http://localhost:8080/user/getUsers");

    request.send();

    request.onload = (e) => {
        userArray = JSON.parse(request.response);

        buildUserTable(userArray)
       
    }
}

var prUserDataLenght = 0;

function buildUserTable(data){
	var table = document.getElementById('userTable')

    table.innerHTML = ''

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
						<td>${data[i].email}</td>
                        <td>${d}</td>
						<td>${data[i].status}</td>
						<td>${data[i].createUser}</td>
						<td>${data[i].role}</td>
                        <td><button onclick="setUserValue(this.id)" class="btn btn-primary btn-edit" data-bs-toggle="modal" data-bs-target="#put" id = "edit${data[i].id}">Edit</button></td>
					</tr>`
		table.innerHTML += row;

	}
    //prCustomerDataLenght = data.length
}


//------------------------PostUsers---------------------

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

