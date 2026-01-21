import CustomSubscribeImageSelectModal from '@/components/modal/custom-subscribe-image-select-modal';
import { Button } from '@/components/ui/button';
import ErrorMessage from '@/components/ui/error-message';
import FieldWrapper from '@/components/ui/field-wrapper';
import useAddCustomSubscribeMutate from '@/hooks/mutations/use-add-custom-subscribe-mutate';
import useGetSubscribeTypes from '@/hooks/queries/use-get-subscribe-types';
import { cn } from '@/lib/utils';
import type { AddCustomSubscribeReq } from '@/types/subscribe';
import { ChevronUp, Plus } from 'lucide-react';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Picker from 'react-mobile-picker';

type SelectTypeState = {
  subscribeType: string;
};

function AddCustomSubscribePage() {
  const [selectImage, setSelectImage] = useState<string | null>(null);
  const [openImageModal, setOpenImageModal] = useState(false);
  const [openPicker, setOpenPicker] = useState(false);
  const [selectType, setSelectType] = useState<SelectTypeState>({
    subscribeType: 'OTT',
  });

  const form = useForm<AddCustomSubscribeReq>({
    mode: 'all',
    defaultValues: {
      type: 'OTT',
      name: '',
      image: null,
    },
  });

  const { data: types } = useGetSubscribeTypes();

  const { mutate: addCustomSubscribe, isPending: isAddCustomSubscribePending } =
    useAddCustomSubscribeMutate();

  const onSubmit = (formData: AddCustomSubscribeReq) => {
    addCustomSubscribe(formData);
  };

  return (
    <div className="flex h-full flex-col justify-between">
      <p className="mr-auto mb-5 w-[50%] text-xl/relaxed font-semibold break-keep">
        구독 서비스를 추가하시겠어요?
      </p>

      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-1 flex-col gap-4"
        id="add-custom-subscribe"
      >
        <Controller
          name="image"
          control={form.control}
          render={() => (
            <>
              <div
                onClick={() => setOpenImageModal(true)}
                className="bg-box-black flex size-25 items-center justify-center overflow-hidden rounded-xl"
              >
                {selectImage && (
                  <img src={selectImage} className="aspect-square" />
                )}
                {!selectImage && <Plus strokeWidth={2} className="size-10" />}
              </div>
              <CustomSubscribeImageSelectModal
                open={openImageModal}
                onClose={() => setOpenImageModal(false)}
                onSelect={(file) => {
                  if (selectImage) {
                    URL.revokeObjectURL(selectImage);
                  }
                  setSelectImage(URL.createObjectURL(file));
                  setOpenImageModal(false);
                  form.setValue('image', file);
                }}
              />
            </>
          )}
        />

        <Controller
          name="type"
          control={form.control}
          render={({ field }) => (
            <FieldWrapper label="서비스 타입" id="type">
              <div className="w-full">
                <div
                  className="flex cursor-pointer items-center justify-between"
                  onClick={() => setOpenPicker((prev) => !prev)}
                >
                  <span className="text-lg">{field.value}</span>
                  <ChevronUp
                    className={cn(
                      'transition-all',
                      openPicker ? '' : 'rotate-180',
                    )}
                  />
                </div>

                <div
                  className={cn(
                    openPicker
                      ? 'border-background-black mt-2 border-t pt-2'
                      : '',
                    'w-full',
                  )}
                >
                  <Picker
                    height={openPicker ? 100 : 0}
                    wheelMode="natural"
                    value={selectType}
                    onChange={(nextValue) => {
                      setSelectType(nextValue);
                      field.onChange(nextValue.subscribeType);
                    }}
                    className="[&>div:last-child]:bg-background-black transition-all [&>div:last-child]:rounded-lg [&>div:last-child>div]:hidden"
                  >
                    <Picker.Column name="subscribeType" className="z-10">
                      {types?.map((type) => (
                        <Picker.Item value={type} key={type}>
                          {({ selected }) => (
                            <div
                              className={cn(
                                selected ? 'text-white' : 'text-sub-font-black',
                              )}
                            >
                              {type}
                            </div>
                          )}
                        </Picker.Item>
                      ))}
                    </Picker.Column>
                  </Picker>
                </div>
              </div>
            </FieldWrapper>
          )}
        />

        <Controller
          name="name"
          control={form.control}
          rules={{
            validate: (v) =>
              v.trim().length > 0 || '서비스 이름은 최소 1글자 이상입니다.',
            required: {
              value: true,
              message: '서비스 이름을 입력해주세요',
            },
            maxLength: {
              value: 10,
              message: '서비스 이름은 최대 10글자 입니다',
            },
            minLength: {
              value: 1,
              message: '서비스 이름은 최소 1글자 이상입니다',
            },
          }}
          render={({ field, fieldState }) => {
            return (
              <div>
                <FieldWrapper
                  error={!!fieldState.error}
                  label="서비스 이름"
                  id="name"
                  className="mb-2"
                >
                  <input
                    className="bg-box-black w-full text-lg outline-none"
                    placeholder="어떤 서비스를 등록할까요?"
                    {...field}
                    onFocus={() => {
                      if (fieldState.error) {
                        form.clearErrors('name');
                      }
                    }}
                  />
                </FieldWrapper>
                {fieldState.error && (
                  <ErrorMessage message={fieldState.error!.message!} />
                )}
              </div>
            );
          }}
        />
      </form>

      <Button
        form="add-custom-subscribe"
        className="w-full"
        disabled={!form.formState.isValid || isAddCustomSubscribePending}
      >
        저장하기
      </Button>
    </div>
  );
}

export default AddCustomSubscribePage;
