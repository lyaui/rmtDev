import { useState, useEffect } from 'react';

import Background from './Background';
import Container from './Container';
import Footer from './Footer';
import Header from './Header';

function App() {
  const [searchText, setSearchText] = useState('');
  const [jobItemList, setJobItemList] = useState();

  useEffect(() => {
    if (!searchText) return;

    const fetchJobItemList = async () => {
      try {
        const res = await fetch(
          `https://bytegrad.com/course-assets/projects/rmtdev/api/data?search=${searchText}`,
        );
        if (!res.ok) throw new Error();
        const data = await res.json();
        setJobItemList(data.jobItems);
      } catch {}
    };
    fetchJobItemList();
  }, [searchText]);

  return (
    <>
      <Background />
      <Header searchText={searchText} setSearchText={setSearchText} />
      <Container jobItemList={jobItemList} />
      <Footer />
    </>
  );
}

export default App;
