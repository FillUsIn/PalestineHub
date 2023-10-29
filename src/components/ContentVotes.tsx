import { IconArrowBigDown, IconArrowBigUp } from '@tabler/icons-react';
import { ReactNode } from 'react';

type Props = {
  voteCount: number;
};

function ContentVotes({ voteCount }: Props) {
  return (
    <Container>
      <div className='flex items-center rounded-full  '>
        {/* <ActionIcon radius={'xl'} size={'lg'} variant='subtle' onClick={() => {}}> */}
        <ArrowUp onClick={() => {}} />
        {/* </ActionIcon> */}

        <p className='mx-1.5 text-center text-sm font-bold '>{voteCount}</p>

        {/* <ActionIcon radius={'xl'} size={'lg'} variant='subtle' onClick={() => {}}> */}
        <ArrowDown onClick={() => {}} />
        {/* </ActionIcon> */}
      </div>
    </Container>
  );
}

function ArrowUp({
  active,
  onClick,
}: {
  active?: boolean;
  onClick: () => void;
}) {
  return (
    <>
      {/* <ActionIcon radius={'xl'} color='transparent' onClick={onClick}> */}
      {active ? (
        <IconArrowBigUp
          size='24'
          className='cursor-pointer'
          fill='green'
          stroke={0}
        />
      ) : (
        <IconArrowBigUp color='gray' size='22' className='cursor-pointer' />
      )}
      {/* </ActionIcon> */}
    </>
  );
}

function ArrowDown({
  active,
  onClick,
}: {
  active?: boolean;
  onClick: () => void;
}) {
  return (
    <>
      {/* <ActionIcon radius={'xl'} color='#eeeeee' onClick={onClick}> */}
      {active ? (
        <IconArrowBigDown
          size='24'
          className='cursor-pointer'
          fill='red'
          stroke={0}
        />
      ) : (
        <IconArrowBigDown color='gray' size='22' className='cursor-pointer' />
      )}
      {/* </ActionIcon> */}
    </>
  );
}

function Container({ children }: { children: ReactNode }) {
  return (
    <div className='bg-[#eeeeee] hover:bg-[#e2e2e2] rounded-full px-3 py-1.5 cursor-pointer'>
      {children}
    </div>
  );
}

export default ContentVotes;
