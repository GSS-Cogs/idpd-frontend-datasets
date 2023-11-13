import { redirect } from "next/navigation";

const shouldRedirect = (id: string) => {
  redirect(`/datasets/${id}`);
};

export default async function Page({ params }: { params: { id: string } }) {
  shouldRedirect(params.id);
  return <h1>Editions page: {params.id}/editions</h1>;
}
