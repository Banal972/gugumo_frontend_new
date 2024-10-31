import get from '@/actions/meeting/detailActions';
import Form from '@/components/post/write/Form';
import authOptions from '@/lib/authOptions';
import Wrap from '@/ui/layout/Wrap';
import { getServerSession } from 'next-auth';

export default async function Edit({ params }: { params: { postid: string } }) {
  const session = (await getServerSession(authOptions)) as any;
  const { data: detail } = await get(params.postid);

  return (
    <main className="py-20 md:pb-36 md:pt-[90px]">
      <Wrap>
        <Form session={session} edit={detail} />
      </Wrap>
    </main>
  );
}
