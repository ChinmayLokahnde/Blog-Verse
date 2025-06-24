import axios from "./AxiosInstance";


export const getAllPosts = async () => {
  const res = await axios.get('/posts');
  return res.data;
};


export const getPostBySlug = async (slug) => {
  const res = await axios.get(`/posts/${slug}`);
  return res.data;
};


export const createPost = async (formData) => {
  const res = await axios.post('/posts', formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};


export const updatePost = async (slug, formData) => {
  const res = await axios.put(`/posts/${slug}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};


export const deletePost = async (slug) => {
  const res = await axios.delete(`/posts/${slug}`);
  return res.data;
};
