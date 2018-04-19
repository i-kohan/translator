import React from 'react';
import './select.css'

class Select extends React.Component {

    buildOptions(options, defLangFlag) {
        let selectOptions = options

        if (defLangFlag) {
            selectOptions = Object.assign({}, { defLang: 'Define language' }, options)
        }
        
        return Object
            .entries(selectOptions)
            .map(([key, value]) => (
                <option value={key}>
                    {value}
                </option>)
                )
    }
        
    
    render() {
        const {
            value,
            onChange,
            options,
            defLangFlag,
            name
        } = this.props
        const selectOptions = this.buildOptions(options, defLangFlag)
        return (
            <select
                value={value}
                onChange={onChange}
                name={name} >
                {selectOptions}
            </select>
        )
    }
}

export default Select
