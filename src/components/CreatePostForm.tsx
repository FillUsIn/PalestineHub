import { forwardRef, useEffect, useState } from "react";
import {
  Avatar,
  Button,
  CloseButton,
  Group,
  LoadingOverlay,
  Select,
  Text,
  TextInput,
  Textarea,
  Title,
} from "@mantine/core";
import { IconBrandReddit, IconCheck } from "@tabler/icons-react";
import { Constants } from "@/lib/constants";
import { notifications } from "@mantine/notifications";
import { addArtificialDelay } from "@/lib/utils/network";
import { useForm, SubmitHandler, useController } from "react-hook-form";
import { CreatePostDTO } from "@/types/dtos";
import { createSubcategoryPost } from "@/api/posts";
import { useRouter } from "next/router";

type Inputs = {
  title: string;
  subcategoryName: string;
  body?: string;
  contentUrl?: string;
};

type Props = {
  onDismiss: () => void;
  subcategoryName?: string;
};

function CreatePostForm({ subcategoryName, onDismiss }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    control,
    setValue,
  } = useForm<Inputs>();

  const { field: selectedSubCategoryNameField } = useController({
    name: "subcategoryName",
    control,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit: SubmitHandler<Inputs> = async ({
    title,
    body,
    subcategoryName,
    contentUrl,
  }) => {
    setIsSubmitting(true);

    const createPostDTO: CreatePostDTO = {
      title: title.trim(),
      body: body?.trim(),
      username: "ahmad",
      url: contentUrl,
    };

    try {
      const createdPost = await createSubcategoryPost(
        subcategoryName,
        createPostDTO
      );
      await addArtificialDelay(1);

      if (createdPost) {
        notifications.show({
          color: "green",
          title: "Your post is now live!",
          message: "",
          icon: <IconCheck size='1rem' />,
          autoClose: 4000,
        });
        router.push(`/posts/${createdPost.id}`);
      } else {
        notifications.show({
          message: "Something went wrong, please try again.",
          color: "red",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const [selectData, setSelectData] = useState<SelectItemType[]>([
    { label: "test", description: "test2", value: "123" },
  ]);

  const router = useRouter();

  useEffect(() => {
    if (subcategoryName) {
      setValue("subcategoryName", subcategoryName);
    }
  }, [subcategoryName, setValue]);

  // const mapCommunitiesToSelectData = (communities: Community[]): SelectItemType[] => {
  //   return communities.map((community): SelectItemType => {
  //     return {
  //       label: Constants.PREFIX_COMMUNITY + community.name,
  //       description: community.description,
  //       value: community.name,
  //     };
  //   });
  // };

  const handleSelectChange = (newValue: string | null) => {
    selectedSubCategoryNameField.onChange(newValue);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='relative'>
      <LoadingOverlay
        transitionProps={{ duration: 100 }}
        loaderProps={{ size: "lg" }}
        visible={isSubmitting}
      />
      <div className='flex items-center justify-between'>
        <CloseButton
          onClick={onDismiss}
          size={"xl"}
          iconSize={30}
          radius={"xl"}
          color='gray'
        />
        <Title order={3}>Submit a resource</Title>
        <p className='opacity-0'>next</p>
        {/* <Button type='submit' className='transition-all duration-300' radius={"xl"} disabled={!isValid}>
          POST
        </Button> */}
      </div>
      <div className='mt-5 space-y-5'>
        <Select
          label='Sub-category'
          withAsterisk
          disabled={subcategoryName != null}
          placeholder='Select subcategory'
          //@ts-ignore
          itemComponent={SelectItem}
          data={selectData}
          searchable
          maxDropdownHeight={400}
          nothingFound='No communities found'
          // filter={(value, item) =>
          //   item?.label?.toLowerCase().includes(value.toLowerCase().trim()) ||
          //   item.description.toLowerCase().includes(value.toLowerCase().trim())
          // }
          value={selectedSubCategoryNameField.value}
          onChange={handleSelectChange}
        />

        <TextInput
          label='Title'
          withAsterisk
          placeholder='Enter title'
          variant='filled'
          {...register("title", { required: true })}
        />

        <TextInput
          label='Link / URL'
          variant='filled'
          placeholder='https://google.com'
          {...register("contentUrl", { required: false })}
        />

        <Textarea
          variant='filled'
          label='Body'
          placeholder='Write something here...'
          rows={6}
          {...register("body")}
        />

        <Button
          type='submit'
          className='transition-all duration-300'
          w={"100%"}
          color='dark'
          radius={"xl"}
          disabled={!isValid}
        >
          POST
        </Button>
      </div>
    </form>
  );
}

const SelectItem = forwardRef<HTMLDivElement, ItemProps>(
  ({ label, description, ...others }: ItemProps, ref) => (
    <div ref={ref} key={label} {...others}>
      <Group wrap='nowrap'>
        <Avatar size='lg' radius='xl' color='cyan'>
          <IconBrandReddit size='40' />
        </Avatar>

        <div>
          <Text size='md' className='font-semibold'>
            {label}
          </Text>
          <Text size='xs' className='font-medium' opacity={0.65}>
            {description}
          </Text>
        </div>
      </Group>
    </div>
  )
);

SelectItem.displayName = "SelectItem";

type SelectItemType = {
  label: string;
  value: string;
  description: string;
};

interface ItemProps extends React.ComponentPropsWithoutRef<"div"> {
  image: string;
  label: string;
  description: string;
}

export default CreatePostForm;
