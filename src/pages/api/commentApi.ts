import { db } from "@/firebase"
import { collection, deleteDoc, getDocs, query, doc, orderBy, addDoc } from "firebase/firestore/lite"
import { CommentsCollectionData } from "@/utils/types"

//指定されたquestion_idのコメントをとってくる
export const getComment = async (question_id: string, groupId:string) => {
    const commentList: CommentsCollectionData[] = []
    const commentId = query(collection(db, "groups", groupId, "questions", question_id, "comments"), orderBy("time"))
    const commentDoc = await getDocs(commentId)
    commentDoc.forEach((doc) => {
        const commentField = {
            question_id: question_id,
            commenter_id: doc.data().commenter_id,
            commenter_name: doc.data().commenter_name,
            comment_id: doc.id,
            comment: doc.data().comment,
            time: doc.data().time.toDate(),
            emotion: doc.data().emotion,
            replied_user_id:doc.data().replied_user_id,
        }
        commentList.push(commentField)
    })
    return commentList
}

//指定されたコメントを削除
export const deleteComment = async (question_id: string, comment_id: string, groupId:string) => {
    await deleteDoc(doc(db, "groups", groupId, "questions", question_id, "comments", comment_id))
}

//コメント追加
export const addComment = async (
    question_id: string,
    commenter_id: string,
    commenter_name: string,
    comment: string,
    emotion: string,
    time: Date,
    replied_user_id:string[],
    group_id:string
) => {
    await addDoc(collection(db, "groups", group_id, "questions", question_id, "comments"), {
        commenter_id: commenter_id,
        commenter_name: commenter_name,
        comment: comment,
        emotion: emotion,
        time: time,
        replied_user_id:replied_user_id
    })
}
