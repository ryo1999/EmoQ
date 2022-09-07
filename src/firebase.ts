import { initializeApp } from "firebase/app"
import { getAuth, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth"
import { getFirestore } from "firebase/firestore/lite"

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

initializeApp(firebaseConfig)
export const auth = getAuth()
export const db = getFirestore()
export { signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail}


// 他ファイルで行うこと
// import { db } from "@/firebase"
// import {
//     collection,
//     doc,
//     getDocs,
//     setDoc,
//     query,
//     addDoc,
//     updateDoc,
//     deleteDoc,
//     deleteField,
// } from "firebase/firestore/lite"
//お手本(コレクションの読み取り)
// const sample = async() => {
//     const userId = query(collection(db,"users"))
//     const username = await getDocs(userId)
//     username.forEach(doc=>{
//         console.log(doc.data().name)
//     })
// }

//お手本(サブコレクションの読み取り)
// const sample = async () => {
//     const q = query(collection(db, "users", "CGb7i9y6A9wFYwHLkiPk", "bookmarks"))
//     const querySnapshot = await getDocs(q)
//     querySnapshot.forEach((doc) => {
//         console.log(doc.data().emotion)
//     })
// }

//お手本(あるコレクションに新しくドキュメントを追加し、そのフィールドにデータを入れる)
// const sample = async () => {
//     await addDoc(collection(db,"users"),{
//         name:"大久保",
//         age:"22",
//     })
// }

//お手本(あるコレクションのドキュメントのフィールドをsetし直す。setDocをすると今まであったものを消して、setしたものだけになるというイメージ)
// const sample = async () => {
//     const docRef = await setDoc(doc(db,"users","CGb7i9y6A9wFYwHLkiPk"),{
//         name:"浅原",
//         age:"24",
//     })
//     console.log(docRef)
// }

//お手本(あるコレクションのドキュメントのフィールドを更新する。updateDocは変更してない今までのデータはそのままで、新しく追加したり変更したりするイメージ)
// const sample = async () => {
//     const docRef = await updateDoc(doc(db,"users","CGb7i9y6A9wFYwHLkiPk"),{
//         favorite:"肉"
//     })
//     console.log(docRef)
// }

//お手本(あるコレクションのドキュメントを削除)
// const sample = async () => {
//     await deleteDoc(doc(db,"users","CGb7i9y6A9wFYwHLkiPk"))
// }

//お手本(あるコレクションのドキュメントの特定のフィールドのみ削除したいとき)
// const sample = async () => {
//     await updateDoc(doc(db,"users","dBa9ym4rVBV188QejW8Q"),{
//         favorite:deleteField()
//     })
// }

//お手本(あるコレクションの全てのドキュメントを削除したいとき)
// const sample = async() => {
//     const userId = query(collection(db,"users"))
//     const username = await getDocs(userId)
//     const id:string[] = []
//     username.forEach(doc=>{
//         id.push(doc.id)
//     })
//     id.forEach(i=>{
//         deleteDoc(doc(db,"users",i))
//     })
// }