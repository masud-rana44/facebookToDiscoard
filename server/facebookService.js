const axios = require("axios");

async function getFacebookPosts(groupId) {
  const accessToken = process.env.FACEBOOK_ACCESS_TOKEN;
  const url = `https://graph.facebook.com/${groupId}/feed?access_token=${accessToken}`;

  try {
    console.log(`Fetching Facebook Data with access token: ${accessToken}...`);
    const response = await axios.get(url);
    console.log("Response: ", response.data);
    const posts = response.data.data.map((post) => ({
      id: post.id,
      message: post.message,
    }));
    console.log("Fetched Facebook posts: ", posts);
    return posts;
  } catch (error) {
    console.error("Error fetching Facebook posts: ", error);
    return [];
  }
}

module.exports = { getFacebookPosts };
