import { useEffect, useState } from 'react';

type DownloadCounts = Record<string, number>;

interface DownloadCountsResponse {
  counts: DownloadCounts;
}

export function useDownloadCounts() {
  const [counts, setCounts] = useState<DownloadCounts>();
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let active = true;

    fetch('/api/downloads')
      .then(async (response) => {
        if (!response.ok) {
          throw new Error(`Download stats request failed (${response.status}).`);
        }
        return response.json() as Promise<DownloadCountsResponse>;
      })
      .then(({ counts: result }) => {
        if (active) setCounts(result);
      })
      .catch((error: unknown) => {
        console.error('Unable to load download counts.', error);
        if (active) setFailed(true);
      });

    return () => {
      active = false;
    };
  }, []);

  return { counts, failed };
}
