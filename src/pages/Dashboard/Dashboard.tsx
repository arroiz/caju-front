import { JobApplicationBoard } from './components/JobApplicationBoard';
import * as S from './styles';
import { SearchBar } from './components/Searchbar';
import { useListJobApplications } from '~/hooks/useListJobApplication';
import { ConfirmationDialogProvider } from '~/contexts/ConfirmationDialogContext';
import { Loading } from '~/components/Loading';

const Dashboard = () => {
  const {
    isLoading,
    data: jobApplications,
    isFetching,
    setSearchFilters,
    refetch,
  } = useListJobApplications();

  return (
    <S.Container>
      <SearchBar onSearch={setSearchFilters} onRefetch={refetch} isLoading={isFetching} />
      <S.LoadingContainer aria-busy={isFetching}>
        {isFetching ? <Loading /> : null}
        {!isLoading ? <JobApplicationBoard jobApplicationList={jobApplications} /> : null}
      </S.LoadingContainer>
    </S.Container>
  );
};

export const DashboardPage = () => (
  <ConfirmationDialogProvider>
    <Dashboard />
  </ConfirmationDialogProvider>
);
