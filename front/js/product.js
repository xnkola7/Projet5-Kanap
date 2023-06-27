let params = new URL(document.location).searchParams;
let id = params.get("id");
let url = "http://localhost:3000/api/products/" + id;
const numberSelect = document.getElementById("quantity");
const itemImg = document.querySelector(".item__img");
const itemTitle = document.getElementById("title");
const itemPrice = document.getElementById("price");
const itemDesc = document.getElementById("description");
const valueInput = document.getElementById("quantity");
const valueSelect = document.getElementById("colors");

const fetchProduct = async () => {
  product = await fetch(url)
    .then((response) => response.json())
    .then((resultatAPI) => {
      article = resultatAPI;
      let min = 0,
        max = article.colors.length,
        select = document.getElementById("colors");

      itemImg.innerHTML = `<img src='${article.imageUrl}' alt='Photographie d'un canapé'></img>`;
      itemTitle.innerHTML = article.name;
      itemPrice.innerHTML = article.price;
      itemDesc.innerHTML = article.description;
      document.title = "Kanap - " + article.name;

      for (var i = min; i < max; i++) {
        var opt = document.createElement("option");
        opt.value = i;
        opt.innerHTML = article.colors[i];
        select.appendChild(opt);
      }
    })
    .catch(function (error) {
      console.log(
        "Il y a eu un problème avec l'opération fetch: " + error.message
      );
    });
};

function addPanier() {
  const addButton = document.querySelector("#addToCart");
  addButton.addEventListener("click", () => {
    if (
      valueInput.value > 0 &&
      valueInput.value <= 100 &&
      valueSelect.value != ""
    ) {
      let productAdded = {
        name:
          itemTitle.innerHTML +
          " " +
          valueSelect.options[valueSelect.selectedIndex].innerHTML,
        color: valueSelect.options[valueSelect.selectedIndex].innerHTML,
        price: parseFloat(itemPrice.innerHTML),
        quantity: parseFloat(valueInput.value),
        img: article.imageUrl,
        _id: id,
      };
      let listProduct = [];
      if (localStorage.getItem("products") !== null) {
        listProduct = JSON.parse(localStorage.getItem("products"));
      }
      let match = listProduct.find((item) => {
        return item["_id"] === id;
      });
      let matchColors = listProduct.find((item) => {
        return (
          item["color"] ===
          valueSelect.options[valueSelect.selectedIndex].innerHTML
        );
      });

      if (match && matchColors) {
        matchColors["quantity"] += parseFloat(valueInput.value);
      } else {
        listProduct.push(productAdded);
      }

      localStorage.setItem("products", JSON.stringify(listProduct));
      alert("Les articles ont bien été ajoutés au panier !");
      document.location = "cart.html";
    } else {
      alert("Merci de remplir toutes les informations !");
      setTimeout("location.reload(true);", 400);
    }
  });
}

fetchProduct();
addPanier();
