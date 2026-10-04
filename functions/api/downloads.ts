import { downloads, type PagesFunctionContext } from '../_shared/downloads';

interface DownloadCountRow {
  software_id: string;
  download_count: number;
}

export async function onRequestGet({ env }: PagesFunctionContext): Promise<Response> {
  if (!env.DOWNLOAD_COUNTS) {
    return Response.json(
      { error: 'Download counter binding DOWNLOAD_COUNTS is not configured.' },
      { status: 503 },
    );
  }

  try {
    const { results } = await env.DOWNLOAD_COUNTS
      .prepare('SELECT software_id, download_count FROM download_counts')
      .all<DownloadCountRow>();
    const storedCounts = new Map(results.map(({ software_id, download_count }) => [software_id, download_count]));

    return Response.json({
      counts: Object.fromEntries(downloads.map(({ id }) => [id, storedCounts.get(id) ?? 0])),
    }, {
      headers: { 'Cache-Control': 'no-store' },
    });
  } catch (error: unknown) {
    console.error('Unable to read download counts.', error);
    return Response.json({ error: 'Download counts are currently unavailable.' }, { status: 503 });
  }
}
