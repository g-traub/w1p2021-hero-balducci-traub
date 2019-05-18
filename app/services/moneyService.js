class MoneyService {
  constructor() {
    localStorage.getItem('money') ? this.count = parseInt(localStorage.getItem('money')) : this.count = 0 
  }
  increment(quantity) {
    this.count= this.count + quantity;
    if (this.count<0){
      this.count = 0;
    }
  }
  value() {
    return this.count;
  }
}

module.exports = new MoneyService();

/* 
Pour le localstorage et les objets 
faire json.stringify pour le stocker
puis json.parse pour le repasser en objet
*/