import Image from "next/image";
import { IconType } from "react-icons";

interface CardGridProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  columns?: string;
  className?: string;
}

type NormalCardItem = {
  title: string;
  description: string;
  icon?: IconType;
  image?: string;
}

interface NormalCardProps {
  items: NormalCardItem[];
  columns?: string;
}

function CardGrid<T> ({
  items,
  renderItem,
  columns = "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
}: CardGridProps<T>) {
  return (
    <div className={`grid ${columns} gap-6 mt-12`}>
      {items?.map(renderItem)}
    </div>
  );
};

const NormalCardGrid =({ items, columns }: NormalCardProps) => {
  return (
    <CardGrid
      items={items}
      renderItem={(item, index) => (
        <div
          key={index}
          className="flex flex-col items-center p-10 border-white/20 rounded-xl border-box"
          style={{background: "var(--theme-gradient)"}}
        >
          {
            item.icon && (
              <div className="p-2 lg:p-3 w-12 h-12 md:w-14 md:h-14 mb-5 text-white rounded-xl flex items-center justify-center" style={{ background: "var(--feature-icon)" }}>
                {item.icon && <item.icon className="text-[32px]" />}
              </div>
            )
          }
          {
            item.image && (
              <div className="w-full lg:w-3/5 min-h-[150px] flex justify-center items-center">
                <Image src={item.image} alt="logo" width={150} height={150} className="rounded-lg" style={{ objectFit: "contain" }} />
              </div>
            )
          }
          <h2 className={"text-2xl font-semibold mb-2 "} style={{ color: "var(--feature-title)" }}>{item.title}</h2>
          <p className="text-[#355189] dark:text-white/50">{item.description}</p>
        </div>
      )}
      columns={columns}
    />
  );
};

export default NormalCardGrid;
