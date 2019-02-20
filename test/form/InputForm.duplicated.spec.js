import React from 'react'
import { shallow } from 'enzyme'
import InputForm from '../../src/form/InputForm'

describe('InputForm', () => {
  // BAD - don't do this
  // too much noise and duplication

  it('disables submit button when name is empty', () => {
    const onChange = jest.fn()
    const onSubmit = jest.fn()
    const submitButton = shallow(
      <InputForm name='' address='123 Fake Street' onChange={onChange} onSubmit={onSubmit}/>
    ).find('button')

    expect(submitButton.prop('disabled')).toBe(true)
  })

  it('disables submit button when address is empty', () => {
    const onChange = jest.fn()
    const onSubmit = jest.fn()
    const submitButton = shallow(
      <InputForm name='Marge Simpson' address='' onChange={onChange} onSubmit={onSubmit}/>
    ).find('button')

    expect(submitButton.prop('disabled')).toBe(true)
  })

  it('enables submit button when name and address are non-empty', () => {
    const onChange = jest.fn()
    const onSubmit = jest.fn()
    const submitButton = shallow(
      <InputForm name='Marge Simpson' address='123 Fake Street' onChange={onChange} onSubmit={onSubmit}/>
    ).find('button')

    expect(submitButton.prop('disabled')).toBe(false)
  })
})
