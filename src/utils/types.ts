export type Emotion = "普通" | "悲しみ" | "イライラ" | "焦り" | "絶望" | "どや" | "喜び" | "お願い" | "ホッ"

export type QuestionsCollectionData = {
    contributor_id: string
    contributor_name: string
    question_id:string
    question: string
    tag: string[]
    time: string
    emotion: Emotion
    parameter?: number
}

export type CommentsCollectionData = {
    commenter_id: string
    commenter_name: string
    comment:string
    time: string
    emotion: Emotion
    parameter?: number
}