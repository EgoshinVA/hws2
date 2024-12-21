import {UserType} from '../HW8'

type ActionType =
    | { type: 'sort'; payload: 'up' | 'down' }
    | { type: 'check'; payload: number }

export const homeWorkReducer = (state: UserType[], action: ActionType): UserType[] => {
    switch (action.type) {
        case 'sort': { // by name
            const compareFn = action.payload === 'up' ? (a: UserType, b: UserType) => {
                if (a.name[0] < b.name[0]) {
                    return -1
                } else if (a.name[0] > b.name[0]) {
                    return 1
                }
                return 0
            } : (a: UserType, b: UserType) => {
                if (a.name[0] > b.name[0]) {
                    return -1
                } else if (a.name[0] < b.name[0]) {
                    return 1
                }
                return 0
            }
            return state.sort(compareFn)
        }
        case 'check': {

            return state.filter(u => u.age >= action.payload)
        }
        default:
            return state
    }
}
