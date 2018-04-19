import React, { Component } from 'react';
import { getTranslation, getSupposedLanguage, getSupportedLanguages } from './services/yandexTranslateService'
import './App.css';
import { Button } from './components/components.js';
import { LanguageCard } from './translator/components'

class App extends Component {

    constructor(props) {
        super(props)

        this.state = {
            translation: '',
            value: '',
            supportedLanguages: [],
            languages: {
                languageFrom: 'defLang',
                languageTo: 'ru',
            },
            isLoading: true
        }

        this.handleTranslate = this.handleTranslate.bind(this)
        this.handleSearchChange = this.handleSearchChange.bind(this)
        this.handleSelectChange = this.handleSelectChange.bind(this)
        this.handleButtonClick = this.handleButtonClick.bind(this)
    }

    async componentDidMount() {
        const supportedLanguages = await getSupportedLanguages({  ui: 'en' })  //TODO remove hardcode
        this.setState({
            supportedLanguages: supportedLanguages.langs,
            isLoading: false,
        })
    }

    isInvalid(value, languages) {
        return !value || languages.languageFrom === 'defLang'
    }

    async getLanguageByInput(text) {
        const languageFrom = await getSupposedLanguage({ text })
        return {...this.state.languages, languageFrom: languageFrom.lang }
    }

    handleButtonClick() {
        const { value, languages } = this.state
        if (this.isInvalid(value, languages)) {return}
        this.handleTranslate({ value, langs: languages })
    }

    async handleSearchChange(value) {
        const { languages } = this.state
        if (!value) {
            return this.setState({
                value: '',
                translation: '',
            })
        }
        if (languages.languageFrom === 'defLang') {
            const langs = await this.getLanguageByInput(value)
            return this.handleTranslate({ value, langs })
        }
        this.handleTranslate({ value, langs: languages })
    }

    handleSelectChange(changedLanguage) {
        const { value, languages } = this.state
        const langs = { ...languages, ...changedLanguage }
        if (this.isInvalid(value, langs)) {
            return this.setState({ languages: langs })
        }
        this.handleTranslate({ value, langs })
    }

    async handleTranslate({ value, langs }) {
        const lang = `${langs.languageFrom}-${langs.languageTo}`
        const translation = await getTranslation({ text: value, lang })
        this.setState({
            languages: langs,
            value,
            translation: translation.text
        })
    }

    render() {
        const {
            translation,
            supportedLanguages,
            languages: {
                languageFrom,
                languageTo,
            },
            isLoading,
        } = this.state
        return (
            <div className = "App">
                <div className="row">
                    <LanguageCard
                        selectValue={languageFrom}
                        selectName="languageFrom"
                        options={supportedLanguages}
                        defLangFlag={true}
                        onChange={this.handleSelectChange}

                        placeholder="Write..."
                        debounce={500}
                        onSearch={this.handleSearchChange}
                        isLoading={isLoading}/> 
                    <LanguageCard
                        selectValue={languageTo}
                        selectName="languageTo"
                        options={supportedLanguages}
                        onChange={this.handleSelectChange}

                        textAreaValue={translation}
                        placeholder="Translation"
                        textAreaDisabled={true}
                        isLoading={isLoading} />          
                </div>
                <div className="button">
                    <Button
                        onClick={this.handleButtonClick}
                        lable="Translate" />
                </div>
            </div>
        );
    }
}

export default App;