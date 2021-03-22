import React, { useState } from 'react'
import {
    TextField,
    Button,
} from '@material-ui/core'
import { toast } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'

import {
    OuterWrapper, 
    FlexWrapper,
    TitleHeader
} from '../styles/common'
import { PaperForm } from '../styles/mui'
import { addPerson } from '../api'


export const AddPerson = ({
    listOfPersons = [],
    setListOfPersons = null
}) => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')

    const handleSubmit = e => {
        e.preventDefault()

        if (name) {
            const data = {
                name,
                email,
                phone
            }
            addPerson(data).then(({ data }) => {
                if (data?.data) {
                    setListOfPersons([...listOfPersons, data.data])
                    toast.success(`Person "${data.data.name} added!`)
                }
            }, err => {
                if (!err.success) {
                    toast.error(err.error)
                }
            })
            clearFields()
        } else {
            toast.error('Name is required!')
        }
        
    }
    const handleNameChange = e => setName(e.target.value)
    const handleEmailChange = e => setEmail(e.target.value)
    const handlePhoneChange = e => setPhone(e.target.value)

    const clearFields = () => {
        setName('')
        setEmail('')
        setPhone('')
    }
    

    return (
        <PaperForm elevation={3}>
            <TitleHeader>Add A Person</TitleHeader>
            <form onSubmit={handleSubmit}>

                <OuterWrapper>
                    <FlexWrapper>
                        <TextField
                            label="Name"
                            placeholder="Name"
                            onChange={handleNameChange}
                            fullWidth
                            value={name}
                        />      
                    </FlexWrapper>
                    <FlexWrapper>
                        <TextField
                            label="Email"
                            onChange={handleEmailChange}
                            fullWidth
                            value={email}
                        />      
                    </FlexWrapper>
                    <FlexWrapper>
                        <TextField
                            label="Phone"
                            onChange={handlePhoneChange}
                            fullWidth
                            value={phone}
                        />      
                    </FlexWrapper>
                    <Button type="submit" variant="contained" color="primary">Submit</Button>

                </OuterWrapper>
                
            </form>
        </PaperForm>
    )
}

export default AddPerson