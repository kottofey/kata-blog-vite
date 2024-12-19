import { Tag } from 'antd';

import cls from './Tags.module.scss';

export default function Tags({ tagList }) {
  return (
    <div className={cls.tags}>
      {tagList.map((tag, idx) => {
        if (!tag.trim()) return null;
        return (
          <Tag
            className={cls.tags__tag}
            key={idx + tag}
          >
            {tag.trim()}
          </Tag>
        );
      })}
    </div>
  );
}
