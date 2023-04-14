/* eslint-disable prettier/prettier */
import api from './api'

export const addBlog = async ({
  title,
  author,
  author_designation,
  content,
  content_image_large,
  content_image_small,
  read_time,
}) => {
  const formData = new FormData()
  formData.append('title', title)
  formData.append('author', author)
  formData.append('author_designation', author_designation)
  formData.append('content', content)
  formData.append('read_time', read_time)
  formData.append('content_image_small', content_image_small[0])
  formData.append('content_image_large', content_image_large[0])

  //   for (var pair of formData.entries()) {
  //     console.log(pair[0] + ',' + JSON.stringify(pair[1]))
  //   }

  return api
    .post(`/api/blog`, formData)
    .then((response) => {
      return response
    })
    .catch((error) => {
      return error.response
    })
}

export const allBlog = async () => {
  return api
    .get(`/api/blog/allblog`)
    .then((response) => {
      return response
    })
    .catch((error) => {
      return error.response
    })
}

export const singleBlog = async (id) => {
  return api
    .get(`/api/blog/${id}`, {})
    .then((response) => {
      return response
    })
    .catch((error) => {
      return error.response
    })
}

export const updateBlog = async (
  id,
  title,
  author,
  author_designation,
  content,
  content_image_large,
  content_image_small,
  read_time,
) => {
  return api
    .put(`/api/blog/update/${id}`, {
      title,
      author,
      author_designation,
      content,
      content_image_large,
      content_image_small,
      read_time,
    })
    .then((response) => {
      return response
    })
    .catch((error) => {
      return error.response
    })
}

// module.exports = { addBlog, allBlog, singleBlog, updateBlog }
