import Link from 'next/link';
import useTranslation from 'next-translate/useTranslation';

import {Button} from '@/components/commons/Button';

type ClientInfoProps = {
  step: number;
  profileName: string | undefined;
};

export const ClientInfo = ({step, profileName}: ClientInfoProps) => {
  const {t} = useTranslation('common');

  return (
    <div className="rounded-xs bg-cloud my-8 flex justify-between gap-4 p-7 md:gap-0">
      <div>
        <div className="flex flex-col items-baseline justify-between gap-2 md:flex-row md:gap-0">
          <p className="text-md pb-2.5 font-bold leading-8">
            {t('selectedUser')}
          </p>
        </div>
        <p>{profileName}</p>
      </div>
      {step === 0 ? (
        <Button>
          <Link href="/pok/bilety">{t('changeUser')}</Link>
        </Button>
      ) : null}
    </div>
  );
};
