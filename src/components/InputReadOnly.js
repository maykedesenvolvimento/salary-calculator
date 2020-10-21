import React, { Component } from 'react'

export default class InputReadOnly extends Component {
    brlFormat = (value) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)

    percent = (value) => (value) ? ` (${value.toFixed(2)}%)` : ''

    render() {
        return (
            <div className='form-control'>
                <label className={`text-${this.props.color}`}>
                    {this.props.label} {this.percent(this.props.percent)}
                </label>
                <input type='text' placeholder={this.props.label} value={this.brlFormat(this.props.value)} disabled />
            </div>
        )
    }
}

