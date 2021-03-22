import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'


import AddPerson from './components/AddPerson'
import PersonList from './components/PersonList'

import { getAllPersons } from './api'
import { ColumnWrapper } from './styles/common'

export const SplashPage = () => {

    const [listOfPersons, setListOfPersons] = useState([])

    useEffect(() => {
      getAllPersons().then(({ data }) => {
          if (data?.data) {
              setListOfPersons(data.data)
          }
      
      }, err => {
        if (!err.success) {
            toast.error(err.error)
        }
    })
  }, [])

    return (
     <ColumnWrapper>
        <AddPerson setListOfPersons={setListOfPersons} listOfPersons={listOfPersons} />
        <PersonList listOfPersons={listOfPersons} />
      </ColumnWrapper>
    )
}

export default SplashPage