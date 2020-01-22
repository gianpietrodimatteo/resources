// Remember to implement OnChanges on the top class

// You can use the ngOnChanges() lifecycle method:
@Input() categoryId: string;

ngOnChanges(changes: SimpleChanges) {
  this.doSomething(changes.categoryId.currentValue);
  // You can also use categoryId.previousValue and
  // categoryId.firstChange for comparing old and new values
}

// onchanges is better if you want to monitor multiple changes. it also works, for example:
ngOnChanges() {
  this.reloadPage();
}

// Documentation Links: ngOnChanges, SimpleChanges, SimpleChange

// ***

// Alternately, you can also use an input property setter as follows:
private _categoryId: string;

@Input() set categoryId(value: string) {
  this._categoryId = value;
  this.doSomething(this._categoryId);
}

get categoryId(): string {
  return this._categoryId;
}

