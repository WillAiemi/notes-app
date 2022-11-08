import React, { useState, useContext, useId } from 'react'
import { useNavigate } from 'react-router-dom'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import classes from './Form.module.scss'
import { MainButton } from '../UI/MainButton'
import formImg from '../../img/form.svg'
import Select from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import MenuItem from '@mui/material/MenuItem'
import { Note } from '../../types/NoteType'
import { EditHistory } from '../../types/EditHistoryType'
import { NotesContext } from '../../context/NoteContext'
import { useInput } from '../../hooks/use-input'
import { getFullDate } from '../../constants/FullDate'

export const Form = () => {
	const [isFavourite, setIsFavourite] = useState<boolean>(true)
	const [editHistory] = useState<EditHistory[]>([])
	const { addNote } = useContext(NotesContext)
	const navigate = useNavigate()
	const id = useId()
	const { fullDate } = getFullDate()

	const {
		value: enteredAuthor,
		isInvalid: authorInputInvalid,
		isValid: authorInputIsValid,
		valueChangeHandler: authorInputChangeHandler,
		valueBlurHandler: authorBlurHandler,
		resetHandler: resetAuthorInput,
	} = useInput((value) => value.trim())
	const {
		value: enteredTitle,
		isInvalid: titleInputInvalid,
		isValid: titleInputIsValid,
		valueChangeHandler: titleInputChangeHandler,
		valueBlurHandler: titleBlurHandler,
		resetHandler: resetTitleInput,
	} = useInput((value) => value.trim())
	const {
		value: enteredCategory,
		isInvalid: categoryInputInvalid,
		isValid: categoryInputIsValid,
		valueChangeHandler: categoryInputChangeHandler,
		valueBlurHandler: categoryBlurHandler,
		resetHandler: resetCategoryInput,
	} = useInput((value) => value.trim())
	const {
		value: enteredDescription,
		isInvalid: descriptionInputInvalid,
		isValid: descriptionInputIsValid,
		valueChangeHandler: descriptionInputChangeHandler,
		valueBlurHandler: descriptionBlurHandler,
		resetHandler: resetDescriptionInput,
	} = useInput((value) => value.trim())

	const allInputsIsValid = titleInputIsValid && authorInputIsValid && categoryInputIsValid && descriptionInputIsValid

	const submitFormHandler = (e: React.FormEvent) => {
		e.preventDefault()

		if (!allInputsIsValid) {
			return
		}

		const NoteObj: Note = {
			id: id,
			author: enteredAuthor,
			title: enteredTitle,
			category: enteredCategory,
			description: enteredDescription,
			favourite: isFavourite,
			date: fullDate,
			descLength: enteredDescription.length,
			editHistory: editHistory,
		}

		addNote(NoteObj)

		navigate('/notes')

		resetAuthorInput()
		resetTitleInput()
		resetCategoryInput()
		resetDescriptionInput()
	}

	return (
		<div className={classes.formModules}>
			<form onSubmit={submitFormHandler} className={classes.form}>
				<h1 className={classes.heading}>Create new note</h1>
				<div className={classes.fieldset}>
					<TextField
						error={authorInputInvalid}
						value={enteredAuthor}
						onChange={authorInputChangeHandler}
						onBlur={authorBlurHandler}
						autoComplete='off'
						fullWidth
						color='primary'
						id='filled-basic'
						label='Author'
						variant='outlined'
					/>
				</div>
				<div className={classes.fieldset}>
					<div className={classes.fieldsetRow}>
						<TextField
							value={enteredTitle}
							onChange={titleInputChangeHandler}
							error={titleInputInvalid}
							onBlur={titleBlurHandler}
							autoComplete='off'
							fullWidth
							color='primary'
							id='filled-basic'
							label='Title'
							variant='outlined'
						/>

						<FormControl fullWidth variant='outlined' error={categoryInputInvalid}>
							<InputLabel id='demo-simple-select-standard-label'>Category</InputLabel>
							<Select
								labelId='demo-simple-select-standard-label'
								id='demo-simple-select-standard'
								value={enteredCategory}
								onChange={categoryInputChangeHandler}
								onBlur={categoryBlurHandler}
								label='Age'>
								<MenuItem value=''>
									<em>Choose category</em>
								</MenuItem>
								<MenuItem value={'Shopping'}>Shopping</MenuItem>
								<MenuItem value={'Traveling'}>Traveling</MenuItem>
								<MenuItem value={'Business'}>Business</MenuItem>
								<MenuItem value={'Cooking'}>Cooking</MenuItem>
							</Select>
						</FormControl>
					</div>
				</div>
				<div className={classes.fieldset}>
					<TextField
						error={descriptionInputInvalid}
						value={enteredDescription}
						onChange={descriptionInputChangeHandler}
						onBlur={descriptionBlurHandler}
						multiline
						rows={4}
						autoComplete='off'
						fullWidth
						color='primary'
						id='filled-basic'
						label='Description'
						variant='outlined'
					/>
				</div>
				<FormControlLabel
					control={<Checkbox onChange={() => setIsFavourite((prev) => !prev)} defaultChecked />}
					label={isFavourite ? 'Is favourite' : 'Not favourite'}
				/>

				<MainButton disabled={!allInputsIsValid} type='submit' variant='contained' title='Create' />
			</form>

			<img src={formImg} alt='img' />
		</div>
	)
}
