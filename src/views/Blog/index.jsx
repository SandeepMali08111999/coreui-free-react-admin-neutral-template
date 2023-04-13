/* eslint-disable prettier/prettier */

import CIcon from '@coreui/icons-react'
import { CButton, CCard, CCardBody, CCardHeader, CCol, CRow, CTable } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import * as icon from '@coreui/icons'
import { allBlog } from 'src/services/blog.services'

export default function Blog() {
  const [allTableValues, setAllTableValues] = useState()

  async function getAllBlogData() {
    try {
      const { data } = await allBlog()
      setAllTableValues(data)
      return data
    } catch (error) {}
  }

  useEffect(() => {
    getAllBlogData()
  }, [])
  const showTableData = (data) => {
    const keys = data.map((obj) => Object.keys(obj))

    const colums = keys[0].map((obj, index) => {
      return {
        key: obj,
        label: index === 0 ? `#` : obj,
        _props: { scope: 'col' },
      }
    })

    return <CTable columns={colums} items={data} responsive />
  }
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <CRow className="justify-content-between">
              <CCol xs={4}>
                <strong>All Deatils</strong>
              </CCol>
              <CCol xs="auto">
                <CButton color="success" href={'/Organization/AddBlog'}>
                  <CIcon icon={icon.cilPlus} /> Add
                </CButton>
              </CCol>
            </CRow>
          </CCardHeader>
          <CCardBody>
            {allTableValues && allTableValues.data ? showTableData(allTableValues.data) : ''}
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}
