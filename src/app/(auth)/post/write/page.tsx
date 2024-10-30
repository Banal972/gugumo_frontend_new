import Form from '@/components/page/post/write/Form';
import { authOptions } from '@/lib/authOptions';
import Wrap from '@/ui/layout/Wrap';
import { getServerSession } from 'next-auth';

export default async function Write() {
  const session = (await getServerSession(authOptions)) as any;

  return (
    <main className="py-20 md:pb-36 md:pt-[90px]">
      <Wrap>
        <Form session={session} />
      </Wrap>
    </main>
  );
}
