/* eslint-disable prettier/prettier */
import * as Yup from 'yup'
const SUPPORTED_FORMATS = ['image/jpeg', 'image/jpg', 'image/png', 'image/tiff']

export const blogSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  author: Yup.string().required('author is required'),
  author_designation: Yup.string().required('author_designation is required'),
  content: Yup.string()
    .min(4, 'Bio should be at least 4 characters')
    .max(2000, 'Total charter less then 200')
    .required('content is required'),
  content_image_large: Yup.mixed()
    .required('content_image_large is required')
    .test('required', 'You need to provide a file', (files) => {
      // return file && file.size <-- u can use this if you don't want to allow empty files to be uploaded;
      if (files) return true
      return false
    })
    .test('fileSize', 'The file is too large', async (files) => {
      //if u want to allow only certain file sizes
      try {
        return files && (await files[0].size) <= 2000000
      } catch (error) {
        return false
      }
    })
    .test('file_formate', 'Image file has unsupported format.', (files) => {
      try {
        console.log(files[0].type)
        return files && SUPPORTED_FORMATS.includes(files[0].type)
      } catch (error) {
        return false
      }
    }),
  content_image_small: Yup.mixed()
    .required('content_image_small is required')
    .test('required', 'You need to provide a file', (files) => {
      // return file && file.size <-- u can use this if you don't want to allow empty files to be uploaded;
      if (files) return true
      return false
    })
    .test('fileSize', 'The file is too large', async (files) => {
      //if u want to allow only certain file sizes
      try {
        return files && (await files[0].size) <= 2000000
      } catch (error) {
        return false
      }
    })
    .test('file_formate', 'Image file has unsupported format.', (files) => {
      try {
        return files && SUPPORTED_FORMATS.includes(files[0].type)
      } catch (error) {
        return false
      }
    }),
  read_time: Yup.string().required('read_time is required'),
})
