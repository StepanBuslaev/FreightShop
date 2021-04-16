webix.ready(() => {
  let storage = [
    {
      name: 'Bread',
      cost: 2,
      count: 1,
      id: generateStrongID()
    },
    {
      name: 'Solt',
      cost: 0.5,
      count: 3,
      id: generateStrongID()
    },
    {
      name: 'Milk',
      cost: 1,
      count: 4,
      id: generateStrongID()
    },
    {
      name: 'Cheese',
      cost: 5,
      count: 5,
      id: generateStrongID()
    },
    {
      name: 'Coffe',
      cost: 5,
      count: 3,
      id: generateStrongID()
    },
    {
      name: 'Tea',
      cost: 15,
      count: 3,
      id: generateStrongID()
    }
  ];

  let trash = [];

  webix.ui({
    view: 'window',
    id: 'add_new_product_window',
    height: 400,
    width: 400,
    move: true,
    close: true,
    left: 17,
    top: 400,
    head: 'Add New Product',
    body: {
      view: 'form',
      id: 'add_product_form',
      width: 300,
      elements: [
        { view: 'text', label: 'Name', name: 'name' },
        {
          view: 'text',
          label: 'Cost',
          name: 'cost'
        },
        {
          view: 'text',
          label: 'Count',
          name: 'count',
          placeholder: 1
        },
        {
          cols: [
            {
              view: 'button',
              value: 'Add',
              id: 'btn_add_product',
              css: 'webix_primary'
            }
          ]
        }
      ]
    }
  });

  webix.ui({
    rows: [
      {
        view: 'toolbar',
        id: 'cost_toolbar',
        elements: [
          {
            view: 'label',
            id: 'cost_label',
            label: 'Total Cost: Unknow',
            maxHeight: 50
          },
          {
            view: 'button',
            id: 'bth_show_window_new_product',
            value: 'Show',
            width: 100
          },
          {
            view: 'button',
            id: 'bth_hide_window_new_product',
            value: 'Hide',
            width: 100
          }
        ],
        maxHeight: 50,
        align: 'center'
      },
      {
        cols: [
          {
            width: 682.5,
            align: 'center',
            rows: [
              {
                view: 'label',
                label: 'Storage',
                align: 'center',
                css: 'storage_label'
              },
              {
                view: 'datatable',
                id: 'storage_list',
                autoheight: true,
                autowidth: true,
                data: storage,
                columns: [
                  { id: 'name', header: 'Name', width: 210 },
                  { id: 'cost', header: 'Cost', width: 210 },
                  { id: 'count', header: 'Count', width: 210 }
                ]
              }
            ]
          },
          // {},
          {
            width: 682.5,
            rows: [
              {
                view: 'label',
                label: 'Trash',
                align: 'center',
                css: 'trash_label'
              },

              {
                view: 'datatable',
                id: 'trash_list',
                autoheight: true,
                autowidth: true,
                data: trash,
                columns: [
                  { id: 'name', header: 'Name', width: 210 },
                  { id: 'cost', header: 'Cost', width: 210 },
                  { id: 'count', header: 'Count', width: 210 }
                ]
              }
            ]
          }
        ]
      }
    ]
  });

  claculateTotalCost();

  attachEvents();

  // Подсчитывание цены товаров в корзине и перерисовка toolbar'a с новым значением
  function claculateTotalCost() {
    let trash = $$('trash_list').data.pull;
    let sum = 0;

    for (key in trash) {
      sum += trash[key]['cost'] * trash[key]['count'];
    }

    $$('cost_label').setValue(`Total Cost: ${sum}`);
  }

  // Привязка событий к элементам на странице
  function attachEvents() {
    $$('storage_list').attachEvent('onItemClick', function (id) {
      moveProduct.apply(this, [id, $$('trash_list')]);
    });
    $$('trash_list').attachEvent('onItemClick', function (id) {
      moveProduct.apply(this, [id, $$('storage_list')]);
    });
    $$('bth_show_window_new_product').attachEvent('onItemClick', () =>
      $$('add_new_product_window').show()
    );
    $$('bth_hide_window_new_product').attachEvent('onItemClick', () =>
      $$('add_new_product_window').hide()
    );
    $$('btn_add_product').attachEvent('onItemClick', addProduct);
  }

  // Функция перемещения товара из Storage в Trash и обратно
  function moveProduct(id, to) {
    let product = this.getItem(id);
    let toProduct = {};
    Object.assign(toProduct, product, {
      count: 0
    });

    product.count -= 1;

    toProduct.count += 1;

    if (product.count === 0) {
      this.remove(product.id);
    }

    if (to.getItem(product.id)) {
      to.getItem(product.id).count += 1;
      to.refresh();
      claculateTotalCost();
    } else {
      to.add(toProduct);
    }
    this.refresh();
    claculateTotalCost();
  }

  // Функция добавления и валидации нового продукта
  function addProduct() {
    let addedProduct = $$('add_product_form').getValues();

    if (addedProduct.name === '') {
      webix.message('The `Name` field must not be empty');
      return;
    }

    if (addedProduct.cost === '') {
      webix.message('The `Cost` field must not be empty');
      return;
    } else if (isNaN(Number(addedProduct.cost))) {
      webix.message(
        'The `Cost` field must contain a number, enter the correct value'
      );
      return;
    } else {
      addedProduct.cost = Number(addedProduct.cost);
    }

    if (addedProduct.count === '') {
      webix.message('The value of the `Count` field is used by default: 1');
      addedProduct.count = 1;
    } else if (isNaN(Number(addedProduct.count))) {
      webix.message(
        'The `Cost` field must contain a number, enter the correct value'
      );
      return;
    } else {
      addedProduct.count = Number(addedProduct.count);
    }

    addedProduct.id = generateStrongID();

    $$('storage_list').add(addedProduct);
  }

  // Функция генерации ID для нового товара
  function generateStrongID() {
    return (
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    );
  }
});
