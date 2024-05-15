const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((acc, blog) => {
    return acc + blog.likes;
  }, 0);
};

const favorateBlog = (blogs) => {
  return blogs.reduce((acc, blog) => {
    if (!acc.likes) {
      acc = blog;
    } else if (acc.likes < blog.likes) {
      acc = blog;
    }
    return acc;
  }, {});
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return {};
  }

  const authorBlogsCount = blogs.reduce((acc, blog) => {
    const { author } = blog;
    if (!acc[author]) {
      acc[author] = 1;
    } else {
      acc[author] += 1;
    }
    return acc;
  }, {});

  const sortedAuthorBlogsCount = Object.fromEntries(
    Object.entries(authorBlogsCount).sort(([, a], [, b]) => b - a)
  );

  return {
    author: Object.keys(sortedAuthorBlogsCount)[0],
    blogs: Object.values(sortedAuthorBlogsCount)[0],
  };
};

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return {};
  }

  const authorLikesCount = blogs.reduce((acc, blog) => {
    if (!acc[blog.author]) {
      acc[blog.author] = blog.likes;
    } else {
      acc[blog.author] += blog.likes;
    }
    return acc;
  }, {});

  const sortedAuthorLikesCount = Object.fromEntries(
    Object.entries(authorLikesCount).sort(([, a], [, b]) => b - a)
  );

  return {
    author: Object.keys(sortedAuthorLikesCount)[0],
    likes: Object.values(sortedAuthorLikesCount)[0],
  };
};

module.exports = {
  dummy,
  totalLikes,
  favorateBlog,
  mostBlogs,
  mostLikes,
};
