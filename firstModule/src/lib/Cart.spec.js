import Cart from './Cart';

describe('Cart', () => {
  let cart;

  beforeEach(() => {
    cart = new Cart();
  });

  it('should return 0 when getTotal() is executed in a newly created instance', () => {
    expect(cart.getTotal()).toEqual(0);
  });
  it('should multiply quantity and price and receive the total amount', () => {
    const item = {
      product: {
        title: 'test',
        price: 10,
      },
      quantity: 2,
    };

    cart.addItem(item);
    console.log(cart.getTotal(), 'total');

    expect(cart.getTotal()).toEqual(20);
  });
});
