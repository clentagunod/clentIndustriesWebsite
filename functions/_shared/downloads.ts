import { downloads } from '../../src/data/downloads';

export interface D1PreparedStatement {
  bind(...values: (number | string)[]): D1PreparedStatement;
  all<Row>(): Promise<{ results: Row[] }>;
  run(): Promise<unknown>;
}

export interface D1Database {
  prepare(query: string): D1PreparedStatement;
}

export interface PagesFunctionContext {
  request: Request;
  env: {
    DOWNLOAD_COUNTS?: D1Database;
  };
  params: Record<string, string | string[]>;
}

export async function recordDownloadStart(
  env: PagesFunctionContext['env'],
  softwareId: string,
): Promise<boolean> {
  if (!env.DOWNLOAD_COUNTS) {
    console.error('Download counter binding DOWNLOAD_COUNTS is not configured.');
    return false;
  }

  try {
    await env.DOWNLOAD_COUNTS
      .prepare(
        `INSERT INTO download_counts (software_id, download_count, last_download_at)
         VALUES (?1, 1, CURRENT_TIMESTAMP)
         ON CONFLICT(software_id) DO UPDATE SET
           download_count = download_counts.download_count + 1,
           last_download_at = CURRENT_TIMESTAMP`,
      )
      .bind(softwareId)
      .run();
    return true;
  } catch (error: unknown) {
    console.error(`Unable to record download start for "${softwareId}".`, error);
    return false;
  }
}

export { downloads };
