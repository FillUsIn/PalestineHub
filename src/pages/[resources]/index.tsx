import CreatePostForm from "@/components/CreatePostForm";
import PostSummaryItemList from "@/components/PostSummaryItemList";
import TopPost from "@/components/TopPost";
import { PostSummaryDTO } from "@/types/dtos";
import {
  Anchor,
  Breadcrumbs,
  Button,
  Divider,
  Modal,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import React from "react";

type Props = {};

function Resources({}: Props) {
  const [opened, { close, open }] = useDisclosure(false);
  const items = [
    { title: "Education", href: "#" },
    { title: "documentaries", href: "#" },
  ].map((item, index) => (
    <Anchor href={item.href} key={index}>
      {item.title}
    </Anchor>
  ));

  const postSummaries: PostSummaryDTO[] = [
    {
      title: "test title",
      imageUrl: "/top-video.jpeg",
      body: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odio, est!",
      username: "yaseen",
      createdDate: "2021-09-22T14:30:45",
      id: "123",
      voteCount: 3,
      commentCount: 43,
    },
    {
      title: "another title",
      imageUrl: "/top-video.jpeg",
      body: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odio, est!",
      username: "mohammed",
      createdDate: "2021-09-22T14:30:45",
      id: "456",
      voteCount: 21,
      commentCount: 3,
    },
    {
      title: "last title",
      imageUrl: "/child.jpeg",
      body: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odio, est!",
      username: "abdullah",
      createdDate: "2021-09-22T14:30:45",
      id: "789",
      voteCount: -5,
      commentCount: 2,
    },
  ];
  return (
    <>
      <Modal
        classNames={{ body: "md:mx-5" }}
        opened={opened}
        onClose={close}
        centered
        withCloseButton={false}
      >
        <CreatePostForm subcategoryName={"UK"} onDismiss={close} />
      </Modal>
      <div className='flex flex-col  justify-between md:flex-row '>
        <Breadcrumbs
          styles={{
            breadcrumb: { color: "black", fontWeight: "700" },
            separator: { fontWeight: "800" },
          }}
        >
          {items}
        </Breadcrumbs>
        <Button
          onClick={open}
          fw={"bolder"}
          radius='lg'
          color='dark'
          size='sm'
          className='mt-5 md:mt-0'
        >
          Submit a post
        </Button>
      </div>

      <Title order={2} mt={30}>
        Top 3 posts
      </Title>

      <div className='mt-5 justify-between space-y-4 md:flex md:gap-5 md:space-y-0'>
        <TopPost postSummary={postSummaries[0]} />
        <TopPost postSummary={postSummaries[1]} />
        <TopPost postSummary={postSummaries[2]} />
      </div>

      <Divider className='my-5' size={"xl"} />

      <PostSummaryItemList posts={postSummaries} />

      {/* <SideBar /> */}
    </>
  );
}

export default Resources;
