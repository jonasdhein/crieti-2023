export interface PixProps {
    id: number
    value: number
    createdAt: string
    updatedAt: string
    recipientId: number
    senderId: number
    recipient: Recipient
    sender: Sender
  }
  
interface Recipient {
    id: number
    name: string
  }
  
interface Sender {
    id: number
    name: string
  }
  