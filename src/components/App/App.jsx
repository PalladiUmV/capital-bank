import { useState } from 'react';
import './App.scss';
import TableRow from '../TableRow/TableRow';

function App() {

  const [data, setData] = useState([
    {
      name: '',
      age: '',
      select: 'Аналитик',
      textArea: ''
    }
  ])

  const [formValid, setFormValid] = useState(false);

  const deleteRow = (index) => {

    const newArray = [...data.slice(0, index), ...data.slice(index + 1)]
    setData(newArray)
  }

  const addRow = () => {
    setFormValid(false)
    setData([...data, {
      name: '',
      age: '',
      select: 'Аналитик',
      textArea: ''
    }])
  }



  const sendData = async (data) => {
    const jsonData = { ...data };

    try {
      const response = await fetch('http://localhost:3010/', {
        method: 'POST',
        mode: 'no-cors',
        body: JSON.stringify(jsonData),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const json = await response.json();
      console.log('Успех:', JSON.stringify(json));
    }
    catch (error) {
      console.error('Ошибка:', error);
    }
  }

  return (
    <div className="app">
      <header className="header">
        <input className="header__input" type="text" placeholder="Поиск" />
      </header>
      <div className="menu">
        <div>Меню</div>
        <ul>
          <li>
            Пункт 1
          </li>
          <li>
            Пункт 2
          </li>
          <li>
            Пункт 3
          </li>
          <li>
            Пункт 4
          </li>
        </ul>
      </div>
      <div className='container'>
        <table className='table'>
          <thead>
            <tr>
              <th>ФИО</th>
              <th>Должность</th>
              <th>Возраст</th>
              <th>Компетенции</th>
              <th> </th>
            </tr>
          </thead>

          <tbody>
            {
              data?.map((item, index) => (
                <TableRow
                  deleteRow={deleteRow}
                  index={index}
                  key={index}
                  item={item}
                  data={data}
                  setData={setData}
                  setFormValid={setFormValid}
                />
              ))
            }

          </tbody>
        </table>
        <div className="table-handler">
          <button disabled={!formValid} className="send" onClick={() => sendData(data)}>Отправить</button>
          <button className="add" onClick={addRow}>Добавить</button>
        </div>
      </div>

      <footer className="footer">
        <div className="div">
          <p>Все права защищены</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
