const socket = io();

const formProducts = document.getElementById("mi-formulario");
    const inputTitle = document.getElementById("name").value;
    const inputDescript = document.getElementById("description").value;
    const inputPrice = document.getElementById("price").value;
    const inputThumbnails = document.getElementById("thumbnail").value;
    const inputCode = document.getElementById("code").value;
    const inputStock = document.getElementById("stock").value;

socket.on("products", (products) => {
  // Como lo habia solucionado pt.1
  // renderProducts(products);

  // Como se solicitó segun lo entendido en en el after
  const productList = document.querySelector(".productListUpdated");
  productList.innerHTML = `
    ${products
      .map(
        (product) => `
      <tr>
        <th scope="row">${product.id}</th>
        <td>${product.title}</td>
        <td>${product.description}</td>
        <td>${product.price}</td>
        <td>${product.code}</td>
        <td>${product.stock}</td>
        <td>${product.thumbnail}</td>
                
        <td><button type="button" class="btn btn-danger " onclick="deleteProduct(${product.id})">X</button></td>
      </tr>
    `
      )
      .join("")}
  `;
});

formProducts.onsubmit = (e) => {
  e.preventDefault();
  const newProduct = {
    title: inputTitle.value,
    description: inputDescript.value,
    price: +inputPrice.value,
    thumbnail: inputThumbnails.value,
    code: inputCode.value,
    stock: +inputStock.value,
  };
  socket.emit("new-product", newProduct);
  formProducts.reset();
};

deleteProduct = (productId) => {
  socket.emit("delete-product", productId);
};






