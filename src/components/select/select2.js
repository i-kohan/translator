import React  from 'react'
import './select2.css'

class Select extends React.Component {

    constructor(props) {
        super(props) 

        this.state = {
            isOpen: false
        }

        this.onOptionClick = this.onOptionClick.bind(this)
        this.onIconClick = this.onIconClick.bind(this)
    }
    
    onOptionClick(e) {
        const { value, name } = e.target
        this.props.onChange({ [name]: value })
    }

    onIconClick() {
        this.setState((prev) => ({ isOpen: !prev.isOpen }))
    }

    renderOptions(options) {
        return Object
            .keys(options)
            .map(key => 
                <div
                    className="option" 
                    onClick={this.onOptionClick}>
                    {options[key]}
                </div>
            )
    }

    render() {
        const {
            name,
            value,
            onChange,
            placeholder,
            options,
        } = this.props
        const { isOpen } = this.state
        const selectOptions = this.renderOptions(options)
        return (
            <React.Fragment>
                <div class="inputAndButton">
                    <input 
                        className="input-select"
                        name={name}
                        value={value}
                        onClick={this.onInputClick}
                        onChange={onChange}
                        placeholder={placeholder} />
                    {/* <i className="fas fa-arrow-from-top"></i> */}
                    <div
                        onClick={this.onIconClick}
                        style={{marginRight: 5 +'px',width: 40 + 'px', height: 100 + '%', backgroundColor: 'red'}}>
                    </div>
                </div>
                {isOpen ?
                <div className="options">
                    {selectOptions}
                </div> : null }
                
            </React.Fragment>
        )
    }
}

export default Select
