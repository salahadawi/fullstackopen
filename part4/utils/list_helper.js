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
  const authors = blogs.map(blog => blog.author)
  const authorCount = authors.reduce((count, author) => {
    count[author] = (count[author] || 0) + 1
    return count
  }, {})
  const maxCount = Math.max(...Object.values(authorCount))
  return Object.keys(authorCount).find(author => authorCount[author] === maxCount)
}

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs }