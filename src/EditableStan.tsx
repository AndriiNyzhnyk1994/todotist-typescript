import React, { ChangeEvent, useState } from 'react';


export type EditableSpanPropsType = {
    value: string
    changeTitle: (newTitle: string) => void
}



const EditableSpan = (props: EditableSpanPropsType) => {
    let [value, setValue] = useState<string>(props.value)
    let [editMode, setEditMode] = useState<boolean>(false)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }

    const changeTitle = (newTitle: string) => {
        if(value.trim()) {
            props.changeTitle(newTitle)
        }
    }

    const onEditMode = () => {
        setEditMode(true)
    }
    const offEditMode = () => {
        setEditMode(false)
        changeTitle(value)
    }



    return (
        editMode
            ? <input onChange={onChangeHandler} onBlur={offEditMode} autoFocus={true} value = { value } />
            : <span onDoubleClick={onEditMode}>{ props.value }</span>
    )
}


export default EditableSpan;