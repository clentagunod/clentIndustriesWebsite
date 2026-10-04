import { downloads, recordDownloadStart, type PagesFunctionContext } from '../../_shared/downloads';

export async function onRequestPost({ env, params }: PagesFunctionContext): Promise<Response> {
  const id = params.id;
  const item = typeof id === 'string'
    ? downloads.find((download) => download.id === id && download.available)
    : undefined;

  if (!item) {
    return Response.json({ error: 'Download not found.' }, { status: 404 });
  }

  if (!await recordDownloadStart(env, item.id)) {
    return Response.json({ error: 'Unable to record this download start.' }, { status: 503 });
  }

  return new Response(null, { status: 204 });
}
