const axios = require("axios");

class YoutubeCralwer {
  static async getYoutubeURL(title) {
    const youtubeSearchURL = "https://www.youtube.com/results?search_query=";
    const youtubeWatchURL = "https://www.youtube.com/watch?v=";
    try {
      const res = await axios.get(youtubeSearchURL + title);
      const src = res.data.split('{"videoRenderer":{"videoId":"')[1];

      const data = { success: true };
      data.url = youtubeWatchURL + src.split('"')[0];
      data.imgURL = src.split('"url":"')[1].split('"')[0];
      data.title = src.split('"text":"')[1].split('"')[0];
      data.time = src.split('"label":"')[2].split('"')[0];

      return data;
    } catch(err) {
      return { success: false };
    }
  }
}

module.exports = YoutubeCralwer;
