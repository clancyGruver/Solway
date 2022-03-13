import ChangeLang from './change-lang';

const Header = () => (
  <header className="bg-blue-100 flex items-center justify-center w-full text-center border-blue-800 border-b">
    <h1 className="text-3xl font-bold">
      Solway group test
    </h1>
    <ChangeLang />
  </header>

);

export default Header;