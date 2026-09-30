#!/bin/bash
# Builds the hero scroll sequence from the two Kling clips in raw/.
# The push-in is played backwards (fabric -> woman), then the pull-back follows
# (woman -> wide), so both halves share the same master frame in the middle.
# This ffmpeg has no WebP encoder, so frames leave it as PNG and cwebp packs them.
set -e
cd "$(dirname "$0")/.."
mkdir -p public/hero/d public/hero/m raw/seq-d raw/seq-m
rm -f public/hero/d/*.webp public/hero/m/*.webp raw/seq-d/*.png raw/seq-m/*.png

ffmpeg -v error -y -i raw/push-in.mp4 -i raw/pull-back.mp4 -filter_complex \
  "[0:v]reverse[a];[1:v]trim=start_frame=1,setpts=PTS-STARTPTS[b];[a][b]concat=n=2:v=1[c]" \
  -map "[c]" -c:v libx264 -crf 12 -pix_fmt yuv420p raw/hero-full.mp4

# Desktop: every 2nd frame, 1600x900.
ffmpeg -v error -y -i raw/hero-full.mp4 \
  -vf "select='not(mod(n\,2))',scale=1600:900:flags=lanczos" \
  -fps_mode vfr raw/seq-d/%03d.png

# Phone: a 3:4 window that follows the subject.
# Focus x (share of the width): fabric 0.42 -> master frame 0.37 -> wide 0.50.
F="if(lt(n\,120)\,0.42-0.05*n/120\,0.37+0.13*(n-120)/120)"
ffmpeg -v error -y -i raw/hero-full.mp4 \
  -vf "select='not(mod(n\,2))',crop=810:1080:'clip(($F)*1920-405\,0\,1110)':0" \
  -fps_mode vfr raw/seq-m/%03d.png

for set in d m; do
  for f in raw/seq-$set/*.png; do
    cwebp -quiet -q 72 -m 6 "$f" -o "public/hero/$set/$(basename "${f%.png}").webp"
  done
done
rm -rf raw/seq-d raw/seq-m

ls public/hero/d | wc -l
ls public/hero/m | wc -l
du -sh public/hero/d public/hero/m
