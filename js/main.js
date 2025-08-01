const txtName = document.getElementById("Name");
const txtNumber = document.getElementById("Number");

const btnAgregar = document.getElementById("btnAgregar");
const btnClear = document.getElementById("btnClear");

//alertas
const alertValidaciones = document.getElementById("alertValidaciones");
const alertaTexto = document.getElementById("alertValidacionesTexto");

//tabla
const ListaCompras = document.getElementById("tablaListaCompras");
//toma la tabla de arriba para tomar el tagname y empieza en 0
const cesta = ListaCompras.getElementsByTagName("tbody").item(0);

//resumen
const Items = document.getElementById("contadorProductos");
const totalProductos = document.getElementById("productosTotal");
const TotalaPagar = document.getElementById("precioTotal");

let contador = 0;
let costoTotal = 0;
let productosCesta = 0;
//creamos arrglo vacio
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

//click boton agregar
btnAgregar.addEventListener("click", function(event){
    event.preventDefault();
    let todobien = true;
    //limpiamos alertas
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
        //añadimos los elementos a la tabla
        let row = `<tr>
                        <td>${contador}</td>
                        <td>${txtName.value}</td>
                        <td>${txtNumber.value}</td>
                        <td>${precio}</td>
                    </tr>`;
        //nos muestra que elemento se agrega en el local
        let elemento = {
            "contador" : contador,
            "nombre" : txtName.value,
            "cantidad" : txtNumber.value,
            "precio" : precio,
        };
        datos.push(elemento);
        //lo guardadmos en el local como cadena de texto
        localStorage.setItem("datos", JSON.stringify(datos));
        //se agrega debajo del elemento existente
        cesta.insertAdjacentHTML("beforeend", row);

        //indicador de cuantos productos se han agregado
        Items.innerText = contador;
        //total productos y costo
        productosCesta += Number(txtNumber.value);
        totalProductos.innerText = productosCesta;
        costoTotal += precio * Number(txtNumber.value);
        //formato de moneda MXN
        TotalaPagar.innerText = new Intl.NumberFormat("es-MX",
            {style: "currency", currency:"MXN"}).format(costoTotal);
        
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

//cuando refrescamos la pagina
window.addEventListener("load",function(event){
    event.preventDefault();
    //si no esta vacio
    if (this.localStorage.getItem("datos")!=null){
        //transformamos a objeto
        datos = JSON.parse(this.localStorage.getItem("datos"));
        //jalamos el arreglo para mostrarlo
        datos.forEach((datode)=>{
            let row = `<tr>
            <td>${datode.contador}</td>
            <td>${datode.nombre}</td>
            <td>${datode.cantidad}</td>
            <td>${datode.precio}</td>
            </tr>`;
        cesta.insertAdjacentHTML("beforeend", row);
        });
    }
    //si no esta vacio
    if (this.localStorage.getItem("resumen")!=null){
        let resumen = JSON.parse(this.localStorage.getItem("resumen"));
        costoTotal = resumen.costoTotal;
        productosCesta = resumen.productosCesta;
        contador = resumen.contador;
    }
    Items.innerText = contador;
    totalProductos.innerText = productosCesta;
    TotalaPagar.innerText = new Intl.NumberFormat("es-MX",
        {style: "currency", currency:"MXN"}).format(costoTotal);
});

//boton borrar
btnClear.addEventListener("click", function(event){
    event.preventDefault();
    //borrar datos locales
    localStorage.removeItem("datos");
    localStorage.removeItem("resumen");
    //borrar tabla y campos
    cesta.innerHTML = "";
    txtName.value = "";
    txtNumber.value = "";
    txtName.focus();
    //borrar alertas
    alertaTexto.innerHTML = " ";
    alertValidaciones.style.display = "none";
    //empezar en 0 el resumen
    contador = 0;
    costoTotal = 0;
    productosCesta = 0;
    Items.innerText = contador;
    totalProductos.innerText = productosCesta;
    TotalaPagar.innerText = new Intl.NumberFormat("es-MX",
        {style: "currency", currency:"MXN"}).format(costoTotal);
    //borrar datos, el arreglo estara vacio
    datos = new Array();
});
