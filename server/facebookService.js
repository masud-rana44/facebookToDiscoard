const axios = require("axios");

async function getFacebookPosts(groupId) {
  const accessToken = process.env.FACEBOOK_ACCESS_TOKEN;
  const url = `https://graph.facebook.com/${groupId}/feed?access_token=${accessToken}`;

  try {
    const response = await axios.get(url);
    const posts = response.data.data.map((post) => ({
      id: post.id,
      message: post.message,
    }));
    return posts;
  } catch (error) {
    console.error("Error fetching Facebook posts: ", error);
    return [];
  }
}

module.exports = { getFacebookPosts };
