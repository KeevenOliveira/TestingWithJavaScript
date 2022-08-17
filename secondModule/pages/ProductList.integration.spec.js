import { mount } from '@vue/test-utils';

import ProductList from '.';

import ProductCard from '@/components/ProductCard';
import Search from '@/components/Search';

describe('ProductList - integration', () => {
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
  // it('should mount the ProductCard component as a child', () => {
  //   const wrapper = mount(ProductList);
  //   const cards = wrapper.findAllComponents(ProductCard);
  //   expect(cards).toHaveLength(10);
  // });
});
