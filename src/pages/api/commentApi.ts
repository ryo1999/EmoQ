import { db } from "@/firebase"
import { collection, deleteDoc, getDocs, query, doc, orderBy } from "firebase/firestore/lite"
import { CommentsCollectionData } from "@/utils/types"

//指定されたquestion_idのコメントをとってくる
export const getComment = async (question_id: string) => {
    const commentList: CommentsCollectionData[] = []
    const commentId = query(collection(db, "questions", question_id, "comments"),orderBy("time","desc"))
    const commentDoc = await getDocs(commentId)
    commentDoc.forEach((doc) => {
        const commentField = {
            question_id:question_id,
            commenter_id: doc.data().commenter_id,
            commenter_name: doc.data().commenter_name,
            comment_id:doc.id,
            comment: doc.data().comment,
            time: doc.data().time.toDate(),
            emotion: doc.data().emotion,
        }
        commentList.push(commentField)
    })
    return commentList
}

//指定されたコメントを削除
export const deleteComment = async(question_id:string,comment_id: string)=>{
    await deleteDoc(doc(db,"questions", question_id,"comments",comment_id))
}