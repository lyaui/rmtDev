import { useState } from 'react';
import { Toaster } from 'react-hot-toast';

import { useJobItems, useDebounce } from '../lib/hooks';
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
  const debouncedText = useDebounce(searchText, 250);
  const { jobItemList, isLoading } = useJobItems(debouncedText);

  const jobItemsSliced = jobItemList?.slice(0, 7) || [];
  const total = jobItemList?.length || 0;

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
            <ResultsCount count={total} />
            <SortingControls />
          </SidebarTop>
          <JobList jobItemList={jobItemsSliced} isLoading={isLoading} />
          <PaginationControls />
        </Sidebar>
        <JobItemContent />
      </Container>
      <Toaster position='top-right' />
      <Footer />
    </>
  );
}

export default App;
