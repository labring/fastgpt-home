import { ApiIcon, ConnectIcon, DataBaseIcon } from '@/components/icons';
import { TbDeviceDesktopAnalytics } from 'react-icons/tb';
import { FaHandsHelping } from 'react-icons/fa';
import { RiShieldCheckLine } from 'react-icons/ri';
import { IconType } from "react-icons";

export const ENTERPRISE_MODELS_ZH = [
  {
    type: "推理一体机",
    color: "primary" as const,
    title: "企业版 (K800 * 2)",
    description: "适合中小型企业快速部署AI应用",
    specs: [
      {
        label: "核心参数",
        value: [
          "CPU：HY 7490 processor 64C 2.7GHz 400W2",
          "内存：DDR5-5600 64 RDIMM24",
          "硬盘：SATA-SSD 480G1+NVMe-SSD 3.84T2 ，无硬件raid卡",
          "网卡：默认25G光口双口*1",
        ],
      },
      {
        label: "建议模型",
        value: ["DeepSeek-R1-Distill-Llama-70B", "Qwen2.5-72B"]
      }
    ]
  },
  {
    type: "推理一体机",
    color: "primary" as const,
    title: "旗舰版 (K800 * 8)",
    description: "满足大规模、高并发的推理需求",
    specs: [
      {
        label: "核心参数",
        value: [
          "CPU：HY 7490 processor 64C 2.7GHz 400W*2",
          "内存：DDR5-5600 64G RDIMM*24 ",
          "硬盘：SATA-SSD 480G*2，NVMe-SSD3.84T*4，12GB SAS RAID卡(带4G缓存,带电保护)*1",
          "网卡：默认25G光口双口*1"
        ],
      },
      {
        label: "建议模型",
        value: ["DeepSeek-R1 671B", "DeepSeek-R1-Distill-Llama-70B", "Qwen2.5-72B"]
      }
    ]
  },
  {
    type: "推训一体机",
    color: "warning" as const,
    title: "标准版 (P800-OAM * 8)",
    description: "提供模型微调与训练的强大算力",
    specs: [
      {
        label: "核心参数",
        value: [
          "CPU：Intel Xeon 8563x processor 52C 2.6GHz 385W2",
          "内存：DDR5-5600 64G RDIMM32",
          "硬盘：SATA-SSD 480G2+NVMe-SSD 3.84T4",
          "网卡：400G 光口单口CX74+25G光口双口CX61",
          "Raid卡：LSI 9560-8i 12GB SAS RAID卡(带4G缓存,带电保护)1"
        ],
      },
      {
        label: "建议模型",
        value: ["DeepSeek-R1 671B", "DeepSeek-R1-Distill-Llama-70B", "Qwen2.5-72B"]
      }
    ]
  },
  {
    type: "推训一体机",
    color: "warning" as const,
    title: "信创版 (P800-OAM * 8)",
    description: "满足国产化、高安全标准的信创需求",
    specs: [
      {
        label: "核心参数",
        value: [
          "CPU：HY 7490 processor 64C 2.7GHz 400W2",
          "内存：DDR5-4800 64G RDIMM24",
          "硬盘：SATA-SSD 480G2+NVMe-SSD 3.84T4",
          "网卡：400G 光口单口CX74+25G光口双口CX61",
          "Raid卡：LSI 9560-8i 12GB SAS RAID卡(带4G缓存,带电保护)*1"
        ],
      },
      {
        label: "建议模型",
        value: ["DeepSeek-R1 671B", "DeepSeek-R1-Distill-Llama-70B", "Qwen2.5-72B"]
      }
    ]
  },
];

export const ENTERPRISE_ADVANTAGES_ZH = [
  {
    title: "智能训练",
    description: "知识库训练能力行业领先，效果验证和智能优化功能强大。",
    icon: DataBaseIcon,
  },
  {
    title: "灵活编排",
    description: "工作流编排功能丰富灵活，支持复杂业务流程自动化。",
    icon: ConnectIcon,
  },
  {
    title: "极致扩展",
    description: "企业级扩展性最强，支持任意大模型接入和复杂系统集成。",
    icon: ApiIcon,
  },
  {
    title: "一体交付",
    description: "针对企业级用户提供软硬一体交付解决方案。",
    icon: TbDeviceDesktopAnalytics,
  },
  {
    title: "服务专业",
    description: "专业企业支持全面，从定制开发到技术培训全流程服务。",
    icon: FaHandsHelping,
  },
  {
    title: "稳定可靠",
    description: "成熟度和稳定性最高，拥有数百家企业付费客户验证。",
    icon: RiShieldCheckLine,
  }
];

export const ENTERPRISE_BENCHMARK_ZH = [
  {
    key: "1",
    model: "DeepSeek-R1-Distill-Llama-70B",
    hardware: "2卡 XPU",
    concurrent40: "382（token/s）/0.31s",
    concurrent160: "994（token/s）/1.09s",
    concurrent256: "1205（token/s）/3.69s",
  },
  {
    key: "2",
    model: "Qwen2.5-72B",
    hardware: "2卡 XPU",
    concurrent40: "391（token/s）/0.48s",
    concurrent160: "682（token/s）/1.46s",
    concurrent256: "764（token/s）/2.36s",
  },
  {
    key: "3",
    model: "DeepSeek-R1 671B",
    hardware: "8卡 XPU",
    concurrent40: "4236（token/s）/1.69s",
    concurrent160: "585（token/s）/4.8s",
    concurrent256: "678（token/s）/25.2s",
  },
];

export const ENTERPRISE_SOLUTIONS_ZH = [
  {
    id: "government",
    name: "AI + 泛政务",
    description: "提升政务服务效率与智能化水平，助力数字政府建设。",
    cases: [
      {
        title: "智能邮件",
        description: "构建邮件内容分析平台，实现邮件主题、收发人、时间、地址、正文及附件的全要素自动化摘要提取，助力用户快速掌握核心信息，提升信息处理效率。",
      },
      {
        title: "报告检索",
        description: "构建全维度画像分析体系，系统自动采集目标对象关联数据，生成结构化检索报告，涵盖基础信息档案、近期动态追踪、社交媒体舆情监测与情感分析三大核心模块。",
      },
      {
        title: "政务文书",
        description: "基于大模型技术实现公文智能生成、政策文件深度解析、文档要素自动校验，并配备智能问答系统支持实时业务咨询，构建公文处理全链路提效体系。",
      },
      {
        title: "政务服务智能化（一网通办助手）",
        description: "打造政务服务智能中枢，融合多源数据资源，构建自然语言交互、政策精准匹配、材料智能生成及业务全流程自动化办理能力，实现政务服务效能与用户体验双提升。",
      },
      {
        title: "城市治理与应急响应",
        description: "运用AI技术实时分析城市数据，精准预测交通拥堵、环境污染等问题，突发事件中实时监控、数据分析快速启动应急预案，协调部门响应，全方位保障城市安全。",
      },
      {
        title: "政策智能决策支持",
        description: "运用大数据建模与大模型推理，融合多源数据深度分析，为政策制定提供科学支撑，助力政府精准施策、动态优化，全面提升决策质效。",
      }
    ]
  },
  {
    id: "finance",
    name: "AI + 金融",
    description: "智能风控、精准营销、高效服务，重塑金融行业新业态。",
    cases: [
      {
        title: "智能尽调生成助手",
        description: "通过整合多源数据与智能分析，自动化生成结构化报告，提升信贷尽调效率与风险评估准确性。",
      },
      {
        title: "资金流水智析助手",
        description: "实现交易数据智能分类与现金流分析自动化，生成经营风险评估报告，助力信贷决策效率提升90%以上。",
      },
      {
        title: "企业股权剖析助手",
        description: "基于模型智能穿透股权结构、识别关联关系及风险条款，自动化生成可视化分析报告，显著提升信贷风险评估效率与准确性。",
      },
      {
        title: "行业分析助手",
        description: "行业风险助手基于大模型与多源数据融合，智能生成行业全景分析报告，助力银行精准评估借款企业市场环境与潜在风险，效率提升75%以上。",
      },
      {
        title: "智能尽调审核助手",
        description: "信贷尽调报告智审助手基于大模型智能定位风险点并生成审核意见，助力审核周期缩短50%以上，实现信贷审批效率与质量双提升。",
      },
      {
        title: "APP智投财富管家",
        description: "理财智投管家通过精准画像与智能推荐，重塑手机银行理财服务体验，实现客户价值与运营效率的双重提升。",
      },
      {
        title: "保险产品智析引擎",
        description: "通过智能解析复杂条款并转化为易懂内容，实现用户快速理解与销售人员高效沟通，显著降低合规风险与销售误导，全面提升保险服务体验与业务效能。",
      },
      {
        title: "智能问答服务助手",
        description: "保险产品问答助手基于大模型技术构建智能知识库，通过转化复杂条款为易懂内容，破解保险行业知识整合难、服务效率低痛点，实现降本增效与客户体验升级。",
      },
      {
        title: "核保风险评估助手",
        description: "通过大模型构建智能知识库破解条款理解难题，保险产品对比Agent以可视化多维分析重塑产品决策体验，预核保场景应用大模型优化核保流程实现降本增效与风控升级。",
      },
      {
        title: "条款合规审查盾",
        description: "大模型技术通过自动化规则解析与智能核验，破解了保险条款检核中人工效率低、合规风险高、法规响应慢等核心难题，实现了产品开发效率、审核准确性与合规管理能力的三重跃升。",
      },
      {
        title: "研报观点AI解析台",
        description: "通过语义化检索与大模型自动摘要，破解传统研报阅读中\"检索低效、阅读冗长、总结耗时\"三大痛点，实现从信息检索到观点生成的智能化跃迁。",
      },
      {
        title: "智能投顾资讯精要",
        description: "理财师助手整合多源金融数据、智能解析市场趋势，提供个性化资产策略，有效破解了金融资讯过载、时效性不足及服务同质化难题，助力理财师提升服务效能与客户触达质量。",
      }
    ]
  },
  {
    id: "enterprise",
    name: "AI + 央国企",
    description: "赋能生产、运营、管理全流程，推动数字化转型与降本增效。",
    cases: [
      {
        title: "智能诊断应用助手",
        description: "覆盖\"识别-分析-决策-生成\"全诊断链路，融合电网运行态势感知与社会经济影响评估，构建多维度要素关联诊断模型，实现异常智能预警、成因深度解析及处置方案自动生成。",
      },
      {
        title: "智能审核应用助手",
        description: "依托大模型技术实现评审材料自动解析、多维度合规核验、专家知识库智能匹配，形成\"引导式填报-交互式核验-生成式报告\"的闭环评审模式。",
      },
      {
        title: "现场作业辅助助手",
        description: "AI助手为现场员工提供负荷接入方案、安全操作解答及培训支持，问题满足率达94%，年节省成本超百万元。",
      },
      {
        title: "方案设计助手",
        description: "高风险区方案审核效率与准确性，现需开发智能审核助手，以辅助场站人员自检，减少因审核量大导致的低级错误。",
      },
      {
        title: "项目工程造价助手",
        description: "为解决项目维护中造价申报效率低、易出错的问题。该助手利用AI技术，实现申报内容智能识别、子项目自动关联、造价类目智能匹配及价格自动计算，一键生成标准化概算清单，提升申报效率与准确性。",
      },
      {
        title: "厂站填报助手",
        description: "解决场站基层表单管理碎片化导致的重复填报与数据风险，现需构建智能协同录入系统，通过标准化数据中台实现\"一次录入、多表同步\"，提升效率与数据准确性。",
      },
      {
        title: "智能客服助手",
        description: "智能语音对话、智能座席工作台等，将客户服务从人工模式转变为智能化模式。",
      },
      {
        title: "能源企业知识库",
        description: "历史数据搜索、工艺/工具/措施推荐、事故处置方案推荐、储层参数预测等。",
      }
    ]
  },
  {
    id: "education",
    name: "AI + 教育",
    description: "革新教学模式，助力因材施教，打造智慧校园新生态",
    cases: [
      {
        title: "学生科研文献智能检索",
        description: "基于多源学术数据库构建知识图谱，通过智能解析与深度挖掘实现研究主题的跨库精准匹配。支持自动化生成结构化文献综述，同步输出领域演进图谱与前沿热点矩阵，从原有一周缩短为一天。",
      },
      {
        title: "教师报告写作智能分析",
        description: "构建课程数据资产库与教学评估指标体系，部署智能诊断引擎实现教学效果多模态数据分析。自动化生成包含三维目标达成度评估、教学反思矩阵及改进路径的结构化报告，同步输出多维教学评估矩阵。",
      },
      {
        title: "教师智能教务应答助手",
        description: "行政咨询平台，深度整合教务排课、学籍异动、奖助申报等12类业务数据，形成跨域服务知识联邦。通过语义理解引擎实时解析自然语言问询，秒级生成带关联材料的标准化应答方案，同步输出可视化办事导航路径，赋能智慧校园治理体系建设。",
      },
      {
        title: "校园管理行政咨询",
        description: "大模型驱动的全域资源调度平台，深度融合专业培养方案图谱、教师能力矩阵、教室资源热力图等3类核心参数。系统基于动态资源画像实时匹配课程关联度、师资适配度及设施兼容性，毫秒级生成最优排课方案并同步输出冲突预警矩阵。形成数据驱动的教学资源智能调配范式。",
      },
      {
        title: "教学智能评估",
        description: "运用多源数据融合算法构建动态评估模型，通过权重智能分配与异常值校验生成教师能力雷达图，实现职称评审从经验判断向数据驱动的精准决策转型，并输出个性化发展建议助力教师专业成长。",
      },
      {
        title: "家长群运营助手",
        description: "基于大模型技术深度解析家长咨询文本中的学业焦虑、心理健康、升学政策等核心诉求，结合学生成长轨迹数据构建多维画像，建立需求响应-服务推送-效果反馈的全流程闭环管理机制，显著降低家校信息差。",
      }
    ]
  },
  {
    id: "healthcare",
    name: "AI + 医疗",
    description: "重塑医患服务链路，赋能精准诊疗与健康管理。",
    cases: [
      {
        title: "医疗智能问答",
        description: "1）疾控数据专区——整合疫情监测、流行病学调查等实时数据源；2）医疗知识图谱——覆盖药品库、诊疗指南及临床路径；3）智能问答引擎——支持症状自查、用药咨询及政策解读，实现秒级响应与证据溯源。",
      },
      {
        title: "患者的智能医疗咨询",
        description: "1）生成结构化健康宣教方案，涵盖疾病预防、膳食营养、运动康复等场景；2）通过医院公众号、移动端APP及病房智能终端实现多模态内容推送；3）重塑就医服务链路，形成诊前教育-诊中指导-诊后随访的闭环管理，在提升患者健康素养的同时优化医疗资源配置效率。",
      },
      {
        title: "患者服务的智能导诊",
        description: "1）多模态交互矩阵——集成语音语义识别与症状图谱关联分析，实现精准分诊推荐；2）动态分诊引擎——基于就诊压力实时优化队列，支持跨院区医疗资源智能调度；3）全流程导诊服务——同步推送检查预准备事项及定制化健康宣教内容。临床验证显示，系统可缩短患者院内滞留时间40%以上，健康宣教触达率突破60%。",
      },
      {
        title: "医生提效智能病历",
        description: "1）基于医疗大模型构建智能中枢，实现病历文档的实时结构化生成；2）内置医学知识图谱与诊疗规范引擎，实现诊断逻辑、用药禁忌的实时校验；3）深度融合PACS影像、LIS检验数据等多模态信息，提供病历智能续写、多学科会诊摘要生成等辅助功能。系统可使病历书写效率提升50%以上，降低错误率 40%，赋能医院运营决策与科研创新。",
      },
      {
        title: "医生智能会诊助手",
        description: "1）基于AI的实时分析引擎，融合多模态数据源，自动生成结构化会诊摘要；2）智能推荐引擎，结合病例特征匹配专科医生及全球罕见病案例库；3）构建跨院专家协作网络，实现疑难病例的云端联合诊疗。临床验证显示，系统可缩短会诊响应时间60%以上，提升诊断准确率 42%，加速优质医疗资源纵向流动。",
      },
      {
        title: "饮食健康动态方案",
        description: "运用AI深度学习模型动态分析用户代谢变化趋势，融合膳食偏好、过敏原及慢性病禁忌，生成千人千面的周期性营养配餐方案，并通过食材替换建议、烹饪方式优化等功能模块，构建从方案制定到效果追踪的闭环管理体系，有效降低慢性病并发症风险，提升患者长期饮食管理依从性。",
      },
      {
        title: "医疗文献智能检索",
        description: "通过自然语言处理技术深度解析医生查询中的疾病名称、症状描述及治疗诉求等关键信息，结合医学知识图谱进行语义扩展与关联推理，从百万级文献库中秒级召回高相关度研究论文、临床指南及病例报告，运用证据分级算法筛选权威来源，最终生成结构化决策摘要，包含诊疗方案对比、用药风险提示等核心内容，显著提升临床决策效率与循证质量。",
      },
      {
        title: "其他Agent",
        description: "个人健康管家助手、饮食健康成分专家、健康产品导购、健康社群维护助手、Ai心理培养师、……",
      }
    ]
  },
  {
    id: "retail",
    name: "AI + 泛新零售",
    description: "驱动营销、运营、供应链全面智能化，提升转化效率。",
    cases: [
      {
        title: "社群智能优化机器人",
        description: "通过深度分析社群成员互动行为数据，构建动态标签体系，实现精准用户分层。基于AI算法持续优化营销策略，自动化匹配触达场景，提升用户转化链路效率。",
      },
      {
        title: "智能供应链决策助手",
        description: "依托实时销售数据与库存动态，运用运筹优化算法生成动态生产计划。通过多维度资源调度模拟，实现产能利用率最大化，降低供应链成本的同时提升交付准时率。",
      },
      {
        title: "消费趋势洞察引擎",
        description: "将行业报告数据转化为可视化洞察资产，构建结构化知识图谱。支持定制化维度钻取分析，通过NLP技术提炼关键驱动因素，助力企业把握细分市场机遇。",
      },
      {
        title: "AI包装创意工作台",
        description: "基于生成对抗网络（GAN）快速迭代包装设计方案，集成消费者偏好预测模型。通过A/B测试模拟市场反馈，输出符合目标客群审美偏好的最优设计概念。",
      },
      {
        title: "智能视频营销工厂",
        description: "解析产品功能矩阵与情感价值点，自动生成多风格创意脚本。结合平台流量算法优化视频节奏，通过动态素材库实现批量化内容生产，提升种草转化效率。",
      },
      {
        title: "对话式营销分析中枢",
        description: "打造自然语言交互界面，将营销数据转化为可解释的商业洞察。支持异常波动归因分析、渠道效能评估等场景，降低专业分析门槛，赋能即时决策。",
      },
      {
        title: "小红书内容生成助手",
        description: "构建产品卖点知识库与用户评论情感图谱，生成符合平台调性的种草文案。通过热点话题融合算法，实现千人千面内容推荐，提升UGC互动率。",
      },
      {
        title: "公众号智能创作平台",
        description: "基于传播规律建立内容质量评估模型，提供选题策划、结构编排到金句生成的全流程辅助。集成SEO优化建议，提升文章打开率与分享传播系数。",
      }
    ]
  }
];

export const ENTERPRISE_PARTNERS_ZH = [
  {
    title: "华润啤酒",
    description: "FastGPT 赋能AI大模型应用探索，快速验证AI应用可行性、快速验证和试点的AI工具支持、快速接入模型能力。",
    image: "/images/enterprise/zh/p1.png",
  },
  {
    title: "启鸣达人",
    description: "FastGPT 赋能AI教育产品，凭借 AI + 大数据技术，依托未来学校理论引领创新，借助 AI 技术重塑教学模式，深度赋能教师成长，全方位驱动教育数字化转型，坚定迈向高质量发展。",
    image: "/images/enterprise/zh/p2.png",
  },
  {
    title: "AO史密斯",
    description: "FastGPT 赋能AI落地企业内部场景最佳实践，丰富的组件库和强大的集成能力，可以满足更多企业个性化需求。",
    image: "/images/enterprise/zh/p3.png",
  },
  {
    title: "恺博座椅",
    description: "FastGPT 赋能恺博座椅落地 AI 最佳实践，Al深度赋能, 我的职场“开挂”一天! Karry，你的贴身 AI 助理。",
    image: "/images/enterprise/zh/p4.png",
  }
];

type ENTERPRISECollection = {
  [key: `ENTERPRISE_MODELS_${string}`]: {
    type: string;
    color: "primary" | "warning";
    title: string;
    description: string;
    specs: {
      label: string;
      value: string[];
    }[];
  }[];
} & {
  [key: `ENTERPRISE_ADVANTAGES_${string}`]: {
    title: string;
    description: string;
    icon?: IconType;
  }[];
} & {
  [key: `ENTERPRISE_BENCHMARK_${string}`]: {
    key: string;
    model: string;
    hardware: string;
    concurrent40: string;
    concurrent160: string;
    concurrent256: string;
  }[];
} & {
  [key: `ENTERPRISE_SOLUTIONS_${string}`]: {
    id: string;
    name: string;
    description: string;
    cases: {
      title: string;
      description: string;
    }[];
  }[];
} & {
  [key: `ENTERPRISE_PARTNERS_${string}`]: {
    title: string;
    description: string;
    image?: string;
  }[];
}

export const ALL_ENTERPRISE: ENTERPRISECollection = {
  ENTERPRISE_MODELS_ZH,
  ENTERPRISE_ADVANTAGES_ZH,
  ENTERPRISE_BENCHMARK_ZH,
  ENTERPRISE_SOLUTIONS_ZH,
  ENTERPRISE_PARTNERS_ZH
};
