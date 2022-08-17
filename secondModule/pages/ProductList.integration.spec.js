import { mount } from '@vue/test-utils';
import axios from 'axios';

import ProductList from '.';

import ProductCard from '@/components/ProductCard';
import Search from '@/components/Search';
import { makeServer } from '@/miragejs/server';

jest.mock('axios', () => ({
  get: jest.fn(),
}));

describe('ProductList - integration', () => {
  let server;
  beforeEach(() => {
    server = makeServer({ environment: 'test' });
  });
  afterEach(() => {
    server.shutdown();
  });
  it('should mount the component', () => {
    const wrapper = mount(ProductList);
    expect(wrapper.vm).toBeDefined();
  });
  it('should mount the Search component as a child', () => {
    const wrapper = mount(ProductList);
    expect(wrapper.findComponent(Search)).toBeDefined();
  });
  it('should mount the ProductCard component as a child', () => {
    const wrapper = mount(ProductList);
    expect(wrapper.findComponent(ProductCard)).toBeDefined();
  });
  it('should call axios.get on component mount', () => {
    mount(ProductList, {
      mocks: {
        $axios: axios,
      },
    });
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith('/api/products');
  });

  it('should mount the ProductCard component as a child', async () => {
    const products = server.createList('product', 10);

    axios.get.mockReturnValue(Promise.resolve({ data: { products } }));

    const wrapper = mount(ProductList, {
      mocks: {
        $axios: axios,
      },
    });

    await wrapper.vm.$nextTick();

    const cards = wrapper.findAllComponents(ProductCard);
    expect(cards).toHaveLength(10);
  });
  it('should display the error message when Promise rejects', () => {
    axios.get.mockReturnValue(
      Promise.reject(new Error('Something went wrong'))
    );

    const wrapper = mount(ProductList, {
      mocks: {
        $axios: axios,
      },
    });

    return wrapper.vm.$nextTick().then(() => {
      expect(wrapper.text()).toContain('Problemas ao carregar os produtos');
    });
  });
});
