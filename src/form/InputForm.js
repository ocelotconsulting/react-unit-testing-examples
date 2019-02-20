import React, { PureComponent } from 'react'
import T from 'prop-types'

const isEmpty = value => value.trim().length === 0

export default class InputForm extends PureComponent {
  static propTypes = {
    name: T.string.isRequired,
    address: T.string.isRequired,
    onChange: T.func.isRequired,
    onSubmit: T.func.isRequired
  }

  // using a bound instance function has two advantages over inline functions
  // 1 - it's a bit easier to test - we can simplify verify the props of the bound component then test the handler
  // separately
  // 2 - it is theoretically more efficient - when React re-renders an input field it won't think the onChange handler
  // has changed as it would if we inline the function

  onNameChanged = event => {
    this.props.onChange({ name: event.target.value })
  }

  onAddressChanged = event => {
    this.props.onChange({ address: event.target.value })
  }

  render () {
    const { name, address, onSubmit } = this.props
    return (
      <form>
        <div>
          <label htmlFor='registration-form-name'>Name: </label>
          <input type='text' id='registration-form-name' value={name} onChange={this.onNameChanged}/>
        </div>
        <div>
          <label htmlFor='registration-form-address'>Mailing Address: </label>
          <input type='text' id='registration-form-address' value={address} onChange={this.onAddressChanged}/>
        </div>
        <div>
          <button type='button' disabled={isEmpty(name) || isEmpty(address)} onClick={onSubmit}>
            Submit
          </button>
        </div>
      </form>
    )
  }
}
