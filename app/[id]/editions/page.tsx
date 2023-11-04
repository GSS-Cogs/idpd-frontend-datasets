export default function Page({ params }: { params: { id: string } }) {
  return <h1>Editions page: {params.id}/editions</h1>;
}
