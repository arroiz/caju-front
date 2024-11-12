import { Button } from '~/components/Button';
import * as S from './styles';
import { HiOutlineMail, HiOutlineUser, HiOutlineCalendar, HiOutlineTrash } from 'react-icons/hi';
import { JobApplication } from '~/types/jobApplication';
import { JOB_APPLICATION_STATUS } from '~/types/status';
import { useUpdateJobApplication } from '~/hooks/useUpdateJobApplication';
import { IconButton } from '~/components/IconButton';
import { useCallback } from 'react';
import { useConfirmationDialog } from '~/contexts/ConfirmationDialogContext';
import { useDeleteJobApplication } from '~/hooks/useDeleteJobApplication';
import toast from 'react-hot-toast';

type JobApplicationCardProps = {
  jobApplication: JobApplication;
};

export const JobApplicationCard = ({ jobApplication }: JobApplicationCardProps) => {
  const { mutateAsync: updateJobApplication, isPending } = useUpdateJobApplication();
  const { mutateAsync: deleteJobApplication } = useDeleteJobApplication();
  const { dispatchConfirmation } = useConfirmationDialog();

  const handleUpdateStatus = useCallback(
    (newStatus: JOB_APPLICATION_STATUS) => () =>
      dispatchConfirmation({
        onConfirm: async () => {
          try {
            await updateJobApplication({
              ...jobApplication,
              status: newStatus,
            });
            toast.success('Candidatura alterada com sucesso');
          } catch (e) {
            toast.error('Erro ao alterar candidatura');
          }
        },
        options: {
          title: 'Confirmar alteração de status',
          description: `Confirma alteração de status da candidatura de ${jobApplication.employeeName} para ${newStatus.toLocaleLowerCase()}?`,
        },
      }),
    [dispatchConfirmation, jobApplication, updateJobApplication],
  );

  const handleDeleteJobApplication = useCallback(
    () =>
      dispatchConfirmation({
        onConfirm: async () => {
          try {
            await deleteJobApplication({
              id: jobApplication.id,
            });
            toast.success('Candidatura deletada com sucesso');
          } catch (e) {
            toast.error('Erro ao deletar candidatura');
          }
        },
        options: {
          title: 'Confirmação de Exclusão de Candidatura',
          description: `Confirma a exclusão da candidatura de ${jobApplication.employeeName}? Esta ação não poderá ser desfeita.`,
        },
      }),
    [deleteJobApplication, dispatchConfirmation, jobApplication.employeeName, jobApplication.id],
  );

  return (
    <S.Card>
      <S.InformationList>
        <S.InformationItem>
          <HiOutlineUser />
          <h3>{jobApplication.employeeName}</h3>
        </S.InformationItem>
        <S.InformationItem>
          <HiOutlineMail />
          <p>{jobApplication.email}</p>
        </S.InformationItem>
        <S.InformationItem>
          <HiOutlineCalendar />
          <span>{jobApplication.applicationDate}</span>
        </S.InformationItem>
      </S.InformationList>
      <S.CardFooter>
        {jobApplication.status === JOB_APPLICATION_STATUS.REVIEW ? (
          <>
            <Button
              $size="sm"
              $colorScheme="danger"
              disabled={isPending}
              onClick={handleUpdateStatus(JOB_APPLICATION_STATUS.REPROVED)}
            >
              Reprovar
            </Button>
            <Button
              $size="sm"
              $colorScheme="success"
              disabled={isPending}
              onClick={handleUpdateStatus(JOB_APPLICATION_STATUS.APPROVED)}
            >
              Aprovar
            </Button>
          </>
        ) : (
          <Button
            $size="sm"
            $colorScheme="warning"
            disabled={isPending}
            onClick={handleUpdateStatus(JOB_APPLICATION_STATUS.REVIEW)}
          >
            Revisar novamente
          </Button>
        )}
        <IconButton
          color="black"
          $colorScheme="ghost"
          aria-label="deletar"
          onClick={handleDeleteJobApplication}
        >
          <HiOutlineTrash />
        </IconButton>
      </S.CardFooter>
    </S.Card>
  );
};
