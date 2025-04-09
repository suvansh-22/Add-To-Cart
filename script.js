document.addEventListener("DOMContentLoaded", () => {
  const products = [
    {
      id: 1,
      name: "Product 1",
      price: 29.99,
    },
    {
      id: 2,
      name: "Product 2",
      price: 59.99,
    },
    {
      id: 3,
      name: "Product 3",
      price: 79.99,
    },
  ];

  let cart = JSON.parse(localStorage.getItem("cartitem")) || [];
  callrender(cart);

  let totalprice = JSON.parse(localStorage.getItem("cartitem")) || [];
  renderprice(totalprice);

  const finalprice = document.getElementById("total");
  const productlist = document.getElementById("listItem");
  const chkout = document.getElementById("checkout");
  const cartlist = document.getElementById("cartlist");

  if (cart.length == 0) {
    cartlist.innerHTML = "Your cart is empty";
  }

  products.forEach((product) => {
    const productli = document.createElement("li");
    productli.innerHTML = `
    <span>${product.name}- $${product.price}</span> <button id= "${product.id}">Add to Cart</button>`;
    productlist.append(productli);
  });
  productlist.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      if (e.target.id === "1") {
        cart.push({ ...products[0] });
        addproduct(products[0]);
      } else if (e.target.id === "2") {
        cart.push({ ...products[1] });
        addproduct(products[1]);
      } else if (e.target.id === "3") {
        cart.push({ ...products[2] });
        addproduct(products[2]);
      }
    }
  });

  function rendercart(c) {
    const cartlist = document.getElementById("cartlist");
    const cartdiv = document.createElement("div");
    cartdiv.innerHTML = ` <span data-id= "${c.x}">${c.name}- $ ${c.price}</span> <button class="rmv-btn" id="${c.id}">Remove</button>`;
    cartlist.append(cartdiv);

    cartdiv.querySelector("button").addEventListener("click", (id) => {
      cart = cart.filter((t) => t.x !== c.x);
      totalprice = totalprice.filter((t) => t.x !== c.x);
      if (cart.length == 0) {
        cartlist.innerHTML = "Your cart is empty";
      }
      if (totalprice.length == 0) {
        finalprice.innerHTML = "0";
      }
      renderprice(totalprice);
      savetask();
      saveprice();
      cartdiv.remove();
    });
  }

  function addx(array) {
    array.forEach((c) => {
      if (c.x !== undefined) {
        return;
      } else {
        c.x = Date.now();
      }
    });
  }
  function addproduct(p) {
    cartlist.innerHTML = " ";
    addx(cart);
    totalprice.push({ price: p.price });
    addx(totalprice);
    renderprice(totalprice);
    callrender(cart);
    saveprice();
    savetask();
  }

  function savetask() {
    localStorage.setItem("cartitem", JSON.stringify(cart));
  }
  function saveprice() {
    localStorage.setItem("price", JSON.stringify(totalprice));
  }

  function callrender(ar) {
    ar.forEach((c) => {
      rendercart(c);
    });
  }

  function renderprice(arr) {
    const finalprice = document.getElementById("total");
    let sum = 0;
    arr.forEach((e) => {
      sum += e.price;
    });
    let s = sum.toFixed(2);
    finalprice.innerHTML = s;
  }

  chkout.addEventListener("click", () => {
    if (cart.length === 0) {
      alert("Your cart is empty");
    } else {
      alert("You have successfully checked out");
    }
  });
});
