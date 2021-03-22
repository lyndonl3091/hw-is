import React from 'react'

import { ListWrapper } from '../styles/common'
import PersonPanel from './PersonPanel'

export const PersonList = ({
    listOfPersons = []
}) => {


    const renderList = data => {
        let result = []

        if (data?.length) {
            result = data.map(x => (
                <PersonPanel key={x.id} data={x} />
            ))
        }

        return result
    }

    return (
        <ListWrapper>
            {renderList(listOfPersons)}
        </ListWrapper>
    )
}

export default React.memo(PersonList)