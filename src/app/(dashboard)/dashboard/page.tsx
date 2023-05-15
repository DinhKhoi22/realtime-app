import { getServerSession } from 'next-auth';
import Button from '~/components/ui/Button';
import { authOptions } from '~/lib/auth';

const page= async ({}) => {
    const session = await getServerSession(authOptions)

 return <Button>Hello</Button>
}

export default page