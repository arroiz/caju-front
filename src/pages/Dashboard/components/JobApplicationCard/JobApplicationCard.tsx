import { Button } from '~/components/Button';
import * as S from './styles';
import { HiOutlineMail, HiOutlineUser, HiOutlineCalendar, HiOutlineTrash } from 'react-icons/hi';
import { Registration } from '~/types/registrations';
import { REGISTRATION_STATUS } from '~/types/status';
import { useUpdateRegistration } from '~/hooks/useUpdateRegistration';
import { IconButton } from '~/components/IconButton';
import { useCallback } from 'react';
import { useConfirmationDialog } from '~/contexts/ConfirmationDialogContext';
import { useDeleteRegistration } from '~/hooks/useDeleteRegistration';

type JobApplicationCardProps = {
  jobApplication: Registration;
};

export const JobApplicationCard = ({ jobApplication }: JobApplicationCardProps) => {
  const { mutateAsync: updateJobApplication, isPending } = useUpdateRegistration();
  const { mutateAsync: deleteJobApplication } = useDeleteRegistration();
  const { dispatchConfirmation } = useConfirmationDialog();

  const handleUpdateStatus = useCallback(
    (newStatus: REGISTRATION_STATUS) => () =>
      dispatchConfirmation({
        onConfirm: async () => {
          await updateJobApplication({
            ...jobApplication,
            status: newStatus,
          });
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
          await deleteJobApplication({
            id: jobApplication.id,
          });
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
          <span>{jobApplication.admissionDate}</span>
        </S.InformationItem>
      </S.InformationList>
      <S.CardFooter>
        {jobApplication.status === REGISTRATION_STATUS.REVIEW ? (
          <>
            <Button
              size="sm"
              bgcolor="rgb(255, 145, 154)"
              disabled={isPending}
              onClick={handleUpdateStatus(REGISTRATION_STATUS.REPROVED)}
            >
              Reprovar
            </Button>
            <Button
              size="sm"
              bgcolor="rgb(155, 229, 155)"
              disabled={isPending}
              onClick={handleUpdateStatus(REGISTRATION_STATUS.APPROVED)}
            >
              Aprovar
            </Button>
          </>
        ) : (
          <Button
            size="sm"
            bgcolor="#ff8858"
            disabled={isPending}
            onClick={handleUpdateStatus(REGISTRATION_STATUS.REVIEW)}
          >
            Revisar novamente
          </Button>
        )}
        <IconButton color="black" aria-label="deletar" onClick={handleDeleteJobApplication}>
          <HiOutlineTrash />
        </IconButton>
      </S.CardFooter>
    </S.Card>
  );
};
