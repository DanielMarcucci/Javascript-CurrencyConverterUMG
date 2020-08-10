class Currency {
  constructor(name, country, value, code, image) {
    this.name = name
    this.country = country
    this.value = value
    this.code = code
    this.image = image
  }
}

class Coins {
  constructor(data = []) {
    this.data = data
  }

  addCoin(coin) {
    this.data.push(coin)
  }

  getData() {
    return this.data
  }
}

class UI {
  static createDOMElementCurrency = (item) => `<option data-image="${item.image}" data-code="${item.code}" value="${item.value}">${item.name}</option>`

  static renderSelect($select) {
    const $option = $select.options[$select.selectedIndex]
    $select.parentElement.querySelector('img').src = $option.getAttribute('data-image')
    $select.parentElement.querySelector('.currency-code').innerHTML = $option.getAttribute('data-code')
  }
}

const coins = new Coins()
coins.addCoin(new Currency('Dólares', 'USA', 1, 'USD', 'https://www.lifeder.com/wp-content/uploads/2018/11/bandera-1777-1795-dise%C3%B1o-normal.png'))
coins.addCoin(new Currency('Euros', 'EUROPA', 0.9, 'EUR', 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Flag_of_Europe.svg/640px-Flag_of_Europe.svg.png'))
coins.addCoin(new Currency('Lempiras', 'Honduras', 24, 'HNL', 'https://www.paho.org/salud-en-las-americas-2017/wp-content/uploads/2017/02/flag-honduras.png'))
coins.addCoin(new Currency('Colones', 'Costa Rica', 32, 'CRC', 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Flag_of_Costa_Rica.svg/1200px-Flag_of_Costa_Rica.svg.png'))
coins.addCoin(new Currency('Quetzales', 'Guatemala', 7.7, 'GTQ', 'https://upload.wikimedia.org/wikipedia/commons/9/9f/Bandera_de_Guatemala.png'))

window.addEventListener('load', () => {
  init()
}, false)

const init = () => {
  const $selFirstCurrency = window.selFirstCurrency
  const $selSecondCurrency = window.selSecondCurrency
  const $txtFirstCurrency = window.txtFirstCurrency
  const $txtSecondCurrency = window.txtSecondCurrency
  
  coins.getData().forEach(item => {
    $selFirstCurrency.innerHTML += UI.createDOMElementCurrency(item)
    $selSecondCurrency.innerHTML += UI.createDOMElementCurrency(item)
  })

  $selFirstCurrency.addEventListener('change', e => {
    $txtSecondCurrency.value = ($txtFirstCurrency.value * ($selSecondCurrency.value / $selFirstCurrency.value)).toFixed(2)
    UI.renderSelect(e.target)
  })
  $selSecondCurrency.addEventListener('change', e => {
    $txtSecondCurrency.value = ($txtFirstCurrency.value * ($selSecondCurrency.value / $selFirstCurrency.value)).toFixed(2)
    UI.renderSelect(e.target)
  })
  $txtFirstCurrency.addEventListener('input', () => $txtSecondCurrency.value = ($txtFirstCurrency.value * ($selSecondCurrency.value / $selFirstCurrency.value)).toFixed(2))
  $txtSecondCurrency.addEventListener('input', () => $txtFirstCurrency.value = ($txtSecondCurrency.value * ($selFirstCurrency.value / $selSecondCurrency.value)).toFixed(2))
}