import React from 'react'
import './textArea.css'

class TextArea extends React.Component {

    constructor(props) {
        super(props)

        this.lastDebounceTimeout = null

        this.setInputRef = this.setInputRef.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleSearch = this.handleSearch.bind(this)
    }

    componentWillUnmount() {
        if (this.lastDebounceTimeout) {
            clearTimeout(this.lastDebounceTimeout)
        }
    }

    handleChange() {
        const {
            handleSearch,
            lastDebounceTimeout,
            inputRef: { value },
            props: { debounce, onChange },
        } = this

        if (onChange) {
            onChange(value)
        }

        if (lastDebounceTimeout) {
            clearTimeout(lastDebounceTimeout)
        }

        this.lastDebounceTimeout = setTimeout(handleSearch, debounce)
    }

    handleSearch() {
        this.props.onSearch(this.props.value || this.inputRef.value)
    }

    setInputRef(element) {
        this.inputRef = element
    }

    render() {
        const {
            placeholder,
            onBlur,
            name,
            value,
            onFocus,
            disabled,
            isLoading,
        } = this.props

        const className = isLoading ? 'textAred-load' : ''

        return (
            <textarea
                ref={this.setInputRef}
                placeholder={placeholder}
                value={value}
                name={name}
                disabled={disabled}
                onChange={this.handleChange}
                className={className}
                onBlur={onBlur}
                onFocus={onFocus} />
        )
    }
}

TextArea.displayName = "TextArea"
export default TextArea
