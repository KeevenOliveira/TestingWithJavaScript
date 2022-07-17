import find from 'lodash/find';
import remove from 'lodash/remove';
export default class Cart {
  constructor() {
    this.items = [];
  }

  remove(product) {
    remove(this.items, { product });
  }

  addItem(item) {
    const itemToFind = { product: item.product };
    const alredExists = find(this.items, itemToFind);

    if (alredExists) {
      remove(this.items, itemToFind);
    }

    this.items.push(item);
  }

  getTotal() {
    return this.items.reduce(
      (acc, item) => acc + item.quantity * item.product.price,
      0,
    );
  }

  summary() {
    return {
      total: this.getTotal(),
      items: this.items,
    };
  }

  checkout() {
    const { total, items } = this.summary();

    this.items = [];

    return {
      total,
      items,
    };
  }
}
