import axios from "axios"

var client_id = process.env.SPOTIFY_CLIENT_ID
var client_secret = process.env.SPOTIFY_CLIENT_SECRET

var authOptions = {
  url: "https://accounts.spotify.com/api/token",
  headers: {
    Authorization:
      "Basic " +
      new Buffer.from(client_id + ":" + client_secret).toString("base64"),
  },
  form: {
    grant_type: "client_credentials",
  },
  json: true,
}

axios
  .post(authOptions.url, authOptions.form, {
    headers: {
      Authorization:
        "Basic " +
        Buffer.from(`${client_id}:${client_secret}`).toString("base64"),
    },
  })
  .then((response) => {
    if (response.status === 200) {
      const token = response.data.access_token
      const songId = "2gzWtnslb715DPDTlJ5NSi" // Replace with the actual Spotify song ID

      const requestOptions = {
        url: `https://api.spotify.com/v1/tracks/${songId}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }

      axios
        .get(requestOptions.url, {
          headers: requestOptions.headers,
        })
        .then((songResponse) => {
          if (songResponse.status === 200) {
            const songData = songResponse.data
            const previewUrl = songData.preview_url

            // Use the 'previewUrl' variable here or pass it to another function for further processing
            console.log(previewUrl)
          }
        })
        .catch((error) => {
          // Handle error
          console.error("Error:", error)
        })
    }
  })
  .catch((error) => {
    // Handle error
    console.error("Error:", error)
  })
