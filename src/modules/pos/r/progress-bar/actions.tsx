export const ACTION_UPDATE_PROGRESS_BAR = "ACTION_UPDATE_PROGRESS_BAR";

export const actionUpdateProgressBar = (value) => ({
    type: ACTION_UPDATE_PROGRESS_BAR,
    payload: {value}
});

export const ACTION_RESET_PROGRESS_BAR = "ACTION_RESET_PROGRESS_BAR";

export const actionResetProgressBar = () => ({
    type: ACTION_RESET_PROGRESS_BAR,
    payload: {}
});
