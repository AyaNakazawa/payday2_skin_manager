
// ----------------------------------------------------------------
// ItemGroup Class

class ItemGroupModel extends SwitchModel {
  constructor(_obj) {
    super(_obj);
  }
}

class ItemGroupView extends SwitchView {
  constructor(_model = new ItemGroupModel()) {
    super(_model);
  }
}

// ----------------------------------------------------------------
// Controllers

class ItemGroupController extends CommonController {
  constructor(_obj) {
    super(_obj);
    
    this.model = new ItemGroupModel(_obj);
    this.view = new ItemGroupView(this.model);
  }
}

// ----------------------------------------------------------------
// Events

class ItemGroupEvent extends CommonEvent {
  constructor({
    name = 'Item Group Event'
  } = {})
  {
    super({
      name: name
    });
    
    this.NAME = name;
    this.CONTROLLER = new ItemGroupController({
      name: 'Item Group Switch',
      lsKeyView: 'group.test',
      triggerSelector: '#pd2item-group-test',
      switchSelector: '#pd2item-group-list-test'
    });
  }
}
