import { Avatar, Box } from "@mantine/core";
import { IconBrandReddit } from "@tabler/icons-react";
import { since } from "@/lib/utils/date-time";
import { PostSummaryDTO } from "@/types";
import Link from "next/link";
import ContentInteractions from "./ContentInteractions";
// import ContentInteractions from "@/features/shared/components/ContentInteractions";

type Props = {
  post: PostSummaryDTO;
};

function PostSummaryItem({ post }: Props) {
  const formattedDate = since(post.createdDate);

  return (
    <Link href={`/posts/${post.id}`}>
      <Box className='px-6 py-4 cursor-pointer sm:rounded-md border-2 border-gray-100  hover:bg-gray-100 transition-all'>
        <div className='flex items-center'>
          <p className='font-semibold text-sm'>
            {post.authorUsername}
            <span className='text-xs font-semibold text-gray-400'>
              <span className='mx-1'>·</span>
              <span>{formattedDate}</span>
            </span>
          </p>
        </div>
        <p className='font-semibold text-xl mt-2'>{post.title}</p>
        <p className='whitespace-pre-line mt-8 mb-2 break-words'>{post.body?.substring(0, 200)}...</p>

        {/* <ContentInteractions
          voteCount={post.voteCount}
          commentCount={post.commentCount}
          showOptions={false}
          onOptionsClicked={() => {}}
        /> */}
      </Box>
    </Link>
  );
}

export default PostSummaryItem;
