export default function Page({
  params,
}: {
  params: { id: string; editionId: string };
}) {
  return (
    <h1>
      Versions page: {params.id}/editions/{params.editionId}/versions
    </h1>
  );
}
