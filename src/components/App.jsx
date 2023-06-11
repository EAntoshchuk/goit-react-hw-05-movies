import React, { useEffect, useState, lazy } from 'react';
import { Route, Routes, useParams } from 'react-router-dom';
import Layout from './Layout';
import Reviews from './Reviews';
import Cast from './Cast';

const Home = lazy(() => import('../pages/Home'));
const Movies = lazy(() => import('../pages/Movies'));
const MovieDetails = lazy(() => import('../pages/MovieDetails'));
// const Cast = lazy(() => import('../components/Cast'));

export default function App() {
  return (
    <>
      <div
        style={{
          height: '10vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: 40,
          color: '#010101',
        }}
      >
        React-HW-05-Movies
      </div>

      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="movies" element={<Movies />} />
          <Route path="movies/:movieId" element={<MovieDetails />}>
            <Route path="cast" element={<Cast />} />
            <Route path="reviews" element={<Reviews />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}
