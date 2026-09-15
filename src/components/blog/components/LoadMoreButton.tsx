type LoadMoreButtonProps = {
  label: string;
  onClick: () => void;
  disabled?: boolean;
};

export default function LoadMoreButton({ label, onClick, disabled = false }: LoadMoreButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="h-11 rounded-full bg-btn-light-bg px-8 text-base font-semibold text-gray-700 ring-1 ring-neutral-300 transition-colors hover:bg-white disabled:cursor-default disabled:opacity-50 disabled:hover:bg-btn-light-bg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
    >
      {label}
    </button>
  );
}
