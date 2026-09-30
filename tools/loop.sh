#!/bin/bash
# Turns a 4K Kling wind loop into the clip that plays over a collection card.
#   tools/loop.sh <id> <source.mp4> [focus-x]
# The card is 3:4. A landscape source is cropped to 3:4 around focus-x (share of the
# width, the same crop as the still in public/img); a portrait source is used whole.
# Output: public/loops/<id>.mp4, 1080x1440 H.264 (sharp at a card's size on a 3x phone)
# plus public/loops/<id>.jpg, its first frame, to check against the still.
set -e
cd "$(dirname "$0")/.."
id=$1; src=$2; fx=${3:-0.5}
mkdir -p public/loops
IFS=, read w h < <(ffprobe -v error -select_streams v:0 -show_entries stream=width,height -of csv=p=0 "$src")
if [ "$w" -gt "$h" ]; then
  cw=$(( h * 3 / 4 ))
  x=$(python3 -c "print(max(0, min($w - $cw, round($fx * $w - $cw / 2))))")
  crop="crop=$cw:$h:$x:0,"
else
  crop=""
fi
ffmpeg -v error -y -i "$src" -an \
  -vf "${crop}scale=1080:1440:flags=lanczos,setsar=1,format=yuv420p" \
  -c:v libx264 -preset slow -crf 20 -profile:v high -movflags +faststart \
  "public/loops/$id.mp4"
ffmpeg -v error -y -i "public/loops/$id.mp4" -frames:v 1 "public/loops/$id.jpg"
ls -la "public/loops/$id.mp4"
