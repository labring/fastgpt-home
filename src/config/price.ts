export const PRICE_PLANS_CLOUD: Record<string, Record<string, any>[]> = {
  zh: [
    {
      key: 'free',
      title: '免费版',
      price: 0,
      content: '核心功能免费试用',
      features: [
        // '100 AI 积分',
        100,
        '600 组知识库索引',
        '1 个团队成员',
        '10 个 Agent',
        '3 个 知识库',
        '30 天对话记录保留',
        '30 QPM'
      ]
    },
    {
      key: 'basic',
      title: '基础版',
      price: 99,
      content: '解锁 FastGPT 完整功能',
      features: [
        4000,
        '6000 组知识库索引',
        '5 个团队成员',
        '50 个 Agent',
        '30 个知识库',
        '180 天对话记录保留',
        '300 QPM',
        '站点同步最大 500 页',
        '48 小时工单支持响应'
      ]
    },
    {
      key: 'advanced',
      title: '高级版',
      price: 599,
      content: '适合企业级生产工具',
      features: [
        25000,
        '36000 组知识库索引',
        '50 个团队成员',
        '200 个 Agent',
        '100 个知识库',
        '360 天对话记录保留',
        '720 天团队操作日志记录',
        '1500 QPM',
        '站点同步最大 2000 页',
        '24 小时工单支持响应',
        '3 个应用备案'
      ]
    },
    {
      key: 'custom',
      title: '定制版',
      price: '定制计费',
      content: '助力中大型企业构建核心竞争力',
      features: ['优先深度技术支持', '弹性资源配置', '安全可控', '专属客户经理']
    }
  ],
  en: [
    {
      key: 'free',
      title: 'Free Edition',
      price: 0,
      content: 'Core features free to try',
      features: [
        100,
        '600 knowledge base indexes',
        '1 team member',
        '10 Agents',
        '3 knowledge bases',
        '30 days conversation history retention',
        '30 QPM'
      ]
    },
    {
      key: 'basic',
      title: 'Basic Edition',
      price: 99,
      content: 'Unlock FastGPT full features',
      features: [
        4000,
        '6000 knowledge base indexes',
        '5 team members',
        '50 Agents',
        '30 knowledge bases',
        '180 days conversation history retention',
        '300 QPM',
        'Max 500 web page syncs',
        '48-hour ticket support response'
      ]
    },
    {
      key: 'advanced',
      title: 'Advanced Edition',
      price: 599,
      content: 'Suitable for enterprise-level production',
      features: [
        25000,
        '36000 knowledge base indexes',
        '50 team members',
        '200 Agents',
        '100 knowledge bases',
        '360 days conversation history retention',
        '720 days team operation log retention',
        '1500 QPM',
        'Max 2000 web page syncs',
        '24-hour ticket support response',
        '3 application registrations'
      ]
    },
    {
      key: 'custom',
      title: 'Custom Edition',
      price: 'Custom',
      content: 'Help medium and large enterprises build core competitiveness',
      features: [
        'Priority in-depth technical support',
        'Flexible resource allocation',
        'Secure and controllable',
        'Dedicated account manager'
      ]
    }
  ],
  ja: [
    {
      key: 'free',
      title: '無料版',
      price: 0,
      content:
        'コア機能を無料で試用できます。30日間ログインがない場合、ナレッジベースがクリアされます',
      features: [
        // '100 AIクレジット',
        100,
        '600組のナレッジベースインデックス',
        '1チームメンバー',
        '10個のAgent',
        '3個のナレッジベース',
        '30日間の会話記録保存',
        '30 QPM'
      ]
    },
    {
      key: 'basic',
      title: '基本版',
      price: 99,
      content: 'FastGPTの完全な機能をアンロックできます',
      features: [
        4000,
        '6000組のナレッジベースインデックス',
        '5チームメンバー',
        '50個のAgent',
        '30個のナレッジベース',
        '180日間の会話記録保存',
        '300 QPM',
        'サイト同期最大500ページ',
        '48時間のチケットサポート対応'
      ]
    },
    {
      key: 'advanced',
      title: '高度版',
      price: 599,
      content: '企業レベルの生産ツールに適しています',
      features: [
        25000,
        '36000組のナレッジベースインデックス',
        '50チームメンバー',
        '200個のAgent',
        '100個のナレッジベース',
        '360日間の会話記録保存',
        '720日間のチーム操作ログ保存',
        '1500 QPM',
        'サイト同期最大500ページ',
        '24時間のチケットサポート対応',
        '3個のアプリケーション登録'
      ]
    },
    {
      key: 'custom',
      title: 'カスタム版',
      price: 'カスタマイズ料金',
      content: '中大型企業のコア競争力構築を支援',
      features: [
        '優先的な深い技術サポート',
        '柔軟なリソース配分',
        '安全で制御可能',
        '専任カスタマーマネージャー'
      ]
    }
  ],
  ar: [
    {
      key: 'free',
      title: 'الخطة المجانية',
      price: 0,
      content: 'جرّب الميزات الأساسية مجانا',
      features: [
        100,
        '600 فهرس قاعدة معرفة',
        'عضو فريق واحد',
        '10 Agents',
        '3 قواعد معرفة',
        'حفظ سجل المحادثات لمدة 30 يوما',
        '30 QPM'
      ]
    },
    {
      key: 'basic',
      title: 'الخطة الأساسية',
      price: 99,
      content: 'افتح ميزات FastGPT الكاملة',
      features: [
        4000,
        '6000 فهرس قاعدة معرفة',
        '5 أعضاء فريق',
        '50 Agents',
        '30 قاعدة معرفة',
        'حفظ سجل المحادثات لمدة 180 يوما',
        '300 QPM',
        'مزامنة حتى 500 صفحة ويب',
        'استجابة دعم التذاكر خلال 48 ساعة'
      ]
    },
    {
      key: 'advanced',
      title: 'الخطة المتقدمة',
      price: 599,
      content: 'مناسبة لتشغيل أدوات إنتاجية AI داخل المؤسسة',
      features: [
        25000,
        '36000 فهرس قاعدة معرفة',
        '50 عضو فريق',
        '200 Agents',
        '100 قاعدة معرفة',
        'حفظ سجل المحادثات لمدة 360 يوما',
        'حفظ سجل عمليات الفريق لمدة 720 يوما',
        '1500 QPM',
        'مزامنة حتى 2000 صفحة ويب',
        'استجابة دعم التذاكر خلال 24 ساعة',
        '3 تسجيلات تطبيق'
      ]
    },
    {
      key: 'custom',
      title: 'خطة مخصصة',
      price: 'تسعير مخصص',
      content: 'للمؤسسات المتوسطة والكبيرة التي تحتاج إلى قدرات مخصصة',
      features: ['دعم تقني معمق بأولوية', 'موارد مرنة', 'أمان وتحكم', 'مدير حساب مخصص']
    }
  ],
  vi: [
    {
      key: 'free',
      title: 'Gói miễn phí',
      price: 0,
      content: 'Dùng thử miễn phí các tính năng cốt lõi',
      features: [
        100,
        '600 index kho tri thức',
        '1 thành viên team',
        '10 Agent',
        '3 kho tri thức',
        'Lưu lịch sử hội thoại 30 ngày',
        '30 QPM'
      ]
    },
    {
      key: 'basic',
      title: 'Gói Basic',
      price: 99,
      content: 'Mở khóa đầy đủ năng lực FastGPT',
      features: [
        4000,
        '6000 index kho tri thức',
        '5 thành viên team',
        '50 Agent',
        '30 kho tri thức',
        'Lưu lịch sử hội thoại 180 ngày',
        '300 QPM',
        'Đồng bộ tối đa 500 trang web',
        'Phản hồi ticket hỗ trợ trong 48 giờ'
      ]
    },
    {
      key: 'advanced',
      title: 'Gói Advanced',
      price: 599,
      content: 'Phù hợp cho công cụ sản xuất AI cấp doanh nghiệp',
      features: [
        25000,
        '36000 index kho tri thức',
        '50 thành viên team',
        '200 Agent',
        '100 kho tri thức',
        'Lưu lịch sử hội thoại 360 ngày',
        'Lưu log thao tác team 720 ngày',
        '1500 QPM',
        'Đồng bộ tối đa 2000 trang web',
        'Phản hồi ticket hỗ trợ trong 24 giờ',
        '3 lượt đăng ký ứng dụng'
      ]
    },
    {
      key: 'custom',
      title: 'Gói tùy chỉnh',
      price: 'Tùy chỉnh',
      content: 'Hỗ trợ doanh nghiệp vừa và lớn xây dựng năng lực AI cốt lõi',
      features: ['Ưu tiên hỗ trợ kỹ thuật chuyên sâu', 'Cấu hình tài nguyên linh hoạt', 'Bảo mật và kiểm soát', 'Quản lý tài khoản riêng']
    }
  ],
  th: [
    {
      key: 'free',
      title: 'แพ็กเกจฟรี',
      price: 0,
      content: 'ทดลองใช้ฟีเจอร์หลักได้ฟรี',
      features: [
        100,
        '600 index ฐานความรู้',
        'สมาชิกทีม 1 คน',
        '10 Agent',
        'ฐานความรู้ 3 ชุด',
        'เก็บประวัติสนทนา 30 วัน',
        '30 QPM'
      ]
    },
    {
      key: 'basic',
      title: 'แพ็กเกจ Basic',
      price: 99,
      content: 'ปลดล็อกความสามารถหลักของ FastGPT',
      features: [
        4000,
        '6000 index ฐานความรู้',
        'สมาชิกทีม 5 คน',
        '50 Agent',
        'ฐานความรู้ 30 ชุด',
        'เก็บประวัติสนทนา 180 วัน',
        '300 QPM',
        'ซิงก์เว็บไซต์สูงสุด 500 หน้า',
        'ตอบกลับ ticket ภายใน 48 ชั่วโมง'
      ]
    },
    {
      key: 'advanced',
      title: 'แพ็กเกจ Advanced',
      price: 599,
      content: 'เหมาะสำหรับงาน AI ระดับองค์กรใน production',
      features: [
        25000,
        '36000 index ฐานความรู้',
        'สมาชิกทีม 50 คน',
        '200 Agent',
        'ฐานความรู้ 100 ชุด',
        'เก็บประวัติสนทนา 360 วัน',
        'เก็บ log การทำงานของทีม 720 วัน',
        '1500 QPM',
        'ซิงก์เว็บไซต์สูงสุด 2000 หน้า',
        'ตอบกลับ ticket ภายใน 24 ชั่วโมง',
        'ลงทะเบียนแอปได้ 3 รายการ'
      ]
    },
    {
      key: 'custom',
      title: 'แพ็กเกจองค์กร',
      price: 'ราคาตามความต้องการ',
      content: 'สำหรับองค์กรขนาดกลางและใหญ่ที่ต้องการความสามารถเฉพาะทาง',
      features: ['ซัพพอร์ตเทคนิคเชิงลึกแบบเร่งด่วน', 'จัดสรรทรัพยากรยืดหยุ่น', 'ปลอดภัยและควบคุมได้', 'ผู้จัดการบัญชีเฉพาะ']
    }
  ],
  id: [
    {
      key: 'free',
      title: 'Paket Gratis',
      price: 0,
      content: 'Coba fitur inti secara gratis',
      features: [
        100,
        '600 index knowledge base',
        '1 anggota tim',
        '10 Agent',
        '3 knowledge base',
        'Retensi riwayat percakapan 30 hari',
        '30 QPM'
      ]
    },
    {
      key: 'basic',
      title: 'Paket Basic',
      price: 99,
      content: 'Buka fitur lengkap FastGPT',
      features: [
        4000,
        '6000 index knowledge base',
        '5 anggota tim',
        '50 Agent',
        '30 knowledge base',
        'Retensi riwayat percakapan 180 hari',
        '300 QPM',
        'Sinkronisasi maksimal 500 halaman web',
        'Respons tiket support dalam 48 jam'
      ]
    },
    {
      key: 'advanced',
      title: 'Paket Advanced',
      price: 599,
      content: 'Cocok untuk alat produksi AI tingkat enterprise',
      features: [
        25000,
        '36000 index knowledge base',
        '50 anggota tim',
        '200 Agent',
        '100 knowledge base',
        'Retensi riwayat percakapan 360 hari',
        'Retensi log operasi tim 720 hari',
        '1500 QPM',
        'Sinkronisasi maksimal 2000 halaman web',
        'Respons tiket support dalam 24 jam',
        '3 registrasi aplikasi'
      ]
    },
    {
      key: 'custom',
      title: 'Paket Kustom',
      price: 'Kustom',
      content: 'Untuk perusahaan menengah dan besar yang membutuhkan kapabilitas khusus',
      features: ['Prioritas support teknis mendalam', 'Alokasi resource fleksibel', 'Aman dan terkendali', 'Account manager khusus']
    }
  ],
  ms: [
    {
      key: 'free',
      title: 'Pelan Percuma',
      price: 0,
      content: 'Cuba ciri teras secara percuma',
      features: [
        100,
        '600 index pangkalan pengetahuan',
        '1 ahli pasukan',
        '10 Agent',
        '3 pangkalan pengetahuan',
        'Retensi sejarah perbualan 30 hari',
        '30 QPM'
      ]
    },
    {
      key: 'basic',
      title: 'Pelan Basic',
      price: 99,
      content: 'Buka ciri penuh FastGPT',
      features: [
        4000,
        '6000 index pangkalan pengetahuan',
        '5 ahli pasukan',
        '50 Agent',
        '30 pangkalan pengetahuan',
        'Retensi sejarah perbualan 180 hari',
        '300 QPM',
        'Sinkronisasi maksimum 500 halaman web',
        'Respons ticket sokongan dalam 48 jam'
      ]
    },
    {
      key: 'advanced',
      title: 'Pelan Advanced',
      price: 599,
      content: 'Sesuai untuk alat produksi AI tahap perusahaan',
      features: [
        25000,
        '36000 index pangkalan pengetahuan',
        '50 ahli pasukan',
        '200 Agent',
        '100 pangkalan pengetahuan',
        'Retensi sejarah perbualan 360 hari',
        'Retensi log operasi pasukan 720 hari',
        '1500 QPM',
        'Sinkronisasi maksimum 2000 halaman web',
        'Respons ticket sokongan dalam 24 jam',
        '3 pendaftaran aplikasi'
      ]
    },
    {
      key: 'custom',
      title: 'Pelan Tersuai',
      price: 'Tersuai',
      content: 'Untuk perusahaan sederhana dan besar yang memerlukan keupayaan khusus',
      features: ['Keutamaan sokongan teknikal mendalam', 'Peruntukan sumber fleksibel', 'Selamat dan terkawal', 'Pengurus akaun khusus']
    }
  ]
};

export const PRICE_PLANS_SELF: {
  [key: string]: {
    key: string;
    title: string;
    price: string;
    content: string;
    features: string[];
  }[];
} = {
  zh: [
    {
      key: 'free',
      title: '社区版',
      price: '免费',
      content: '免费开源，共建 Agent 社区，为 Agent 贡献力量',
      features: [
        '基础核心功能（Agent、Workflow、知识库、MCP等）',
        '模型管理与模型日志',
        '单用户使用',
        '社区技术支持服务'
      ]
    },
    {
      key: 'host',
      title: '托管版',
      price: '云资源计费',
      content: '基于 Sealos 云端托管，更安全更高效部署',
      features: ['一键快速部署', '快速横纵向扩展', '多副本负载均衡', '数据库自动备份']
    },
    {
      key: 'commercial',
      title: '商业版',
      price: '定制化计费',
      content: '支持更高阶功能，私有化部署',
      features: [
        '完整商业授权',
        '企业级可扩展部署方案',
        '多工作空间 & 权限管理',
        '支持多种第三方 SSO',
        '原厂技术支持和服务支持',
        '原厂专业应用搭建支持'
      ]
    }
  ],
  en: [
    {
      key: 'free',
      title: 'รุ่นชุมชน',
      price: 'Free',
      content: 'Free open source, build Agent community together, contribute power to Agent',
      features: [
        'Basic core functions (Agent, Workflow, Knowledge Base, MCP, etc.)',
        'Model management and model logs',
        'Single user use',
        'Community technical support service'
      ]
    },
    {
      key: 'host',
      title: 'รุ่นโฮสต์',
      price: 'Cloud resource billing',
      content: 'Based on Sealos cloud hosting, more secure and efficient deployment',
      features: [
        'One-click quick deployment',
        'Quick horizontal and vertical expansion',
        'Multiple replica load balancing',
        'Database automatic backup'
      ]
    },
    {
      key: 'commercial',
      title: 'รุ่นเชิงพาณิชย์',
      price: 'Custom',
      content: 'Support higher-level features, private deployment',
      features: [
        'Full commercial license',
        'Enterprise-level scalable deployment solution',
        'Multiple workspaces & permission management',
        'Support for multiple third-party SSO',
        'Original factory technical support and service support',
        'Original factory professional application support'
      ]
    }
  ],
  ja: [
    {
      key: 'free',
      title: 'コミュニティ版',
      price: '無料',
      content: '無料で利用できるオープンソース版。自社環境で検証・二次開発できます',
      features: [
        '基本機能（Agent、Workflow、ナレッジベース、MCP など）',
        'モデル管理とモデルログ',
        'シングルユーザー利用',
        'コミュニティによる技術サポート'
      ]
    },
    {
      key: 'host',
      title: 'ホスティング版',
      price: 'クラウドリソース計費',
      content: 'Sealos クラウド上で、より安全かつ効率的にデプロイできます',
      features: [
        '1クリックでの迅速なデプロイ',
        'すばやい水平・垂直スケーリング',
        '複数のレプリカ負荷分散',
        'データベースの自動バックアップ'
      ]
    },
    {
      key: 'commercial',
      title: '商用版',
      price: '要相談',
      content: '高度な機能とエンタープライズ向けプライベートデプロイに対応',
      features: [
        '完全な商用ライセンス',
        '企業レベルの拡張可能なデプロイソリューション',
        '複数のワークスペース & 権限管理',
        '複数のサードパーティーSSOのサポート',
        'メーカーによる技術サポートとサービスサポート',
        '専門チームによるアプリケーション構築支援'
      ]
    }
  ],
  ar: [
    {
      key: 'free',
      title: 'إصدار المجتمع',
      price: 'مجاني',
      content: 'إصدار مفتوح المصدر مجاني مناسب للتجربة والتطوير داخل بيئتك',
      features: [
        'الميزات الأساسية (Agent وWorkflow وقاعدة المعرفة وMCP وغيرها)',
        'إدارة النماذج وسجلات النماذج',
        'استخدام مستخدم واحد',
        'دعم تقني من المجتمع'
      ]
    },
    {
      key: 'host',
      title: 'الإصدار المستضاف',
      price: 'حسب موارد السحابة',
      content: 'استضافة على Sealos Cloud لنشر أكثر أمانا وكفاءة',
      features: ['نشر سريع بنقرة واحدة', 'توسّع أفقي وعمودي سريع', 'موازنة حمل متعددة النسخ', 'نسخ احتياطي تلقائي لقاعدة البيانات']
    },
    {
      key: 'commercial',
      title: 'الإصدار التجاري',
      price: 'مخصص',
      content: 'ميزات متقدمة ونشر خاص للمؤسسات',
      features: [
        'ترخيص تجاري كامل',
        'حل نشر مؤسسي قابل للتوسع',
        'مساحات عمل متعددة وإدارة صلاحيات',
        'دعم عدة موفري SSO خارجيين',
        'دعم تقني وخدمات من الفريق الرسمي',
        'مساعدة احترافية في بناء التطبيقات'
      ]
    }
  ],
  vi: [
    {
      key: 'free',
      title: 'Bản cộng đồng',
      price: 'Miễn phí',
      content: 'Mã nguồn mở miễn phí, phù hợp để tự triển khai và phát triển thử nghiệm',
      features: [
        'Tính năng cốt lõi cơ bản (Agent, Workflow, kho tri thức, MCP...)',
        'Quản lý mô hình và log mô hình',
        'Sử dụng một người dùng',
        'Hỗ trợ kỹ thuật từ cộng đồng'
      ]
    },
    {
      key: 'host',
      title: 'Bản hosted',
      price: 'Tính theo tài nguyên cloud',
      content: 'Triển khai trên Sealos Cloud để vận hành an toàn và hiệu quả hơn',
      features: ['Triển khai nhanh một chạm', 'Mở rộng ngang/dọc nhanh', 'Cân bằng tải nhiều replica', 'Tự động sao lưu database']
    },
    {
      key: 'commercial',
      title: 'Bản thương mại',
      price: 'Tùy chỉnh',
      content: 'Hỗ trợ tính năng nâng cao và triển khai riêng cho doanh nghiệp',
      features: [
        'Giấy phép thương mại đầy đủ',
        'Phương án triển khai enterprise có thể mở rộng',
        'Nhiều workspace và quản lý quyền',
        'Hỗ trợ nhiều SSO bên thứ ba',
        'Hỗ trợ kỹ thuật và dịch vụ từ đội ngũ chính thức',
        'Hỗ trợ xây dựng ứng dụng chuyên nghiệp'
      ]
    }
  ],
  th: [
    {
      key: 'free',
      title: 'Community Edition',
      price: 'ฟรี',
      content: 'โอเพนซอร์สฟรี เหมาะสำหรับทดลองและพัฒนาต่อในสภาพแวดล้อมของคุณ',
      features: [
        'ฟีเจอร์หลักพื้นฐาน (Agent, Workflow, ฐานความรู้, MCP ฯลฯ)',
        'จัดการโมเดลและ log โมเดล',
        'ใช้งานแบบผู้ใช้เดียว',
        'ซัพพอร์ตเทคนิคจาก community'
      ]
    },
    {
      key: 'host',
      title: 'Hosted Edition',
      price: 'คิดค่าบริการตามทรัพยากรคลาวด์',
      content: 'โฮสต์บน Sealos Cloud เพื่อ deploy ได้ปลอดภัยและมีประสิทธิภาพขึ้น',
      features: ['deploy ได้รวดเร็วในคลิกเดียว', 'ขยายแนวนอนและแนวตั้งได้รวดเร็ว', 'โหลดบาลานซ์หลาย replica', 'สำรองฐานข้อมูลอัตโนมัติ']
    },
    {
      key: 'commercial',
      title: 'Commercial Edition',
      price: 'ราคาตามความต้องการ',
      content: 'รองรับฟีเจอร์ขั้นสูงและการติดตั้งส่วนตัวสำหรับองค์กร',
      features: [
        'ใบอนุญาตเชิงพาณิชย์ครบถ้วน',
        'แผน deploy ระดับองค์กรที่ขยายได้',
        'หลาย workspace และการจัดการสิทธิ์',
        'รองรับ SSO จากผู้ให้บริการภายนอกหลายราย',
        'ซัพพอร์ตเทคนิคและบริการจากทีมหลัก',
        'สนับสนุนการสร้างแอปโดยทีมผู้เชี่ยวชาญ'
      ]
    }
  ],
  id: [
    {
      key: 'free',
      title: 'Edisi Komunitas',
      price: 'Gratis',
      content: 'Open-source gratis untuk uji coba, self-hosting, dan pengembangan lanjutan',
      features: [
        'Fungsi inti dasar (Agent, Workflow, knowledge base, MCP, dll.)',
        'Manajemen model dan log model',
        'Penggunaan satu user',
        'Support teknis komunitas'
      ]
    },
    {
      key: 'host',
      title: 'Edisi Hosted',
      price: 'Biaya resource cloud',
      content: 'Di-hosting di Sealos Cloud untuk deployment yang lebih aman dan efisien',
      features: ['Deployment cepat sekali klik', 'Skalabilitas horizontal dan vertikal cepat', 'Load balancing multi-replica', 'Backup database otomatis']
    },
    {
      key: 'commercial',
      title: 'Edisi Komersial',
      price: 'Kustom',
      content: 'Fitur lanjutan dan deployment privat untuk kebutuhan enterprise',
      features: [
        'Lisensi komersial penuh',
        'Solusi deployment enterprise yang skalabel',
        'Multi-workspace dan manajemen izin',
        'Dukungan berbagai SSO pihak ketiga',
        'Support teknis dan layanan resmi',
        'Dukungan profesional untuk pembangunan aplikasi'
      ]
    }
  ],
  ms: [
    {
      key: 'free',
      title: 'Edisi Komuniti',
      price: 'Percuma',
      content: 'Sumber terbuka percuma untuk percubaan, hos sendiri dan pembangunan lanjutan',
      features: [
        'Fungsi teras asas (Agent, Workflow, pangkalan pengetahuan, MCP dan lain-lain)',
        'Pengurusan model dan log model',
        'Penggunaan seorang pengguna',
        'Sokongan teknikal komuniti'
      ]
    },
    {
      key: 'host',
      title: 'Edisi Hosted',
      price: 'Bil sumber cloud',
      content: 'Dihoskan di Sealos Cloud untuk deployment yang lebih selamat dan cekap',
      features: ['Deployment pantas satu klik', 'Penskalaan mendatar dan menegak pantas', 'Load balancing berbilang replica', 'Backup database automatik']
    },
    {
      key: 'commercial',
      title: 'Edisi Komersial',
      price: 'Tersuai',
      content: 'Ciri lanjutan dan deploy peribadi untuk keperluan perusahaan',
      features: [
        'Lesen komersial penuh',
        'Solusi deployment perusahaan yang boleh diskala',
        'Berbilang workspace dan pengurusan izin',
        'Sokongan beberapa SSO pihak ketiga',
        'Sokongan teknikal dan servis rasmi',
        'Sokongan profesional untuk pembinaan aplikasi'
      ]
    }
  ]
} as const;

export const PRICE_PLANS_SELF_BUTTON_MAP: {
  [key: string]: Record<string, string>;
} = {
  free: {
    zh: '立即使用',
    en: 'Get Started',
    ja: '使用開始',
    ar: 'ابدأ الآن',
    vi: 'Bắt đầu',
    th: 'เริ่มใช้งาน',
    id: 'Mulai',
    ms: 'Mula',
    href: 'https://github.com/labring/FastGPT'
  },
  host: {
    zh: '立即使用',
    en: 'Get Started',
    ja: '使用開始',
    ar: 'ابدأ الآن',
    vi: 'Bắt đầu',
    th: 'เริ่มใช้งาน',
    id: 'Mulai',
    ms: 'Mula',
    href: 'https://hzh.sealos.run/?openapp=system-template?templateName=fastgpt&uid=fnWRt09fZP'
  },
  commercial: {
    zh: '联系销售',
    en: 'Contact Sales',
    ja: '営業に相談',
    ar: 'تواصل مع المبيعات',
    vi: 'Liên hệ sales',
    th: 'ติดต่อฝ่ายขาย',
    id: 'Hubungi Sales',
    ms: 'Hubungi Jualan',
    href: 'https://fael3z0zfze.feishu.cn/share/base/form/shrcnjJWtKqjOI9NbQTzhNyzljc?prefill_S=H1&hide_S=1'
  }
} as const;
