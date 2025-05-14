#!/usr/bin/env bash
# create-snapshot.sh  (run from the repository root)

ts=$(date +%Y%m%d%H%M)
commit=$(git rev-parse --short HEAD)
out="llm-context-${ts}-${commit}.md"

# Header
{
  echo "# Snapshot of llm-context"
  echo "_Commit_: ${commit}"
  echo "_Timestamp_: ${ts}"
} > "$out"

# Concatenate all tracked *.md files in llm-context/
git ls-tree --name-only -r HEAD llm-context -- '*.md' |
while read -r file; do
  {
    echo -e "\n\n---\n## $file\n"
    git show HEAD:"$file"
  } >> "$out"
done

echo "Created $out"
