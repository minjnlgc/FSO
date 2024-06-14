import { useEffect, useState } from 'react'
import './App.css'
import { Diary } from './types';
import { getAllDiaries } from './services/diaryService';

import DiaryList from './components/DiaryList';
import DiaryForm from './components/DiaryForm';

const App = (): JSX.Element => {
  const [diaries, setDiaries] = useState<Diary[]>([]);

  useEffect(() => {
    getAllDiaries().then(data => {
      setDiaries(data);
    })
  }, [diaries])

  return (
    <div>
      <DiaryForm />
      <DiaryList diaries={diaries}/>
    </div>
  )
}

export default App
