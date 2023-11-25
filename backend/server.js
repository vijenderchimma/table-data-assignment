
const express = require('express');
const axios = require('axios');
const cors = require('cors')

const app = express();


app.use(cors());
app.use(express.json())

app.get('/v1/users', async (req, res) => {
  try {
    const usersResponse = await axios.get('https://jsonplaceholder.typicode.com/users');
    const postsResponse = await axios.get('https://jsonplaceholder.typicode.com/posts');

    const users = usersResponse.data;
    const posts = postsResponse.data;

    const combinedData = users.map(user => ({
      ...user,
      posts: posts.filter(post => post.userId === user.id)
    }));

    const searchText = req.query.searchText;
    if (searchText) {
      const filteredData = combinedData.filter(user =>
        user.name.toLowerCase().includes(searchText.toLowerCase())
      );
      res.json(filteredData);
    } else {
      res.json(combinedData);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
