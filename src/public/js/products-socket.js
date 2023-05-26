const socket = io();
import ProductManager from "../managers/productManager.js";

// Manager y router
const productManager = new ProductManager();

let nombre = "";

async function asyncWraper() {
    const { value: nombreIngresado } = await Swal.fire({
        title: "Ingresa tu nombre",
        input: "text",
        inputLabel: "Tu nombre",
        inputValue: "",
        showCancelButton: false,
        allowOutsideClick: false,
        inputValidator: (value) => {
            if (!value) {
                return "Por favor completar";
            }
        },
    });
    nombre = nombreIngresado;
    document.getElementById("span-nombre").innerHTML = nombre;
}
//
asyncWraper();


function enviarFormulario(event) {
    event.preventDefault(); // Evita el envío del formulario por defecto

    // Obtiene los valores de los campos del formulario
    const formulario = document.getElementById("mi-formulario");
    const formData = new FormData(formulario);
    const name = formData.get("name");
    const description = formData.get("description");
    const price = formData.get("price");
    const thumbnail = formData.get("thumbnail");
    const code = formData.get("code");
    const stock = formData.get("stock");

    // Crea un objeto 'product' con los datos del formulario
    const product = {
        name: name,
        description: description,
        price: price,
        thumbnail: thumbnail,
        code: code,
        stock: stock
    };

    // Llama a la función 'createProduct' y pasa el objeto 'product'
    productManager.createProduct(product);

    socket.emit("msg_front_to_back", {
        msg: product,
    });
}

// try {
//     const products = await productManager.getProducts(); // No está claro de dónde proviene la variable "limit". Asegúrate de definirla antes de usarla.


// } catch (error) {
//     console.error(`Error al obtener los productos: ${error}`);
//     return res.status(500).json({ error: "Error al obtener los productos" });
// }


// const productBox = document.getElementById("input-msg");

// productBox.addEventListener("keyup", ({ key }) => {
//     //alert("toco " + key);
//     if (key == "Enter") {
//         socket.emit("msg_front_to_back", {
//             msg: productBox.value,
//             user: nombre,
//         });
//         productBox.value = "";
//     }
// });

socket.on("todos_los_msgs", async (msgs) => {
    const divMsgs = document.getElementById("div-msgs");
    let contenido = "";
    const products2 = await productManager.getProdycts();
    msgs.forEach((msg) => {
        const product = msg.msg; // Obtener el objeto 'product' del mensaje

        // Construir el contenido HTML con todas las variables del producto
        contenido += `
            <p>Nombre: ${product.name}</p>
            <p>Descripción: ${product.description}</p>
            <p>Precio: ${product.price}</p>
            <p>Thumbnail: ${product.thumbnail}</p>
            <p>Código: ${product.code}</p>
            <p>Stock: ${product.stock}</p>
        `;
    });

    divMsgs.innerHTML = contenido;
    divMsgs.innerHTML = products2;
    
});



