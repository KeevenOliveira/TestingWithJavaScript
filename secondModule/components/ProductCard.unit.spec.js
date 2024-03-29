import { mount } from '@vue/test-utils';
import ProductCard from '@/components/ProductCard';

import { makeServer } from '@/miragejs/server';

const mountProductCard = (server) => {
  const product = server.create('product', {
    title: 'Relógio bonito',
    price: '22.00',
    image:
      'https://images.unsplash.com/photo-1495857000853-fe46c8aefc30?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=',
  });

  return {
    wrapper: mount(ProductCard, {
      propsData: {
        product,
      },
    }),
    product,
  };
};

describe('ProductCard - unit', () => {
  let server;
  beforeEach(() => {
    server = makeServer({ environment: 'test' });
  });
  afterEach(() => {
    server.shutdown();
  });

  it('should match snapshot', () => {
    const { wrapper } = mountProductCard(server);

    expect(wrapper.element).toMatchSnapshot();
  });

  it('should mount the component', () => {
    const { wrapper } = mountProductCard(server);

    expect(wrapper.vm).toBeDefined();
    expect(wrapper.text()).toContain('Relógio bonito');
    expect(wrapper.text()).toContain('22.00');
  });

  it('should emit the event addToCart with product object', async () => {
    const { wrapper, product } = mountProductCard(server);

    await wrapper.find('button').trigger('click');

    expect(wrapper.emitted().addToCart).toBeTruthy();
    expect(wrapper.emitted().addToCart.length).toBe(1);
    expect(wrapper.emitted().addToCart[0]).toEqual([{ product }]);
  });
});
