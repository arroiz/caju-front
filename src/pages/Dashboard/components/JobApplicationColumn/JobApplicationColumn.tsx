import { Registration } from '~/types/registrations';
import * as S from './styles';
import { REGISTRATION_STATUS } from '~/types/status';
import { JobApplicationCard } from '../JobApplicationCard';

type JobApplicationColumnProps = {
  title: string;
  status: REGISTRATION_STATUS;
  jobApplicationList: Registration[];
};

export const JobApplicationColumn = ({
  title,
  status,
  jobApplicationList,
}: JobApplicationColumnProps) => {
  return (
    <S.Column status={status}>
      <S.TitleColumn status={status}>{title}</S.TitleColumn>
      <S.ColumnList>
        {jobApplicationList.map((jobApplication) => {
          return (
            <S.ColumnListItem data-testid="column-list-item" key={jobApplication.id}>
              <JobApplicationCard jobApplication={jobApplication} />
            </S.ColumnListItem>
          );
        })}
      </S.ColumnList>
    </S.Column>
  );
};
