let storage = [
  {
    name: 'Bread',
    cost: 2,
    count: 1,
    id: 0
  },
  {
    name: 'Solt',
    cost: 0.5,
    count: 3,
    id: 1
  },
  {
    name: 'Milk',
    cost: 1,
    count: 4,
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
    cost: 5,
    count: 3,
    id: 4
  },
  {
    name: 'Tea',
    cost: 15,
    count: 3,
    id: 5
  }
];

let trash = [];

document.addEventListener('DOMContentLoaded', () => {
  let elStorage = document.querySelector('.storage');
  let elTrash = document.querySelector('.trash');
  let elTotalCost = document.querySelector('.total_cost');

  refreshViewAll();
  calculateTotalCost();

  // На основании новых Storage и Trash обновляет интерфейс
  function refreshViewAll() {
    clearView();

    refreshView(storage, trash, elStorage);
    refreshView(trash, storage, elTrash);
  }

  function refreshView(from, to, fromEl) {
    clearView();

    from.forEach((product) => {
      let elProduct = document.createElement('div');
      elProduct.className = 'product';
      elProduct.innerHTML = `${product.name} ($${product.cost}) ${product.count}`;
      elProduct.id = product.id;

      elProduct.addEventListener('click', ({ target }) => {
        move(from, to, Number(target.id));
        refreshView();
      });
      fromEl.appendChild(elProduct);
    });
  }

  // Очищает видимый Storage и Trash
  function clearView() {
    elStorage.innerHTML = '';
    elTrash.innerHTML = '';
  }

  // Находит продукт в массиве array и возвращает его
  function findProduct(id, where) {
    let findedProduct = null;
    where.forEach((product) => {
      if (product.id === id) {
        findedProduct = product;
      }
    });

    return findedProduct;
  }

  // Перемещает продукт из массива from в массив to
  function move(from, to, id) {
    from.forEach((product) => {
      let isExistInTo = findProduct(product.id, to);

      if (product.id === id) {
        product.count -= 1;

        if (product.count === 0) {
          removeProductIfCountIsZero(from, id);
        }

        if (isExistInTo) {
          isExistInTo.count += 1;
        } else {
          let toProduct = { ...product, count: 1 };
          to.push(toProduct);
        }

        calculateTotalCost();
      }
    });
  }

  // Удаляет продукт если его количество стало равно 0
  function removeProductIfCountIsZero(from, id) {
    from.forEach((product, index) => {
      if (product.id === id) {
        from.splice(index, 1);
      }
    });
  }

  // Подсчитывает сумму продуктов в Storage
  function calculateTotalCost() {
    let sum = 0;

    trash.forEach(({ cost, count }) => (sum += cost * count));

    elTotalCost.innerHTML = `Total Cost: ${sum}`;
  }
});
