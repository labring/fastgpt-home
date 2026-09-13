import React from 'react';
import type { Components } from 'react-markdown';
import type { MarkdownRendererProps } from '../types';
import { filterWhitespaceChildren, getDomProps, getTextAlignClass, joinClassNames } from '../utils';

export const tableMarkdownRenderers: Components & Record<string, unknown> = {
  table: ({ children, ...props }) => {
    const markdownProps = props as MarkdownRendererProps;
    const domProps = getDomProps<React.TableHTMLAttributes<HTMLTableElement>>(markdownProps);

    return (
      <div className="not-prose my-4 w-full overflow-x-auto">
        <table
          {...domProps}
          className={joinClassNames(
            'm-0 w-full border-collapse text-left text-[14px] leading-[1.6] text-[#1f2329] ',
            markdownProps.className
          )}
        >
          {filterWhitespaceChildren(children)}
        </table>
      </div>
    );
  },
  caption: ({ children, ...props }) => (
    <caption {...getDomProps<React.HTMLAttributes<HTMLElement>>(props)}>{children}</caption>
  ),
  colgroup: (({ children, ...props }) => (
    <colgroup {...getDomProps<React.ColgroupHTMLAttributes<HTMLTableColElement>>(props)}>
      {filterWhitespaceChildren(children)}
    </colgroup>
  )) as Components['colgroup'],
  col: ((props) => (
    <col {...getDomProps<React.ColHTMLAttributes<HTMLTableColElement>>(props)} />
  )) as Components['col'],
  thead: ({ children, ...props }) => (
    <thead {...getDomProps<React.HTMLAttributes<HTMLTableSectionElement>>(props)}>
      {filterWhitespaceChildren(children)}
    </thead>
  ),
  th: ({ children, ...props }) => {
    const markdownProps = props as MarkdownRendererProps;
    return (
      <th
        className={joinClassNames(
          'min-w-24 border border-[#dee0e3] bg-[#f5f6f7] px-3 py-2 align-top font-semibold text-[#1f2329]   ',
          getTextAlignClass(markdownProps.align),
          markdownProps.className
        )}
        {...getDomProps<React.ThHTMLAttributes<HTMLTableHeaderCellElement>>(markdownProps)}
      >
        {children}
      </th>
    );
  },
  tbody: ({ children, ...props }) => (
    <tbody {...getDomProps<React.HTMLAttributes<HTMLTableSectionElement>>(props)}>
      {filterWhitespaceChildren(children)}
    </tbody>
  ),
  tfoot: ({ children, ...props }) => (
    <tfoot {...getDomProps<React.HTMLAttributes<HTMLTableSectionElement>>(props)}>
      {filterWhitespaceChildren(children)}
    </tfoot>
  ),
  td: ({ children, ...props }) => {
    const markdownProps = props as MarkdownRendererProps;
    return (
      <td
        className={joinClassNames(
          'min-w-24 border border-[#dee0e3] bg-white px-3 py-2 align-top text-[#1f2329]   ',
          getTextAlignClass(markdownProps.align),
          markdownProps.className
        )}
        {...getDomProps<React.TdHTMLAttributes<HTMLTableDataCellElement>>(markdownProps)}
      >
        {children}
      </td>
    );
  },
  tr: ({ children, ...props }) => (
    <tr {...getDomProps<React.HTMLAttributes<HTMLTableRowElement>>(props)}>
      {filterWhitespaceChildren(children)}
    </tr>
  )
};
