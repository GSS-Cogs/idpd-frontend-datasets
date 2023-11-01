export default function Page({
  params,
}: {
  params: { id: string; editionId: string; versionId: string };
}) {
  return (
    <h1>
      Version page: {params.id}/editions/{params.editionId}/versions/
      {params.versionId}
    </h1>
  );
}
