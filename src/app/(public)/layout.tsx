import Footers from "@/components/Layout/Footers/Footers";
import Headers from "@/components/Layout/Headers/Headers";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const PublicLayout = async ({ children }: PublicLayout) => {
  const session = (await getServerSession(authOptions)) as any;

  if (session && session.accessToken) {
    return redirect("/");
  }

  return (
    <>
      <Headers />
      {children}
      <Footers />
    </>
  );
};
export default PublicLayout;

interface PublicLayout {
  children: React.ReactNode;
}
