document.addEventListener('DOMContentLoaded', () => {
  let storage = [
    {
      name: 'Bread',
      cost: 2,
      count: 10,
      id: 0
    },
    {
      name: 'Solt',
      cost: 0.5,
      count: 33,
      id: 1
    },
    {
      name: 'Milk',
      cost: 1,
      count: 70,
      id: 2
    },
    {
      name: 'Cheese',
      cost: 5,
      count: 5,
      id: 3
    },
    {
      name: 'Coffe',
      cost: 1.7,
      count: 99,
      id: 4
    },
    {
      name: 'Tea',
      cost: 1.3,
      count: 33,
      id: 5
    }
  ];

  let trash = [];

  let elStorage = document.querySelector('.storage');
  let elTrash = document.querySelector('.trash');
  let elChangeCountInStorage = document.querySelector(
    '.change_count_in_storage'
  );
  let elChangeCountInTrash = document.querySelector('.change_count_in_trash');
  let elTotalCost = document.querySelector('.total_cost');

  refreshView();

  function refreshView() {
    clearView();

    storage.forEach((product) => {
      let elProduct = document.createElement('div');
      elProduct.className = 'product in_storage';
      elProduct.innerHTML = `${product.name} ($${product.cost}) ${product.count} in storage (ID: ${product.id})`;
      elProduct.id = product.id;

      elProduct.addEventListener('click', ({ target }) => {
        moveToTrash(Number(target.id));
        refreshView();
      });

      elStorage.appendChild(elProduct);
    });

    trash.forEach((product) => {
      let elProduct = document.createElement('div');
      elProduct.className = 'product in_trash';
      elProduct.innerHTML = `${product.name} ($${product.cost}) ${product.count} in trash (ID: ${product.id})`;
      elProduct.id = product.id;

      elProduct.addEventListener('click', ({ target }) => {
        moveToStorage(Number(target.id));
        refreshView();
      });

      elTrash.appendChild(elProduct);
    });
  }

  function clearView() {
    elStorage.innerHTML = '';
    elTrash.innerHTML = '';
  }

  function findProductInStorage(id) {
    let findedProduct = null;

    storage.forEach((product) => {
      if (product.id === id) {
        findedProduct = product;
      }
    });

    return findedProduct;
  }

  function findProductInTrash(id) {
    let findedProduct = null;

    trash.forEach((product) => {
      if (product.id === id) {
        findedProduct = product;
      }
    });

    return findedProduct;
  }

  function moveToTrash(id) {
    storage.forEach((product, index) => {
      if (product.id === id) {
        storage.splice(index, 1);
        trash.push(product);
      }
    });
  }

  function moveToStorage(id) {
    trash.forEach((product, index) => {
      if (product.id === id) {
        trash.splice(index, 1);
        storage.push(product);
      }
    });
  }

  elChangeCountInStorage.addEventListener(
    'click',
    changeCountOfProductInStorage
  );
  elChangeCountInTrash.addEventListener('click', changeCountOfProductInTrash);
  elTotalCost.addEventListener('click', calculateTotalCost);

  function changeCountOfProductInStorage() {
    let product = isValidIDStotage(
      askNumber('Enter the product id of the product you want to change:')
    );
    let newCountProduct = askNumber(
      'Enter the new quantity of the product in storage:'
    );
    let sure = askYouSure();

    if (sure) {
      product.count = newCountProduct;
      removeProductInStorageIfCountIsZero();
      refreshView();
    } else {
      alert('Changes were not applied');
      return;
    }
  }

  function changeCountOfProductInTrash(id) {
    let product = isValidIDTrash(
      askNumber('Enter the product id of the product you want to change:')
    );
    let newCountProduct = askNumber(
      'Enter the new quantity of the product in storage:'
    );
    let sure = askYouSure();

    if (sure) {
      product.count = newCountProduct;
      removeProductInTrashIfCountIsZero();
      refreshView();
    } else {
      alert('Changes were not applied');
      return;
    }
  }

  function askNumber(message) {
    let productId = Number(prompt(message));

    if (isNaN(productId)) {
      productId = askNumber(
        'The value you entered is not a number, please enter the correct value:'
      );
    }

    return productId;
  }

  function askYouSure() {
    return confirm(
      'Are you sure you want to change the quantity of the product?'
    );
  }

  function isValidIDStotage(id) {
    let product = findProductInStorage(id);
    if (product === null) {
      product = isValidIDStotage(
        askNumber(
          'There is no product with this ID, please enter a valid value:'
        )
      );
    }

    return product;
  }

  function isValidIDTrash(id) {
    let product = findProductInTrash(id);
    if (product === null) {
      product = isValidIDTrash(
        askNumber(
          'There is no product with this ID, please enter a valid value:'
        )
      );
    }

    return product;
  }

  function removeProductInStorageIfCountIsZero() {
    storage.forEach((product, index) => {
      if (product.count === 0) {
        storage.splice(index, 1);
      }
    });
  }

  function removeProductInTrashIfCountIsZero() {
    trash.forEach((product, index) => {
      if (product.count === 0) {
        trash.splice(index, 1);
      }
    });
  }

  function calculateTotalCost() {
    let sum = 0;

    storage.forEach(({ cost }) => (sum += cost));

    alert(`The total amount of products in the Storage: $${sum}`);
  }
});
