import { NavLink, Outlet } from 'react-router-dom';
import { Suspense } from 'react';
import css from './Layout.module.css';

const Layout = () => {
  return (
    <div>
      <header>
        <ul className={css.list}>
          <li className={css.list_item}>
            <NavLink to="/" className={css.link}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/movies" className={css.link}>
              Movies
            </NavLink>
          </li>
        </ul>
      </header>

      <main>
        <Suspense fallback={<div>Loading...</div>}>
          <Outlet />
        </Suspense>
      </main>

      <footer>Footer</footer>
    </div>
  );
};

export default Layout;
