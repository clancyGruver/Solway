import { ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';
import { Lang } from '../@types';
import { changeLang } from '../store/features/config';

const langNames = {
  EN: 'English',
  ES: 'Spanish',
  RU: 'Russian',
};

const ChangeLang = () => {
  const dispatch = useDispatch();

  const selectChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    let newLang = 'EN';
    if (['RU', 'ES', 'EN'].includes(e.target.value)) {

      newLang = e.target.value as Lang;
    }
    dispatch(changeLang({ newLang }));
  };

  return (
    <label htmlFor="lang-select" className="absolute top-2 right-2 flex items-center">
      <span className='mr-2'>Select language:</span>
      <select className='py-1 px-2 rounded bg-blue-50 border-2 border-blue-800' onChange={selectChangeHandler} id="lang-select">
        {
          Object
            .entries(langNames)
            .map(([shortName, fullName]) => (<option key={shortName} value={shortName}>{fullName}</option>))
        }
      </select>
    </label>
  )};

export default ChangeLang;