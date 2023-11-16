import { useEffect, useRef, useState } from 'react';
import {
  Button,
  CloseButton,
  Divider,
  LoadingOverlay,
  Select,
  TextInput,
  Textarea,
  Title,
} from '@mantine/core';
import { IconCheck } from '@tabler/icons-react';
import { notifications } from '@mantine/notifications';
import { useForm, SubmitHandler, useController } from 'react-hook-form';
import { CreatePostDTO } from '@/types/dtos';
import { useRouter } from 'next/router';
import { Category, Subcategory } from '@/types/entities';
import { AnimatePresence, motion } from 'framer-motion';

type Inputs = {
  title: string;
  categoryName: string;
  subCategoryName: string;
  body?: string;
  contentUrl?: string;
};

type Props = {
  onDismiss: () => void;
  categories: Category[];
};

function CreatePostForm({ onDismiss, categories }: Props) {
  const {
    register,
    handleSubmit,
    formState: { isValid },
    control,
    setValue,
  } = useForm<Inputs>();

  const { field: selectedCategoryNameField } = useController({
    name: 'categoryName',
    control,
    rules: { required: true },
  });

  const { field: selectedSubCategoryNameField } = useController({
    name: 'subCategoryName',
    control,
    rules: { required: true },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const subCategorySelectRef = useRef(null);
  const categorySelectRef = useRef(null);

  const [categorySelectItems, setCategorySelectItems] = useState<
    SelectItemType[]
  >([]);

  const [subCategorySelectItems, setSubCategorySelectItems] = useState<
    SelectItemType[]
  >([]);

  const router = useRouter();

  useEffect(() => {
    const categorySelectItems = mapCategoriesToSelectData(categories);
    setCategorySelectItems(categorySelectItems);
  }, [categories]);

  const categorySelected = !!categories.find(
    (c) => c.name === selectedCategoryNameField.value
  );

  const handleCategoryChange = (newCategoryNameValue: string | null) => {
    const newCategory = categories.find((c) => c.name === newCategoryNameValue);
    selectedCategoryNameField.onChange(newCategoryNameValue);

    if (!newCategory) {
      setSubCategorySelectItems([]);
      setValue('subCategoryName', '');
      return;
    }

    const subCategoryItems = mapSubCategoriesToSelectData(
      newCategory.subcategories
    );
    setSubCategorySelectItems(subCategoryItems);
  };

  const handleSubCategoryChange = (newSubCategoryNameValue: string | null) => {
    selectedSubCategoryNameField.onChange(newSubCategoryNameValue);
  };

  const onSubmit: SubmitHandler<Inputs> = async ({
    title,
    body,
    subCategoryName,
    contentUrl,
  }) => {
    setIsSubmitting(true);

    const data: CreatePostDTO = {
      title: title.trim(),
      body: body?.trim(),
      url: contentUrl?.trim(),
    };

    try {
      const createdPost = await fetch('/api/posts/create', {
        method: 'POST',
        body: JSON.stringify({ subCategoryName, ...data }),
      });

      console.log('createdPost', createdPost.json());
      if (createdPost) {
        notifications.show({
          color: 'green',
          title: 'Your post is now live!',
          message: '',
          icon: <IconCheck size='1rem' />,
          autoClose: 4000,
        });

        // router.push(
        //   `/resources/${createdPost.categoryName}/${createdPost.subcategoryName}/posts/${createdPost.id}`
        // );
        // onDismiss();
      } else {
        notifications.show({
          message: 'Something went wrong, please try again.',
          color: 'red',
        });
      }
    } catch (error) {
      notifications.show({
        color: 'red',
        title: 'Error posting content',
        message: 'Please try again',
        icon: <IconCheck size='1rem' />,
        autoClose: 4000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='relative'>
      <LoadingOverlay
        transitionProps={{ duration: 100 }}
        loaderProps={{ size: 'lg' }}
        visible={isSubmitting}
      />
      <div className='flex items-center justify-between'>
        <CloseButton
          onClick={onDismiss}
          size={'xl'}
          iconSize={30}
          radius={'xl'}
          color='gray'
        />
        <Title order={3}>Submit a resource</Title>
        <p className='opacity-0'>next</p>
        {/* <Button type='submit' className='transition-all duration-300' radius={"xl"} disabled={!isValid}>
          POST
        </Button> */}
      </div>
      <div className='mt-5 space-y-5'>
        <div className='space-y-2'>
          <p className='text-base font-medium '>
            Which category does your resource belong to?
          </p>
          <Select
            label='Category'
            withAsterisk
            placeholder='Select a category'
            data={categorySelectItems}
            maxDropdownHeight={400}
            nothingFoundMessage='No categories found.'
            value={selectedCategoryNameField.value}
            // value={selectedCategoryName}
            onChange={handleCategoryChange}
            variant='filled'
            clearable
            required
            comboboxProps={{ returnFocus: true }}
            ref={categorySelectRef}
          />
        </div>

        <AnimatePresence>
          {categorySelected && (
            <motion.div
              initial={{ opacity: 0, y: -10, height: '0' }}
              animate={{
                opacity: 1,
                y: 0,
                height: 'auto',
              }}
              exit={{
                opacity: 0,
                y: -10,
                height: '0',
              }}
              transition={{ duration: 0.4, type: 'spring' }}
              key={'1'}
            >
              <Select
                label='Sub-category'
                withAsterisk
                // disabled={category}
                placeholder='Select sub-category'
                data={subCategorySelectItems}
                maxDropdownHeight={400}
                nothingFoundMessage='No sub-categories found.'
                limit={10} //for large data sets and optimising performance
                value={selectedSubCategoryNameField.value}
                // value={selectedSubCategoryName}
                onChange={handleSubCategoryChange}
                variant='filled'
                clearable
                required
                ref={subCategorySelectRef}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <div className='space-y-4'>
          <Divider mt={25} size={'md'} color='#d3d3d386' />

          <TextInput
            label='Title'
            withAsterisk
            placeholder='Enter title'
            variant='filled'
            {...register('title', { required: true })}
          />
        </div>

        <TextInput
          label='Link / URL'
          variant='filled'
          placeholder='https://google.com'
          {...register('contentUrl', { required: false })}
        />

        <Textarea
          variant='filled'
          label='Body'
          placeholder='Write something here...'
          rows={6}
          {...register('body')}
        />

        <Button
          type='submit'
          className='transition-all duration-300 '
          w={'100%'}
          color='#007A3D'
          radius={'xl'}
          disabled={!isValid}
        >
          POST
        </Button>
      </div>
    </form>
  );
}

function mapCategoriesToSelectData(categories: Category[]): SelectItemType[] {
  return categories.map((category): SelectItemType => {
    return {
      label: category.name,
      value: category.name,
    };
  });
}

function mapSubCategoriesToSelectData(
  subCategories: Subcategory[]
): SelectItemType[] {
  return subCategories.map((subCategory): SelectItemType => {
    return {
      label: subCategory.name,
      value: subCategory.name,
    };
  });
}

type SelectItemType = {
  label: string;
  value: string;
};

export default CreatePostForm;
