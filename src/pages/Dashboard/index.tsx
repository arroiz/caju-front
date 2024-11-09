import Collumns from './components/Columns';
import * as S from './styles';
import { SearchBar } from './components/Searchbar';
import { useListRegistrations } from '~/hooks/useListRegistration';

const DashboardPage = () => {
  const { isLoading, data: registrations } = useListRegistrations();

  if (isLoading) {
    return 'loading';
  }

  return (
    <S.Container>
      <SearchBar />
      <Collumns registrations={registrations} />
    </S.Container>
  );
};
export default DashboardPage;
