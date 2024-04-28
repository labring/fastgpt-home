
import { siteConfig } from "@/config/site";
import { Tier, TiersEnum } from "@/types/pricing";

export const TIERS_EN: Array<Tier> = [
  {
    key: TiersEnum.Free,
    title: "Open Source / Free",
    price: "Free",
    href: siteConfig.openSourceURL || "#",
    description: "Freely deploy in private environments and use as a backend service for other applications.",
    features: [
      "Free of charge",
      "Full access to source code",
      "Customization and development",
      "Commercial use under certain terms",
    ],
    buttonText: "Get Started",
    buttonColor: "primary", 
    buttonVariant: "solid",
  },
  {
    key: TiersEnum.Customize,
    title: "Commercial Edition",
    href: siteConfig.commercial || "#",
    description: "An enhanced version built upon the open-source FastGPT.",
    price: "SaaS Commercial License",
    features: [
      "Customization and development",
      "Dedicated support",
      "Custom copyright notice",
      "Web application synchronization", 
      "Full commercial licensing"
    ],
    buttonText: "Learn More",
    buttonColor: "default",
    buttonVariant: "flat",
  },
];

export const TIERS_ZH: Array<Tier> = [
  {
    key: TiersEnum.Free,
    title: "开源 / 免费",
    price: "免费",
    href: siteConfig.openSourceURL || "#",
    description: "可免费私有化部署，作为其他应用的“后端即服务”自由使用。",
    features: [
      "免费",
      "访问全部代码",
      "二次开发",
      "可在一定条件下商用",
    ],
    buttonText: "开始",
    buttonColor: "primary",
    buttonVariant: "solid",
  },
  {
    key: TiersEnum.Customize,
    title: "商业版",
    href: siteConfig.commercial || "#",
    description: "基于 FastGPT 开源版的增强版本。",
    price: "Saas 商业授权许可",
    features: [
      "二次开发",
      "内容审核",
      "一对一服务",
      "自定义版权信息",
      "Web 站点同步",
      "完整商业授权"
    ],
    buttonText: "了解详情",
    buttonColor: "default",
    buttonVariant: "flat",
  },
];

export const TIERS_JA: Array<Tier> = [
  {
    key: TiersEnum.Free,
    title: "オープンソース/無料版",
    price: "無料",
    href: siteConfig.openSourceURL || "#",
    description: "プライベート環境への自由なデプロイと、他のアプリケーションのバックエンドサービスとしての利用が可能です。",
    features: [
      "無料でご利用いただけます", 
      "ソースコードへの完全なアクセス",
      "カスタマイズと開発が可能",
      "一定の条件下での商用利用が可能",
    ],
    buttonText: "始めましょう",
    buttonColor: "primary",
    buttonVariant: "solid",
  },
  {
    key: TiersEnum.Customize,
    title: "商用エディション", 
    href: siteConfig.commercial || "#",
    description: "オープンソースのFastGPTをベースに構築された、機能強化版です。",
    price: "SaaSの商用ライセンス",
    features: [
      "カスタマイズと開発が可能",
      "専任サポート",
      "カスタム著作権表示", 
      "Webアプリケーションとの同期",
      "商用ライセンスを完全に取得"
    ],
    buttonText: "詳細はこちら",
    buttonColor: "default",
    buttonVariant: "flat",
  },
];

export const TIERS_AR: Array<Tier> = [
  {
    key: TiersEnum.Free,
    title: "مفتوح المصدر / مجاني",
    price: "مجاني",
    href: siteConfig.openSourceURL || "#",
    description: "انشر بحرية في بيئات خاصة واستخدمه كخدمة خلفية للتطبيقات الأخرى.",
    features: [
      "مجاني تمامًا",
      "وصول كامل إلى الشفرة المصدرية",
      "إمكانية التخصيص والتطوير",
      "الاستخدام التجاري وفقًا لشروط معينة",
    ],
    buttonText: "ابدأ الآن",
    buttonColor: "primary",
    buttonVariant: "solid",
  },
  {
    key: TiersEnum.Customize,
    title: "الإصدار التجاري",
    href: siteConfig.commercial || "#",
    description: "نسخة محسنة مبنية على FastGPT مفتوح المصدر.",
    price: "ترخيص تجاري SaaS",
    features: [
      "إمكانية التخصيص والتطوير",
      "دعم مخصص",
      "إشعار حقوق نشر مخصص",
      "مزامنة تطبيقات الويب",
      "ترخيص تجاري كامل"  
    ],
    buttonText: "تعرف على المزيد",
    buttonColor: "default",
    buttonVariant: "flat",
  },
];

export const TIERS_ES: Array<Tier> = [
  {
    key: TiersEnum.Free, 
    title: "Código Abierto / Gratis",
    price: "Gratis",
    href: siteConfig.openSourceURL || "#",
    description: "Despliega libremente en entornos privados y utilízalo como servicio backend para otras aplicaciones.",
    features: [
      "Totalmente gratuito",
      "Acceso completo al código fuente",
      "Personalización y desarrollo",
      "Uso comercial bajo ciertos términos",
    ],
    buttonText: "Empezar",
    buttonColor: "primary",
    buttonVariant: "solid",
  },
  {
    key: TiersEnum.Customize,
    title: "Edición Comercial",
    href: siteConfig.commercial || "#",
    description: "Una versión mejorada construida sobre el FastGPT de código abierto.",
    price: "Licencia Comercial SaaS", 
    features: [
      "Personalización y desarrollo",
      "Soporte dedicado",
      "Aviso de derechos de autor personalizado",
      "Sincronización con aplicaciones web",
      "Licencia comercial completa"
    ],
    buttonText: "Saber más",
    buttonColor: "default",
    buttonVariant: "flat",  
  },
];

export const TIERS_RU: Array<Tier> = [
  {
    key: TiersEnum.Free,
    title: "Открытый Исходный Код / Бесплатно",
    price: "Бесплатно",
    href: siteConfig.openSourceURL || "#", 
    description: "Свободно развертывайте в частных средах и используйте в качестве бэкенд-сервиса для других приложений.",
    features: [
      "Полностью бесплатно",
      "Полный доступ к исходному коду",
      "Возможность настройки и разработки",
      "Коммерческое использование на определенных условиях",
    ],
    buttonText: "Начать",
    buttonColor: "primary",
    buttonVariant: "solid",
  },
  {
    key: TiersEnum.Customize,
    title: "Коммерческая Редакция",
    href: siteConfig.commercial || "#",
    description: "Улучшенная версия, построенная на базе открытого исходного кода FastGPT.",
    price: "Коммерческая Лицензия SaaS",
    features: [
      "Возможность настройки и разработки",
      "Выделенная поддержка", 
      "Пользовательское уведомление об авторских правах",
      "Синхронизация с веб-приложениями",
      "Полная коммерческая лицензия"
    ],  
    buttonText: "Узнать больше",
    buttonColor: "default",
    buttonVariant: "flat",
  },
];

interface TiersCollection {
  [key: `TIERS_${string}`]: Array<Tier>;
}

export const ALL_TIERS: TiersCollection = {
  TIERS_EN,
  TIERS_ZH,
  TIERS_JA,
  TIERS_AR,
  TIERS_ES,
  TIERS_RU
}