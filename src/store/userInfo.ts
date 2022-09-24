import { atom } from "recoil"
import { recoilPersist } from "recoil-persist"

const { persistAtom } = recoilPersist()

export const userInfo = atom<{
    userId: string
    userName: string
    groupId: string
    groupName: string
    group: { [id: string]: string }
}>({
    key: "userInfo",
    default: { userId: "", userName: "", groupId: "", groupName: "", group:{} },
    effects_UNSTABLE: [persistAtom],
})
