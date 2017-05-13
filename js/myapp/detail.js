
// ----------------------------------------------------------------
// Detail Class

class DetailModel extends SwitchModel {
  constructor(_obj) {
    super(_obj);
  }
}

class DetailView extends SwitchView {
  constructor(_model = new DetailModel()) {
    super(_model);
  }
}

// ----------------------------------------------------------------
// Controllers

class DetailController extends CommonController {
  constructor(_obj) {
    super(_obj);
    
    this.model = new DetailModel(_obj);
    this.view = new DetailView(this.model);
  }
}

// ----------------------------------------------------------------
// Events

class DetailEvent extends CommonEvent {
  constructor({
    name = 'Detail Event'
  } = {})
  {
    super({
      name: name
    });
    
    this.NAME = name;
    this.CONTROLLER = new DetailController({
      name: 'Detail Switch',
      lsKeyView: 'detail',
      triggerSelector: '#action-detail',
      switchSelector: '#detail-area'
    });
  }
}
