// usersコレクション
export const users = [
    {
        // user_id: "0fkyo9tTHGG7w66HC3CU",
        name: "大月凌",
        email: "ryo@gmail.com",
        password: "aiueo",
    },
    {
        // user_id: "N73VhE3bq8jiHm834Ui6",
        name: "山田海輝",
        email: "kaiki@gmail.com",
        password: "yamakai",
    },
    {
        // user_id: "fclsJi4KyGa9957MTSv3",
        name: "大久保尚宏",
        email: "unti@gmail.com",
        password: "untinaohiro",
    },
]

// user_id一つ一つに紐づいたbookmarksコレクション
export const bookmarks = [
    {
        contributor_id: "fclsJi4KyGa9957MTSv3",
        contributor_name: "大久保尚宏",
        question_id: "Zp3CVUVynHlKFiVq4aYB",
        question: "便秘の治し方を教えてください",
        tag: ["日常"],
        time: "2022-6-22",
        emotion: "絶望",
        parameter: 100,
    },
    {
        contributor_id: "0fkyo9tTHGG7w66HC3CU",
        contributor_name: "大月凌",
        question_id: "CfZscSTt2l9do2zjmtVI",
        question: "SSRとSSGについてそれぞれのメリットが知りたいです",
        tag: ["SSG", "SSR"],
        time: "2022-5-20",
        emotion: "焦り",
        parameter: 10,
    },
]

// questionsコレクション
export const questions = [
    {
        contributor_id: "fclsJi4KyGa9957MTSv3",
        contributor_name: "大久保尚宏",
        question: "便秘の治し方を教えてください",
        tag: ["日常"],
        time: "2022-6-22",
        emotion: "絶望",
        parameter: 100,
    },
    {
        contributor_id: "0fkyo9tTHGG7w66HC3CU",
        contributor_name: "大月凌",
        question: "SSRとSSGについてそれぞれのメリットが知りたいですSSRとSSGについてそれぞれのメリットが知りたいですSSRとSSGについてそれぞれのメリットが知りたいですSSRとSSGについてそれぞれのメリットが知りたいです",
        tag: ["SSG", "SSR"],
        time: "2022-6-20",
        emotion: "焦り",
        parameter: 10,
    },
]

// question_id一つ一つに紐づいたcommentsコレクション
export const comments = [
    {
        commenter_id: "0fkyo9tTHGG7w66HC3CU",
        commenter_name: "大月凌",
        comment: "便秘を治すには腸内環境を整えることが大事ですよ！",
        time: "2022-6-23",
    },
    {
        commenter_id: "N73VhE3bq8jiHm834Ui6",
        commenter_name: "山田海輝",
        comment: "腸内環境を整えるには乳酸菌を摂取することが大事らしい！",
        time: "2022-6-24",
    },
]

// タグのデータベース
export const tags = ["日常", "SSG", "SSR", "課題", "レポート", "データサイエンス"]
