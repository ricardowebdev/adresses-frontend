var baseBackend = 'http://127.0.0.1:8000/api/';
var cepApi = 'https://cep.awesomeapi.com.br/json/';
var validateOnce = 0;

// Listeners
document.addEventListener("DOMContentLoaded", function(e) {    
    var zipcode      = document.getElementById("zipcode");
    var state        = document.getElementById("state");
    var city         = document.getElementById("city");
    var district     = document.getElementById("district");
    var address      = document.getElementById("address");
    var number       = document.getElementById("number");
    var contactName  = document.getElementById("contactName");
    var contactPhone = document.getElementById("contactPhone");
    var contactEmail = document.getElementById("contactEmail");
    var editId       = document.getElementById("editId");
    var deleteId     = document.getElementById("deleteId");


    sendRequest(`${baseBackend}states`, "GET", FeedStates);

    zipcode.addEventListener("focusout", function() {
        if (this.value) {
            sendRequest(`${cepApi}${this.value}`, "GET", feedFormApi);
        }
    });

    getAdresses();    
});

function getAdresses() {
    sendRequest(`${baseBackend}mongo/address`, "GET", feedTable);
}

function getAddress(id) {
    clearForm();
    editId.value = id;
    sendRequest(`${baseBackend}mongo/address/${id}`, "GET", feedFormBackend);
}

function confirmDelete() {
    sendRequest(`${baseBackend}mongo/address/${deleteId.value}`, "DELETE", getAdresses, null, true);
}

function FeedStates(response) {
    let options = '';

    response.map(resp => { 
        options += `<option >${resp.sigla}</option>`;
    });

    state.innerHTML = options;
}

function clearForm() {
    zipcode.value = "";
    state.value = "";
    city.value = "";
    district.value = "";
    address.value = "";
    number.value = "";
    contactName.value = "";
    contactPhone.value = "";
    contactEmail.value = "";
    deleteId.value = "";
    editId.value = "";
    validateOnce = 0;
}

function feedFormApi(response) {
    city.value = response.city;
    state.value = response.state;
    district.value = response.district;
    address.value = response.address_type + ' ' + response.address_name
    number.focus();
}

function feedFormBackend(response) {
    response = response[0] || false;
    if (response) {
        zipcode.value = response.cep;
        city.value = response.cidade;
        state.value = response.estado;
        district.value = response.bairro;
        address.value = response.endereco;
        number.value = response.numero;
        contactName.value = response.nome_contato;
        contactPhone.value = response.telefone_contato;
        contactEmail.value = response.email_contato;
    }
}

function feedTable(response) {
    let table = document.getElementById('main-table');
    table.innerHTML = '';
    let tableText = '';
    
    response = Object.values(response);

    if (response !== undefined && response[0]) {
        try {
            response.map(line => {
                tableText += `
                <tr>
                    <td>${line.cep}</td>
                    <td>${line.estado}</td>
                    <td>${line.cidade}</td>
                    <td>${line.nome_contato}</td>
                    <td>${line.telefone_contato}</td>
                    <td>
                        <button class="btn btn-sm btn-warning fw-bold m-1" 
                                data-bs-toggle="modal" 
                                data-bs-target="#adressModal"
                                onclick="getAddress(${line.id})" 
                                style="width: 77px">
                            Editar
                        </button>                    
                        <button class="btn btn-sm btn-secondary fw-bold m-1"
                                data-bs-toggle="modal"
                                data-bs-target="#removeModal"
                                style="width: 77px"
                                onclick="feedDelete(${line.id})">
                            Remover
                        </button>
                    </td>
                </tr>`;
            });
        } catch(exception) {
            console.log(exception);
            tableText += `
            <tr>
                <td colspan="6">Não há informações a serem exibidas</td>
            </tr>`;
        }

    }

    table.innerHTML = tableText;
}

function feedDelete(id) {
    clearForm();
    deleteId.value = id;
}

function feedAlert(message, type) {
    let div = document.getElementById('alert-container');
    let text = `
        <div class="alert alert-${type} alert-dismissible fade show" role="alert">
            ${message}
        </div>    
    `;
    div.innerHTML = text;

    setTimeout(() => {
        div.innerHTML = '';
    }, 2000);
}

function feedSpanWarning(text, field) {
    let span = document.getElementById(`span-${field}`);
    span.innerHTML = text;
}

function sendForm() {
    const form = JSON.stringify({
        "cep": zipcode.value,
        "estado": state.value,
        "cidade": city.value,
        "bairro": district.value,
        "endereco": address.value,
        "numero": number.value,
        "nome_contato": contactName.value,
        "email_contato": contactEmail.value,
        "telefone_contato": contactPhone.value,
        "active": "1"
    });

    editId.value 
        ? sendRequest(`${baseBackend}mongo/address/${editId.value}`, "PUT", getAdresses, form, true)
        : sendRequest(`${baseBackend}mongo/address`, "POST", getAdresses, form, true);

    clearValidations();
    clearForm();
    document.getElementById('closeModal').click();
}


function validateForm(submit = false) {
    if (!validateOnce && !submit) {
        return;
    }

    invalid = 0;
    validateOnce = 1;
    clearValidations();
    if (zipcode.value == "" || zipcode.value.length < 7) {
        feedSpanWarning("Cep inválido", "zipcode");
        invalid = 1;
    }

    if (state.value == "") {
        feedSpanWarning("Estado inválido", "state");
        invalid = 1;
    }

    if (city.value == "" || city.value.length < 3) {
        feedSpanWarning("Cidade inválida", "city");
        invalid = 1;
    }

    if (district.value == "" || district.value.length < 3) {
        feedSpanWarning("Bairro inválido", "district");
        invalid = 1;
    }

    if (address.value == "" || address.value.length < 3) {
        feedSpanWarning("Endereço não pode ficar em branco", "address");
        invalid = 1;
    }

    if (contactName.value == "" || contactName.value.length < 3) {
        feedSpanWarning("Nome não pode ficar em branco", "contactName");
        invalid = 1;
    }

    if (contactPhone.value == "" || contactPhone.value.length < 10) {
        feedSpanWarning("Telefone inválido", "contactPhone");
        invalid = 1;
    }

    if (contactEmail.value == "" || !validateEmail(contactEmail.value)) {
        feedSpanWarning("E-mail inválido", "contactEmail");
        invalid = 1;
    }

    if (!invalid) {
        sendForm();
    }

    return;
}

function clearValidations() {
    feedSpanWarning("", "zipcode");
    feedSpanWarning("", "state");
    feedSpanWarning("", "city");
    feedSpanWarning("", "district");
    feedSpanWarning("", "address");
    feedSpanWarning("", "contactName");
    feedSpanWarning("", "contactPhone");
    feedSpanWarning("", "contactEmail");
}

function sendRequest(url, method = "GET", callBackfunction, form = null, feedback = false) {
    try {
        let request = new XMLHttpRequest();
        request.open(method, url, true);
        
        if (form) {
            request.setRequestHeader("Content-Type", "application/json");
            request.send(form);
        } else {
            request.send();
        }
    
        request.addEventListener("readystatechange", function() {
            if (this.readyState === 4) {
                if (this.status == 200 || this.status == 201) {
                    let response = handleResponse(this.responseText);
                    if (feedback) {
                        feedAlert("Operação realizada com sucesso", 'success');
                    }
                    callBackfunction(response);    
                } else if(this.status !== 200 || this.status !== 201) {
                    feedAlert(this.responseText || "Lamentamos, mas algo inesperado ocorreu", "warning");
                    document.getElementById('closeModal').click();
                }
            }
        });
    
        return true;
    
    } catch(exception) {
        feedAlert("Lamentamos, mas algo inesperado ocorreu", "warning");
        document.getElementById('closeModal').click();
        console.log(exception);
        return false;
    }
}

function handleResponse(responseText) {
    if(typeof(responseText) === "string") {
        try {
            return JSON.parse(responseText)
        } catch(exception) {
            return responseText;
        }            
    }

    return responseText;
}

function validateEmail(email) {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

