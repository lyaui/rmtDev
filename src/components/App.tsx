import { useState } from 'react';
import { Toaster } from 'react-hot-toast';

import { useJobItems, useDebounce } from '../lib/hooks';
import { PAGE_DIRECTION, SORT_BY } from '../lib/types';
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
  const [sortBy, setSortBy] = useState(SORT_BY.RELEVANT);

  // computed(derived) states
  const { jobItemList, isLoading } = useJobItems(debouncedText);
  const jobItemsSorted = [...(jobItemList || [])].sort((a, b) => {
    if (sortBy === SORT_BY.RELEVANT) {
      return b.relevanceScore - a.relevanceScore;
    } else if (sortBy === SORT_BY.RECENT) {
      return a.daysAgo - b.daysAgo;
    }
    return 0;
  });
  const jobItemsSortedAndSliced = jobItemsSorted.slice(
    (currentPage - 1) * RESULT_PER_PAGE,
    currentPage * RESULT_PER_PAGE,
  );
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

  const handleChangeSortBy = (sortBy: SORT_BY) => {
    setCurrentPage(1);
    setSortBy(sortBy);
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
            <SortingControls sortBy={sortBy} onClick={handleChangeSortBy} />
          </SidebarTop>
          <JobList
            jobItemList={jobItemsSortedAndSliced}
            isLoading={isLoading}
          />
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
