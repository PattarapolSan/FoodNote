import {atom, selector} from 'recoil'

export const caloriesGoalState = atom({
    key: 'caloriesGoalState',
    default: 0
})

export const todayCaloriesState = atom({
    key: 'todayCaloriesState',
    default: 0
})