import {Button} from '@/components/commons/Button';

import {useRefundCaseForm} from './useRefundCaseForm';

import {FileItem} from '@/components/commons/Form/Fields/FileInput/components/FileItem';
import {FileInput} from '@/components/commons/Form/Fields/FileInput/FileInput';
import {Input} from '@/components/commons/Form/Fields/Input';
import {SubmitButton} from '@/components/commons/Form/Fields/SubmitButton';
import {Textarea} from '@/components/commons/Form/Fields/Textarea';
import {Form} from '@/components/commons/Form/Form';
import {FormMessage} from '@/components/commons/Form/FormMessage';

export type RefundCaseFormProps = {
  name: any;
  ticket: any;
  card: any;
  handleClose: () => void;
  handleReload: () => void;
};

export const RefundCaseForm = (props: RefundCaseFormProps) => {
  const {t, form, isLoading, error} = useRefundCaseForm({...props});
  const {handleClose} = props;
  form.initialValues.ticket = props.ticket;
  form.initialValues.card = props.card;
  form.initialValues.type = 'refund';
  form.initialValues.title = `Zwrot ${props.name}`;

  return (
    <div className="lg:w-lg w-full max-w-4xl px-8 py-10 md:px-11">
      <div className="pb-4">
        <h1 className="leading-lg pb-2 text-lg font-normal">
          {t('panel.cases.newForm.title')}
        </h1>
        <p className="text-gray text-base leading-6">
          {t('panel.cases.newForm.content')}
        </p>
        <FormMessage content={error} type="error" />
      </div>
      <Form {...{form}}>
        <div>
          <p>{t('caseType')}</p>
          <p className="text-gray pb-4">{t('refund')}</p>
          <p>{t('ticket')}</p>
          <p className="text-gray pb-4">{`${props.name}`}</p>
          <p className="mb-2">{t('caseTitle')}</p>
          <Input className="text-gray mb-4" name="title" />
        </div>
        <Textarea
          name="description"
          label="caseDescription"
          placeholder="typeCaseDescription"
        />
        <div className="flex-col py-2 md:flex md:flex-row md:items-center md:justify-between">
          <FileInput name="file" label="attachFiles" multiple={true} />
          <p className="text-gray text-base italic leading-6">
            {t('allowFormat')}
          </p>
        </div>
        <div className="uploaded-files-container">
          {form.values.file.map((soloFile: File) => (
            <FileItem
              key={soloFile.name}
              {...{item: soloFile, isRemovable: true, id: 'file'}}
            />
          ))}
        </div>
        <div className="flex justify-center gap-2.5 pt-10">
          <Button
            variant="secondary"
            type="button"
            handleClick={() => handleClose()}>
            {t('cancel')}
          </Button>
          <SubmitButton label="createCase" loading={isLoading} />
        </div>
      </Form>
    </div>
  );
};
