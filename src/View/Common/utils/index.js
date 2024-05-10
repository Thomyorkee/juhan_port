import { atom, selector } from "recoil"

export const subExpandState = atom({
    key: "subExpandState",
    default: []
})

export const modalStatus = atom({
    key: "modalStatus",
    default: undefined
})

export const filteredTodoListState = selector({
    key: 'filteredTextState',
    get: ({ get }) => {
        const filter = get(subExpandState);
        return filter + "filterSucceed";
    },
});

export const thousandSeparator = (value, type) => {
    if (value === null || value === undefined) return value;
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, type);
};