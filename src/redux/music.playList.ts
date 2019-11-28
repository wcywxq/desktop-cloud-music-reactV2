import { MUSIC_PROJECT_ADD, MUSIC_PROJECT_FILTER, MUSIC_PROJECT_DELETE } from './constants'
import { removeDuplicates } from '@/tools'

// action creators
export interface MusicProjectAddAction {
    type: MUSIC_PROJECT_ADD;
    // 传递的数据
    key: number;
    musicName: string;
    "artist.name": string;
    duration: number;
}

export interface MusicProjectFilterAction {
    type: MUSIC_PROJECT_FILTER
}


export interface MusicProjectDeleteAction {
    type: MUSIC_PROJECT_DELETE
}

export type MusicProjectAction = MusicProjectAddAction | MusicProjectFilterAction | MusicProjectDeleteAction

// 初始化数据类型
export interface MusicProjectState {
    key: number;
    musicName: string;
    "artist.name": string;
    duration: number;
}

export const musicPlayListReducer = (state: MusicProjectState[], action: MusicProjectAction) => {
    switch (action.type) {
        // 增
        case MUSIC_PROJECT_ADD:
            // 存到 sessionStorage
            if (sessionStorage.getItem('data')
                && (sessionStorage.getItem('data') as string) !== '[]') {
                let sessionData = JSON.parse(sessionStorage.getItem('data') as string);
                sessionStorage.setItem('data', JSON.stringify(
                    removeDuplicates([...sessionData, ...state])
                ))
            } else {
                sessionStorage.setItem('data', JSON.stringify(state))
            }

            return [
                ...state,
                {
                    key: action.key,
                    musicName: action.musicName,
                    "artist.name": action["artist.name"],
                    duration: action.duration
                }
            ];
        // 查
        case MUSIC_PROJECT_FILTER:
            // 新数组
            return removeDuplicates(state);
        // 删除
        case MUSIC_PROJECT_DELETE:
            // 先删除 sessionStorage 中的数据
            sessionStorage.clear();
            // 然后删除 state 中的数据
            return [];
        default:
            throw new Error();
    }
};
