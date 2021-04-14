webix.ready(() => {
  let storage = [
    {
      name: 'Bread',
      cost: 2,
      count: 1,
      id: 1
    },
    {
      name: 'Solt',
      cost: 0.5,
      count: 3,
      id: 2
    },
    {
      name: 'Milk',
      cost: 1,
      count: 4,
      id: 3
    },
    {
      name: 'Cheese',
      cost: 5,
      count: 5,
      id: 4
    },
    {
      name: 'Coffe',
      cost: 5,
      count: 3,
      id: 5
    },
    {
      name: 'Tea',
      cost: 15,
      count: 3,
      id: 6
    }
  ];

  let trash = [];

  webix.ui({
    id: 'main',
    rows: [
      {
        view: 'toolbar',
        id: 'cost_toolbar',
        elements: [
          {
            view: 'label',
            label: 'Total Cost: Unknow',
            maxHeight: 50,
            align: 'center'
          }
        ],
        maxHeight: 50,
        align: 'center'
      },
      {
        cols: [
          {
            type: 'form',
            view: 'form',
            elements: [
              {
                view: 'label',
                label: 'Storage',
                align: 'center',
                css: {
                  'font-size': '30px',
                  color: 'green'
                }
              },
              {
                view: 'datatable',
                id: 'storage_list',
                autoheight: true,
                autowidth: true,
                data: storage,
                columns: [
                  { id: 'name', header: 'Name', width: 150 },
                  { id: 'cost', header: 'Cost', width: 150 },
                  { id: 'count', header: 'Count', width: 150 },
                  { id: 'id', header: 'Id', width: 150 }
                ]
              }
            ]
          },
          {
            type: 'form',
            view: 'form',
            elements: [
              {
                view: 'label',
                label: 'Trash',
                align: 'center',
                css: {
                  'font-size': '30px',
                  color: 'red'
                }
              },
              {
                view: 'datatable',
                id: 'trash_list',
                autoheight: true,
                autowidth: true,
                data: trash,
                columns: [
                  { id: 'name', header: 'Name', width: 150 },
                  { id: 'cost', header: 'Cost', width: 150 },
                  { id: 'count', header: 'Count', width: 150 },
                  { id: 'id', header: 'Id', width: 150 }
                ]
              }
            ]
          }
        ]
      }
    ]
  });

  claculateTotalCost();

  $$('storage_list').attachEvent('onItemClick', moveProduct);
  $$('trash_list').attachEvent('onItemClick', moveProduct);

  function moveProduct(id) {
    let product = this.getItem(id);
    let toProduct = {};
    Object.assign(toProduct, product, {
      count: 0
    });

    product.count -= 1;

    toProduct.count += 1;

    let to = $$(
      this.data.owner === 'storage_list' ? 'trash_list' : 'storage_list'
    );

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

  function claculateTotalCost() {
    let trash = $$('trash_list').data.pull;
    let sum = 0;

    for (key in trash) {
      sum += trash[key]['cost'] * trash[key]['count'];
    }
    console.log(sum);

    webix.ui(
      {
        view: 'toolbar',
        id: 'cost_toolbar',
        elements: [
          {
            view: 'label',
            label: `Total Cost: ${sum}`,
            maxHeight: 50,
            align: 'center'
          }
        ],
        maxHeight: 50,
        align: 'center'
      },
      $$('cost_toolbar')
    );
  }
});
