import { useState, useEffect } from 'react';

import Background from './Background';
import Container from './Container';
import Footer from './Footer';
import Header, { HeaderTop } from './Header';
import BookmarksButton from './BookmarksButton';
import Logo from './Logo';
import SearchForm from './SearchForm';
import JobItemContent from './JobItemContent';
import Sidebar, { SidebarTop } from './Sidebar';
import JobList from './JobList';
import PaginationControls from './PaginationControls';
import ResultsCount from './ResultsCount';
import SortingControls from './SortingControls';

function App() {
  const [searchText, setSearchText] = useState('');
  const [jobItemList, setJobItemList] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!searchText) return;

    const fetchJobItemList = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(
          `https://bytegrad.com/course-assets/projects/rmtdev/api/data?search=${searchText}`,
        );
        if (!res.ok) throw new Error();
        const data = await res.json();
        setJobItemList(data.jobItems);
      } catch {
        console.log('something went wrong');
      } finally {
        setIsLoading(false);
      }
    };
    fetchJobItemList();
  }, [searchText]);

  return (
    <>
      <Background />
      <Header>
        <HeaderTop>
          <Logo />
          <BookmarksButton />
        </HeaderTop>
        <SearchForm searchText={searchText} setSearchText={setSearchText} />
      </Header>
      <Container>
        <Sidebar>
          <SidebarTop>
            <ResultsCount />
            <SortingControls />
          </SidebarTop>
          <JobList jobItemList={jobItemList} isLoading={isLoading} />
          <PaginationControls />
        </Sidebar>
        <JobItemContent />
      </Container>
      <Footer />
    </>
  );
}

export default App;
