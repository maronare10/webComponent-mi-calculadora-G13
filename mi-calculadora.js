class MiCalculadora extends HTMLElement {
  constructor() {
    super();

    this._shadowRoot = this.attachShadow( { mode: 'open' });


    this._numeroActual = '0';
    this._operador = null;
    this._operando = null;

  }

  connectedCallback() {
    this.render()

  }

  render() {
    this._shadowRoot.innerHTML =
    `
    <main>
      <h1>Calculadora</h1>

      <section class='miCalculadora'>
        <input class="miCalculadora__pantalla" type="text" readonly value='${this._numeroActual}'  />

        <div class='miCalculadora__numbers'>
          <button>+</button>
          <button>-</button>
          <button>*</button>

          <button>7</button>
          <button>8</button>
          <button>9</button>

          <button>4</button>
          <button>5</button>
          <button>6</button>

          <button>1</button>
          <button>2</button>
          <button>3</button>

          <button>0</button>
          <button class='limpiar-todo'>AC</button>
          <button class='signo-igual' >=</button>

          ${this._operando}
          ${this._operador}
          ${this._numeroActual}
        </div>
      </section>
    </main>

    ${this.getStyles()}
    `
    const buttons = this._shadowRoot.querySelectorAll('button')

    buttons.forEach(button =>{
      button.addEventListener('click', (event) => {
          const buttonValue = event.target.textContent

          if ('+-*'.includes(buttonValue)){
            this._operador = buttonValue
            this._operando = Number(this._numeroActual)
            this._numeroActual = '0'

          } else if (buttonValue === '=') {
            if (this._operador === '+') {
              this._numeroActual = Number(this._operando) + Number(this._numeroActual)
            } else if (this._operador === '-') {
              this._numeroActual = Number(this._operando) - Number(this._numeroActual)
            } else if (this._operador === '*') {
              this._numeroActual = Number(this._operando) * Number(this._numeroActual)
            }
          } else if (buttonValue === 'AC') {
            this._numeroActual = '0'
            this._operador = null
            this._operando = null
          
          } else {
            this._numeroActual = this._numeroActual + Number(buttonValue)
          }

          this.render()

      })



    }) 




  }

  getStyles() {
    return `
    <style>
      .miCalculadora {
        width: 400px;
      }

      .miCalculadora__pantalla {
        width: 100%;
        font-size: 5rem;
        height: 80px;
        border: none;
        background-color: #f1f1f1;
        color: #333;
        text-align: right;
        margin-bottom: 10px;
      }

      .miCalculadora__numbers {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 10px;
      }

      .miCalculadora__numbers button {
        height: 60px;
        background-color: #dae;
        border-radius: 3px;
        border: none;
        font-size: 2rem;
        color: #333;
        text-shadow: 0 1px rgba(255,255,255,.4);
        cursor: pointer;
      }

      .miCalculadora__numbers .limpiar-todo {
        background-color: #f0595f;
        color: #fff;
      }

      .miCalculadora__numbers .signo-igual {
        background-color: #2e86c0;
        color: #fff;
      }
    </style>
    `
  }



}

customElements.define( 'mi-calculadora', MiCalculadora);