// Mock API para comentários

interface Comment {
    id: string
    author: {
      name: string
      avatar: string
      id: string
    }
    content: string
    timestamp: string
    likes: number
    dislikes: number
    replies: Comment[]
    isReplyOpen?: boolean
    userLiked?: boolean
    userDisliked?: boolean
  }
  
  // In-memory storage for comments
  const commentsStore: Record<string, Comment[]> = {}
  
  // User interactions tracking
  interface UserInteractions {
    likes: Set<string>
    dislikes: Set<string>
  }
  
  const userInteractions: Record<string, UserInteractions> = {}
  
  // Initialize user interactions for a user if not exists
  const initUserInteractions = (userId: string) => {
    if (!userInteractions[userId]) {
      userInteractions[userId] = {
        likes: new Set<string>(),
        dislikes: new Set<string>(),
      }
    }
  }
  
  // Get comments for a post
  export const getComments = async (postId: string): Promise<Comment[]> => {
    return commentsStore[postId] || []
  }
  
  // Add a new comment to a post
  export const addComment = async (postId: string, comment: Comment): Promise<Comment> => {
    if (!commentsStore[postId]) {
      commentsStore[postId] = []
    }
  
    commentsStore[postId].unshift(comment)
    return comment
  }
  
  // Delete a comment
  export const deleteComment = async (commentId: string): Promise<void> => {
    // Search through all posts and their comments
    Object.keys(commentsStore).forEach((postId) => {
      // Check top-level comments
      commentsStore[postId] = commentsStore[postId].filter((comment) => {
        if (comment.id === commentId) {
          return false // Remove this comment
        }
  
        // Check replies and filter them
        comment.replies = comment.replies.filter((reply) => reply.id !== commentId)
        return true
      })
    })
  }
  
  // Like a comment
  export const likeComment = async (commentId: string, userId: string): Promise<Comment> => {
    initUserInteractions(userId)
  
    let updatedComment: Comment | null = null
  
    // Search through all posts and their comments
    Object.keys(commentsStore).forEach((postId) => {
      // Função recursiva para encontrar e atualizar o comentário
      const findAndUpdateComment = (comments: Comment[]): boolean => {
        for (let i = 0; i < comments.length; i++) {
          if (comments[i].id === commentId) {
            // Verificar se o usuário já curtiu este comentário
            if (userInteractions[userId].likes.has(commentId)) {
              // Remover like
              userInteractions[userId].likes.delete(commentId)
              comments[i].likes = Math.max(0, comments[i].likes - 1)
              comments[i].userLiked = false
            } else {
              // Adicionar like
              userInteractions[userId].likes.add(commentId)
              comments[i].likes += 1
              comments[i].userLiked = true
  
              // Remove dislike if exists
              if (userInteractions[userId].dislikes.has(commentId)) {
                userInteractions[userId].dislikes.delete(commentId)
                comments[i].dislikes = Math.max(0, comments[i].dislikes - 1)
                comments[i].userDisliked = false
              }
            }
  
            updatedComment = { ...comments[i] }
            return true
          }
  
          // Verificar nas respostas
          if (comments[i].replies && comments[i].replies.length > 0) {
            if (findAndUpdateComment(comments[i].replies)) {
              return true
            }
          }
        }
        return false
      }
  
      findAndUpdateComment(commentsStore[postId])
    })
  
    return (
      updatedComment || {
        id: commentId,
        author: { name: "", avatar: "", id: "" },
        content: "",
        timestamp: "",
        likes: 0,
        dislikes: 0,
        replies: [],
      }
    )
  }
  
  // Dislike a comment
  export const dislikeComment = async (commentId: string, userId: string): Promise<Comment> => {
    initUserInteractions(userId)
  
    let updatedComment: Comment | null = null
  
    // Search through all posts and their comments
    Object.keys(commentsStore).forEach((postId) => {
      // Função recursiva para encontrar e atualizar o comentário
      const findAndUpdateComment = (comments: Comment[]): boolean => {
        for (let i = 0; i < comments.length; i++) {
          if (comments[i].id === commentId) {
            // Verificar se o usuário já descurtiu este comentário
            if (userInteractions[userId].dislikes.has(commentId)) {
              // Remover dislike
              userInteractions[userId].dislikes.delete(commentId)
              comments[i].dislikes = Math.max(0, comments[i].dislikes - 1)
              comments[i].userDisliked = false
            } else {
              // Adicionar dislike
              userInteractions[userId].dislikes.add(commentId)
              comments[i].dislikes += 1
              comments[i].userDisliked = true
  
              // Remove like if exists
              if (userInteractions[userId].likes.has(commentId)) {
                userInteractions[userId].likes.delete(commentId)
                comments[i].likes = Math.max(0, comments[i].likes - 1)
                comments[i].userLiked = false
              }
            }
  
            updatedComment = { ...comments[i] }
            return true
          }
  
          // Verificar nas respostas
          if (comments[i].replies && comments[i].replies.length > 0) {
            if (findAndUpdateComment(comments[i].replies)) {
              return true
            }
          }
        }
        return false
      }
  
      findAndUpdateComment(commentsStore[postId])
    })
  
    return (
      updatedComment || {
        id: commentId,
        author: { name: "", avatar: "", id: "" },
        content: "",
        timestamp: "",
        likes: 0,
        dislikes: 0,
        replies: [],
      }
    )
  }
  
  // Reply to a comment
  export const replyToComment = async (commentId: string, reply: Comment): Promise<Comment> => {
    let updatedComment: Comment | null = null
  
    // Search through all posts and their comments
    Object.keys(commentsStore).forEach((postId) => {
      commentsStore[postId] = commentsStore[postId].map((comment) => {
        // Check if this is the comment to update
        if (comment.id === commentId) {
          comment.replies.push(reply)
          updatedComment = { ...comment }
        }
        return comment
      })
    })
  
    return (
      updatedComment || {
        id: commentId,
        author: { name: "", avatar: "", id: "" },
        content: "",
        timestamp: "",
        likes: 0,
        dislikes: 0,
        replies: [reply],
      }
    )
  }
  