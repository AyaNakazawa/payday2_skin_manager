
// ----------------------------------------------------------------
// Item Class

class ItemModel extends SwitchModel {
  constructor(_obj) {
    super(_obj);
  }
}

class ItemView extends SwitchView {
  constructor(_model = new ItemModel()) {
    super(_model);
  }
}

// ----------------------------------------------------------------
// Controllers

class ItemController extends CommonController {
  constructor(_obj) {
    super(_obj);
    
    this.model = new ItemModel(_obj);
    this.view = new ItemView(this.model);
  }
}

// ----------------------------------------------------------------
// Events

class ItemEvent extends CommonEvent {
  constructor({
    name = 'Item Event'
  } = {})
  {
    super({
      name: name
    });
    
    this.NAME = name;
    this.CONTROLLER = new ItemController({
      name: 'Item Switch',
      lsKeyView: 'item',
      triggerSelector: '#action-item',
      switchSelector: '#pd2item-area'
    });
  }
}
