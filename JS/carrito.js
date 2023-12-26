
let carrito = localStorage.getItem("carrito")

if (carrito == null) {
    document.getElementById("carritoVacio").classList.remove("disabled");
} else{
        const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        document.getElementById("carritoProductos").classList.remove("disabled");
        document.getElementById("carritoAcciones").classList.remove("disabled");
        const listaProductos = document.getElementById('carritoProductos');
        // const carritoProductos = document.getElementById('carritoProductos');
        const totalElement = document.getElementById('total');
        let total = 0;

        listaProductos.innerHTML = '';

        carrito.forEach(producto => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <div class="carritoProducto">
                <img class="carritoProductoImg" src="${producto.img}" alt="">
                <div class="carritoProductoNombre">
                    <small>Nombre</small>
                    <h3>${producto.nombre}</h3>
                </div>
                <div class="carritoProductoCantidad">
                    <small>Cantidad</small>
                    <p>01</p>
                </div>
                <div class="carritoProductoPrecio">
                    <small>Precio</small>
                    <p>${producto.precio}</p>
                </div>
                <div class="carritoProductoSubtotal">
                    <small>Subtotal</small>
                    <p>${producto.precio}</p>
                </div>
                <button class="carritoProductoEliminar">🗑️</button>
            </div>
            `;
            listaProductos.appendChild(listItem);

            total +=producto.precio;
        });

        totalElement.textContent = '$' + total;
    }

