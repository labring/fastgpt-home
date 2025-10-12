"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";

const INTER_TIP = 'inter-tip'

const InterModal = ({
  locale,
}: {
  locale: { desc: string; tip: string, button: string, link: string };
}) => {
  const [open, setOpen] = useState(false)

  const handelNeverTip = useCallback(() => {
    localStorage.setItem(INTER_TIP, 'false');
    setOpen(false)
  }, [])

  useEffect(() => {
    const isShowTip = localStorage.getItem(INTER_TIP);
    setOpen(isShowTip !== 'false')
  }, [])


  return <div style={{ display: open ? 'block' : 'none' }} className="fixed inset-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black/20 " >
    <div className="fixed bottom-0 h-[108px] w-full bg-[#E7EEFD] dark:bg-[#232B43] flex gap-3 justify-between items-center px-6 sm:px-12 text-xs sm:text-base  text-black dark:text-white font-medium" >
      <div className="">
        <div>{locale?.desc}</div>
        <div className="mt-1 text-blue-700 dark:text-blue-300 underline decoration-solid cursor-pointer" onClick={handelNeverTip}>
          {locale?.tip}</div>
      </div>

      <Link href={locale.link}>
        <Button className="px-3 sm:px-5" onClick={handelNeverTip}>
          {locale.button}
        </Button>
      </Link>


      <button className="absolute right-0 top-0 z-20 pr-1 pt-1" onClick={() => setOpen(false)}>
        <IoClose fontSize={18} />
      </button>
    </div>
  </div>
}

export default InterModal;