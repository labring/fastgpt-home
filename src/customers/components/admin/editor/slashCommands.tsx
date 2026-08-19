import {
  CheckIcon,
  CheckSquareIcon,
  CodeIcon,
  InfoIcon,
  LightbulbIcon,
  ListBulletsIcon,
  ListNumbersIcon,
  SigmaIcon,
  QuotesIcon,
  TableIcon,
  TextHOneIcon,
  TextHTwoIcon,
  TextHThreeIcon,
  WarningCircleIcon
} from '@phosphor-icons/react';
import type { SlashCommandItem } from './types';

export const slashCommands: SlashCommandItem[] = [
  { id: 'h1', title: '一级标题', icon: <TextHOneIcon size={18} />, keyword: 'h1 biaoti yiji', group: '基础' },
  { id: 'h2', title: '二级标题', icon: <TextHTwoIcon size={18} />, keyword: 'h2 biaoti erji', group: '基础' },
  { id: 'h3', title: '三级标题', icon: <TextHThreeIcon size={18} />, keyword: 'h3 biaoti sanji', group: '基础' },
  { id: 'ul', title: '无序列表', icon: <ListBulletsIcon size={18} />, keyword: 'ul wuxu liebia', group: '列表' },
  { id: 'ol', title: '有序列表', icon: <ListNumbersIcon size={18} />, keyword: 'ol youxu liebia', group: '列表' },
  { id: 'task', title: '任务列表', icon: <CheckSquareIcon size={18} />, keyword: 'task renwu todo', group: '列表' },
  { id: 'quote', title: '引用', icon: <QuotesIcon size={18} />, keyword: 'quote yinyong', group: '基础' },
  { id: 'code', title: '代码块', icon: <CodeIcon size={18} />, keyword: 'code daima', group: '基础' },
  { id: 'formula', title: '公式', icon: <SigmaIcon size={18} />, keyword: 'formula gongshi latex eq', group: '高级' },
  { id: 'table', title: '表格', icon: <TableIcon size={18} />, keyword: 'table biaoge', group: '高级' },
  { id: 'divider', title: '分割线', icon: <div className="w-4 border-b-2 border-gray-400"></div>, keyword: 'divider fenge hr', group: '基础' },
  { id: 'highlight-blue', title: '高亮摘要 (蓝)', icon: <InfoIcon size={18} className="text-blue-500" />, keyword: 'highlight blue gaoliang zhaiyao tishi', group: '高亮块' },
  { id: 'highlight-green', title: '高亮反馈 (绿)', icon: <CheckIcon size={18} className="text-green-500" />, keyword: 'highlight green gaoliang fankui chenggong', group: '高亮块' },
  { id: 'highlight-red', title: '高亮警示 (红)', icon: <WarningCircleIcon size={18} className="text-red-500" />, keyword: 'highlight red gaoliang jinggao fengxian', group: '高亮块' },
  { id: 'highlight-orange', title: '高亮注意 (橙)', icon: <WarningCircleIcon size={18} className="text-orange-500" />, keyword: 'highlight orange gaoliang zhuyi', group: '高亮块' },
  { id: 'highlight-purple', title: '高亮说明 (紫)', icon: <LightbulbIcon size={18} className="text-purple-500" />, keyword: 'highlight purple gaoliang shuoming jiqiao', group: '高亮块' }
];

export function filterSlashCommands(filter: string) {
  return slashCommands.filter(
    (command) =>
      command.title.toLowerCase().includes(filter) ||
      command.keyword.includes(filter)
  );
}

export function groupSlashCommands(commands: SlashCommandItem[]) {
  return commands.reduce<Record<string, SlashCommandItem[]>>((groups, command) => {
    if (!groups[command.group]) {
      groups[command.group] = [];
    }

    groups[command.group].push(command);
    return groups;
  }, {});
}

export function getSlashCommandInsert(command: string) {
  switch (command) {
    case 'h1':
      return { insertText: '# ', cursorOffset: 2 };
    case 'h2':
      return { insertText: '## ', cursorOffset: 3 };
    case 'h3':
      return { insertText: '### ', cursorOffset: 4 };
    case 'code':
      return { insertText: '```\n\n```', cursorOffset: 4 };
    case 'quote':
      return { insertText: '> ', cursorOffset: 2 };
    case 'ul':
      return { insertText: '- ', cursorOffset: 2 };
    case 'ol':
      return { insertText: '1. ', cursorOffset: 3 };
    case 'task':
      return { insertText: '- [ ] ', cursorOffset: 6 };
    case 'table':
      return {
        insertText: '| 列1 | 列2 | 列3 |\n| --- | --- | --- |\n| 内容 | 内容 | 内容 |',
        cursorOffset: '| 列1 | 列2 | 列3 |\n| --- | --- | --- |\n| 内容 | 内容 | 内容 |'.length
      };
    case 'formula':
      return {
        insertText: '$$E=mc^2$$',
        cursorOffset: '$$'.length
      };
    case 'divider':
      return { insertText: '---\n', cursorOffset: 4 };
    case 'highlight-blue':
      return { insertText: '> [!blue] 提示\n> ', cursorOffset: '> [!blue] 提示\n> '.length };
    case 'highlight-green':
      return { insertText: '> [!green] 成功\n> ', cursorOffset: '> [!green] 成功\n> '.length };
    case 'highlight-red':
      return { insertText: '> [!red] 警告\n> ', cursorOffset: '> [!red] 警告\n> '.length };
    case 'highlight-orange':
      return { insertText: '> [!orange] 注意\n> ', cursorOffset: '> [!orange] 注意\n> '.length };
    case 'highlight-purple':
      return { insertText: '> [!purple] 技巧\n> ', cursorOffset: '> [!purple] 技巧\n> '.length };
    default:
      return { insertText: '', cursorOffset: 0 };
  }
}
