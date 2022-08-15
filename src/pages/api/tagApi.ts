import { db } from "@/firebase"
import {
    collection,
    getDocs,
    query,
    addDoc,
} from "firebase/firestore/lite"

//タグの全種類を取ってくる
export const getTag = async () => {
    const tagList:string[] = []
    const tagId = query(collection(db, "tags"))
    const tagDoc = await getDocs(tagId)
    tagDoc.forEach((doc) => {
        tagList.push(doc.data().tag_name)
    })
    tagList.sort()
    return tagList
}


//新しいタグを追加する
export const addTag = async(tagName:string)=>{
        await addDoc(collection(db,"tags"),{
        tag_name : tagName
    })
}