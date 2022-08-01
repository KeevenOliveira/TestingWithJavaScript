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
      expect(cart.getTotal().getAmount()).toEqual(0);
    });

    it('should multiply quantity and price and receive the total amount', () => {
      const item = {
        product,
        quantity: 2,
      };

      cart.addItem(item);
      expect(cart.getTotal().getAmount()).toEqual(1400000);
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
      expect(cart.getTotal().getAmount()).toEqual(700000);
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
      expect(cart.getTotal().getAmount()).toEqual(1000000);
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

      expect(cart.getTotal().getAmount()).toEqual(0);
    });

    it('should return an object with the total and the list of items when summary() is called', () => {
      cart.addItem({
        product: productSecond,
        quantity: 3,
      });

      cart.summary();

      expect(cart.summary()).toMatchSnapshot();
      expect(cart.getTotal().getAmount()).toBeGreaterThan(0);
    });
    it('should include formatted in the summary', () => {
      cart.addItem({
        product,
        quantity: 5,
      });

      cart.addItem({
        product: productSecond,
        quantity: 3,
      });

      expect(cart.summary().formatted).toEqual('R$65,000.00');
    });
  });

  describe('special conditions', () => {
    it('should apply percentage discount quantity above minimum is passed', () => {
      const condition = {
        percentage: 30,
        minimum: 2,
      };

      cart.addItem({
        product,
        quantity: 3,
        condition,
      });

      expect(cart.getTotal().getAmount()).toEqual(1470000);
    });

    it('should apply quantity discount for even quantities', () => {
      const condition = {
        quantity: 2,
      };

      cart.addItem({
        product,
        quantity: 4,
        condition,
      });

      expect(cart.getTotal().getAmount()).toEqual(1400000);
    });
    it('should apply quantity discount for odd quantities', () => {
      const condition = {
        quantity: 2,
      };

      cart.addItem({
        product,
        quantity: 5,
        condition,
      });

      expect(cart.getTotal().getAmount()).toEqual(2100000);
    });
    it('should NOT apply percentage discount quantity is below or equals minimum', () => {
      const condition = {
        percentage: 30,
        minimum: 2,
      };

      cart.addItem({
        product,
        quantity: 2,
        condition,
      });

      expect(cart.getTotal().getAmount()).toEqual(1400000);
    });
    it('should NOT apply quantity discount for even quantities when codition is not met', () => {
      const condition = {
        quantity: 2,
      };

      cart.addItem({
        product,
        quantity: 1,
        condition,
      });

      expect(cart.getTotal().getAmount()).toEqual(700000);
    });

    it('should receive two of more conditions and determine/apply the best discount. First case.', () => {
      const condition1 = {
        percentage: 30,
        minimum: 2,
      };
      const condition2 = {
        quantity: 2,
      };

      cart.addItem({
        product,
        quantity: 5,
        condition: [condition1, condition2],
      });

      expect(cart.getTotal().getAmount()).toEqual(2100000);
    });
    it('should receive two of more conditions and determine/apply the best discount. Second case.', () => {
      const condition1 = {
        percentage: 80,
        minimum: 2,
      };
      const condition2 = {
        quantity: 2,
      };

      cart.addItem({
        product,
        quantity: 5,
        condition: [condition1, condition2],
      });

      expect(cart.getTotal().getAmount()).toEqual(700000);
    });
  });
});
