webix.ready(() => {
  webix.ui({
    type: 'clean',
    cols: [
      {
        type: 'space',
        template: 'Storage',
        minWidth: 650,
        rows: [
          {
            type: 'form',
            view: 'toolbar',
            elements: [
              {
                view: 'label',
                label: 'Storage'
              },
              {
                view: 'button',
                id: 'btn_total_cost',
                width: 100,
                value: 'Total Cost'
              }
            ]
          },

          {
            view: 'form',
            id: 'form_add_product',
            elements: [
              { view: 'text', label: 'Name', name: 'name' },
              { view: 'text', label: 'Cost (in $)', name: 'cost' },
              { view: 'text', label: 'Count', name: 'count', placeholder: '1' },
              {
                view: 'button',
                id: 'btn_add',
                width: 100,
                value: 'Add Item'
              }
            ]
          },
          {
            view: 'list',
            data: storage,
            id: 'products_list',
            template: '#name#, $#cost#, #count# in storage'
          }
        ]
      },
      { template: 'Trash', minWidth: 600 }
    ]
  });

  $$('btn_add').attachEvent('onItemClick', function () {
    saveProductToStorage();
  });
});
