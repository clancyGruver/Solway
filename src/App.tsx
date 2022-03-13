import { useEffect } from 'react';
import Directory from './components/table/directory';
import Header from './components/header';
import { useDispatch, useSelector } from 'react-redux';
import { getLoading, loadDictionary } from './store/features/dictionary';
import ReactLoading from 'react-loading';

function App() {
  const dispatch = useDispatch();
  const loading = useSelector(getLoading);

  useEffect(() => {
    dispatch(loadDictionary());
  }, [dispatch]);

  return (
    <div className="grid grid-rows-layout h-screen">
      <Header />
      <main className="p-6 bg-slate-50">
        {
          loading
            ? <ReactLoading type="spin" color="blue" className="m-auto" />
            : <Directory />
        }
      </main>
    </div>
  );
}

export default App;
