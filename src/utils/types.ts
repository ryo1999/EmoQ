//感情の種類
export type Emotion = "普通" | "悲しみ" | "イライラ" | "焦り" | "絶望" | "どや" | "喜び" | "お願い" | "ホッ"

//質問のデータを取得する時の型
export type QuestionsCollectionData = {
    contributor_id: string
    contributor_name: string
    question_id:string
    question: string
    tag: string[]
    time: Date
    emotion: Emotion
    parameter?: number
}

//コメントを取得するときの型
export type CommentsCollectionData = {
    commenter_id: string
    commenter_name: string
    comment:string
    time: Date
    emotion: Emotion
    parameter?: number
}