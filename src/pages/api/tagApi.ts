import { db } from "@/firebase"
import {
    collection,
    doc,
    getDocs,
    setDoc,
    query,
    addDoc,
    updateDoc,
    deleteDoc,
    deleteField,
} from "firebase/firestore/lite"

//タグの全種類を取ってくる
export const getTag = async () => {
    const taglist:string[] = []
    const tagId = query(collection(db, "tags"))
    const tagName = await getDocs(tagId)
    tagName.forEach((doc) => {
        taglist.push(doc.data().tag_name)
    })
    taglist.sort()
    return taglist
}


//新しいタグを追加する
export const addTag = async(tagName:string)=>{
        await addDoc(collection(db,"tags"),{
        tag_name : tagName
    })
}