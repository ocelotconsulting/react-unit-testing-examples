import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import InputForm from '../../src/form/InputForm'

describe('InputForm', () => {
  let props

  beforeEach(() => {
    // init props with a happy path - that way we can mutate before rendering to set up our test
    props = {
      name: 'Marge Simpson',
      address: '123 Fake Street',
      onChange: jest.fn(),
      onSubmit: jest.fn()
    }
  })

  const shallowRender = () => shallow(<InputForm {...props}/>)

  const getBoundProperties = wrapper => {
    const instance = wrapper.instance()
    return [
      { property: 'name', onChange: instance.onNameChanged },
      { property: 'address', onChange: instance.onAddressChanged }
    ]
  }

  it('binds to fields', () => {
    const wrapper = shallowRender()
    const fieldProps = wrapper.find('input').map(input => input.props())

    expect(fieldProps).toEqual(getBoundProperties(wrapper).map(({ property, onChange }) => ({
      id: `registration-form-${property}`,
      type: 'text',
      value: props[property],
      onChange
    })))
  })

  it('triggers onChange from onChange handlers', () => {
    const wrapper = shallowRender()
    const properties = getBoundProperties(wrapper)

    properties.forEach(({ property, onChange }) => {
      const value = `${property} value`
      onChange({ target: { value } })
      expect(props.onChange).lastCalledWith({ [property]: value })
    })
  })

  it('binds submit button onClick handler', () => {
    expect(shallowRender().find('button').prop('onClick')).toBe(props.onSubmit)
  })

  const isSubmitEnabled = () => !shallowRender().find('button').prop('disabled')

  it('disables submit button when name is empty', () => {
    props.name = ' '

    expect(isSubmitEnabled()).toBe(false)
  })

  it('disables submit button when address is empty', () => {
    props.address = ''

    expect(isSubmitEnabled()).toBe(false)
  })

  it('enables submit button when name and address are non-empty', () => {
    expect(isSubmitEnabled()).toBe(true)
  })

  it('matches snapshot', () => {
    // capture the structure of the rendered component for regression testing
    expect(toJson(shallowRender())).toMatchSnapshot()
  })
})
