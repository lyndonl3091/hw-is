import React, { useState, useEffect, useRef } from 'react'
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    TextField,
    Button
} from '@material-ui/core'
import { ExpandMore } from '@material-ui/icons'
import { toast } from 'react-toastify'
import { debounce } from 'lodash'

import {
    OuterWrapper, 
    FlexWrapper,
    ButtonWrapper
} from '../styles/common'
import { ButtonForm } from '../styles/mui'

import { updatePerson } from '../api'


export const PersonPanel = ({ data }) => {

    const nameFieldRef = useRef()

    const [person, setPerson] = useState(data)
    const [name, setName] = useState(data.name)
    const [email, setEmail] = useState(data.email[0].value)
    const [phone, setPhone] = useState(data.phone[0].value)
    const [isEditing, setIsEditing] = useState(false)

    useEffect(() => {
        setName(person.name)
        setEmail(person.email[0].value)
        setPhone(person.phone[0].value)
    }, [person])

    useEffect(() => {
        if (isEditing) nameFieldRef.current.focus()
    }, [isEditing])

    const handleUpdate = debounce(() => {
        const { id = null } = data
        
        if (id && name) {
            const params = {
                name,
                email,
                phone
            }
            setIsEditing(false)
            updatePerson(id, params).then(({ data }) => {
                if (data?.data) {
                    updateFields(data.data)
                    toast.success(`Person "${data.data.name}" updated!`)
                }
            }, err => {
                if (!err.success) {
                    toast.error(err.error)
                }
            })
        } else {
            if (!name) toast.error('Name is required!')
        }

    }, 1000)

    const updateFields = updatePerson => {
        setPerson(updatePerson)
    }

    const handleCancelEdit = () => {
        setName(person.name)
        setEmail(person.email[0].value)
        setPhone(person.phone[0].value)

        setIsEditing(false)
    }

    const handleNameChange = e => setName(e.target.value)
    const handleEmailChange = e => setEmail(e.target.value)
    const handlePhoneChange = e => setPhone(e.target.value)

    const handleToggleEdit = e => setIsEditing(!isEditing)

    const handleFocus = e => {
        e.preventDefault()
        e.target.select()
    }


    return (
        <Accordion>
            <AccordionSummary expandIcon={<ExpandMore />}>{person.name}</AccordionSummary>
            <AccordionDetails>
                <OuterWrapper>
                    <FlexWrapper>
                        <TextField
                            label="Name"
                            placeholder="Name"
                            onChange={handleNameChange}
                            fullWidth
                            value={name}
                            inputRef={nameFieldRef}
                            disabled={!isEditing}
                            onFocus={handleFocus}
                        />      
                    </FlexWrapper>
                    <FlexWrapper>
                        <TextField
                            label="Email"
                            onChange={handleEmailChange}
                            fullWidth
                            value={email}
                            disabled={!isEditing}
                            onFocus={handleFocus}
                        />      
                    </FlexWrapper>
                    <FlexWrapper>
                        <TextField
                            label="Phone"
                            onChange={handlePhoneChange}
                            fullWidth
                            value={phone}
                            disabled={!isEditing}
                            onFocus={handleFocus}
                        />      
                    </FlexWrapper>

                    {!isEditing ? (
                        <Button
                            onClick={handleToggleEdit}
                            variant="contained"
                            color="primary">
                                Edit
                        </Button>
                    ) : (
                        <ButtonWrapper>
                        <ButtonForm
                            onClick={handleUpdate}
                            variant="contained"
                            color="primary"
                            style={{ marginRight: 5 }}
                        >
                                Update
                        </ButtonForm>
                        <ButtonForm
                            onClick={handleCancelEdit}
                            variant="contained"
                            color="secondary"
                            style={{ marginRight: 5 }}
                        >
                                Cancel
                        </ButtonForm>
                    </ButtonWrapper>
                    )}


                </OuterWrapper>
            </AccordionDetails>
        </Accordion>
    )
}

export default PersonPanel