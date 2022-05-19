import React, { KeyboardEvent, ChangeEvent, useState } from 'react'

export type AddItemFormPropsType = {
    addItem: (title: string) => void
}


const AddItemForm = (props: AddItemFormPropsType) => {
    let [title, setTitle] = useState('')
    let [error, setError] = useState<string | null>(null)


    const addItem = () => {
        if (title.trim()) {
            props.addItem(title)
            setTitle('')
        } else {
            setError('Title is required')
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(null)
    }
    const onKeypressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') addItem()
    }

    return (
        <div className="addItemForm">
            <input
                onChange={onChangeHandler}
                value={title}
                className={error ? 'error' : ''}
                onKeyDown={onKeypressHandler}
            />
            <button onClick={addItem}>+</button>
            {error && <div className="error-message">{error}</div>}
        </div>
    )
}



export default AddItemForm