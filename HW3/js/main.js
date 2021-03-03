const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
const my url = '';

// Перевести на Promise НЕ ИСПОЛЬЗОВАТЬ fetch
// let getRequest = (url, callBack) => {
//   let xhr = new XMLHttpRequest();
//   xhr.open('GET', url, true);
//   xhr.onreadystatechange = () => {
//     if (xhr.readyState === 4) {
//       if (xhr.status !== 200) {
//         console.log('Error');
//       } else {
//         callBack(xhr.responseText);
//       }
//     }
//   }
//   xhr.send();
// };
///////////////////////////////////////
//на Promise
let getRequest = url => {
  return new Promise( (resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status !== 200) {
          reject('Error');
        } else {
          resolve(xhr.responseText);
        }
      }
    }
    xhr.send();
  });
}

const myUrl = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/catalogData.json';
getRequest(myUrl).then( () => {
  //parse responseText from the server (json.file)
}).catch( e => console.log(e) );

//////////////////////////

class ProductList {
  #goods;
  #allProducts;

  constructor(container = '.products') {
    console.log('constructor');
    this.container = container;
    this.#goods = [];
    this.#allProducts = [];

    // this.#fetchGoods();
    // this.#render();
    this.#getProducts()
        .then((data) => {
          this.#goods = [...data];
          this.#render();
        });
  }

  goodsTotalPrice() {
    return this.#goods.reduce((sum, { price }) => sum + price, 0);
  }

  // #fetchGoods() {
  //   getRequest(`${API}/catalogData.json`, (data) => {
  //     // console.log(data);
  //     this.#goods = JSON.parse(data);
  //     this.#render();
  //     console.log(this.#goods);
  //     console.log(this.#allProducts);
  //   });
  // }
  #getProducts() {
    return fetch(`${API}/catalogData.json`)
        .then((response) => response.json())
        .catch((err) => {
          console.log(err);
        });
  }

  #render() {
    const block = document.querySelector(this.container);

    this.#goods.forEach((product) => {
      const productObject = new ProductItem(product);
      console.log(productObject);
      this.#allProducts.push(productObject);
      block.insertAdjacentHTML('beforeend', productObject.render());
    });
  }
}

class ProductItem {
  constructor(product, img='https://placehold.it/200x150') {
    this.title = product.product_name;
    this.price = product.price;
    this.id = product.id_product;
    this.img = img;
  }

  render() {
    return `<div class="product-item" data-id="${this.id}">
              <img src="${this.img}" alt="Some img">
              <div class="desc">
                  <h3>${this.title}</h3>
                  <p>${this.price} \u20bd</p>
                  <button class="buy-btn" data-id=${this.id}>Купить</button>
              </div>
          </div>`;
  }
}

class Cart {
  _goods;  
  _cartData;

  constructor() {
    this._cartData = [];
    this._goods = [];
    this._orderBtn = document.querySelector(".order-btn").addEventListener("click", this.order );
    this.cartDiv = document.querySelector('.cart').addEventListener('click', e => {
      let id = e.target.dataset.id;
      console.log(id);
      let item = this._goods.find( (item) => item.id_product==id  );
      console.log(item);
      this.remove(item);
    });

    
    this.#getCartItems()
        .then((data) => {
          console.log(data);
          this._cartData = data;
          this._goods = data.contents;
          this.#render();
        });
  }

  #getCartItems() {
    return fetch(`${API}/getBasket.json`)
        .then((response) => { 
          let responseJson = response.json();
          console.log(responseJson)
          return responseJson;
        })
        .catch((err) => {
          console.log(err);
        });
  }

  add(item) {
    this._goods.push(item);
  }

  remove(item) {
    let index = this._goods.findIndex( obj => {
      obj.id_product===item.id_product;
    }); //return -1 if the element was not found
    
    if (index !== -1) {
      this._goods.splice(index,1);
      return true;
    } else {
      return false;
    }
  }

  order() { //send an order to ERP system
      alert("Your order is on the way to you!");
  }

  #render() {
    let markUp = '';
    document.querySelector('.cart').innerHTML = '';
    this._goods.forEach( item => markUp += new CartItem(item).render());
    document.querySelector('.cart').insertAdjacentHTML('beforeend', markUp);
  }
}

class CartItem {
  constructor(product, img='https://placehold.it/200x150') {
    this.title = product.product_name;
    this.price = product.price;
    this.id = product.id_product;
    this.img = img;
  }

  render() {
    return `<div class="product-item" data-id="${this.id}">
              <img src="${this.img}" alt="Some img">
              <div class="desc">
                  <h3>${this.title}</h3>
                  <p>${this.price} \u20bd</p>
                  <button class="buy-btn" data-id="${this.id}">Убрать из корзины</button>
              </div>
          </div>`;
  }
}

const productList = new ProductList();
let cart = new Cart();

