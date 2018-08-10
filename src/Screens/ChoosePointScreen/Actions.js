export const Actions = {
    CHOOSING: 'CHOOSING',
    CHOOSING_SUCCESS: 'CHOOSING_SUCCESS',
    CHOOSING_FAIL: 'CHOOSING_FAIL'
}

export const chooseAction = () => ({
    type: Actions.CHOOSING
})

export const chooseEpic = action$ =>
    action$.ofType(Actions.CHOOSING)
        .mergeMap(() => {
        })