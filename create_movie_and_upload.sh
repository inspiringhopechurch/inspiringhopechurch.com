#! /bin/sh

VIDEO_FILE=$1
INTRO_FILE=intro.24.mp4
OUTRO_FILE=outro.24.mp4
FADE1=temp.mp4
DESTINATION_FILE=~/Source/inspiringhopechurch.com/static/assets/${VIDEO_FILE}

# yuv420P format makes videos easible playable in QuickTime and other players.
# acrossfade ensures audio from video is included when crossfading

ffmpeg -i ${INTRO_FILE} -i ${VIDEO_FILE} -video_track_timescale 90000 -filter_complex "xfade=transition=fade:offset=2:duration=1,format=yuv420p;acrossfade=duration=1" ${FADE1}

echo "First conversion done. Calculating $FADE1 duration...\n\n"
FADE_VID_DURATION=`ffprobe -i ${FADE1} -show_entries format=duration -v quiet -of csv="p=0"`
WHOLE_NO_DURATION="${FADE_VID_DURATION%%.*}"
FADE_OFFSET=$((WHOLE_NO_DURATION - 1))
echo "Duration is ${WHOLE_NO_DURATION}, offset is ${FADE_OFFSET}\n\n"

ffmpeg -i ${FADE1} -i ${OUTRO_FILE} -filter_complex "xfade=transition=fade:offset=${FADE_OFFSET}:duration=1,format=yuv420p;acrossfade=duration=1" ${DESTINATION_FILE}
echo "Second conversion done. Cleaning up!\n\n"
rm ${FADE1}

s3cmd sync ${DESTINATION_FILE} s3://ihc-video-storage/assets/ -P
