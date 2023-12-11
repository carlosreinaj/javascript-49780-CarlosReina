class Producto{
    constructor(id,nombre, precio, img){
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.img = img;
        this.cantidad = 1; //cada vez que se crea un producto va a nacer con valor 1
    }
}

const ATRAPA_PELUSAS = new Producto(1,"Atrapa Pelusas",3000,"./assets/atrapa-pelusas.webp");
const CAMA_PARA_GATO = new Producto(2,"Cama para Gatos",2500,"./assets/cama-gato.webp");
const COMEDERO = new Producto(3,"Comedero",1500,"./assets/comedero.webp");
const CORREA_PERRO = new Producto(4,"Correa de Perros",2500,"./assets/correa-perro.webp");
const DISPENSADOR_AGUA = new Producto(5,"Dispensador de Agua",2000,"./assets/dispensador-de-agua-mascotas.webp");
const GPS_MASCOTA = new Producto(6,"GPS Mascota",2500,"./assets/gps-traquer-mascotas.webp");
const JUGUETE_MASCOTAS = new Producto(7,"Juguete para Mascotas",3500,"./assets/juguetes-mascotas.webp");
const PEINE_MASCOTAS = new Producto(8,"Peine para Mascotas",3500,"./assets/peine-mascotas.webp");
const PERCHERO_PERROS = new Producto(9,"Perchero para Perros",2500,"./assets/perchero-perros.webp");
const RASCADOR_GATOS = new Producto(10,"Rascador para Gatos",3500,"./assets/rascador-gatos.webp");


const PRODUCTOSDIS = [ATRAPA_PELUSAS,CAMA_PARA_GATO,COMEDERO,CORREA_PERRO,DISPENSADOR_AGUA,GPS_MASCOTA,JUGUETE_MASCOTAS,PEINE_MASCOTAS,PERCHERO_PERROS,RASCADOR_GATOS];

// const PRODUCTOSDIS = [
//     { id: 1, nombre: 'Atrapa Pelusas', precio: 3000, img:'./assets/atrapa-pelusas.webp'},
//     { id: 2, nombre: 'Cama para Gatos', precio: 2500, img: "./assets/cama-gato.webp"},
//     { id: 3, nombre: 'Comedero', precio: 30 },
//     { id: 4, nombre: 'Correa de Perros', precio: 30 },
//     { id: 5, nombre: 'Dispensador de Agua', precio: 30 },
//     { id: 6, nombre: 'GPS Mascota', precio: 30 },
//     { id: 7, nombre: 'Juguete para Mascotas', precio: 30 },
//     { id: 8, nombre: 'Peine para Mascotas', precio: 30 },
//     { id: 9, nombre: 'Perchero para Perros', precio: 30 },
//     { id: 10, nombre: 'Rascador para Gatos', precio: 30 },
// ];

    // Función para agregar un producto al carrito
function agregarAlCarrito(id, nombre, precio) {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carrito.push({ id, nombre, precio });
    localStorage.setItem('carrito', JSON.stringify(carrito));
    mostrarCarrito();
}

    // Función para mostrar los productos en el carrito
    function mostrarCarrito() {
        const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        const listaProductos = document.getElementById('listaProductos');
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
    function vaciarCarrito() {
        localStorage.removeItem('carrito');
        mostrarCarrito();
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
                <button id="boton${producto.id}" onclick="agregarAlCarrito(${producto.id}, '${producto.nombre}', ${producto.precio})">Añadir a Carrito</button>
            `;
            contenedorProductos.appendChild(productoElement);
        });
    }
    // Mostrar el carrito y generar las tarjetas al cargar la página
    mostrarCarrito();
    generarTarjetasProductos();

