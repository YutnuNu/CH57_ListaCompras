const txtName = document.getElementById("Name");
const txtNumber = document.getElementById("Number");
const btnAgregar = document.getElementById("btnAgregar");
const btnClear = document.getElementById("btnClear");
const alertValidaciones = document.getElementById("alertValidaciones");
const alertaTexto = document.getElementById("alertValidacionesTexto");


const ListaCompras = document.getElementById("tablaListaCompras");
const tabla = document.getElementsByTagName("tbody");


// let element = document.createElement("li");
//     element.innerText = "Una cosa más en la lista";
// element.classList.add("list-group-item");
// listas.item(0).prepend(element);
// txtnombre.value = txtnombre.value.trim();

function validarnum(){

    if (txtNumber.value.length == 0 ){
        return false;
    }
    if (isNaN(txtNumber.value)){
        return false;
    }
    if (Number(txtNumber.value)<=0){
        return false;
    }
    return true;
}

btnAgregar.addEventListener("click", function(event){
    event.preventDefault();
    alertaTexto.innerHTML = " ";
    alertValidaciones.style.display = "none";
    if (txtName.value.length < 3){
        txtName.style.border = "thin red solid";
        alertaTexto.innerHTML = "<strong>Producto invalido</strong><br>";
        alertValidaciones.style.display = "block";
    }
    if (! validarnum()){
        txtNumber.style.border = "thin red solid";
        alertaTexto.innerHTML += "<strong>Cantidad invalida</strong>";
        alertValidaciones.style.display = "block";
    }
    
    
    
    
    let cesta = document.createElement("tr");
    tabla.item(0).prepend(cesta);
})