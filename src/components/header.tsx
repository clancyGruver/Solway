import ChangeLang from './change-lang';

const Header = () => (
  <header className="bg-blue-100 flex items-center justify-center w-full text-center border-blue-800 border-b">
    <h1 className="text-3xl font-bold">
      Solway group test
    </h1>
    <ChangeLang />
    <div
      className="
        absolute top-0 left-0
        rounded
        border border-red-800
        bg-red-200
        px-2
      "
    >
        Открытие окна диалога редактирования ячейки по двойному клику
    </div>
  </header>

);

export default Header;