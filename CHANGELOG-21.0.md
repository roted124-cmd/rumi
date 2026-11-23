# RUMI 21.0

- Added versioned learning-only backup export in JSON.
- Added guarded restore with file-size checks, schema validation, known mission/word IDs, bounded counters and confirmation before replacing progress.
- Backup intentionally excludes parent PIN, AI endpoint and chat history.
- Added parent-controlled daily review goal (3, 5, 7 or 10 cards).
- Added automated Node tests for backup privacy, valid restore and malformed input rejection.
- Updated Android versionCode/versionName and app branding to 21.0.
