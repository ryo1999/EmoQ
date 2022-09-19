import { db } from "@/firebase"
import {
    collection,
    getDocs,
    query,
    addDoc,
    orderBy,
} from "firebase/firestore/lite"

//タグの全種類を取ってくる
export const getTag = async (groupId:string) => {
    const tagList:string[] = []
    const tagId = query(collection(db,"groups", groupId, "tags"),orderBy("tag_name"))
    const tagDoc = await getDocs(tagId)
    tagDoc.forEach((doc) => {
        tagList.push(doc.data().tag_name)
    })
    console.log(tagList)
    return tagList
}


//新しいタグを追加する
export const addTag = async(tagName:string, groupId:string)=>{
        await addDoc(collection(db, "groups", groupId, "tags"),{
        tag_name : tagName
    })
}