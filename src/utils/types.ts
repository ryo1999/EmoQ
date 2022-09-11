//質問のデータを扱う時の型
export type QuestionsCollectionData = {
    contributor_id: string
    contributor_name: string
    question_id:string
    question: string
    tag: string[]
    time: Date
    emotion: string
    parameter: number
    solution:boolean
    bookmark_user_id:string[]
    replied_user_id:string[]
}

//コメントを取得するときの型
export type CommentsCollectionData = {
    question_id:string
    commenter_id: string
    commenter_name: string
    comment_id:string
    comment:string
    time: Date
    emotion: string
}