export const WAITING = "WAITING";
export const STOP_WAITING = "STOP_WAITING";

export const waitingAction = () => ({
  type: WAITING
});

export const stopWaitingAction = () => ({
  type: STOP_WAITING
});
