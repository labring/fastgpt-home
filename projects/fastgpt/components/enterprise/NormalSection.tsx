interface NormalSectionProps {
  id: string;
  title?: string;
  description?: string;
  children?: React.ReactNode;
}

const NormalSection = ({ id, title, description, children }: NormalSectionProps) => {
  return (
    <section id={id} className="py-6">
      {
        title && (
          <h4 className="text-center text-gradient">{title}</h4>
        )
      }
      {
        description && (
          <p className="text-center text-xl font-medium tracking-tight text-[var(--text-secondary)]">
            {description}
          </p>
        )
      }
      {
        children && (
          children
        )
      }
    </section>
  );
};

export default NormalSection;
