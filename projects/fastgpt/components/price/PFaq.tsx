'use client';

import ExpandAdd from '@/components/icons/expand-add';
import ExpandMinus from '@/components/icons/expand-minus';
import { Accordion, AccordionItem } from '@nextui-org/react';

export default function PFaq() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 w-full mt-20">
      <h1 className="text-gradient text-transparent font-bold text-[40px] sm:text-7xl text-stroke tracking-wider">
        FAQ
      </h1>

      <div className="w-full max-w-full">
        <Accordion>
          <AccordionItem
            key="1"
            indicator={(props) => (props.isOpen ? <ExpandMinus /> : <ExpandAdd />)}
            title="是否切换订阅套餐？"
          >
            套餐使用规则为优先使用更高级的套餐，因此，购买的新套餐若比当前套餐更高级，则新套餐立即生效：否则将继续使用当前套餐。
          </AccordionItem>
          <AccordionItem
            key="2"
            indicator={(props) => (props.isOpen ? <ExpandMinus /> : <ExpandAdd />)}
            title="在哪里查看已订阅的套餐？"
          >
            账号-个人信息-套餐详情-使用情况。您可以查看所拥有套餐的生效和到期时间。当付费套餐到期后将自动切换免费版。
          </AccordionItem>
          <AccordionItem
            key="3"
            indicator={(props) => (props.isOpen ? <ExpandMinus /> : <ExpandAdd />)}
            title="什么是AI积分？"
          >
            每次调用AI模型时，都会消耗一定的AI积分。具体的计算标准可参考上方的“AI
            积分计算标准”。系统会优先采用模型厂商返回的实际
            usage，若为空，则采用GPT3.5的计算方式进行估算，1Token≈0.7中文字符≈0.9英文单词，连续出现的字符可能被认为是1个Tokens。
          </AccordionItem>
          <AccordionItem
            key="4"
            indicator={(props) => (props.isOpen ? <ExpandMinus /> : <ExpandAdd />)}
            title="AI积分会过期么？"
          >
            会过期。当前套餐过期后，AI积分将会清空，并更新为新套餐的AI积分。年度套餐的AI积分时长为1年，而不是每个月。
          </AccordionItem>
          <AccordionItem
            key="5"
            indicator={(props) => (props.isOpen ? <ExpandMinus /> : <ExpandAdd />)}
            title="知识库存储怎么计算？"
          >
            1条知识库存储等于1条知识库索引。一条分块数据，通常对应多条索引，可以在单个知识库集合中看到&ldquo;n组索引&rdquo;
          </AccordionItem>
          <AccordionItem
            key="6"
            indicator={(props) => (props.isOpen ? <ExpandMinus /> : <ExpandAdd />)}
            title="知识库索引超出会删除么？"
          >
            不会。但知识库索引超出时，无法插入和更新知识库内容。
          </AccordionItem>
          <AccordionItem
            key="7"
            indicator={(props) => (props.isOpen ? <ExpandMinus /> : <ExpandAdd />)}
            title="额外资源包可以叠加么？"
          >
            可以的。每次购买的资源包都是独立的，在其有效期内将会叠加使用。AI积分会优先扣除最先过期的资源包。
          </AccordionItem>
          <AccordionItem
            key="8"
            indicator={(props) => (props.isOpen ? <ExpandMinus /> : <ExpandAdd />)}
            title="免费版数据会清除么？"
          >
            免费版团队（免费版且未购买额外套餐）连续 30
            天未登录系统，系统会自动清除该团队下所有知识库内容。
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
