// src/types/Message.ts
export interface Message {
  id: string;
  text: string;
  sender: 'me' | 'bot';
}
