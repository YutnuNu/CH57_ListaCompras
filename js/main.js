const txtName = document.getElementById("Name");
const txtNumber = document.getElementById("Number");

const btnAgregar = document.getElementById("btnAgregar");
const btnClear = document.getElementById("btnClear");

const alertValidaciones = document.getElementById("alertValidaciones");
const alertaTexto = document.getElementById("alertValidacionesTexto");

const ListaCompras = document.getElementById("tablaListaCompras");
//toma la tabla de arriba para tomar el tagname y empieza en 0
const cesta = ListaCompras.getElementsByTagName("tbody").item(0);

const Items = document.getElementById("contadorProductos");
const totalProductos = document.getElementById("productosTotal");
const TotalaPagar = document.getElementById("precioTotal");

let contador = 0;
let costoTotal = 0;
let productosCesta = 0;
let datos = new Array();

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
        //nos muestra que elemento se agrega
        let elemento = {
            "contador" : contador,
            "nombre" : txtName.value,
            "cantidad" : txtNumber.value,
            "precio" : precio,
        };
        datos.push(elemento);
        //lo guardadmos en el local
        localStorage.setItem("datos", JSON.stringify(datos));
        //se agrega debajo del elemento existente
        cesta.insertAdjacentHTML("beforeend", row);
        //indicador de cuantos productos se han agregado
        Items.innerText = contador;
        //total productos
        productosCesta += Number(txtNumber.value);
        totalProductos.innerText = productosCesta;
        costoTotal += precio * Number(txtNumber.value);
        //formato de moneda MXN
        TotalaPagar.innerText = new Intl.NumberFormat("es-MX",
            {style: "currency", currency:"MXN"}).format(costoTotal);
        //"$" + costoTotal;
        //generamos el objeto donde estan todos los datos
        let resumen = {
            "contador":contador,
            "productosCesta":productosCesta,
            "costoTotal":costoTotal,
        };
        //guardamos en local como cadena de texto
        localStorage.setItem("resumen",JSON.stringify(resumen));
        //limpia los campos de entrada
        txtName.value = "";
        txtNumber.value = "";
        //queda el cursos en el nombre
        txtName.focus();
    }
    
});