import React from "react"

//アカウント名とタグ名を新しく作る時のバリデーション、投稿フォームの質問内容欄のバリデーション
export const useValidation = (tagList?: string[]) => {
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

    // const cannotStartNewLine = () =>{
    //     return valueText[0].match(/\n/g)
    // }

    // const cannotEndNewLine = () =>{
    //     return valueText[valueText.length - 1].match(/\n/g)
    // }

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
        textValidation: isValidated && isInputStart,
    }
}


//新規登録のメールアドレスの欄のバリデーション
export const useMailValidation = () => {
    const [emailValueText, setEmailValueText] = React.useState("")
    const [errorEmailMessage, setErrorEmailMessage] = React.useState("")
    const [isInputEmailStart, setIsInputEmailStart] = React.useState(false)
    const [isEmailValidated, setIsEmailValidated] = React.useState(true)

    const require = () => {
        return emailValueText === "" || !emailValueText.match(/\S/g)
    }

    const spaceCheck = () => {
        return emailValueText.indexOf(" ") !== -1
    }

    const emailForm = () => {
        return (
            emailValueText.indexOf("@") === -1 ||
            (emailValueText.indexOf(".com") === -1 && emailValueText.indexOf(".jp") === -1) ||
            emailValueText[0] === "." ||
            emailValueText[0] === "@" ||
            (emailValueText.indexOf("@") > emailValueText.indexOf(".com") &&
                emailValueText.indexOf("@") > emailValueText.indexOf(".jp"))
        )
    }

    const validate = () => {
        if (require()) {
            setErrorEmailMessage("必須項目です")
            setIsEmailValidated(false)
            return
        }
        if(spaceCheck()){
            setErrorEmailMessage("空白が含まれています")
            setIsEmailValidated(false)
            return
        }
        if(emailForm()){
            setErrorEmailMessage("メールアドレスの形式として正しくありません")
            setIsEmailValidated(false)
            return
        }
        setIsEmailValidated(true)
        setErrorEmailMessage("")
    }

    React.useEffect(() => {
        if (emailValueText.length === 0 && isInputEmailStart) {
            setIsInputEmailStart(false)
            validate()
        } else if (emailValueText.length > 0) {
            setIsInputEmailStart(true)
            validate()
        }
    }, [emailValueText])

    return {
        emailValueText,
        setEmailValueText,
        isEmailValidated,
        errorEmailMessage,
        emailValidation: isEmailValidated && isInputEmailStart,
    }
}


//新規登録のパスワードの欄のバリデーション
export const usePasswordValidation = () => {
    const [passwordValueText, setPasswordValueText] = React.useState("")
    const [errorPasswordMessage, setErrorPasswordMessage] = React.useState("")
    const [isInputPasswordStart, setIsInputPasswordStart] = React.useState(false)
    const [isPasswordValidated, setIsPasswordValidated] = React.useState(true)

    const require = () => {
        return passwordValueText === "" || !passwordValueText.match(/\S/g)
    }

    const spaceCheck = () => {
        return passwordValueText.indexOf(" ") !== -1
    }

    const passwordLength = () => {
        return passwordValueText.length < 6
    }

    const validate = () => {
        if (require()) {
            setErrorPasswordMessage("必須項目です")
            setIsPasswordValidated(false)
            return
        }
        if(spaceCheck()){
            setErrorPasswordMessage("空白が含まれています")
            setIsPasswordValidated(false)
            return
        }
        if(passwordLength()){
            setErrorPasswordMessage("文字数が足りていません")
            setIsPasswordValidated(false)
            return
        }
        setIsPasswordValidated(true)
        setErrorPasswordMessage("")
    }

    React.useEffect(() => {
        if (passwordValueText.length === 0 && isInputPasswordStart) {
            setIsInputPasswordStart(false)
            validate()
        } else if (passwordValueText.length > 0) {
            setIsInputPasswordStart(true)
            validate()
        }
    }, [passwordValueText])

    return {
        passwordValueText,
        setPasswordValueText,
        isPasswordValidated,
        errorPasswordMessage,
        passwordValidation: isPasswordValidated && isInputPasswordStart,
    }
}

//投稿フォームのタグ欄のバリデーション
export const usePostTagValidation = () => {
    const [tag, setTag] = React.useState<string[]>([])
    const [errorTagMessage, setErrorTagMessage] = React.useState("")
    const [isInputTagStart, setIsInputTagStart] = React.useState(false)
    const [isTagValidated, setIsTagValidated] = React.useState(true)

    const require = () => {
        return tag.length===0
    }

    const validate = () => {
        if (require()) {
            setErrorTagMessage("最低1つは選択してください")
            setIsTagValidated(false)
            return
        }
        setIsTagValidated(true)
        setErrorTagMessage("")
    }

    React.useEffect(() => {
        if (tag.length === 0 && isInputTagStart) {
            setIsInputTagStart(false)
            validate()
        } else if (tag.length > 0) {
            setIsInputTagStart(true)
            validate()
        }
    }, [tag])

    return {
        tag,
        setTag,
        isTagValidated,
        errorTagMessage,
        tagValidation: isTagValidated && isInputTagStart,
    }
}