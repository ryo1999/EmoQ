import React from "react"

export const useSample = (tagList?: string[]) => {
    const [valueText, setValueText] = React.useState("")
    const [errorMessage, setErrorMessage] = React.useState("")
    const [isInputStart, setIsInputStart] = React.useState(false)
    const [isValidated, setIsValidated] = React.useState(true)

    const require = () => {
        return valueText === "" || !valueText.match(/\S/g)
    }

    const includes = () => {
        if (tagList) {
            return tagList.includes(valueText)
        }
    }

    const cannotStartSpace = () => {
        return valueText[0] === " " || valueText[0] === "　"
    }

    const cannotEndSpace = () => {
        return valueText[valueText.length - 1] === " " || valueText[valueText.length - 1] === "　"
    }

    const validate = () => {
        if (require()) {
            setErrorMessage("必須項目です")
            setIsValidated(false)
            return
        }
        if (includes()) {
            setErrorMessage("すでに存在します")
            setIsValidated(false)
            return
        }
        if (cannotStartSpace()) {
            setErrorMessage("空白で始めることはできません")
            setIsValidated(false)
            return
        }
        if (cannotEndSpace()) {
            setErrorMessage("空白で終わることはできません")
            setIsValidated(false)
            return
        }
        setIsValidated(true)
        setErrorMessage("")
    }

    React.useEffect(() => {
        if (valueText.length === 0 && isInputStart) {
            setIsInputStart(false)
            validate()
        } else if (valueText.length > 0) {
            setIsInputStart(true)
            validate()
        }
    }, [valueText])

    return {
        valueText,
        setValueText,
        isValidated,
        errorMessage,
        isButton: isValidated && isInputStart,
    }
}
