import { JobApplicationBoard } from './components/JobApplicationBoard';
import * as S from './styles';
import { SearchBar } from './components/Searchbar';
import { useListRegistrations } from '~/hooks/useListRegistration';
import { ConfirmationDialogProvider } from '~/contexts/ConfirmationDialogContext';
import { Loading } from '~/components/Loading';

const Dashboard = () => {
  const {
    isLoading,
    data: registrations,
    isFetching,
    setSearchFilters,
    refetch,
  } = useListRegistrations();

  return (
    <S.Container>
      <SearchBar onSearch={setSearchFilters} onRefetch={refetch} />
      <S.LoadingContainer aria-busy={isFetching}>
        {isFetching ? <Loading /> : null}
        {!isLoading ? <JobApplicationBoard jobApplications={registrations} /> : null}
      </S.LoadingContainer>
    </S.Container>
  );
};

export const DashboardPage = () => (
  <ConfirmationDialogProvider>
    <Dashboard />
  </ConfirmationDialogProvider>
);
