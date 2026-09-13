import { List as ListIcon } from 'lucide-react';

export default function TocToggleButton({
  onClick,
  isVisible = true,
  className = ''
}: {
  onClick: () => void;
  isVisible?: boolean;
  className?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`fixed top-28 right-6 z-50 flex items-center justify-center w-11 h-11 bg-white  border border-gray-200  text-brand-600  rounded-full shadow-lg transition-all duration-500 hover:scale-110 active:scale-90 hover:shadow-xl group transform-gpu ${
        isVisible
          ? 'opacity-100 scale-100'
          : 'opacity-0 scale-75 pointer-events-none translate-x-12'
      } ${className}`}
      title="查看目录大纲"
    >
      <ListIcon className="w-6 h-6 transition-transform group-hover:rotate-12" strokeWidth={2.5} />
    </button>
  );
}
