// eslint-disable-next-line no-shadow
export enum TypeMessage {
  words,
  morze,
  hesh,
}

export interface IMessage {
  id: string,
  type: TypeMessage,
  from: string,
  text: string,
}
