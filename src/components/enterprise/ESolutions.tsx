"use client";

import { Tab, Tabs } from "@heroui/react";
import { NormalCardGrid, NormalSection } from ".";
import { ALL_ENTERPRISE } from "@/config/enterprise";

interface Props {
  langName: string;
}

const ESolutions = ({ langName }: Props) => {
  const solutions = ALL_ENTERPRISE[`ENTERPRISE_SOLUTIONS_${langName.toUpperCase()}`];

  return (
    <section id="ESolutions" className="grid grid-cols-[minmax(0,1fr)]">
      <Tabs
        items={solutions}
        color="primary"
        classNames={{
          base: "lg:mx-auto md:mx-auto",
          tabList: "bg-white dark:bg-gray-800/60 rounded-medium border-gray-200 dark:border-gray-700",
          tabContent: "text-sm text-gray-500 dark:text-gray-400"
        }}
      >
        {(item) => (
          <Tab key={item.id} title={item.name}>
            <NormalSection id={`EnterpriseSolutions-${item.id}`} title={item.name} description={item.description}>
              <NormalCardGrid items={item.cases || []} />
            </NormalSection>
          </Tab>
        )}
      </Tabs>
    </section>
  );
};

export default ESolutions;
