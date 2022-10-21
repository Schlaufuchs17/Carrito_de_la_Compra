var nombre;
var precio;
var unidades;
var botonAñadir;
var articulosCarrito;
var precioTotal;
var pago;
var pagoTarjeta;
var pagoEfectivo;
var condiciones;
var imprimir;
var restablecer;
var aceptarPago;
var sumaPrecio;
var sumaTotal = 0 ;
var errorTitular;
var errorTarjeta;
var errorCvv;
var nombreTarjeta;
var numTarjeta;
var cvv;
var importeEfectivo;
var errorEfectivo;

/*PATRON PARA QUE SOLO ACEPTE NUMEROS Y LETRAS DONDE CORRESPONDA*/
let validarPrecio = /^\d+([,.]\d{1,4})?$/; // Que acepte numeros entre 1-4 cifras
let validarNombre = /^[a-zA-Z\s]{3,30}?$/; // Que acepte nombres entre 3-30 letras


/*MANEJADOR DE EVENTOS */
function manejadorEventos(){
    pago.addEventListener("change", cargarPago);
    botonAñadir.addEventListener("click",validarArticulo);
    condiciones.addEventListener("change",activadorCondiciones);
    imprimir.addEventListener("click", validarPago);
    restablecer.addEventListener("click", restablecerFormu);
}

window.onload = function(){
    inicializar();
    manejadorEventos();
}

/*VALIDACION DE ARTICULOS/PRECIOS */
function validarArticulo(){
    var error = 0;
    
    /*ERROR AL METER EL ARTICULO*/
    if (!validarNombre.test(nombre.value)){
        errorNombre.innerHTML="Este articulo no es valido";
        nombre.focus();
        error++;
    }else{
        errorNombre.innerHTML= "";
    } 
    
    /*ERROR AL METER EL PRECIO*/
    if(!validarPrecio.test(precio.value)){
        errorPrecio.innerHTML= "Precio incorrecto";
        precio.focus();
        error++;
    }else{
        errorPrecio.innerHTML="";
    }

    if(error==0){
        añadirCompra();
    }       
}

/*VALIDACION DE PAGO */
function validarPago(){
    
    let validarNumero = /^\d{16}$/; //Hay que poner 16 cifras en el numero de tarjeta, los que hay en la realidad
    let validarCvv = /^\d{3}$/; //Tres cifras del CVV
    var error = 0;

    if(precioTotal.value==0){
        alert("El carrito está vacío");
    }
    
    else{
        if(pago.value=="Seleccione"){
            alert("Por favor, seleccione un método de pago válido");
            error++;
        }
        
        if(pago.value=="tarjeta"){
            if(!validarNombre.test(nombreTarjeta.value)){
                errorTitular.innerHTML = "Por favor, introduzca un nombre válido";
                error++;
            }
            
            else{
                errorTitular.innerHTML = "";
            }
            
            if(numTarjeta.value ==""){
                errorTarjeta.innerHTML ="Por favor, introduzca un número válido";
                error++;
            }
            
            else{
                errorTarjeta.innerHTML = "";
            }
            
            if(!validarNumero.test(numTarjeta.value)){
                errorTarjeta.innerHTML = "Por favor, introduzca un número válido";
                error++;
            }
            
            else{
                errorTarjeta.innerHTML = "";
            }

            if(cvv.value =="" ){
                errorCvv.innerHTML = "Por favor, introduzca un CVV válido";
                error++;
            }
            
            else{
                errorCvv.innerHTML = "";
            }

            if(!validarCvv.test(cvv.value)){
                errorCvv.innerHTML = "Por favor, introduzca un CVV válido";
                error++;
            }
            
            else{
                errorCvv.innerHTML = "";
            }
        }
        if(pago.value=="efectivo"){
             
            if(importeEfectivo.value == ""){
                errorEfectivo.innerHTML = "Introduzca cantidad";
                error++;
            }
            
            else{
                errorEfectivo.innerHTML = "";
            }

            if(!validarPrecio.test(importeEfectivo.value)){
                errorEfectivo.innerHTML = "Por favor, introduzca el dinero en metálico ingresado";
                error++;
            }
            
            else{
                errorEfectivo.innerHTML = "";
            }
        }

        if (error==0){
            imprimirPago();
        }

    }    
}

/*IMPRIMIR PAGO */
function imprimirPago(){
    if(pago.value=="efectivo"){
        if(precioTotal.value>importeEfectivo.value){
            
            /*SI EL IMPORTE INTRODUCIDO ES MENOR*/
            alert("Faltan "+(precioTotal.value-importeEfectivo.value)+"€"); 
        }
        
        /*CALCULAR EL CAMBIO -------REVISAR POR SI NO LO HACE BIEN------- */
        else{
            alert("Los artículos son: " + articulosCarrito.value +"\n El precio total es: "
            + precioTotal.value +"€" + "\nForma de pago: "+ pago.value+"\nCambio: " +(importeEfectivo.value-precioTotal.value)+"€");
        }
    }
    
    /*MENSAJE CON LOS DATOS INTRODUCIDOS EN EL CARRITO */
    else{
        alert("Los artículos son: " + articulosCarrito.value +"\n El precio total es: "
        + precioTotal.value +"€" + "\nForma de pago: "+ pago.value);
    }    
}

/*CARGAR PAGO */
function cargarPago(){

    if(pago.value == "Seleccione"){
        pagoEfectivo.style.display="none";
        pagoTarjeta.style.display="none";
    }
    else 
    
    if(pago.value =="tarjeta"){
        pagoEfectivo.style.display="none";
        pagoTarjeta.style.display="block";
    }

    else{
        pagoEfectivo.style.display="block";
        pagoTarjeta.style.display="none";
    }
}

/*AÑADIR COMPRA A LA CESTA*/
function añadirCompra(){
    if(articulosCarrito.value ==""){
        articulosCarrito.value = nombre.value;
    }else{
        articulosCarrito.value=articulosCarrito.value.concat(", ",nombre.value);
    }    
    sumaPrecio = precio.value * unidades.value;
    sumaTotal+=sumaPrecio;
    precioTotal.value = sumaTotal; 
    nombre.value = "";
    precio.value = "";
    unidades.value = 1;
    nombre.focus();   
}

/*INICIALIZAR EL PROCESO */
function inicializar(){
    nombre = document.getElementById("nombre");
    errorNombre = document.getElementById("errorNombre");
    precio = document.getElementById("precio");
    errorPrecio = document.getElementById("errorPrecio");
    unidades = document.getElementById("unidades");
    botonAñadir = document.getElementById("botonAñadir");
    articulosCarrito = document.getElementById("articulosCarrito");
    precioTotal = document.getElementById("precioTotal");
    pago = document.getElementById("pago");
    condiciones = document.getElementById("condiciones");
    imprimir = document.getElementById("imprimir");
    restablecer = document.getElementById("restablecer");   
    pagoTarjeta = document.getElementById("pagoTarjeta");
    pagoEfectivo = document.getElementById("pagoEfectivo");
    aceptarPago = document.getElementById("aceptarPago");
    errorTitular = document.getElementById("errorTitular");
    errorTarjeta = document.getElementById("errorTarjeta");
    errorCvv = document.getElementById("errorCvv");
    nombreTarjeta = document.getElementById("nombreTarjeta");
    numTarjeta = document.getElementById("numTarjeta");
    cvv = document.getElementById("cvv");
    importeEfectivo = document.getElementById("importeEfectivo");
    errorEfectivo = document.getElementById("errorEfectivo");

    aceptarPago.style.display="block";
    pagoEfectivo.style.display="none";
    pagoTarjeta.style.display="none";
    
    nombre.focus();
    imprimir.disabled = true; 
    
    articulosCarrito.disabled=true;
    precioTotal.disabled=true;
}

/*ACTIVADOR DE CONDICIONES */
function activadorCondiciones(){
    if(condiciones.checked == true){
        imprimir.disabled = false;
    }else{
        imprimir.disabled = true;
    }
}

/*RESTABLECER FORMULARIO*/
function restablecerFormu(){
     document.getElementById("formulario").reset();
     errorPrecio.innerHTML="";
     errorNombre.innerHTML="";
     errorTitular.innerHTML = "";
     errorTarjeta.innerHTML = "";
     errorCvv.innerHTML = "";
     errorEfectivo.innerHTML = "";
     pagoEfectivo.style.display="none";
     pagoTarjeta.style.display="none";
     condiciones.checked=false;
     imprimir.disabled = true;
     nombre.focus();
}