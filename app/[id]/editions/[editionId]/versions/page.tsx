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
      Versions page: {params.id}/editions/{params.editionId}/versions
    </h1>
  );
}
