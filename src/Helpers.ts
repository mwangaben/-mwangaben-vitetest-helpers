import { expect } from 'vitest'

class Helpers {
  constructor(wrapper) {
    this.wrapper = wrapper
    this.expect = expect
  }

  see(text: string, selector: string) {
    const wrap = selector ? this.wrapper.find(selector) : this.wrapper
    this.expect(wrap.html()).toContain(text)
  }

  doNotSee(text: string) {
    this.expect(this.wrapper.html()).not.toContain(text)
  }

  hidden(selector: string) {
    const node = this.find(selector)
    this.expect(node.isVisible()).toBe(false)
  }

  domHas(selector: string) {
    this.expect(this.wrapper.find(selector).exists()).toBe(true)
  }

  domHasNot(selector: string) {
    this.expect(this.wrapper.find(selector).exists()).toBe(false)
  }

  hasAClass(name: string, selector: string | null = null) {
    selector
      ? this.expect(this.find(selector).classes()).toContain(name)
      : this.expect(this.wrapper.classes()).toContain(name)
  }

  doesNotHaveAClass(name: string, selector: string | null = null) {
    selector
      ? this.expect(this.find(selector).classes()).not.toContain(name)
      : this.expect(this.wrapper.classes()).not.toContain(name)
  }

  hasAttribute(attr: string, value: string, selector: string) {
    this.expect(this.find(selector).attributes()[attr]).toBe(value)
  }

  doesNotHaveAttribute(attr: string, value: string, selector: string) {
    this.expect(this.find(selector).attributes()[attr]).not.toBe(value)
  }

  find(selector: string) {
    return this.wrapper.find(selector)
  }

  // input
  type(text: string, input: string, event = 'input') {
    const node = this.find(input)
    node.element.value = text
    node.trigger(event)
  }

  inputValueIs(text: string, selector: string) {
    this.expect(this.find(selector).element.value).toBe(text)
  }

  inputValueIsNot(text: string, selector: string) {
    this.expect(this.find(selector).element.value).not.toBe(text)
  }

  isEmpty(selector: string) {
    // this.inputValueIs('', selector)
    this.expect(this.find(selector).element.value).toBe('')
  }

  // event
  click(selector) {
    this.find(selector).trigger('click')
  }

  emitted(event) {
    this.expect(this.wrapper.emitted()[event]).toBeTruthy()
  }

  emittedContains(event: string, ...data) {
    this.emitted(event)
    let elements = this.wrapper.emitted()[event][0]

    data.forEach((element) => {
      Array.isArray(element)
        ? this.checkArray(elements, element)
        : element instanceof Object
        ? this.checkObject(elements, element)
        : this.checkData(elements, element)
    })
  }

  // Helpers
  checkArray(elements, element) {
    return element.forEach((e) => {
      elements.forEach((arr) => {
        this.expect(arr).toContain(e)
      })
    })
  }

  checkObject(elements, element) {
    return elements.forEach((obj) => {
      this.expect(obj).toEqual(this.expect.objectContaining(element))
    })
  }

  checkData(elements, element) {
    return this.expect(elements).toContain(element)
  }
}

export default Helpers
