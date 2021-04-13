let storage = [
  {
    name: 'Хлеб',
    count: 5,
    cost: 0.5,
    id: 1
  },
  {
    name: 'Круассан',
    count: 32,
    cost: 1.3,
    id: 2
  },
  {
    name: 'Батон',
    count: 6,
    cost: 0.8,
    id: 3
  }
];
let trash = [];

function moveToTrash(id) {
  storage.forEach((item, idx, array) => {
    if (item.id == id) {
      array.splice(idx, 1);

      trash.push(item);
    }
  });
}

function moveToStorage(id) {
  storage.forEach((item, idx, array) => {
    if (item.id == id) {
      trash.splice(idx, 1);

      storage.push(item);
    }
  });
}

function totalCost() {
  let finalCost = 0;

  storage.forEach((item) => (finalCost += item.cost));

  return finalCost;
}



















function saveProductToStorage() {
  let productData = $$('form_add_product').getValues();

  if (productData.name === '') {
    webix.message("The 'Name' field must not be empty");
    return;
  }

  if (productData.cost === '') {
    webix.message("The 'Cost' field must not be empty");
    return;
  } else if (isNaN(Number(productData.cost))) {
    webix.message("The value entered in the 'Cost' field is not a number");
    return;
  }

  if (productData.count === '') {
    webix.message("The value of the 'Count' field is used by default: 1");
    productData.count = 1;
  } else if (isNaN(Number(productData.cost))) {
    webix.message("The value entered in the 'Count' field is not a number");
    return;
  }

  productData.id = createProductId(5);

  storage.push(productData);
  $$('products_list').add(productData);
}

function createProductId(length) {
  let result = [];
  let characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result.push(
      Math.floor(Math.random() * 100),
      characters.charAt(Math.floor(Math.random() * charactersLength))
    );
  }
  return result.join('');
}
