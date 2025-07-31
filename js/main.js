const txtName = document.getElementById("Name");
const txtNumber = document.getElementById("Number");
const btnAgregar = document.getElementById("btnAgregar");
const btnClear = document.getElementById("btnClear");
const alertValidaciones = document.getElementById("alertValidaciones");
const alertaTexto = document.getElementById("alertValidacionesTexto");
const ListaCompras = document.getElementById("tablaListaCompras");
//toma la tabla de arriba para tomar el tagname y empieza en 0
const cesta = ListaCompras.getElementsByTagName("tbody").item(0);

let contador = 0;


//condiciones para que el numero sea valido
function errorNum(){
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
//generamos precio random
function precio_rand(){
    return Math.round(Math.random() * 10000) / 100;
}
//click boton
btnAgregar.addEventListener("click", function(event){
    event.preventDefault();
    let todobien = true;
    alertaTexto.innerHTML = " ";
    alertValidaciones.style.display = "none";
    //checamos si el texto es mayor a 3 letras
    if (txtName.value.length < 3){
        txtName.style.border = "thin red solid";
        alertaTexto.innerHTML = "<strong>Producto invalido</strong><br>";
        alertValidaciones.style.display = "block";
        todobien = false;
    }
    //si el numero es valido o no
    if (! errorNum()){
        txtNumber.style.border = "thin red solid";
        alertaTexto.innerHTML += "<strong>Cantidad invalida</strong>";
        alertValidaciones.style.display = "block";
        todobien = false;
    }
    //creacion de elemento
    if(todobien){
        contador++;
        let precio = precio_rand();
        let row = `<tr>
                        <td>${contador}</td>
                        <td>${txtName.value}</td>
                        <td>${txtNumber.value}</td>
                        <td>${precio}</td>
                    </tr>`;
        cesta.insertAdjacentHTML("beforeend", row);
        //limpia los campos de entrada
        txtName.value = "";
        txtNumber.value = "";
        //queda el cursos en el nombre
        txtName.focus();
    }
    
});