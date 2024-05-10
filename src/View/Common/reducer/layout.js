const SET_LAYOUT_SIZE = 'layout/SET'

export const setLayoutSize = size => ({ type: SET_LAYOUT_SIZE, size });

const initState = {
    width : window.innerWidth,
    height: window.innerHeight,
}

export default function layout(state= initState, action) {
    switch (action.type) {
        case SET_LAYOUT_SIZE:
            return {
                ...state,
                ...action.size,
            }
        default:
            return state;
    }
}