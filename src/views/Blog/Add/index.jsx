/* eslint-disable prettier/prettier */
import {
  CForm,
  CButton,
  CFormInput,
  CFormTextarea,
  CRow,
  CCol,
  CCard,
  CCardHeader,
  CCardBody,
  CAlert,
} from '@coreui/react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import React, { useState } from 'react'
import { blogSchema } from 'src/utils/schema/blog.schema'
import { addBlog } from 'src/services/blog.services'

export default function Add() {
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState()
  const [visible, setVisible] = useState(false)

  const AddBlogForm = () => {
    const {
      register,
      handleSubmit,
      formState: { errors },
      reset,
    } = useForm({ mode: 'onTouched', resolver: yupResolver(blogSchema) })

    const onSubmit = async (Values) => {
      // alert(JSON.stringify(Values))
      console.log(JSON.stringify(Values))
      setIsLoading(true)
      try {
        const { data } = await addBlog(Values)
        setTimeout(() => {
          setVisible(true)
          setMessage(data.message)
        }, 1000)
      } catch (error) {
        console.log(error)
      }
      setIsLoading(false)
      reset()
    }
    return (
      <CForm
        onSubmit={handleSubmit(onSubmit)}
        validated={Object.keys(errors).length !== 0}
        encType="multipart/form-data"
      >
        <CFormInput
          feedbackInvalid={errors.title?.message}
          label="Title"
          type="text"
          {...register('title')}
          required
        ></CFormInput>
        <CFormInput
          feedbackInvalid={errors.author?.message}
          label="author"
          type="text"
          {...register('author')}
          required
        ></CFormInput>
        <CFormInput
          feedbackInvalid={errors.author_designation?.message}
          label="author_designation"
          type="text"
          {...register('author_designation')}
          required
        ></CFormInput>
        <CFormTextarea
          rows={5}
          feedbackInvalid={errors.content?.message}
          label="content"
          type="text"
          {...register('content')}
          required
        ></CFormTextarea>
        <CFormInput
          feedbackInvalid={errors.content_image_large?.message}
          label="content_image_large"
          type="file"
          {...register('content_image_large')}
          required
        ></CFormInput>
        <CFormInput
          feedbackInvalid={errors.content_image_small?.message}
          label="content_image_small"
          type="file"
          {...register('content_image_small')}
          required
        ></CFormInput>
        <CFormInput
          feedbackInvalid={errors.read_time?.message}
          label="read_time"
          type="text"
          {...register('read_time')}
          required
        ></CFormInput>
        <CButton className="mt-2" type="submit" color="primary">
          Submit
        </CButton>
      </CForm>
    )
  }

  return (
    <CRow>
      <CAlert color="success" dismissible visible={visible} onClose={() => setVisible(false)}>
        {message}
      </CAlert>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <CRow className="justify-content-between">
              <CCol xs={4}>
                <strong>add Blog</strong>
              </CCol>
            </CRow>
          </CCardHeader>
          <CCardBody>{AddBlogForm()}</CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}
