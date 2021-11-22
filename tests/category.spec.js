import { shallowMount } from '@vue/test-utils'
import Category from '@/components/category.vue'

describe('Category.vue Tests', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallowMount(Category)
    })

    it("test", () => {
        const category = wrapper.get('[data-test="category"]');
    })
})