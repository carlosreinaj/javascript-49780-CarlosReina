class Producto{
    constructor(id,nombre, precio, img){
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.img = img;
        this.cantidad = 1; //cada vez que se crea un producto va a nacer con valor 1
    }
}

const ATRAPA_PELUSAS = new Producto(1,"Atrapa Pelusas",3000,"../assets/atrapa-pelusas.webp", 1);
const CAMA_PARA_GATO = new Producto(2,"Cama para Gatos",2500,"../assets/cama-gato.webp", 1);
const COMEDERO = new Producto(3,"Comedero",1500,"./assets/comedero.webp", 1);
const CORREA_PERRO = new Producto(4,"Correa de Perros",2500,"../assets/correa-perro.webp", 1);
const DISPENSADOR_AGUA = new Producto(5,"Dispensador de Agua",2000,"../assets/dispensador-de-agua-mascotas.webp", 1);
const GPS_MASCOTA = new Producto(6,"GPS Mascota",2500,"../assets/gps-traquer-mascotas.webp", 1);
const JUGUETE_MASCOTAS = new Producto(7,"Juguete para Mascotas",3500,"../assets/juguetes-mascotas.webp", 1);
const PEINE_MASCOTAS = new Producto(8,"Peine para Mascotas",3500,"../assets/peine-mascotas.webp", 1);
const PERCHERO_PERROS = new Producto(9,"Perchero para Perros",2500,"../assets/perchero-perros.webp", 1);
const RASCADOR_GATOS = new Producto(10,"Rascador para Gatos",3500,"../assets/rascador-gatos.webp", 1);


const PRODUCTOSDIS = [ATRAPA_PELUSAS,CAMA_PARA_GATO,COMEDERO,CORREA_PERRO,DISPENSADOR_AGUA,GPS_MASCOTA,JUGUETE_MASCOTAS,PEINE_MASCOTAS,PERCHERO_PERROS,RASCADOR_GATOS];

    // Función para agregar un producto al carrito
function agregarAlCarrito(id, nombre, precio, cantidad, img) {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carrito.push({ id, nombre, precio, cantidad, img});
    localStorage.setItem('carrito', JSON.stringify(carrito));
    mostrarCarrito();
}

    // Función para mostrar los productos en el carrito
    function mostrarCarrito() {
        const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        const listaProductos = document.getElementById('listaProductos');
        // const carritoProductos = document.getElementById('carritoProductos');
        const totalElement = document.getElementById('total');
        let total = 0;

        listaProductos.innerHTML = '';

        carrito.forEach(producto => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <span>${producto.nombre}</span>
                <span>$${producto.precio}</span>
            `;
            listaProductos.appendChild(listItem);

            total +=producto.precio;
        });

        totalElement.textContent = '$' + total;
    }

// Función para vaciar el carrito
const VACIAR_CARRITO = document.getElementById("vaciarCarro");

VACIAR_CARRITO.addEventListener("click", () =>{
    Swal.fire({
        title: "¿Seguro/a que desea vaciar el carrito?",
        icon: "warning",
        confirmButtonText: "Aceptar",
        showCancelButton: true,
        cancelButtonText: "Cancelar",
    }).then((result) => {
        if (result.isConfirmed) {
            localStorage.removeItem('carrito');
            mostrarCarrito();
            mostrarMensajeCarritoVaciado();
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            mostrarMensajeCancelacion();
        }
    });
});


function mostrarMensajeCarritoVaciado() {
    Swal.fire({
        title: "Ya no hay items en el carrito",
        icon: "success",
        confirmButtonText: "aceptar",
    });
}

function mostrarMensajeCancelacion() {
    Swal.fire({
        title: "No se elimino ningun item",
        icon: "info",
        confirmButtonText: "cancelar",
    });
}

    // Función para generar tarjetas de productos
    function generarTarjetasProductos() {
        const contenedorProductos = document.getElementById('productos');

        PRODUCTOSDIS.forEach(producto => {
            const productoElement = document.createElement('div');
            productoElement.classList.add('card');
            productoElement.innerHTML = `
            <img src="${producto.img}"/>
            <div class="card-body">
                <h4>${producto.nombre}</h4>
                <p>$${producto.precio}</p>
                <button id="boton${producto.id}" onclick="agregarAlCarrito(${producto.id}, '${producto.nombre}', ${producto.precio}, 01, '${producto.img}')">Añadir a Carrito</button>
            `;
            contenedorProductos.appendChild(productoElement);

            const BOTON_TOASTIFY = productoElement.querySelector(`#boton${producto.id}`);
            BOTON_TOASTIFY.addEventListener('click', () => {
                Toastify({
                    text:"Producto agregado al carrito",
                    duration: 1000,
                    position: "right",
                    gravity: "top",
                    style:{
                        background: "#27246d"
                    }
                }).showToast();
            });
        });
    }
    // Mostrar el carrito y generar las tarjetas al cargar la página
    mostrarCarrito();
    generarTarjetasProductos();


    ///preguntas: 
    //como hacer para que al darle cancelar en sweet alert, no se eliminen de iguial forma
    // como hacer para que cuando haya 0 items en el carrito, este igual me diga que no hay nada



//funcion actualizar numerito

function actualizarNumerito(){
    let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerText = nuevoNumerito;
}

localStorage.setItem("producto-en-carrito", JSON.stringify(productosEnCarrito))

const productosEnCarrito = JSON.parse(localStorage.getItem("carrito"));

const carritoVacio =document.getElementById("carritoVacio");
// const carritoProducto =document.getElementById("carritoProductos");
const carritoAcciones =document.getElementById("carritoAcciones");