import api from './axios'

export interface Post {
  _id: string
  title: string
  content: string
  photos?: string[]
  category: string
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

// 创建帖子
export const createPost = async (data: Partial<Post>) => {
  const response = await api.post('/posts', data)
  return response.data
}

// 获取帖子列表
export const getPosts = async (params?: {
  category?: string
  tags?: string | string[]
  page?: number
  limit?: number
  sort?: 'latest' | 'hot' | 'discussed'
}) => {
  const response = await api.get('/posts', { params })
  return response.data
}

// 获取单个帖子
export const getPostById = async (postId: string) => {
  const response = await api.get(`/posts/${postId}`)
  return response.data
}

// 更新帖子
export const updatePost = async (postId: string, data: Partial<Post>) => {
  const response = await api.put(`/posts/${postId}`, data)
  return response.data
}

// 删除帖子
export const deletePost = async (postId: string) => {
  const response = await api.delete(`/posts/${postId}`)
  return response.data
}

// 点赞
export const likePost = async (postId: string) => {
  const response = await api.post(`/posts/${postId}/like`)
  return response.data
}

// 取消点赞
export const unlikePost = async (postId: string) => {
  const response = await api.delete(`/posts/${postId}/like`)
  return response.data
}

// 收藏
export const favoritePost = async (postId: string) => {
  const response = await api.post(`/posts/${postId}/favorite`)
  return response.data
}

// 取消收藏
export const unfavoritePost = async (postId: string) => {
  const response = await api.delete(`/posts/${postId}/favorite`)
  return response.data
}

// 发表评论
export const createComment = async (
  postId: string,
  data: { content: string; parentCommentId?: string }
) => {
  const response = await api.post(`/posts/${postId}/comments`, data)
  return response.data
}

// 删除评论
export const deleteComment = async (postId: string, commentId: string) => {
  const response = await api.delete(`/posts/${postId}/comments/${commentId}`)
  return response.data
}

// 搜索帖子
export const searchPosts = async (keyword: string, params?: {
  category?: string
  page?: number
  limit?: number
}) => {
  const response = await api.get('/posts/search', {
    params: { keyword, ...params },
  })
  return response.data
}

// 获取我的帖子
export const getMyPosts = async (params?: {
  page?: number
  limit?: number
}) => {
  const response = await api.get('/posts/my', { params })
  return response.data
}

// 获取我的收藏
export const getMyFavorites = async (params?: {
  page?: number
  limit?: number
}) => {
  const response = await api.get('/posts/my-favorites', { params })
  return response.data
}
