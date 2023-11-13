import { redirect } from "next/navigation";

const shouldRedirect = (id: string) => {
  redirect(`/datasets/${id}`);
};

export default function Page({
  params,
}: {
  params: { id: string; editionId: string };
}) {
  shouldRedirect(params.id);
  return (
    <h1>
      Edition page: {params.id}/editions/{params.editionId}
    </h1>
  );
}
