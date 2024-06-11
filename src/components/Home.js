import React from 'react';
import Slider from './Slider';
import NotesSlider from './NotesSlider';
import { useAuth } from '../context/auth';
import Layout from '../Layout/Layout';
import NotesSlider2 from './NotesSlider2';

const Home = () => {
  const [auth, setAuth] = useAuth();

  return (
    <>
      <Layout>
        <Slider />
        {/* <pre>{JSON.stringify(auth, null, 4)}</pre> */}
        <NotesSlider />
        <NotesSlider2 />
      </Layout>
    </>
  );
};

export default Home;
