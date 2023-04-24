import { describe, it, beforeEach, afterEach } from 'vitest'
import Helpers from '../Helpers'
import { mount } from '@vue/test-utils'
import Questions from '../components/Questions.vue'
import moxios from 'moxios'

describe('HelloWorld', () => {
  let wrapper, b
  beforeEach(() => {
    moxios.install()
    wrapper = mount(Questions)
    b = new Helpers(wrapper)
  })

  afterEach(() => {
    moxios.uninstall()
  })

  it('renders properly', () => {
    // expect(wrapper.text()).toContain('Where am i ?')
    b.see('Where am i ?')
  })

  it('does not show the text node when visibility is hidden', () => {
    b.doNotSee('Header')
  })

  it('checks if the list is visible', () => {
    b.hidden('ul')
  })

  it('checks if the wrapper or DOM has this h2 element', () => {
    b.domHas('h2')
  })

  it('checks if the wrapper or DOM does not have this', () => {
    b.domHasNot('h1')
  })

  it('confirm the existance of a class container in a DOM', () => {
    b.hasAClass('container')
  })

  it('confirm the existance of a class container in a first div to be found in a DOM', () => {
    b.hasAClass('container', 'div')
  })

  it('confirms that a class container does not exist in a DOM', () => {
    b.doesNotHaveAClass('containers')
  })

  it('confirms that a class container does not exist on first div to be found in a DOM', () => {
    b.doesNotHaveAClass('containers', 'div')
  })

  it('h2 has a class attribute display-4', () => {
    b.hasAttribute('class', 'display-4', '.container h2')
  })

  it("h2 hasn't a class attribute display-3", () => {
    b.doesNotHaveAttribute('class', 'display-3', '.container h2')
  })

  it('does the typing thing ', () => {
    b.type('Vue test helpers', 'input[name=title]') // event = 'input' by default
    b.type('Vue test helpers', 'select[name=names]', 'change')
  })

  it('does the input value has this text', () => {
    b.type('Vue test helpers', 'input[name=title]')

    b.inputValueIs('Vue test helpers', 'input[name=title]')
  })

  it('does the input value is not this text', () => {
    b.type('Vue test helpers', 'input[name=title]')

    b.inputValueIsNot('Tdd in Vue', 'input[name=title]')
  })

  it('checks if the input is empty/ has no value', () => {
    b.isEmpty('#firstname')
  })

  it('does the click thing ', () => {
    b.click('.edit')
  })

  it('broadcasts event', () => {
    b.click('.apply')
    b.emitted('applied')
  })

  it('checks data emitted by emit(event, 40)', () => {
    b.click('.edit')
    b.emittedContains('isEditing', 40)
  })

  it('checks data emitted by emit(event, 200, 300, 400,404, 500)', () => {
    b.click('.status')
    b.emittedContains('status', 400, 200)
  })

  it('checks data emitted by this.emit(event, {company: "Apple.incl", product: "iPhone X"})', () => {
    b.click('.products')
    b.emittedContains('obj', { product: 'iPhone X' })
  })
})
