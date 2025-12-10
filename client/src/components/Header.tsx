import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="bg-primary-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/">
          <img src="/oostboek.png" alt="Oostboek" className="h-11 w-auto" />
        </Link>
        <nav className="hidden md:flex items-center gap-1">
          <Link to="/boekhouding" className="nav-link">Accounting</Link>
          <Link to="/fiscaliteit" className="nav-link">Tax Services</Link>
          <Link to="/begeleiding" className="nav-link">Advisory</Link>
          <a href="/#contact" className="nav-link">Contact</a>
        </nav>
        <Link
          to="/register"
          className="hidden md:inline-flex bg-white text-primary-900 px-5 py-2 rounded font-bold hover:bg-primary-100 transition-colors"
        >
          REGISTER
        </Link>
      </div>
    </header>
  );
}
