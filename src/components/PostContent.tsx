import { Post } from "@/types/entities";
import { Avatar } from "@mantine/core";
import { since } from "@/lib/utils/date-time";
import { Constants } from "@/lib/constants";
import Link from "next/link";
import ContentInteractions from "./ContentInteractions";

function PostContent({ post, onOptionsClicked }: { post: Post; onOptionsClicked: () => void }) {
  return (
    <div className=''>
      <div className='flex items-center gap-2'>
        <div className=''>
          <Link href='#'>
            <p className='font-semibold'>test</p>
          </Link>

          <p className='text-[.8rem] font-semibold text-gray-500'>
            test
            <span>
              <span className='mx-1'>·</span>
              <span>{since(post.createdAt)}</span>
            </span>
          </p>
        </div>
      </div>
      <h1 className='font-semibold text-2xl mt-4'>{post.title}</h1>
      {post.body && <p className='mt-10 whitespace-pre-line break-words'>{post.body}</p>}
      <ContentInteractions
        voteCount={post.voteCount}
        commentCount={0}
        className='mt-5'
        onOptionsClicked={onOptionsClicked}
      />
    </div>
  );
}

export default PostContent;
