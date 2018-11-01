import { mount } from '@vue/test-utils'
import Login from '@/components/Login.vue'

describe('testing main', () => {
  it('displays username', () => {
    const wrapper = mount(Login)
    expect(wrapper.text()).toContain('username')
  })
})