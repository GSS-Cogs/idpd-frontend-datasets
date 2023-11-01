export default function Page({ params }: { params: { id: string } }) {
  return <h1>Datasets page: {params.id}</h1>;
}
