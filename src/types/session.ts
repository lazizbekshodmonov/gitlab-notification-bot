type chatStep = null | 'waiting_topic' | 'waiting_confirm';

export type SessionData = {
  step: chatStep;
};
