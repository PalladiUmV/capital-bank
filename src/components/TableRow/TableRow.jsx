import { useEffect, useState } from "react";
import "./TableRow.scss";

const TableRow = ({ deleteRow, index, item, setData, data, setFormValid }) => {

	const [nameDirty, setNameDirty] = useState(false);
	const [ageDirty, setAgeDirty] = useState(false);
	const [textAreaDirty, setTextAreaDirty] = useState(false);

	const [nameError, setNameError] = useState('Поле не может быть пустым');
	const [ageError, setAgeError] = useState('Поле не может быть пустым');
	const [textAreaError, setTextAreaError] = useState('Поле не может быть пустым');


	useEffect(() => {
		if (nameError || ageError || textAreaError) {
			setFormValid(false)
		} else {

			setFormValid(true)
		}

	}, [nameError, ageError, textAreaError])


	const handleEditFormChange = (event, idx) => {
		switch (event.target.name) {
			case 'name':
				if (event.target.value.length < 1) (setNameError('Заполните обязательное поле'))
				else (setNameError(''))
				break;
			case 'age':
				if (event.target.value.length < 1) (setAgeError('Заполните обязательное поле'))
				else (setAgeError(''))
				break;
			case 'textArea':
				if (event.target.value.length < 1) (setTextAreaError('Заполните обязательное поле'))
				else (setTextAreaError(''))
				break;
			default:
				break;
		}
		const fieldName = event.target.getAttribute("name");
		const fieldValue = event.target.value;
		const newItem = { ...data[idx] };
		const editItem = { ...newItem, [fieldName]: fieldValue }
		const newFormData = [...data.slice(0, idx), editItem, ...data.slice(idx + 1)];
		setData(newFormData)
	}

	const blurHandler = (event) => {
		switch (event.target.name) {
			case 'name':
				setNameDirty(true)
				break;
			case 'age':
				setAgeDirty(true)
				break;
			case 'textArea':
				setTextAreaDirty(true)
				break;
			default:
				break;
		}
	}

	return (
		<tr>
			<td>
				<input
					onBlur={e => blurHandler(e)}
					onChange={e => handleEditFormChange(e, index)}
					value={item.name}
					name="name"
					type="text"
					required="required"
					placeholder='Введите Ф.И.О' />
				{(nameDirty && nameError) && <span style={{ fontSize: '10px', marginTop: '5px', color: 'red' }}>{nameError}</span>}
			</td>
			<td>
				<select name="select"
					onChange={e => handleEditFormChange(e, index)}
					value={item.select}
				>
					<option value="analyst">Аналитик</option>
					<option value="manager">Менеджер</option>
					<option value="programmer">Программист</option>
					<option value="lawyer">Юрист</option>
				</select>
			</td>
			<td>
				<input
					onBlur={e => blurHandler(e)}
					onChange={e => handleEditFormChange(e, index)}
					value={item.age}
					name="age"
					type="number"
					placeholder='Введите возраст'
				/>
				{(ageDirty && ageError) && <span style={{ fontSize: '10px', marginTop: '5px', color: 'red' }}>{ageError}</span>}
			</td>
			<td>
				<textarea
					onBlur={e => blurHandler(e)}
					onChange={e => handleEditFormChange(e, index)}
					value={item.textarea}
					name="textArea"
					cols="25" rows="3"
					placeholder='Введите компетенции'
				></textarea>
				{(textAreaDirty && textAreaError) && <span style={{ fontSize: '10px', marginTop: '5px', color: 'red' }}>{textAreaError}</span>}
			</td>
			<td className="delete-row" onClick={() => deleteRow(index)}> удалить </td>
		</tr>
	);
};

export default TableRow;
