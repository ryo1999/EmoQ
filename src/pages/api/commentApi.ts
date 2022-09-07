import { db } from "@/firebase"
import { collection, getDocs, query } from "firebase/firestore/lite"
import { CommentsCollectionData } from "@/utils/types"

//指定されたquestion_idのコメントをとってくる
export const getComment = async (question_id: string) => {
    const commentList: CommentsCollectionData[] = []
    const commentId = query(collection(db, "questions", question_id, "comments"))
    const commentDoc = await getDocs(commentId)
    commentDoc.forEach((doc) => {
        const commentField = {
            commenter_id: doc.data().commenter_id,
            commenter_name: doc.data().commenter_name,
            comment: doc.data().comment,
            time: doc.data().time,
            emotion: doc.data().emotion,
            parameter: doc.data().parameter,
        }
        commentList.push(commentField)
    })
    return commentList
}