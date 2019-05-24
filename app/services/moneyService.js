class MoneyService {
  constructor() {
    localStorage.getItem('money') ? this.money = parseInt(localStorage.getItem('money')) : this.money = 10 
  }
  increment(quantity) {
    this.money += quantity;
    if (this.money<0){
      this.money = 0;
    }
  }
  value() {
    return this.money;
  }
  reset(){
    this.money=10;
  }
}

module.exports = new MoneyService();

/* 
Pour le localstorage et les objets 
faire json.stringify pour le stocker
puis json.parse pour le repasser en objet
*/