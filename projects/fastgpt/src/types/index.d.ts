export type FeConfigType = {
  startUrl: string;
  loginUrl: string;
  commercialDocUrl: string;
  concatMd: string;
  scripts: Record<string, string>[];
};

declare global {
  var feConfigs: FeConfigType;
}
