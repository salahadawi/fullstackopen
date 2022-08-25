const dummy = () => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => {
    return sum + blog.likes
  }, 0)
}

const favoriteBlog = (blogs) => {
  const maxLikes = Math.max(...blogs.map(blog => blog.likes))
  return blogs.find(blog => blog.likes === maxLikes)
}

const mostBlogs = (blogs) => {
  if (!blogs.length)
    return null
  const authors = blogs.map(blog => blog.author)
  const authorCount = authors.reduce((count, author) => {
    count[author] = (count[author] || 0) + 1
    return count
  }, {})
  const maxCount = Math.max(...Object.values(authorCount))
  return { author: Object.keys(authorCount).find(author => authorCount[author] === maxCount), blogs: maxCount }
}

// return author with most likes
const mostLikes = (blogs) => {
  if (!blogs.length)
    return null
  const authorLikes = blogs.reduce((count, blog) => {
    count[blog.author] = (count[blog.author] || 0) + blog.likes
    return count
  } , {})
  const maxLikes = Math.max(...Object.values(authorLikes))
  return { author: Object.keys(authorLikes).find(author => authorLikes[author] === maxLikes), likes: maxLikes }
}


module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes }