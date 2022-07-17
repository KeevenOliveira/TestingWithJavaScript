import Cart from './Cart';

describe('Cart', () => {
  let cart;
  let product = {
    title: 'Iphone 13 Pro Max',
    price: 700000, // 7.000,00
  };

  let productSecond = {
    title: 'Macbook Pro M2',
    price: 1000000, // 10.000,00
  };

  beforeEach(() => {
    cart = new Cart();
  });

  describe('getTotal()', () => {
    it('should return 0 when getTotal() is executed in a newly created instance', () => {
      expect(cart.getTotal()).toEqual(0);
    });

    it('should multiply quantity and price and receive the total amount', () => {
      const item = {
        product,
        quantity: 2,
      };

      cart.addItem(item);
      expect(cart.getTotal()).toEqual(1400000);
    });

    it('should ensure no more than on product exists', () => {
      cart.addItem({
        product,
        quantity: 2,
      });

      cart.addItem({
        product,
        quantity: 1,
      });
      expect(cart.getTotal()).toEqual(700000);
    });

    it('should update total when a product gets included and then remove', () => {
      cart.addItem({
        product,
        quantity: 2,
      });

      cart.addItem({
        product: productSecond,
        quantity: 1,
      });

      cart.remove(product);
      expect(cart.getTotal()).toEqual(1000000);
    });
  });

  describe('checkout()', () => {
    it('should return an object with the total and the list of items', () => {
      cart.addItem({
        product,
        quantity: 1,
      });

      cart.addItem({
        product: productSecond,
        quantity: 3,
      });

      expect(cart.checkout()).toMatchSnapshot(`
        Object {
          "items": Array [
            Object {
              "product": Object {
                "price": 700000,
                "title": "Iphone 13 Pro Max",
              },
              "quantity": 1,
            },
            Object {
              "product": Object {
                "price": 1000000,
                "title": "Macbook Pro M2",
              },
              "quantity": 3,
            },
          ],
          "total": 3700000,
        }
      `);
    });

    it('should reset the cart when checkout() is called', () => {
      cart.addItem({
        product: productSecond,
        quantity: 3,
      });

      cart.checkout();

      expect(cart.getTotal()).toEqual(0);
    });

    it('should return an object with the total and the list of items when summary() is called', () => {
      cart.addItem({
        product: productSecond,
        quantity: 3,
      });

      cart.summary();

      expect(cart.summary()).toMatchSnapshot();
      expect(cart.getTotal()).toBeGreaterThan(0);
    });
  });
});
