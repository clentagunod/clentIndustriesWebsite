CREATE TABLE download_counts (
  software_id TEXT PRIMARY KEY,
  download_count INTEGER NOT NULL DEFAULT 0 CHECK (download_count >= 0),
  last_download_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
) WITHOUT ROWID;
