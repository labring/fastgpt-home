import { NormalCardGrid, NormalSection } from ".";
import { ALL_ENTERPRISE } from "@/config/enterprise";

interface Props {
  locale: any;
  langName: string;
}

const EAdvantages = ({ locale, langName }: Props) => {
  const advantagesLocale = locale['Advantages'];
  const advantages = ALL_ENTERPRISE[`ENTERPRISE_ADVANTAGES_${langName.toUpperCase()}`];

  return (
    <NormalSection id="EAdvantages" title={advantagesLocale.title} description={advantagesLocale.description}>
      <NormalCardGrid items={advantages} />
      <EnterpriseBenchmark locale={locale} langName={langName} />
    </NormalSection>
  );
};

export default EAdvantages;

export const EnterpriseBenchmark = ({ locale, langName }: Props) => {
  const benchmarkLocale = locale['Benchmark'];
  const benchmark = ALL_ENTERPRISE[`ENTERPRISE_BENCHMARK_${langName.toUpperCase()}`];

  const columns = [
    {
      key: "model",
      label: benchmarkLocale.model,
    },
    {
      key: "hardware",
      label: benchmarkLocale.hardware,
    },
    {
      key: "concurrent40",
      label: benchmarkLocale.concurrent40,
    },
    {
      key: "concurrent160",
      label: benchmarkLocale.concurrent160,
    },
    {
      key: "concurrent256",
      label: benchmarkLocale.concurrent256,
    },
  ];

  return (
    <NormalSection id="EBenchmark">
      <div className="grid grid-cols-1">
        <div className="bg-white dark:bg-gray-800/60 p-6 sm:p-8 rounded-2xl border-gray-200 dark:border-gray-700">
          <h4 className="text-lg font-bold text-center text-gray-900 dark:text-white mb-6">{benchmarkLocale.title}</h4>
          <table className="w-full text-sm text-left text-gray-600 dark:text-gray-400 break-all">
            <thead className="text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase bg-gray-50 dark:bg-gray-700/50">
              <tr>
                {
                  columns.map((column) => (
                    <th key={column.key} scope="col" className="px-4 sm:px-6 py-3">{column.label}</th>
                  ))
                }
              </tr>
            </thead>
            <tbody>
              {
                benchmark.map((item) => (
                  <tr key={item.key} className="border-b border-gray-200 dark:border-gray-700">
                    <td className="px-4 sm:px-6 py-4 font-medium text-gray-900 dark:text-white">{item.model}</td>
                    <td className="px-4 sm:px-6 py-4">{item.hardware}</td>
                    <td className="px-4 sm:px-6 py-4">{item.concurrent40}</td>
                    <td className="px-4 sm:px-6 py-4">{item.concurrent160}</td>
                    <td className="px-4 sm:px-6 py-4">{item.concurrent256}</td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>
    </NormalSection>
  );
};
