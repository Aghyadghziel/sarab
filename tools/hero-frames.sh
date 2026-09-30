#!/bin/bash
# Builds the hero scroll sequence from the two 4K Kling clips in raw/.
# push-in.mp4 (woman -> coat folds) is played backwards, so the page opens on cloth
# that reads as dunes and pulls back to the woman; pull-back.mp4 starts on that same
# master frame and carries on out to the wide shot.
# This ffmpeg has no WebP encoder, so frames leave it as PNG and cwebp packs them.
set -e
cd "$(dirname "$0")/.."
mkdir -p public/hero/d public/hero/m raw/seq-d raw/seq-m
rm -f public/hero/d/*.webp public/hero/m/*.webp raw/seq-d/*.png raw/seq-m/*.png

ffmpeg -v error -y -i raw/push-in.mp4 -i raw/pull-back.mp4 -filter_complex \
  "[0:v]reverse,scale=3840:2160,setsar=1[a];[1:v]trim=start_frame=1,setpts=PTS-STARTPTS,scale=3840:2160,setsar=1[b];[a][b]concat=n=2:v=1[c]" \
  -map "[c]" -c:v libx264 -crf 4 -preset slow -pix_fmt yuv420p raw/hero-full.mp4

# Desktop: every 2nd frame at the full 3840x2160, never resized.
ffmpeg -v error -y -i raw/hero-full.mp4 \
  -vf "select='not(mod(n\,2))'" \
  -fps_mode vfr raw/seq-d/%03d.png

# Phone: a 1:2 window (1080x2160 native 4K pixels, close to a phone screen) that follows
# the subject, never resized, so a phone draws it at or below its own size.
# FOCUS is the subject's x as a share of the width, measured on the frames; crop counts
# the frames after select, so n runs 0..120 and the master frame is n=60.
FOCUS=${FOCUS:-"if(lt(n\,30)\,0.40+0.09*n/30\,0.49+0.03*(n-30)/90)"}
ffmpeg -v error -y -i raw/hero-full.mp4 \
  -vf "select='not(mod(n\,2))',crop=1080:2160:'clip(($FOCUS)*3840-540\,0\,2760)':0" \
  -fps_mode vfr raw/seq-m/%03d.png

for set in d m; do
  for f in raw/seq-$set/*.png; do
    cwebp -quiet -q 84 -m 6 -sharp_yuv "$f" -o "public/hero/$set/$(basename "${f%.png}").webp"
  done
done
rm -rf raw/seq-d raw/seq-m

ls public/hero/d | wc -l
ls public/hero/m | wc -l
du -sh public/hero/d public/hero/m
