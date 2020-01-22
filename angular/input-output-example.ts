// Child component
export class ChildComponent {

  @Input() recebeFamilia;
  @Output() respostaFamilia = new EventEmitter();

  constructor() { }

  ngOnInit() {
      console.log(this.recebeFamilia);
      console.log('Objeto familia recebido do component pai via Input: ', this.recebeFamilia);
  }

  feedback() {
    console.log('Resposta para o component pai', this.respostaFamilia.emit({"nome": "Raphella", "SobreNome": "Souza"}));
  }
}

export class ParentComponent {

// Parent component
familia:Object[];
  // função para receber emit Output do Filho
  reciverFeedback(respostaFilho) {
    console.log('Foi emitido o evento e chegou no pai >>>> ', respostaFilho);
  }
}

// parent.component.html
<app-filho [recebeFamilia]="familia" (respostaFamilia)="reciverFeedback($event)"></app-filho>
