import { io, Socket } from 'socket.io-client'

const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:3001'

let socket: Socket | null = null

export const getSocket = (): Socket => {
  if (!socket) {
    socket = io(SOCKET_URL, {
      autoConnect: false,
    })
  }
  return socket
}

export const connectSocket = () => {
  const sock = getSocket()
  if (!sock.connected) {
    sock.connect()
  }
  return sock
}

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect()
    socket = null
  }
}

export default getSocket
