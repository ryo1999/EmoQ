// usersコレクション
export const users = [
    {
        user_id: "ryo",
        name: "大月凌",
        email: "ryo@gmail.com",
        password: "12345678",
    },
    {
        user_id: "kaiki",
        name: "山田海輝",
        email: "kaiki@gmail.com",
        password: "11223344",
    },
    {
        user_id: "naohiro",
        name: "大久保尚宏",
        email: "naohiro@gmail.com",
        password: "99887766",
    },
]

// user_id一つ一つに紐づいたbookmarksコレクション
export const bookmarks = [
    {
        bookmark_id: "aiueoaiueo",
        user_id: "ryo",
        question_id: "zzzzzzzz",
        question: "便秘を治す方法を教えてください",
        tag: ["日常"],
        time: "2022-5-20",
        emotion: "sad",
        parameter: 100,
    },
    {
        bookmark_id: "kakikukeko",
        user_id: "kaiki",
        question_id: "xxxxxxxx",
        question: "SSRとSSGについてそれぞれのメリットが知りたいです",
        tag: ["SSG", "SSR"],
        time: "2022-6-20",
        emotion: "焦り",
        parameter: 5,
    },
]

// questionsコレクション
export const questions = [
    {
        user_id: "ryo",
        name: "大月凌",
        question_id: "zzzzzzzz",
        question:"便秘を治す方法を教えてください便秘を治す方法を教えてください便秘を治す方法を教えてください便秘を治す方法を教えてください便秘を治す方法を教えてください",
        tag: ["日常"],
        time: "2022-5-20",
        emotion: "sad",
        parameter: 100,
    },
    {
        user_id: "kaiki",
        name: "山田海輝",
        question_id: "xxxxxxxx",
        question: "SSRとSSGについてそれぞれのメリットが知りたいです",
        tag: ["SSG", "SSR"],
        time: "2022-6-20",
        emotion: "焦り",
        parameter: 5,
    },
    {
        user_id: "ryo",
        name: "大月凌",
        question_id: "yyyyyyyy",
        question: "データサイエンスの授業のレポートの提出締め切りを教えてください",
        tag: ["課題", "レポート", "データサイエンス"],
        time: "2022-6-10",
        emotion: "緊急度",
        parameter: 90,
    },
]

// question_id一つ一つに紐づいたcommentsコレクション
export const comments = [
    {
        user_id: "naohiro",
        comment_id: "aaaaaaaaa",
        comment: "便秘を治すには腸内環境を整えることが大事ですよ！",
        time: "2022-5-22",
        question_id: "zzzzzzzz",
    },
    {
        user_id: "kaiki",
        comment_id: "iiiiiiiii",
        comment: "腸内環境を整えるには乳酸菌を摂取することが大事らしい！",
        time: "2022-5-23",
        question_id: "zzzzzzzz",
    },
]

// タグのデータベース
export const tags = ["日常", "SSG", "SSR", "課題", "レポート", "データサイエンス"]
