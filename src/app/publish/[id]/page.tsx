import PublishPanel from "@/components/editor/PublishPanel";

export default async function PublishPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <div className='max-w-3xl mx-auto p-6'>
      <h1 className='text-2xl font-semibold'>Publish Portfolio</h1>
      <p className='text-slate-600 mt-2'>
        Configure the public URL and visibility for your portfolio.
      </p>
      <div className='mt-6'>
        <PublishPanel portfolioId={id} />
      </div>
    </div>
  );
}
