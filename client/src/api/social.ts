import api from './axios'

export interface SocialPost {
  _id: string
  title: string
  content: string
  photos?: string[]
  category: 'experience' | 'question' | 'story' | 'recommendation'
  tags: string[]
  authorId: string
  author?: any
  likes: string[]
  favorites: string[]
  comments: Comment[]
  viewCount: number
  isTop: boolean
  status: 'published' | 'draft' | 'deleted'
  createdAt: string
  updatedAt: string
}

export interface Comment {
  _id: string
  postId: string
  authorId: string
  author?: any
  content: string
  parentCommentId?: string
  replies?: Comment[]
  likes: string[]
  createdAt: string
}

export interface Message {
  _id: string
  senderId: string
  sender?: any
  receiverId: string
  receiver?: any
  content: string
  read: boolean
  createdAt: string
}

export interface FriendRequest {
  _id: string
  senderId: string
  sender?: any
  receiverId: string
  receiver?: any
  message?: string
  status: 'pending' | 'accepted' | 'rejected'
  createdAt: string
}

// 创建帖子
export const createSocialPost = async (data: Partial<SocialPost>) => {
  const response = await api.post('/social/posts', data)
  return response.data
}

// 获取帖子列表
export const getSocialPosts = async (params?: {
  category?: string
  tag?: string
  page?: number
  limit?: number
  sortBy?: 'latest' | 'hot' | 'top'
}) => {
  const response = await api.get('/social/posts', { params })
  return response.data
}

// 获取单个帖子
export const getSocialPostById = async (postId: string) => {
  const response = await api.get(`/social/posts/${postId}`)
  return response.data
}

// 更新帖子
export const updateSocialPost = async (postId: string, data: Partial<SocialPost>) => {
  const response = await api.put(`/social/posts/${postId}`, data)
  return response.data
}

// 删除帖子
export const deleteSocialPost = async (postId: string) => {
  const response = await api.delete(`/social/posts/${postId}`)
  return response.data
}

// 点赞
export const likeSocialPost = async (postId: string) => {
  const response = await api.post(`/social/posts/${postId}/like`)
  return response.data
}

// 取消点赞
export const unlikeSocialPost = async (postId: string) => {
  const response = await api.delete(`/social/posts/${postId}/like`)
  return response.data
}

// 收藏
export const favoriteSocialPost = async (postId: string) => {
  const response = await api.post(`/social/posts/${postId}/favorite`)
  return response.data
}

// 取消收藏
export const unfavoriteSocialPost = async (postId: string) => {
  const response = await api.delete(`/social/posts/${postId}/favorite`)
  return response.data
}

// 发表评论
export const createComment = async (
  postId: string,
  data: { content: string; parentCommentId?: string }
) => {
  const response = await api.post(`/social/posts/${postId}/comments`, data)
  return response.data
}

// 删除评论
export const deleteComment = async (postId: string, commentId: string) => {
  const response = await api.delete(`/social/posts/${postId}/comments/${commentId}`)
  return response.data
}

// 搜索帖子
export const searchSocialPosts = async (keyword: string, params?: {
  category?: string
  page?: number
  limit?: number
}) => {
  const response = await api.get('/social/posts/search', {
    params: { keyword, ...params },
  })
  return response.data
}

// 获取我的帖子
export const getMySocialPosts = async (params?: {
  page?: number
  limit?: number
}) => {
  const response = await api.get('/social/posts/my-posts', { params })
  return response.data
}

// 获取我的收藏
export const getMySocialFavorites = async (params?: {
  page?: number
  limit?: number
}) => {
  const response = await api.get('/social/posts/my-favorites', { params })
  return response.data
}

// 发送好友请求
export const sendFriendRequest = async (receiverId: string, message?: string) => {
  const response = await api.post('/social/friend-requests', { receiverId, message })
  return response.data
}

// 获取好友请求列表
export const getFriendRequests = async () => {
  const response = await api.get('/social/friend-requests')
  return response.data
}

// 处理好友请求
export const respondToFriendRequest = async (
  requestId: string,
  status: 'accepted' | 'rejected'
) => {
  const response = await api.patch(`/social/friend-requests/${requestId}`, { status })
  return response.data
}

// 获取好友列表
export const getFriends = async () => {
  const response = await api.get('/social/friends')
  return response.data
}

// 删除好友
export const removeFriend = async (friendId: string) => {
  const response = await api.delete(`/social/friends/${friendId}`)
  return response.data
}

// 发送消息
export const sendMessage = async (receiverId: string, content: string) => {
  const response = await api.post('/social/messages', { receiverId, content })
  return response.data
}

// 获取消息历史
export const getMessages = async (userId: string) => {
  const response = await api.get(`/social/messages/${userId}`)
  return response.data
}

// 获取未读消息数
export const getUnreadMessageCount = async () => {
  const response = await api.get('/social/messages/unread-count')
  return response.data
}
