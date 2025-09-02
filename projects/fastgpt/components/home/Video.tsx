"use client";
import { useEffect, useState } from "react";
import { IoIosCloseCircle } from "react-icons/io";
import { IoPlay } from "react-icons/io5";


const VideoPlayer = ({
  dict,
  locale,
}: {
  dict: { video: { speed: string; normal: string, video: string, videoDark: string } };
  locale: any;
}) => {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    // 动态导入Plyr以避免SSR问题
    const loadPlyr = async () => {
      const Plyr = (await import("plyr")).default;
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
    };

    loadPlyr();
  }, [dict]);

  return (
    <>
      <div className="relative mb-12 mt-6 margin-120">
        <h5 className="text-center text-gradient">
          {locale.title}
        </h5>
        <div className="margin-top-40"></div>
        <img src={dict?.video?.video} style={{ objectFit: "contain", maxWidth: "100%", height: "auto" }} className="dark:hidden" />
        <img src={dict?.video?.videoDark} style={{ objectFit: "contain", maxWidth: "100%", height: "auto" }} className="dark:block hidden" />

        <div className="absolute z-1 top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%]  bg-[#7789B0] hover:bg-[#4B597A] rounded-full cursor-pointer p-1 md:p-2 lg:p-3" onClick={() => setOpen(true)}>
          <IoPlay className="text-xs md:text-xl lg:text-2xl xl:text-3xl" />
        </div>
      </div>

      <div style={{ display: open ? 'block' : 'none' }} className="fixed inset-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black/50" >
        <div className="relative top-[50%] mx-auto translate-y-[-50%]" >
          <div className="relative mx-auto w-3/4" id='player-container'>
            <button className="absolute right-0 top-0 z-20 pr-1 pt-1" onClick={() => setOpen(false)}>
              <IoIosCloseCircle fontSize={24} />
            </button>
            <video
              id="player"
              controls
              // autoPlay
              data-poster="/images/hero/zh/fastgpt-demo.jpg"
            >
              <source
                src="https://otnvvf-imgs.oss.laf.run/fastgpt.mp4"
                type="video/mp4"
              />
            </video>
          </div>
        </div>
      </div>
    </>
  );
};

export default VideoPlayer;

