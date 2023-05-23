class EtiquetaPersonalizada extends HTMLElement {
  constructor() {
    super()

    this.p = document.createElement('p')
  
  }
  connectedCallback(){
    this.p.textContent = 'Hola Nueva Etiqueta!'
    this.appendChild(this.p)
  }

}

customElements.define('etiqueta-personalizada', EtiquetaPersonalizada)



