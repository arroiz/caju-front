import * as S from './styles';
import { SearchBar } from './components/Searchbar';
import { useListJobApplications } from '~/hooks/useListJobApplication';
import { ConfirmationDialogProvider } from '~/contexts/ConfirmationDialogContext';
import { Loading } from '~/components/Loading';
import { lazy, Suspense } from 'react';

const JobApplicationBoard = lazy(() =>
  import('./components/JobApplicationBoard').then(({ JobApplicationBoard }) => ({
    default: JobApplicationBoard,
  })),
);

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
        {!isLoading ? (
          <Suspense fallback={<Loading isCentered />}>
            <JobApplicationBoard jobApplicationList={jobApplications} />
          </Suspense>
        ) : null}
      </S.LoadingContainer>
    </S.Container>
  );
};

export const DashboardPage = () => (
  <ConfirmationDialogProvider>
    <Dashboard />
  </ConfirmationDialogProvider>
);
