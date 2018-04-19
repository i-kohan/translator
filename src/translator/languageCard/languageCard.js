import React from 'react'
import {
    Select,
    TextArea,
    Spinner,
} from '../../components/components.js'
import './languageCard.css'

export default function LanguageCard(props) {
    const {
        selectValue,
        selectName,
        options,
        defLangFlag,
        onChange,

        textAreaValue,
        placeholder,
        debounce,
        textAreaDisabled,
        onSearch,

        isLoading
    } = props

    function handleSelectChange(e) {
        const { value, name } = e.target
        onChange({ [name]: value })
    }

    return (
        <div className="language-card">
            <TextArea
                value={textAreaValue}
                placeholder={placeholder}
                debounce={debounce}
                disabled={textAreaDisabled}
                onSearch={onSearch} />
            <Select
                value={selectValue}
                name={selectName}
                options={options || {}}
                onChange={onChange} />
        </div>
    )
}
