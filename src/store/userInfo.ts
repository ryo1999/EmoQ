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
    default: { userId: "P0TEhLDGxvbHfjTuymhdJrMwn2o2", userName: "大月凌", groupId: "oECoFoBz9jhjmMi0kDHn", groupName: "テストグループ", group:{"oECoFoBz9jhjmMi0kDHn":"テストグループ"} },
    effects_UNSTABLE: [persistAtom],
})
