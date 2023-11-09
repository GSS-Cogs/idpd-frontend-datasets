export default function Page({
  params,
}: {
  params: { id: string; editionId: string };
}) {
  return (
    <h1>
      Edition page: {params.id}/editions/{params.editionId}
    </h1>
  );
}
