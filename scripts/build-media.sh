#!/usr/bin/env bash
# Regenerates every optimized asset under public/media from the source files in
# public/. The site only ever references the outputs; the originals stay as the
# editable source of truth.
#
# Requires: ffmpeg (with libx264 + libvpx-vp9), cwebp.
# Optional: pyftsubset (pip install fonttools brotli) for the WOFF2 fonts.
#
#   ./scripts/build-media.sh          # everything
#   ./scripts/build-media.sh hero     # one group: hero | projects | backgrounds | fonts
set -euo pipefail
cd "$(dirname "$0")/.."

OUT=public/media
TMP=$(mktemp -d -t portfolio-media)
trap 'rm -rf "$TMP"' EXIT
FF="ffmpeg -y -hide_banner -loglevel error"

# ── Hero ──────────────────────────────────────────────────────────────────────
# The hero clip plays at 0.7x. Rather than asking the browser for playbackRate
# (which just repeats frames and judders), the slow-down is baked in with motion
# interpolation so the file plays back at a native, smooth 30fps. It sits under a
# 64% black tint on the page, so bitrate can be pushed very low without visible
# loss. Poster = exact first frame so the video can crossfade in seamlessly.
build_hero() {
  mkdir -p "$OUT/hero"
  local src=public/About-vid.mp4
  local mezz="$TMP/hero-mezz.mp4"
  $FF -i "$src" -an \
    -vf "setpts=PTS/0.7,minterpolate=fps=30:mi_mode=mci:mc_mode=aobmc:me_mode=bidir:vsbmc=1,scale=1280:720" \
    -c:v libx264 -crf 12 -preset fast -pix_fmt yuv420p "$mezz"

  # Light denoise: the ocean texture is what costs bits, and under the tint the
  # difference is invisible. Verified frame-by-frame against the mezzanine.
  local dn="hqdn3d=3:2:5:4"

  # H.264 — universal fallback
  $FF -i "$mezz" -an -vf "$dn" \
    -c:v libx264 -profile:v high -level 4.0 -crf 33 -preset slow -tune film \
    -g 60 -keyint_min 60 -sc_threshold 0 -pix_fmt yuv420p -movflags +faststart \
    "$OUT/hero/hero.mp4"

  # VP9 — preferred, roughly half the bytes; two-pass constrained quality
  local vp9="-c:v libvpx-vp9 -b:v 0 -crf 55 -deadline good -cpu-used 1 -row-mt 1 -tile-columns 2 -g 60 -pix_fmt yuv420p"
  $FF -i "$mezz" -an -vf "$dn" $vp9 -pass 1 -passlogfile "$TMP/hero" -f null /dev/null
  $FF -i "$mezz" -an -vf "$dn" $vp9 -pass 2 -passlogfile "$TMP/hero" "$OUT/hero/hero.webm"

  $FF -i "$OUT/hero/hero.mp4" -frames:v 1 -q:v 6 "$OUT/hero/poster.jpg"
}

# ── Project cards ─────────────────────────────────────────────────────────────
# Cards render at most ~600 CSS px wide, so 1200px covers 2x displays.
shot() { # src slug width
  cwebp -quiet -q 82 -resize "$3" 0 "$1" -o "$OUT/projects/$2.webp"
  $FF -i "$1" -vf "scale=$3:-2" -pix_fmt yuvj420p -q:v 4 "$OUT/projects/$2.jpg"
}
# Screen recordings: 30fps is plenty, VP9 excels at UI content.
clip() { # src slug
  $FF -i "$1" -an -vf "fps=30,scale=1280:-2" \
    -c:v libx264 -profile:v high -crf 30 -preset slow -pix_fmt yuv420p -movflags +faststart \
    "$OUT/projects/$2.mp4"
  local vp9="-c:v libvpx-vp9 -b:v 0 -crf 44 -deadline good -cpu-used 1 -row-mt 1 -g 60 -pix_fmt yuv420p"
  $FF -i "$1" -an -vf "fps=30,scale=1280:-2" $vp9 -pass 1 -passlogfile "$TMP/$2" -f null /dev/null
  $FF -i "$1" -an -vf "fps=30,scale=1280:-2" $vp9 -pass 2 -passlogfile "$TMP/$2" "$OUT/projects/$2.webm"
  # VP9 does not always beat H.264 on short UI recordings; only keep it when it
  # is at least 10% smaller, and list `webm: false` for that clip in
  # src/data/projects.js.
  local mp4_size webm_size
  mp4_size=$(stat -f%z "$OUT/projects/$2.mp4"); webm_size=$(stat -f%z "$OUT/projects/$2.webm")
  if (( webm_size * 10 > mp4_size * 9 )); then
    echo "  $2: webm ($webm_size) not smaller than mp4 ($mp4_size) — dropping webm"
    rm -f "$OUT/projects/$2.webm"
  fi
  $FF -i "$OUT/projects/$2.mp4" -frames:v 1 "$TMP/$2-poster.png"
  shot "$TMP/$2-poster.png" "$2-poster" 1200
}
build_projects() {
  mkdir -p "$OUT/projects"
  shot public/Atlantic-companies.png atlantic 1200
  shot public/Flick-Findy.png        flickfinda 1200
  shot public/Mandel.png             mandel 1200
  shot public/Luma-Valen.png         lumavalen 1200
  shot public/Foyer.png              foyer 1200
  # TrinNav's screens came from a screen recording: paint the red recording dot
  # in the Dynamic Island back to black before they go into the phone frames.
  $FF -i public/Trinav.png -vf "format=rgb24,drawbox=x=139:y=22:w=20:h=19:color=black:t=fill" "$TMP/trinnav.png"
  $FF -i public/Trinav-360.jpg -vf "format=rgb24,drawbox=x=279:y=43:w=35:h=35:color=black:t=fill" "$TMP/trinnav-360.png"
  shot "$TMP/trinnav.png"     trinnav 447
  shot "$TMP/trinnav-360.png" trinnav-360 447
  # The app card sits on its own campus map, blurred into navy.
  $FF -i public/Trinav.png \
    -vf "crop=360:700:50:170,scale=1200:-2,crop=1200:600:0:(ih-600)/2,gblur=sigma=48:steps=4,eq=saturation=0.6:brightness=-0.1,colorchannelmixer=rr=0.26:gg=0.33:bb=0.55" \
    "$TMP/trinnav-bg.png"
  shot "$TMP/trinnav-bg.png" trinnav-bg 800
  clip public/CFAS-Hero.mp4 cfas
  clip public/Connie.mp4    gpp
  clip public/Drake.mp4     drakesites
}

# ── Section backgrounds ───────────────────────────────────────────────────────
# The blur / brightness / saturation the site used to apply with CSS filters is
# baked into the pixels here, so the browser never rasterizes a filter at runtime.
build_backgrounds() {
  mkdir -p "$OUT/backgrounds"
  $FF -i public/Trin.jpg \
    -vf "gblur=sigma=1.6,eq=saturation=0.12,lutrgb=r=val*0.22:g=val*0.22:b=val*0.22" \
    -pix_fmt yuvj420p -q:v 5 "$TMP/trinity.png"
  cwebp -quiet -q 78 "$TMP/trinity.png" -o "$OUT/backgrounds/trinity.webp"
  $FF -i "$TMP/trinity.png" -pix_fmt yuvj420p -q:v 5 "$OUT/backgrounds/trinity.jpg"

  $FF -i public/topography.jpg -vf "gblur=sigma=0.5,eq=contrast=1.1" "$TMP/topography.png"
  cwebp -quiet -q 80 "$TMP/topography.png" -o "$OUT/backgrounds/topography.webp"
  $FF -i "$TMP/topography.png" -pix_fmt yuvj420p -q:v 5 "$OUT/backgrounds/topography.jpg"
}

# ── Fonts ─────────────────────────────────────────────────────────────────────
# DM Serif Text is the only display face the site uses. Subset to Latin and
# pack as WOFF2: ~74KB TTF -> ~15KB per face.
build_fonts() {
  if ! command -v pyftsubset >/dev/null 2>&1; then
    echo "pyftsubset not found — skipping fonts (pip install fonttools brotli)"; return
  fi
  mkdir -p public/fonts
  local dir="public/DM_Serif_Text,Gloock/DM_Serif_Text"
  local uni="U+0020-007E,U+00A0-00FF,U+2010-2027,U+2030-205E,U+20AC,U+2122"
  pyftsubset "$dir/DMSerifText-Regular.ttf" --unicodes="$uni" --layout-features='*' --flavor=woff2 --output-file=public/fonts/DMSerifText-Regular.woff2
  pyftsubset "$dir/DMSerifText-Italic.ttf"  --unicodes="$uni" --layout-features='*' --flavor=woff2 --output-file=public/fonts/DMSerifText-Italic.woff2
}

case "${1:-all}" in
  hero)        build_hero ;;
  projects)    build_projects ;;
  backgrounds) build_backgrounds ;;
  fonts)       build_fonts ;;
  all)         build_hero; build_projects; build_backgrounds; build_fonts ;;
  *) echo "unknown group: $1"; exit 1 ;;
esac
echo "done: $(du -sh "$OUT" | cut -f1) in $OUT"
