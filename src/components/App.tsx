import { useState } from 'react';
import { Toaster } from 'react-hot-toast';

import { useJobItems, useDebounce } from '../lib/hooks';
import { PAGE_DIRECTION } from '../lib/types';
import { RESULT_PER_PAGE } from '../lib/constants';
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
  // state
  const [searchText, setSearchText] = useState('');
  const debouncedText = useDebounce(searchText, 250);
  const [currentPage, setCurrentPage] = useState(1);

  // computed(derived) states
  const { jobItemList, isLoading } = useJobItems(debouncedText);
  const jobItemsSliced =
    jobItemList?.slice(
      (currentPage - 1) * RESULT_PER_PAGE,
      currentPage * RESULT_PER_PAGE,
    ) || [];
  const total = jobItemList?.length || 0;
  const totalPages = Math.ceil(total / RESULT_PER_PAGE);

  // event handler / actions
  const handleChangePage = (direction: PAGE_DIRECTION) => {
    if (direction === PAGE_DIRECTION.NEXT) {
      setCurrentPage((_curState) => _curState + 1);
    } else if (direction === PAGE_DIRECTION.BACK) {
      setCurrentPage((_curState) => _curState - 1);
    }
  };

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
          <PaginationControls
            totalPages={totalPages}
            currentPage={currentPage}
            onClick={handleChangePage}
          />
        </Sidebar>
        <JobItemContent />
      </Container>
      <Toaster position='top-right' />
      <Footer />
    </>
  );
}

export default App;
