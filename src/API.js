const api = "http://localhost:3001"


// Generate a unique token for storing your bookshelf data on the backend server.
let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Accept': 'application/json',
  'Authorization': token
}

export const getAll = () =>
  fetch(`${api}/posts`, { headers })
    .then(res => res.json())
    .then(data => data)

export const getCategories = () =>
fetch(`${api}/categories`, { headers })
  .then(res => res.json())
  .then(data => data.categories)

export const getPostsByCategory = (categoryId) =>
fetch(`${api}/${categoryId}/posts`, { headers })
  .then(res => res.json())
  .then(data => data.posts)

export const newPost = (post) =>
fetch(`${api}/posts`, {
  method: 'POST',
  headers: {
    ...headers,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(post)
})
.then(res => res.json())
.then(data => data)

export const getPost = (postId) =>
  fetch(`${api}/posts/${postId}`, { headers })
    .then(res => res.json())
    .then(data => data.post)

export const updatePostScore = (postId, option) =>
fetch(`${api}/posts/${postId}`, {
  method: 'POST',
  headers: {
    ...headers,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({option})
}).then(res => res.json())
    
export const updateInfoPost = (postId, title, text) =>
fetch(`${api}/posts/${postId}`, {
  method: 'PUT',
  headers: {
    ...headers,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ title, body: text })
}).then(res => res.json())

export const deletePostByID = (postId) =>
fetch(`${api}/posts/${postId}`, {
  method: 'DELETE',
  headers: {
    ...headers,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify()
}).then(res => res.json())

export const getComments = (postId) =>
fetch(`${api}/posts/${postId}/comments`, { headers })
  .then(res => res.json())
  .then(data => data)

export const newComment = (comment) =>
  fetch(`${api}/comments/`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(comment)
  }).then(res => res.json())

export const getComment = (commentId) =>
  fetch(`${api}/comments/${commentId}`, { headers })
    .then(res => res.json())
    .then(data => data.book)

export const updateCommentScore = (commentId, option) =>
    fetch(`${api}/comments/${commentId}`, {
      method: 'POST',
      headers: {
        ...headers,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({option})
    }).then(res => res.json())

export const updateTextComment = (commentId, body) =>
fetch(`${api}/comments/${commentId}`, {
  method: 'PUT',
  headers: {
    ...headers,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({body})
}).then(res => res.json())

export const deleteCommentByID = (commentId) =>
fetch(`${api}/comments/${commentId}`, {
  method: 'DELETE',
  headers: {
    ...headers,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify()
}).then(res => res.json())
