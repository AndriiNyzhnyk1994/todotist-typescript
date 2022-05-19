import React, { useState } from 'react';


export type EditableSpanPropsType = {
    value: string
}



const EditableSpan = (props: EditableSpanPropsType) => {

    let [editMode, setEditMode] = useState<boolean>(false)

    const onEditMode = () => {
        setEditMode(true)
    }
    const offEditMode = () => {
        setEditMode(false)
    }



    return (
        editMode
            ? <input onBlur={offEditMode} autoFocus={true} value = { 'title' } />
            : <span onDoubleClick={onEditMode}>{ props.value }</span>
    )
}


export default EditableSpan;