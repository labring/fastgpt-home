import { Chip } from "@heroui/react";
import { GoDot } from "react-icons/go";
import { ALL_ENTERPRISE } from "@/config/enterprise";
import { NormalSection } from ".";

interface Props {
  locale: any;
  langName: string;
}

const EModels = ({ locale, langName }: Props) => {
  const modelsLocale = locale['Models'];
  const models = ALL_ENTERPRISE[`ENTERPRISE_MODELS_${langName.toUpperCase()}`];

  return (
    <NormalSection id="EModels" title={modelsLocale.title} description={modelsLocale.description}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
        {
          models.map((item, index) => (
            <div key={index} className="bg-white dark:bg-gray-800/60 p-6 sm:p-8 rounded-2xl border-gray-200 dark:border-gray-700 flex flex-col">
              <Chip color={item.color} size="sm" className="mb-1">
                {item.type}
              </Chip>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">{item.title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{item.description}</p>
              <div className="flex-grow mt-2">
                {item.specs.map((spec, index) => (
                  <div key={index} className="mt-4">
                    <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300">{spec.label}</h4>
                    <ul className="mt-2 space-y-1.5 text-gray-600 dark:text-gray-400 text-sm">
                      {
                        spec.value.map((val, i) => (
                          <li key={i} className="flex items-start">
                            <span className="mr-2 mt-1">
                              <GoDot />
                            </span>
                            <span>{val}</span>
                          </li>
                        ))
                      }
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          ))
        }
      </div>
    </NormalSection>
  );
};

export default EModels;
