"use client";
import { useEffect } from "react";

const VideoPlayer = ({
  dict,
}: {
  dict: { video: { speed: string; normal: string } };
}) => {
  useEffect(() => {
    const Plyr = require("plyr");
    const player = new Plyr("#player", {
      i18n: {
        speed: dict?.video.speed,
        normal: dict?.video.normal,
      },
      controls: [
        "play-large",
        "restart",
        "rewind",
        "play",
        "fast-forward",
        "progress",
        "current-time",
        "duration",
        "mute",
        "volume",
        "captions",
        "settings",
        "pip",
        "airplay",
        // 'download',
        "fullscreen",
      ],
    });
    const show = () => {
      player.toggleControls(true);
    };
    const hiden = () => {
      player.toggleControls(false);
    };
    player.on("ready", (e: any) => {
      player.toggleControls(false);
      const playerContainer = document.getElementById("player-container");
      if (!playerContainer) return;
      playerContainer.addEventListener("mouseenter", show);
      playerContainer.addEventListener("mouseleave", hiden);
    });

    return () => {
      const playerContainer = document.getElementById("player-container");
      if (!playerContainer) return;
      playerContainer.removeEventListener("mouseenter", show);
      playerContainer.removeEventListener("mouseleave", hiden);
    };
  }, [dict]);

  return (
    <div
      id="player-container"
      className="mx-auto mb-12 max-w-[88%] 2xl:max-w-7xl mt-6 md:mt-20 text-center h-[200px] md:h-[450px] lg:h-[600px] xl:h-[750px] 2xl:h-[850px]"
    >
      <div className="rounded-lg overflow-hidden">
        <video
          id="player"
          playsInline
          controls
          data-poster="/images/hero/zh/fastgpt-demo.jpg"
        >
          <source
            src="https://otnvvf-imgs.oss.laf.run/fastgpt.mp4"
            type="video/mp4"
          />
        </video>
      </div>
    </div>

  );
};

export default VideoPlayer;

